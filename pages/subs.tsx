import {NextPage, NextPageContext} from "next";
import MainLayout from "../layouts/MainLayout";
import Post from "../components/Post";
import {wrapper} from "../redux/store";
import {requestUserLoginErrorAction} from "../redux/actions/user";
import IError from "../models/IError";
import instance from "../http";
import nookies from "nookies";
import axios from "axios";

const Subs: NextPage = () => {
    return (
        <MainLayout>
            <h1>Защищеный роут</h1>
        </MainLayout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async (context: NextPageContext) => {
    console.log(nookies.get(context))
    await axios.get("http://localhost:5000/auth/refresh", {
        withCredentials: true,
        headers: {
            Cookie: context.req?.headers.cookie!
        }
    })
    //await fetch("http://localhost:5000/auth/refresh", {credentials: "include"})
})

export default Subs
