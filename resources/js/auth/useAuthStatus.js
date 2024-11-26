import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthViewModel from "../model/useAuthViewModel";
import { useAtom } from "jotai";
import { isLoggedAtom, UserDataAtom } from "../atoms";
import useConnection from "../useConnetion";

export default function useAuthStatus() {
    const { Logout } = useAuthViewModel();
    const { loadAuthStatus } = useConnection();
    const navigate = useNavigate();
    const [User, setUser] = useState({ name: "", email: "" });
    const [isLogged] = useAtom(isLoggedAtom);
    const [UserData] = useAtom(UserDataAtom);
    const handleClick = (e, link) => {
        e.preventDefault();
        navigate(link);
    };

    useEffect(() => {
        setUser(UserData);
    }, [UserData]);

    const handleLogout = async (e) => {
        e.preventDefault();
        Logout()
            .then(() => {
                console.log("logout sucessfull");
                loadAuthStatus();
            })
            .catch((error) => {
                console.error("error while logging out", error);
            });
    };

    return { handleClick, User, isLogged, handleLogout };
}
