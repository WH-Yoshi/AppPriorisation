import Header from "./Header.tsx";
import {Outlet} from "react-router";

function Root() {

    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default Root;