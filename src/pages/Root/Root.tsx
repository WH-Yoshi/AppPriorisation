import Header from "./Header.tsx";
import {Outlet, useLocation} from "react-router";
import {AnimatePresence, motion} from "framer-motion";

function Root() {
    const location = useLocation();

    return (
        <>
            <Header />
            <AnimatePresence mode="wait">
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="animated-page"
                >
                    <Outlet />
                </motion.div>
            </AnimatePresence>
        </>
    )
}

export default Root;