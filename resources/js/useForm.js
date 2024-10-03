import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useForm() {

    const [fetchError, setFetchError] = useState([]);
    const navigate = useNavigate();

    async function fetchData(link, setFunc) {
        const result = await fetch(link);
        const body = await result.json();
        setFunc(body);
        setFetchError(body.error);
    }
    
    const handleDelete = async (id, DeleteLink, FetchLink, FetchSetFunc) => {
        console.log("id = ", id);
        console.log("send to ", DeleteLink);
        try {
            await axios.post(DeleteLink, {id: id});
        } catch (error) {
            console.error('There was an error!', error);
        }
        fetchData(FetchLink, FetchSetFunc);
    }

    async function handleSubmit(e, SubmitLink, RedirectLink, data) {
        e.preventDefault();
        console.log("link = ", SubmitLink);
        console.log("final data = ", data);
        try {
            await axios.post(SubmitLink, data);
        } catch (error) {
            console.error('There was an error!', error);
        }
        navigate(RedirectLink);
    }
    return {fetchData, handleDelete, handleSubmit, fetchError}
}