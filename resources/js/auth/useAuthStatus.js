import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthViewModel from "../model/useAuthViewModel";
import { MyContext } from "../MyContext";

export default function useAuthStatus() {
    const { Logout } = useAuthViewModel();
    const navigate = useNavigate();
    const [isLogged, setIsLogged] = useState(false);
    const [User, setUser] = useState({ name: "", email: "" });
    const { Shared } = useContext(MyContext);
    const handleClick = (e, link) => {
        e.preventDefault();
        navigate(link);
    };

    useEffect(() => {
        setIsLogged(Shared.isLogged);
        if (Shared.isLogged)
            setUser(Shared.user);
    }, [Shared]);

    const handleLogout = async (e) => {
        e.preventDefault();
        console.log("cliked");
        Logout()
            .then(() => {
                console.log("logout sucessfull");
                window.location.reload();
            })
            .catch((error) => {
                console.error("error while logging out", error);
            });
    };

    return { handleClick, User, isLogged, handleLogout };
}
