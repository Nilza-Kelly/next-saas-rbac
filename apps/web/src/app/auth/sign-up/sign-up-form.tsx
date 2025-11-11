'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import githubIcon from '@/assets/github-icon.svg'
import Image from "next/image"
import { useFormState } from '@/hooks/use-form-state'
import { useRouter } from "next/navigation" 
import { signUpAction } from "./actions"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Loader2 } from "lucide-react"
import { signInWithGithub } from "../actions"


export default function SignUpForm() {
    const router = useRouter()
    const [{success, message, errors}, handleSubmit, isPending] = useFormState(signUpAction,
        () => {
            router.push('/auth/sign-in')
        }
    )
    return(
        <div className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">

                {success == false && message && (
                    <Alert variant="destructive"> 
                        <AlertTriangle className='size-4'/>
                        <AlertTitle>Sign in faild</AlertTitle>
                        <AlertDescription>
                            <p>{message}</p>
                        </AlertDescription>
                    </Alert>
                )}

                <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input name="name" id="name"/>
                    {errors?.name && (
                        <p className='text-xs font-medium text-red-500 dark:text-red-400'>{errors.name[0]}</p>
                    )}
                </div>

                <div className="space-y-1">
                    <Label htmlFor="email">E-mail</Label>
                    <Input name="email" type="email" id="email"/>
                    {errors?.email && (
                        <p className='text-xs font-medium text-red-500 dark:text-red-400'>{errors.email[0]}</p>
                    )}
                </div>

                <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input name="password" type="password" id="password"/>
                    {errors?.password && (
                        <p className='text-xs font-medium text-red-500 dark:text-red-400'>{errors.password[0]}</p>
                    )}
                </div>

                <div className="space-y-1">
                    <Label htmlFor="password_confirmation">Confirm your password</Label>
                    <Input name="password_confirmation" type="password" id="password_confirmation"/>
                    {errors?.password_confirmation && (
                        <p className='text-xs font-medium text-red-500 dark:text-red-400'>{errors.password_confirmation[0]}</p>
                    )}
                </div>

                <Button type="submit" className="w-full bg-white text-black hover:bg-gray-100" disabled={isPending}>
                    {isPending ? <Loader2 className="size-4 animate-spin"/> : 'Create account'}
                </Button>

                <Button variant="link" className="w-full" size="sm" asChild>
                    <Link href="/auth/sign-in">Already registed? Sign in</Link>
                </Button>
            </form>

            <Separator className="bg-gray-400"/>

            <form action={signInWithGithub}>
                <Button type="submit" variant="outline" className="w-full">
                    <Image src={githubIcon} className="w-4 h-4 mr-2" alt="GitHub" />
                    Sign up with Github
                </Button>
            </form>
        </div>
    )
}