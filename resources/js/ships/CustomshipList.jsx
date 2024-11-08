import "../../css/app.css"; // Import Tailwind CSS
import React from "react";
import useCustomshipList from "./useCustomshipList";
import useTimeViewModel from "../model/useTimeViewModel";
import ModifyButton from "../buttons/ModifyButton";

const Customship_list = () => {
    const { FetchedData } = useCustomshipList();
    const { getDate, getTime } = useTimeViewModel();

    return (
        <div>
            <p className="mt-6 text-[2.5rem] leading-none sm:text-4xl tracking-tight font-bold text-yellow-500 py-5">
                Customship
            </p>
            {FetchedData.map((item, index) => (
                <details key={index}>
                    <summary className="hover:text-yellow-300 hover:text-xl cursor-pointer font-bold text-lg text-yellow-400 p-3">
                        {item.name}
                    </summary>
                    <div className="flex flex-wrap gap-5 px-5">
                        <div className="text-white px-5">
                            <p>model : {item.model}</p>
                            <p>manufacturer : {item.manufacturer}</p>
                            <p>cost : {item.cost}</p>
                            <p>length : {item.lenght}</p>
                            <p>max_atmo_speed : {item.max_atmo_speed}</p>
                            <p>crew : {item.crew}</p>
                            <p>passengers : {item.passengers}</p>
                            <p>cargo_capacity : {item.cargo_capacity}</p>
                            <p>consumables : {item.consumables}</p>
                            <p>hyperdrive_rating : {item.hyperdrive_rating}</p>
                            <p>mglt : {item.mglt}</p>
                            <p>starship_class : {item.starship_class}</p>
                            <p>
                                Created at: {getDate(item.created_at)} at{" "}
                                {getTime(item.created_at)} (UTC)
                            </p>
                            <p>
                                Updated at: {getDate(item.updated_at)} at{" "}
                                {getTime(item.updated_at)} (UTC)
                            </p>
                            {item.user ? (
                                <h1 className="text-white font-bold">
                                    Created by {item.user.name}
                                </h1>
                            ) : (
                                <h2 className="text-white font-bold">
                                    User Deleted
                                </h2>
                            )}
                            {item.satellite ? (
                                <details>
                                    <summary className="hover:text-yellow-300 hover:text-xl cursor-pointer font-bold text-lg text-yellow-400 p-3">
                                        Linked Satellite
                                    </summary>
                                    <div className="flex flex-wrap gap-5 px-5">
                                        <div className="text-white px-5">
                                            <p>name : {item.satellite.name}</p>
                                            <p>
                                                model : {item.satellite.model}
                                            </p>
                                            <p>cost : {item.satellite.cost}</p>
                                            <p>
                                                capacity :
                                                {item.satellite.capacity}
                                            </p>
                                            <p>
                                                class : {item.satellite.class}
                                            </p>
                                            <p>
                                                Created at:{" "}
                                                {getDate(
                                                    item.satellite.created_at
                                                )}{" "}
                                                at{" "}
                                                {getTime(
                                                    item.satellite.created_at
                                                )}{" "}
                                                (UTC)
                                            </p>
                                            <p>
                                                Updated at:{" "}
                                                {getDate(
                                                    item.satellite.updated_at
                                                )}{" "}
                                                at{" "}
                                                {getTime(
                                                    item.satellite.updated_at
                                                )}{" "}
                                                (UTC)
                                            </p>
                                        </div>
                                    </div>
                                </details>
                            ) : (
                                <h2 className="text-white font-bold">
                                    Satellite Deleted
                                </h2>
                            )}
                            {item.file ? (
                                <div className="bg-[#97979736] p-5 text-white font-bold w-[400px]">
                                    <center>
                                        <img
                                            src={`/storage/${item.file.path}`}
                                        />
                                    </center>
                                </div>
                            ) : (
                                <div className="bg-[#97979736] p-5 text-white font-bold w-[400px]">
                                    <center>
                                        <h1>No Images provided</h1>
                                    </center>
                                </div>
                            )}
                        </div>
                        <ModifyButton
                            link={`/starships/detail/ship/${item.id}`}
                        />
                    </div>
                </details>
            ))}
        </div>
    );
};

export default Customship_list;
