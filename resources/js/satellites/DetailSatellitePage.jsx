import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import useSatellite from "./useSatellite";
import useForm from "../useForm";

export default function DetailSatellitePage () {
    const params = useParams();
    const isCreating = params.id == "create";
    const SubmitLink = isCreating ? '/store/satellite' : '/modify/satellite';
    const FetchLink = `/api/satellites/${params.id}`;
    const Title = isCreating ? 'ADD SATELLITE' : 'MODIFY SATELLITE'
    const {fetchData, fetchError, handleSubmit} = useForm();
    const {fields, data, setData, handleChange} = useSatellite();

    if (!isCreating) {
        
        useEffect(() => {
            fetchData(FetchLink, setData);
            console.log("data", data);
        }, []);
        if (fetchError)
            return <h1 className="sm:text-5xl text-slate-400 font-bold">An error has occured</h1>
    }

    return (
    <div className="inline-block">
            <h1 className="mt-6 text-[2.5rem] leading-none sm:text-4xl tracking-tight font-bold text-yellow-500 py-5 text-center">{Title}</h1>
            <form onSubmit={(e) => handleSubmit(e, SubmitLink, '/starships/list_custom_satellites', data)}>
                <table className="table-auto border-separate border-spacing-2 bg-[#53535331]">
                    <tbody>
                        {fields.map((item, index) => (
                            <tr key={index}>
                                <th className="text-white bg-[#97979736] rounded">
                                    <label htmlFor={item}>{item}</label>
                                </th>
                                <td className="py-2 bg-[#9e9e9e21] rounded">
                                    <input id={item} type='text' placeholder={item} onChange = {handleChange} name={item} defaultValue={data[item]} required className="bg-transparent text-white"/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="py-5">
                    <button type='reset' className="text-white bg-gradient-to-bl from-black to-gray-800 hover:bg-gradient-to-b focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Reset</button>
                    <button type='submit' className="text-white bg-gradient-to-bl from-black to-gray-800 hover:bg-gradient-to-b focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Submit</button>
                </div>
            </form>
        </div>
    )
}