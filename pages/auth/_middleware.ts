import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
    const token = req.nextUrl.searchParams.get('token')

    if (!token) return NextResponse.redirect('/')

    return NextResponse.next()
}