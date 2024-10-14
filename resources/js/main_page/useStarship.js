import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function useStarship() {
    const navigate = useNavigate();

    const params = useParams();
    const [page, setPage] = useState(params.page);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        if (!isNaN(params.page)) {
            setPage(Number(params.page));
            const apiUrl = `https://swapi.dev/api/starships/?page=${page}`;
            await axios
                .get(apiUrl)
                .then((result) => {
                    setData(result.data);
                })
                .catch((error) => {
                    setError(true);
                });
        } else setError(true);
        setLoading(false);
    };

    const last_page = Math.ceil(data.count / 10);

    const handleClick = (e, link) => {
        e.preventDefault();
        navigate(link);
        window.location.reload();
    };

    useEffect(() => {
        fetchData();
    }, []);

    return {
        data,
        fetchData,
        loading,
        error,
        page,
        setPage,
        setLoading,
        last_page,
        handleClick,
    };
}
