import useNavigationButtons from "./useNavigationButtons";

export default function NavigationButtons() {
    const { handleClick } = useNavigationButtons();

    return (
        <div className="left-0 right-0 justify-center flex flex-wrap pb-5 gap-2">
            <button
                type="button"
                onClick={(e) =>
                    handleClick(e, "/starships/detail_custom_ship/create")
                }
                className="text-white bg-gradient-to-bl from-black to-gray-800 hover:bg-gradient-to-b focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
                ADD Custom Starships
            </button>
            <button
                type="button"
                onClick={(e) =>
                    handleClick(e, "/starships/detail_satellite/create")
                }
                className="text-white bg-gradient-to-bl from-black to-gray-800 hover:bg-gradient-to-b focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
                ADD Satellite
            </button>
            <button
                type="button"
                onClick={(e) => handleClick(e, "/starships/main_list/1")}
                className="text-white bg-gradient-to-bl from-black to-gray-800 hover:bg-gradient-to-b focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
                Main Page
            </button>
            <button
                type="button"
                onClick={(e) => handleClick(e, "/starships/list_custom_ship")}
                className="text-white bg-gradient-to-bl from-black to-gray-800 hover:bg-gradient-to-b focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
                List all Custom Starships
            </button>
            <button
                type="button"
                onClick={(e) =>
                    handleClick(e, "/starships/list_custom_satellites")
                }
                className="text-white bg-gradient-to-bl from-black to-gray-800 hover:bg-gradient-to-b focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
                List all Satellites
            </button>
        </div>
    );
}
