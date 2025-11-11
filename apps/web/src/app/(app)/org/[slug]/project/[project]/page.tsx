import { getProject } from "@/http/get-project"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

interface ProjectPageProps {
  params: Promise<{
    slug: string
    project: string
  }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug, project } = await params
  const { project: projectData } = await getProject(slug, project)

  return (
    <div className="space-y-6 py-8">
      <div className="flex items-center gap-4">
        <Avatar className="size-10">
          {projectData.owner.avatarUrl && (
            <AvatarImage src={projectData.owner.avatarUrl} />
          )}
          <AvatarFallback>{projectData.owner.name}</AvatarFallback>
        </Avatar>

        <div>
          <h1 className="text-2xl font-bold">{projectData.name}</h1>
          <p className="text-muted-foreground">
            by {projectData.owner.name}
          </p>
        </div>
      </div>

      <Separator />

      <p className="text-base leading-relaxed">{projectData.description}</p>

      <p className="text-sm text-muted-foreground">
      
      </p>
    </div>
  )
}
