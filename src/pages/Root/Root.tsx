import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import {Outlet} from "react-router";

function Root() {

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default Root;