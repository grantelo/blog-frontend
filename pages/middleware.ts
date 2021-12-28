// import type { NextFetchEvent, NextRequest } from 'next/server'
// import {NextResponse} from "next/server";
// import AuthResponse from "../models/response/AuthResponse";
//
// export async function middleware(req: NextRequest, ev: NextFetchEvent) {
//     try {
//         console.log("start middleware")
//         const response = await fetch("http://localhost:5000/auth/refresh", {credentials: "include"})
//         const data: AuthResponse = await response.json()
//         console.log(data)
//         req.headers.set("Authorization", `Bearer ${data.accessToken}`)
//
//         return NextResponse.next()
//     }
//     catch (e) {
//         console.log("error on middleware")
//         console.log(e)
//
//         NextResponse.redirect("/")
//     }
//     //
//     // req.headers.set("Authorization", `Bearer ${token}`)
//     //
//     // return NextResponse.next()
// }