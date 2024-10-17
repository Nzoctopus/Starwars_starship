import { useNavigate } from "react-router-dom";
import useAuthViewModel from "../model/useAuthViewModel";
import { useState } from "react";

export default function useRegisterPage() {
    const { Register } = useAuthViewModel();
    const navigate = useNavigate();

    const [data, setData] = useState({ name: "", email: "", password: "" });

    const handleSubmit = (e, data) => {
        e.preventDefault();
        console.log("tried to send data", data);
        Register(data)
            .then((result) => {
                console.log("ok result", result);
                navigate("/starships/list_custom_ship");
                window.location.reload();
            })
            .catch((error) => {
                console.error("error my g", error);
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
