import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthViewModel from "../model/useAuthViewModel";

export default function useAuthStatus() {
    const { getUser, Logout} = useAuthViewModel();
    const navigate = useNavigate();
    const [isLogged, setIsLogged] = useState(false);
    const [User, setUser] = useState({ name: "", email: "" });
    const handleClick = (e, link) => {
        e.preventDefault();
        console.log("clicked to", link);
        navigate(link);
    };

    useEffect(() => {
        getUser().then((result) => {
            if (result.error) {
                setIsLogged(false);
            } else {
                console.log("user is", result);
                setUser(result);
                setIsLogged(true);
            }
        });
    }, []);

    const handleLogout = async (e) => {
        e.preventDefault();
        console.log("cliked");
        Logout().then(result => {
            console.log("logout sucessfull");
            window.location.reload();
        }).catch(error => {
            console.error("error while logging out", error);
        });
    };

    return { handleClick, User, isLogged, handleLogout};
}
