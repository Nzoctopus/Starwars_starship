import { useEffect, useState } from "react";
import useAuthViewModel from "./model/useAuthViewModel";
import { resolveMotionValue } from "framer-motion";
import LoginPage from "./auth/LoginPage";
import { Outlet } from "react-router-dom";
import AuthPage from "./auth/AuthPage";

export default function Protected() {
    const { isLoggedIn } = useAuthViewModel();
    const [Logged, setLogged] = useState(false);

    useEffect(() => {
        isLoggedIn().then((result) => {
            setLogged(result.isLoggedIn);
            console.log(result.isLoggedIn);
        });
    }, [LoginPage]);

    return Logged ? <Outlet /> : <AuthPage />;
}
