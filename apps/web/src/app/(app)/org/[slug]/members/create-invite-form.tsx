'use client'

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useFormState } from "@/hooks/use-form-state"
import { AlertTriangle, Loader2, UserPlus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createInviteAction } from "./actions"

export function CreateInviteForm() {
    const [{success, message, errors}, handleSubmit, isPending] = useFormState(createInviteAction)
    return(
        <form onSubmit={handleSubmit} className="space-y-4">

                {success == false && message && (
                    <Alert variant="destructive"> 
                        <AlertTriangle className='size-4'/>
                        <AlertTitle>Invite faild</AlertTitle>
                        <AlertDescription>
                            <p>{message}</p>
                        </AlertDescription>
                    </Alert>
                )}

                {success == true && message && (
                    <Alert variant='success'> 
                        <AlertTriangle className='size-4'/>
                        <AlertTitle>Success!</AlertTitle>
                        <AlertDescription>
                            <p>{message}</p>
                        </AlertDescription>
                    </Alert>
                )}

                <div className="flex items-center gap-2">
                    <div className="space-y-1 flex-1">
                        <Input name="email" id="email" type="email"placeholder="jhon@exemplo.com"/>
                        {errors?.email && (
                            <p className='text-xs font-medium text-red-500 dark:text-red-400'>{errors.email[0]}</p>
                        )}
                    </div>

                    <Select name="role" defaultValue="MEMBER">
                        <SelectTrigger className="w-28">
                            <SelectValue/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ADMIN">Admin</SelectItem>
                            <SelectItem value="MEMBER">Member</SelectItem>
                            <SelectItem value="BILLING">Billing</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button type="submit" disabled={isPending}>
                        {isPending ? <Loader2 className="size-4 animate-spin"/> :
                        <>
                        <UserPlus className="size-4 mr-2"/>
                        Invite User
                        </>
                        }
                    </Button>
                </div>
        </form>
    )
}