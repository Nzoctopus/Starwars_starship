import useUserPage from "./useUserPage";

export default function UserPage() {
    const { User, CreatedSatellites, CreatedStarships, BannerLink, PfpLink } =
        useUserPage();
    return (
        <div>
            <div
                className="w-screen h-[300px] bg-cover bg-center bg-no-repeat flex items-center p-20"
                style={{ backgroundImage: `url(${BannerLink})` }}
            >
                <div className="flex items-center bg-[#0000007c] px-10 py-3 rounded-3xl ">
                    <img
                        src={PfpLink}
                        alt="Profile Picture"
                        className="w-[10vw] h-[10vw] rounded-full mr-20"
                    />
                    <div>
                        <h1 className="sm:text-[5vw] font-bold text-white">
                            {User.name}
                        </h1>
                        <h1 className="sm:text-[1vw] font-bold text-white">
                            {User.email}
                        </h1>
                    </div>
                </div>
            </div>
            <center className="py-10">
                <div className="py-5">
                    <table className="table-auto border-separate border-spacing-2 bg-[#53535331]">
                        <thead>
                            <tr>
                                <th className="py-2 px-5 bg-[#9e9e9e21] rounded text-yellow-500">
                                    Created Starships
                                </th>
                                <th className="py-2 px-5 bg-[#9e9e9e21] rounded text-yellow-500">
                                    Created Satellites
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-white bg-[#9e9e9e21] rounded font-bold">
                                    {CreatedStarships.length !== 0 ? (
                                        CreatedStarships.map((item, index) => (
                                            <div key={index} className="p-2">
                                                {item.name}
                                            </div>
                                        ))
                                    ) : (
                                        <h1 className="p-2 text-gray-500">No Starships</h1>
                                    )}
                                </td>
                                <td className="text-white bg-[#9e9e9e21] rounded font-bold">
                                    {CreatedSatellites.length !== 0 ? (
                                        CreatedSatellites.map((item, index) => (
                                            <div key={index} className="p-2">
                                                {item.name}
                                            </div>
                                        ))
                                    ) : (
                                        <h1 className="p-2">No Satellites</h1>
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </center>
        </div>
    );
}
