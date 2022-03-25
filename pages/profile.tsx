import { NextPage } from "next";
import useTypedSelector from "../hooks/useTypedSelector";
import { IUser } from "../models/IUser";

const Profile: NextPage = () => {
  const user = useTypedSelector<IUser>(({ user }) => user.user);
};

// export const getServerSideProps = wrapper.getServerSideProps(store => async (context: NextPageContext) => {
//
//
//
// }
