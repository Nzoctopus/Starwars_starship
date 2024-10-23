import "../../css/app.css"; // Import Tailwind CSS
import React from "react";
import useSatelliteList from "./useSatelliteList";
import useNavigationButtons from "../useNavigationButtons";
import useTimeViewModel from "../model/useTimeViewModel";
import useAuthViewModel from "../model/useAuthViewModel";

const SatelliteList = () => {
    const { FetchedData, isLogged } = useSatelliteList();
    const { handleClick } = useNavigationButtons();
    const { getDate, getTime } = useTimeViewModel();

    return (
        <div>
            <p className="mt-6 text-[2.5rem] leading-none sm:text-4xl tracking-tight font-bold text-yellow-500 py-5">
                Satellites
            </p>
            {FetchedData.map((item, index) => (
                <details key={index}>
                    <summary className="hover:text-yellow-300 hover:text-xl cursor-pointer font-bold text-lg text-yellow-400 p-3">
                        {item.name}
                    </summary>
                    <div className="flex flex-wrap gap-5 px-5">
                        <div className="text-white px-5">
                            <p>model : {item.model}</p>
                            <p>cost : {item.cost}</p>
                            <p>capacity : {item.capacity}</p>
                            <p>class : {item.class}</p>
                            <p>Created at: {getDate(item.created_at)} at {getTime(item.created_at)} (UTC)</p>
                            <p>Updated at: {getDate(item.updated_at)} at {getTime(item.updated_at)} (UTC)</p>
                            {item.user ? (
                                <h1 className="text-white font-bold">
                                    Created by {item.user.name}
                                </h1>
                            ) : (
                                <h2 className="text-white font-bold">
                                    User Deleted
                                </h2>
                            )}
                        </div>
                        {isLogged ? (
                            <button
                                onClick={(e) =>
                                    handleClick(
                                        e,
                                        `/starships/detail_satellite/${item.id}`
                                    )
                                }
                                className="text-white bg-gradient-to-bl from-black to-gray-800 hover:bg-gradient-to-b focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 self-center"
                            >
                                Modify Satellite
                            </button>
                        ) : (
                            <div />
                        )}
                    </div>
                </details>
            ))}
        </div>
    );
};

export default SatelliteList;
