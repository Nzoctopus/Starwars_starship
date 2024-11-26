import useAuthViewModel from "../model/useAuthViewModel";
import { useState } from "react";
import useConnection from "../useConnetion";

export default function useLoginPage() {
    const { Login } = useAuthViewModel();
    const [data, setData] = useState({ email: "", password: "" });
    const {loadAuthStatus} = useConnection();

    const handleSubmit = (e, data) => {
        e.preventDefault();
        Login(data)
            .then(() => {
                loadAuthStatus();
            })
            .catch((error) => {
                console.error("error on login", error);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    return { handleChange, handleSubmit, data };
}
