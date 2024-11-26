import { useNavigate } from "react-router-dom";

export default function useNavigationButtons() {
    const navigate = useNavigate();
    const handleClick = async (e, link) => {
        e.preventDefault();
        navigate(link);
    };
    return { handleClick };
}
