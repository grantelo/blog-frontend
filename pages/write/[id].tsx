import MainLayout from "../../layouts/MainLayout";
import WriteForm from "../../components/WriteForm";
import React from "react";
import {GetServerSideProps, NextPage} from "next";
import Api from "../../utils/api";
import {IPost} from "../../models/IPost";

interface WriteProps {
    post: IPost
}

const Write: NextPage<WriteProps> = ({post}) => {
    return (
        <MainLayout className={"main-layout--white"} hideLeftMenu>
            <WriteForm post={post}/>
        </MainLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        const id = ctx.params!.id!

        console.log("dsauuasdhgasugdsyagdasgduysdsayuf")
        console.log(+id)

        const post = await Api(ctx).post.getOne(+id)
        const user = await Api(ctx).user.getMe()

        //console.log(post.data)

        if (post.data.user.id !== user.data.id) return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }


        return {
            props: {
                post: post.data
            }
        }

    } catch (e) {
        console.log(e)

        return {
            props: {},
            redirect: "/",
            permanent: false
        }
    }

}

export default Write;
