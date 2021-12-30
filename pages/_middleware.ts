import type { NextFetchEvent, NextRequest } from 'next/server'
import {NextResponse} from "next/server";
import AuthResponse from "../models/response/AuthResponse";

export default async function _middleware(req: NextRequest, ev: NextFetchEvent) {
    try {
        const response = await fetch("http://localhost:5000/auth/refresh", {credentials: "include"}).catch()
        const data = await response.json()

        req.headers.set("Authorization", `Bearer ${data.accessToken}`)

        return NextResponse.next()
    }
    catch (e) {
        console.log("midleware error:")
        console.log(e)

        return NextResponse.redirect("/")
    }
    //
    // req.headers.set("Authorization", `Bearer ${token}`)
    //
    // return NextResponse.next()
}