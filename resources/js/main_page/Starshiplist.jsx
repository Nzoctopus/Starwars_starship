import useStarship from "./useStarship";

export default function Starshiplist() {
    const { data, loading, page, fetchData, error, last_page, handleClick } =
        useStarship();

    if (loading) {
        return <div className="text-white">Loading...</div>;
    }

    if (error) {
        return (
            <div className="sm:text-5xl text-slate-400 font-bold">
                Nothing Found...
            </div>
        );
    }

    return (
        <div>
            <div className="sm:text-center pb-16">
                <p className="mt-6 text-[2.5rem] leading-none sm:text-4xl tracking-tight font-bold text-yellow-500">
                    Starships
                </p>
                {data.results.map((item, index) => (
                    <details key={index}>
                        <summary className="hover:text-yellow-300 hover:text-xl cursor-pointer font-bold text-lg text-yellow-400 p-3">
                            {item.name}
                        </summary>
                        <div className="text-white">
                            <p>model : {item.model}</p>
                            <p>manufacturer : {item.manufacturer}</p>
                            <p>cost : : {item.cost}</p>
                            <p>length : {item.lenght}</p>
                            <p>max_atmo_speed : {item.max_atmo_speed}</p>
                            <p>crew : {item.crew}</p>
                            <p>passengers : {item.passengers}</p>
                            <p>cargo_capacity : {item.cargo_capacity}</p>
                            <p>consumables : {item.consumables}</p>
                            <p>hyperdrive_rating : {item.hyperdrive_rating}</p>
                            <p>mglt : {item.mglt}</p>
                            <p>starship_class : {item.starship_class}</p>
                        </div>
                    </details>
                ))}
            </div>
            <div className="fixed bottom-0 left-0 right-0 justify-center flex flex-wrap bg-gradient-to-br from-black to-gray-800 pt-5 pb-5">
                {data.previous ? (
                    <button
                        onClick={(e) =>
                            handleClick(e, `/starships/main_list/1`)
                        }
                        className="text-white bg-gradient-to-bl from-black to-gray-800 hover:bg-gradient-to-b focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                        First
                    </button>
                ) : (
                    <button
                        disabled
                        className="text-white bg-gradient-to-bl from-black to-gray-800 focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 opacity-45"
                    >
                        First
                    </button>
                )}
                {data.previous ? (
                    <button
                        onClick={(e) =>
                            handleClick(e, `/starships/main_list/${page - 1}`)
                        }
                        className="text-white bg-gradient-to-bl from-black to-gray-800 hover:bg-gradient-to-b focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                        Previous
                    </button>
                ) : (
                    <button
                        disabled
                        className="text-white bg-gradient-to-bl from-black to-gray-800 focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 opacity-45"
                    >
                        Previous
                    </button>
                )}
                <button className="font-bold text-white bg-black focus:ring-4 focus:outline-none focus:ring-yellow-500 rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    {" "}
                    Page {page}
                </button>
                {data.next ? (
                    <button
                        onClick={(e) =>
                            handleClick(e, `/starships/main_list/${page + 1}`)
                        }
                        className="text-white bg-gradient-to-bl from-black to-gray-800 hover:bg-gradient-to-b focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                        Next
                    </button>
                ) : (
                    <button
                        disabled
                        className="text-white bg-gradient-to-bl from-black to-gray-800 focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 opacity-45"
                    >
                        Next
                    </button>
                )}
                {data.next ? (
                    <button
                        onClick={(e) =>
                            handleClick(e, `/starships/main_list/${last_page}`)
                        }
                        className="text-white bg-gradient-to-bl from-black to-gray-800 hover:bg-gradient-to-b focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                        Last
                    </button>
                ) : (
                    <button
                        disabled
                        className="text-white bg-gradient-to-bl from-black to-gray-800 focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 opacity-45"
                    >
                        Last
                    </button>
                )}
            </div>
        </div>
    );
}
