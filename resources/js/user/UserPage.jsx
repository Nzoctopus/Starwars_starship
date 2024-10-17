import useTimeViewModel from "../model/useTimeViewModel";
import useUserPage from "./useUserPage";

export default function UserPage() {
    const { User, CreatedSatellites, CreatedStarships } = useUserPage();
    const { getDate, getTime } = useTimeViewModel();
    return (
        <div>
            <h1 className="text-white sm:text-4xl font-bold">Your Page</h1>
            <div className="py-5">
                <h1 className="text-white sm:text-2xl font-bold">Info</h1>
                <div className="py-3">
                    <p className="text-white sm:text-lg font-bold">E-Mail</p>
                    <p className="text-white sm:text-lg">{User.email}</p>
                    <p className="text-white sm:text-lg font-bold">Name</p>
                    <p className="text-white sm:text-lg">{User.name}</p>
                </div>
            </div>
            <div className="py-5">
                <table className="table-auto border-separate border-spacing-2 bg-[#53535331]">
                    <thead>
                        <tr>
                            <th className="py-2 bg-[#9e9e9e21] rounded text-yellow-500">
                                Created Starships
                            </th>
                            <th className="py-2 bg-[#9e9e9e21] rounded text-yellow-500">
                                Created Satellites
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="text-white bg-[#9e9e9e21] rounded font-bold">
                                {CreatedStarships.map((item, index) => (
                                    <div key={index} className="p-2">
                                        {item.name}
                                    </div>
                                ))}
                            </td>
                            <td className="text-white bg-[#9e9e9e21] rounded font-bold">
                                {CreatedSatellites.map((item, index) => (
                                    <div key={index} className="p-2">
                                        {item.name}
                                    </div>
                                ))}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
