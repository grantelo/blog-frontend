import React from "react";
import { GetServerSideProps } from "next";
import { wrapper } from "../../redux/store";
import Api from "../../utils/api";
import {
  requestPostsError,
  requestPostsSuccess,
} from "../../redux/actions/post";
import IError from "../../models/IError";
import useTypedSelector from "../../hooks/useTypedSelector";
import { IPost } from "../../models/IPost";
import MainLayout from "../../layouts/MainLayout";
import Post from "../../components/Post";

const Search = () => {
  const posts: IPost[] = useTypedSelector<IPost[]>(({ post }) => post.items);

  return (
    <MainLayout>
      {posts?.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          title={post.title}
          body={post.body}
          tags={post.tags}
        />
      ))}
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    try {
      const query: string = context.query.query as string;
      const response = await Api(context).post.search(query);

      console.log("nmn");
      console.log(query);
      console.log(response.data);

      if (response.data.totalCount === 0)
        return {
          props: {},
        };

      store.dispatch(requestPostsSuccess(response.data.posts));

      return {
        props: {},
      };
    } catch (e) {
      console.log(e);

      store.dispatch(requestPostsError(e as IError));

      return {
        props: {},
      };
    }
  });

export default Search;
