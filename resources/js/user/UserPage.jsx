import useUserPage from "./useUserPage";

export default function UserPage() {
    const {
        User,
        CreatedSatellites,
        CreatedStarships,
        BannerLink,
        PfpLink,
        handleChange,
        resetUserForm,
        UserForm,
        handleSubmit,
    } = useUserPage();
    return (
        <div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div
                    className="w-screen h-[300px] bg-cover bg-center bg-no-repeat flex items-center p-20 relative"
                    style={{ backgroundImage: `url(${BannerLink})` }}
                >
                    <div className="flex items-center bg-[#0000007c] px-10 py-3 rounded-3xl ">
                        <img
                            src={PfpLink}
                            alt="Profile Picture"
                            className="object-cover w-[10vw] h-[10vw] rounded-full mr-20"
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

                    {/* Buttons container */}
                    <div className="absolute bottom-5 right-5 flex space-x-4">
                        <label
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mr-4"
                            htmlFor="pfp"
                        >
                            Change Profile Picture
                        </label>
                        <input
                            type="file"
                            hidden
                            id="pfp"
                            name="pfp"
                            onChange={handleChange}
                            accept=".png, .jpeg, .jpg"
                        />
                        <label
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                            htmlFor="banner"
                        >
                            Change Banner
                        </label>
                        <input
                            type="file"
                            hidden
                            id="banner"
                            name="banner"
                            onChange={handleChange}
                            accept=".png, .jpeg, .jpg"
                        />
                    </div>
                </div>
                {UserForm.pfp || UserForm.banner ? (
                    <div className="flex right-3 absolute">
                        <button
                            type="button"
                            onClick={resetUserForm}
                            className="text-white bg-gradient-to-bl from-black to-gray-800 hover:bg-gradient-to-b focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-5"
                        >
                            Cancel Changes
                        </button>
                        <button
                            type="submit"
                            className="text-white bg-gradient-to-bl from-black to-gray-800 hover:bg-gradient-to-b focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 my-5"
                        >
                            Save Changes
                        </button>
                    </div>
                ) : (
                    <div />
                )}
            </form>
            <center className="py-10 mt-20">
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
                                        <h1 className="p-2 text-gray-500">
                                            No Starships
                                        </h1>
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
                                        <h1 className="p-2 text-gray-500">No Satellites</h1>
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
