import { NextPage } from "next";
import useTypedSelector from "../hooks/useTypedSelector";
import { IUser } from "../models/IUser";
import ProfileForm from "../components/ProfileForm";
import IError from "../models/IError";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as UserActionCreators from "../redux/actions/user";

const Profile: NextPage = () => {
  const user = useTypedSelector<IUser>(({ user }) => user.user);
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

export default Profile;

// export const getServerSideProps = wrapper.getServerSideProps(store => async (context: NextPageContext) => {
//
//
//
// }
