import AuthGuard from "../../Guards/AuthGuard";

function AuthenticatedRoute({ Element, Layout}) {
    return (
        <Layout >
            <AuthGuard>
                <Element />
            </AuthGuard>
        </Layout>
    )
}

export default AuthenticatedRoute;
