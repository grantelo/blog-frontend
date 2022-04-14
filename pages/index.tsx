import type { NextPage } from "next";
import Post from "../components/Post";
import MainLayout from "../layouts/MainLayout";
import { IPost } from "../models/IPost";
import { requestPostsError, requestPostsSuccess } from "../redux/actions/post";
import { wrapper } from "../redux/store";
import Api from "../utils/api";
import { useEffect } from "react";
import { AxiosResponse } from "axios";

interface HomeProps {
  posts: IPost[];
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  useEffect(async () => {
    try {
      await Api().user.changePassword("dsads", {
        password: "11111111",
        newPassword: "22222222",
        repeatNewPassword: "22222222",
      });
    } catch (e: AxiosResponse) {
      console.log(e);
    }
  }, []);

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

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    try {
      const response = await Api(context).post.getAll();

      store.dispatch(requestPostsSuccess(response.data));

      return {
        props: {
          posts: response.data,
        },
      };
    } catch (e) {
      store.dispatch(requestPostsError(e));

      return {
        props: {},
      };
    }
  }
);

export default wrapper.withRedux(Home);
