import { Button } from "./ui/button";
import { ability, getCurrentOrg } from "@/auth/auth";
import { NavLink } from "./nav.link";

export async function Tabs() {
    const currenOrg = await getCurrentOrg()
    const permissions = await ability()

    const canUpdatOrganization = permissions?.can('update', 'Organization')
    const canGetBilling = permissions?.can('get', 'Billing')

    const canGetMembers = permissions?.can('get', 'User')
    const canGetProjects = permissions?.can('get', 'Project')

    return <div className="border-b py-4">
        <nav className="mx-auto flex max-w-[1200px] items-center gap-2">
            {canGetProjects && (
                <Button asChild variant="ghost" size="sm" className="border border-transparent opacity-60 hover:opacity-100 data-[current=true]:opacity-100 text-foreground data-[current=true]:border-border">
                    <NavLink href={`/org/${currenOrg}`}>
                        Projects
                    </NavLink>
                </Button>
            )}

            {canGetMembers && (
                <Button asChild variant="ghost" size="sm" className="border border-transparent opacity-60 hover:opacity-100 data-[current=true]:opacity-100 text-foreground data-[current=true]:border-border">
                    <NavLink href={`/org/${currenOrg}/members`}>
                        Members
                    </NavLink>
                </Button>
            )}

            {(canUpdatOrganization || canGetBilling) && (
                <Button asChild variant="ghost" size="sm" className="border border-transparent opacity-60 hover:opacity-100 data-[current=true]:opacity-100 text-foreground data-[current=true]:border-border">
                    <NavLink href={`/org/${currenOrg}/settings`}>
                        Settings & Billing
                    </NavLink>
                </Button>
            )}

        </nav>
    </div>
}