import type {NextPage} from 'next'
import Post from "../components/Post"
import MainLayout from "../layouts/MainLayout";
import AuthDialog from "../components/AuthDialog";

const Home: NextPage = () => {
    return (
        <MainLayout>
            <AuthDialog open={true} handleClose={() => undefined} />
        </MainLayout>
    )
}

export default Home
