import type { NextPage } from "next";
import Post from "../components/Post";
import MainLayout from "../layouts/MainLayout";
import { IPost } from "../models/IPost";
import { requestPostsError, requestPostsSuccess } from "../redux/actions/post";
import { wrapper } from "../redux/store";
import Api from "../utils/api";

interface HomeProps {
  posts: IPost[];
}

const Home: NextPage<HomeProps> = ({ posts }) => {
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
      console.log("bbbbbbbbbbbbbb")
      console.log(response.data)

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
