import React from 'react';
import MainLayout from "../../layouts/MainLayout";
import FullPost from "../../FullPost/FullPost";
import PostComments from "../../components/PostComments/PostComments";

const Post = () => {
    return (
        <MainLayout fullWidth>
            <FullPost/>
            <PostComments/>
        </MainLayout>
    );
};

export default Post;