import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function useStarship () {

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
            await axios.get(apiUrl).then(result => {
                console.log("okokokokok", result.data);
                setData(result.data);
            }).catch(error => {
                console.error('error la', error);
                setError(true);
            })
        } else
            setError(true);
        setLoading(false);
        console.log("params page", params.page)
    };

    const last_page = Math.ceil(data.count / 10);

    const handleClick = (e, link) => {
        e.preventDefault();
        console.log("cliked to link", link);
        navigate(link);
        fetchData()
    }

    useEffect(() => {
        fetchData();
       }, []);
 
    return {data, fetchData, loading, error, page, setPage, setLoading, last_page, handleClick}
}