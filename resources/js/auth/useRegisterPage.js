import useAuthViewModel from "../model/useAuthViewModel";
import { useState } from "react";

export default function useRegisterPage() {
    const { Register } = useAuthViewModel();
    const [data, setData] = useState({ name: "", email: "", password: "" });

    const handleSubmit = (e, data) => {
        e.preventDefault();
        Register(data)
            .then(() => {
                loadAuthStatus();
            })
            .catch((error) => {
                console.error("error my g", error);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    return { handleChange, handleSubmit, data };
}
