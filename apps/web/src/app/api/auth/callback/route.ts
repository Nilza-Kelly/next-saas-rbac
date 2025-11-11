import { signInWithGithub } from "@/http/sign-in-with-github";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { acceptInvite } from "@/http/accept-invite";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get('code')

    if(!code) {
        return NextResponse.json(
            {message: 'Github OAuth was not found'},
            {status: 400}
        )
    }

    const{token} = await signInWithGithub({code})

    ;(await cookies()).set('token', token, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
    })

    const inviteId = (await cookies()).get('inviteId')?.value

    if(inviteId) {
        try{
            await acceptInvite(inviteId)
            ;(await cookies()).delete('inviteId')
        }catch{}
    }

    const redirectUrl = request.nextUrl.clone()

    redirectUrl.pathname = '/'
    redirectUrl.search = ''

    return NextResponse.redirect(redirectUrl)
}

