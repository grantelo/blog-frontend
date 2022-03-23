import React from 'react';
import MainLayout from "../../layouts/MainLayout";
import FullPost from "../../components/FullPost/FullPost";
import { GetServerSideProps, NextPage } from 'next';
import Api from '../../utils/api';
import { IPost } from '../../models/IPost';
import PostComments from '../../components/PostComments/index';
import { IComment } from '../../models/IComment';
import { wrapper } from '../../redux/store';
import { requestCommentsSuccessAction } from '../../redux/actions/comment';
import useTypedSelector from '../../hooks/useTypedSelector';

interface PostProps {
    post: IPost,
    //comments: IComment[]
}
//Черный список
//Сообщения
//Вынести значки на гланвй экран
//Почитать за альтернативу куки(побочка)
//Изучить, где можно развернуть прилоежение
//Добить рейтинг
//Изменить почту
//Изменить пароль
//Добавить комментарии
const Post: NextPage<PostProps> = ({post}) => {
    const comments = useTypedSelector(({comment}) => comment.items)

    return (
        <MainLayout fullWidth>
            <FullPost
                id={post.id}
                title={post.title}
                body={post.body}
                tags={post.tags}
                user={post.user}
                views={post.views}
                createdAt={post.createdAt}
                updatedAt={post.updatedAt}
            />
            <PostComments
                postId={post.id}
                comments={comments}
            />
        </MainLayout>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(store => async (context) => {
    try {
        const id = context.params!.id!
        const responsePost = await Api(context).post.getOne(+id)
        const responseComments = await Api(context).comment.getAll(+id)

        store.dispatch(requestCommentsSuccessAction(responseComments.data))

        console.log("CATCH CATCH CATCH CATCH CATCH CATCH CATCH CATCHCATCH CATCH CATCH")

        return {
            props: {
                post: responsePost.data,
            }
        }
    } catch (e) {
        console.log(e)

        return {
            props: {},
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }
})

export default Post;

