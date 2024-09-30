import React from 'react';
import '../../css/app.css'; // Import Tailwind CSS
import useSatellite from './useSatellite';

export default function AddSatellitePage () {

    const {fields, handleChange, handleSubmit} = useSatellite();

    return (
        <div className="inline-block">
            <h1 className="mt-6 text-[2.5rem] leading-none sm:text-4xl tracking-tight font-bold text-yellow-500 py-5 text-center">ADD Satellites</h1>
            <form onSubmit={handleSubmit}>
                <table className="table-auto border-separate border-spacing-2 bg-[#53535331]">
                    <tbody>
                        {fields.map((item, index) => (
                            <tr key={index}>
                                <th className="text-white bg-[#97979736] rounded px-3">
                                    <label htmlFor={item}>{item}</label>
                                </th>
                                <td className="py-2 bg-[#9e9e9e21] rounded">
                                    <input id={item} type='text' placeholder={item} onChange = {handleChange} name={item} required className="bg-transparent text-white"/>
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