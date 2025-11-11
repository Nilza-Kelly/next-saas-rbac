import { getCurrentOrg } from "@/auth/auth";
import { Button } from "@/components/ui/button";
import { shutdownOrganization } from "@/http/shutdown-organization";
import { XCircle } from "lucide-react";
import { redirect } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function ShutdownOrganizationButton() {
    async function ShutdownOrganizationAction() {
        'use server'

        const currentOrg = await getCurrentOrg()

        await shutdownOrganization({org: currentOrg!})

        redirect('/')
    }

    return(
        <AlertDialog>
            <AlertDialogTrigger asChild>
             <Button type="submit" variant="destructive" className="w-56" >
                <XCircle className="size-4 mr-2"/>
                Shutdown Organization
             </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently shutdown this organization.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <form action={ShutdownOrganizationAction}>
                        <Button>Continue</Button>
                    </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}