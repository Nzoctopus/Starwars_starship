import useAuthViewModel from "../model/useAuthViewModel";
import { useState } from "react";

export default function useLoginPage() {
    const { Login } = useAuthViewModel();

    const [data, setData] = useState({ email: "", password: "" });

    const handleSubmit = (e, data) => {
        e.preventDefault();
        console.log("tried to send data", data);
        Login(data)
            .then((result) => {
                console.log("ok");
                console.log("res", result);
                window.location.reload();
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
