import { auth } from "@/http/middlewares/auth";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod'
import  {prisma} from '@/lib/prisma'
import { getUserPermissions } from "@/utils/get-user-permissions";
import { UnauthorizedError } from "../_error/unauthotized-error";
import { BadRequestError } from "../_error/bad-request-error";
import { projectSchema } from "@saas/auth";

export async function deleteProject(app: FastifyInstance) {
    app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
        '/organizations/:slug/projects/:projectId', 
        {
        schema:{
            tags: ['projects'],
            summary: 'Delete a project',
            security:[{bearerAuth: []}],
            params: z.object({
                slug: z.string(),
                projectId: z.string().uuid()
            }),
            response:{
                204: z.null()
            }
        }
    }, 
    async (request, reply) => {
        const { slug, projectId } = request.params
        const userId = await request.getCurrentUserId()
        const { organization, membership } = await request.getUserMembership(slug)

        const project = await prisma.project.findUnique({
            where:{
                id: projectId,
                organizationId: organization.id
            }
        })

        if(!project){
            throw new BadRequestError('Project not found')
        }

        const {cannot} = getUserPermissions(userId, membership.role)
        const authProject = projectSchema.parse(project)

        if(cannot('delete', authProject)){
            throw new UnauthorizedError(`You're not allowed to delete this project`)
        }

        await prisma.project.delete({
            where:{
                id: projectId
            }
        })

        return reply.status(204).send()
    })
}