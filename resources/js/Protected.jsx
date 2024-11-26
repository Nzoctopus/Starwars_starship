import {useEffect } from "react";
import { Outlet } from "react-router-dom";
import AuthPage from "./auth/AuthPage";
import { useAtom } from "jotai";
import { isLoggedAtom } from "./atoms";
import useConnection from "./useConnetion";
import EntitiesLoader from "./EntitiesLoader";

export default function Protected() {
    const [isLogged] = useAtom(isLoggedAtom);
    const { loadAuthStatus } = useConnection();
    useEffect(() => {
        if (!isLogged) {
            loadAuthStatus();
        }
    }, [isLogged]);

    return isLogged ? (
        <EntitiesLoader>
            <Outlet />
        </EntitiesLoader>
    ) : (
        <AuthPage />
    );
}
