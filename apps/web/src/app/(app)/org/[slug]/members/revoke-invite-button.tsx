import { Button } from "@/components/ui/button"
import { XOctagon } from "lucide-react"
import { revokeInviteAction } from "./actions"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

interface RevokeInviteButtonProps{
    inviteId: string
}

export function RevokeInviteButton({inviteId}: RevokeInviteButtonProps) {
    return(
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size='sm' variant="destructive">
                    <XOctagon className="size-4 mr-2"/>
                    Revoke Invite
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this invitation.
                        </AlertDialogDescription>
                </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <form action={revokeInviteAction.bind(null, inviteId)}>
                                <Button>Continue</Button>
                            </form>
                    </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}