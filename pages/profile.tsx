import {GetServerSideProps, NextPage } from "next";
import useTypedSelector from "../hooks/useTypedSelector";
import { IUser } from "../models/IUser";
import ProfileForm from "../components/ProfileForm";
import IError from "../models/IError";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as UserActionCreators from "../redux/actions/user";
import { wrapper } from "../redux/store";
import Api from "../utils/api";

interface ProfileProps {
  user: IUser
}


const Profile: NextPage<ProfileProps> = ({user}) => {
  const isLoading = useTypedSelector<boolean>(({ user }) => user.isLoading);
  const error = useTypedSelector<IError>(({ user }) => user.error);
  const dispatch = useDispatch();
  const { requestUserUpdateProfile } = bindActionCreators(
    UserActionCreators,
    dispatch
  );

  return (
    <ProfileForm
      requestUserUpdateProfile={requestUserUpdateProfile}
      fullName={user.fullName}
      avatar={user.avatar}
      isLoading={isLoading}
      error={error}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const response = await Api(ctx).user.profile()

    return {
      props: {
        user: response.data
      }
    }
  } catch (e) {
    console.log("nnnnnnnnnnn")
    console.log(e)

    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }
}

export default Profile;
