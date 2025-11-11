'use server'
import { getCurrentOrg } from "@/auth/auth"
import { createProject } from "@/http/create-project"
import { HTTPError } from "ky"
import { z } from 'zod'

const projectSchema = z.object({
    name: z.string().min(4,{ message: 'Please, include at least 4 charecters'}),
    description: z.string()
})


export async function createProjectAction(data: FormData) {
    const result = projectSchema.safeParse(Object.fromEntries(data))

    if(!result.success) {
        const errors = result.error.flatten().fieldErrors

        return {success: false, message:null, errors}
    }

    const { name, description} = result.data
    const org = await getCurrentOrg()

    try {
        await createProject({
            org: org!,
            name,
            description
        })
    }catch (err){
        if(err instanceof HTTPError) {
            const { message } = await err.response.json()
            return { success:false, message, errors:null}
        }
        console.error(err)

        return{
            success: false,
            message: 'Unexpected error, try again in a few minutes',
            errors: null
        }
    }

    return { success:true, message:'Successfully saved the project', errors:null}
}