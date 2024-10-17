import { useNavigate } from "react-router-dom";
import useAuthViewModel from "../model/useAuthViewModel";
import { useState } from "react";

export default function useLoginPage() {
    const { Login } = useAuthViewModel();
    const navigate = useNavigate();

    const [data, setData] = useState({ email: "", password: "" });

    const handleSubmit = (e, data) => {
        e.preventDefault();
        console.log("tried to send data", data);
        Login(data)
            .then((result) => {
                console.log("ok");
                console.log("res", result);
                navigate("/starships/main_list/1");
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

    const handleClick = (e, link) => {
        e.preventDefault();
        console.log("clicked to link", link);
        navigate(link);
    };
    return { handleChange, handleSubmit, handleClick, data };
}
