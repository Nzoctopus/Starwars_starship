import useDetailSatellite from "./useDetailSatellite";

export default function DetailSatellitePage() {
    const {
        satellite,
        handleChange,
        Title,
        handleSubmit,
        FetchError,
        handleDelete,
        handleFileChange,
        isCreating,
        resetImage,
        model,
        cost,
        classes,
    } = useDetailSatellite();

    if (FetchError)
        return (
            <h1 className="sm:text-5xl text-slate-400 font-bold">
                An error has occured
            </h1>
        );
    return (
        <div className="inline-block">
            <h1 className="mt-6 text-[2.5rem] leading-none sm:text-4xl tracking-tight font-bold text-yellow-500 py-5 text-center">
                {Title}
            </h1>
            <form
                onSubmit={(e) => handleSubmit(e, satellite)}
                encType="multipart/form-data"
            >
                <table className="table-auto border-separate border-spacing-2 bg-[#53535331]">
                    <tbody>
                        <tr>
                            <th className="text-white bg-[#97979736] rounded">
                                <label htmlFor="name">NAME</label>
                            </th>
                            <td className="py-2 bg-[#9e9e9e21] rounded">
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="name"
                                    onChange={handleChange}
                                    name="name"
                                    defaultValue={satellite["name"]}
                                    required
                                    className="bg-transparent text-white"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th className="text-white bg-[#97979736] rounded">
                                <label htmlFor="capacity">CAPACITY</label>
                            </th>
                            <td className="py-2 bg-[#9e9e9e21] rounded">
                                <input
                                    id="capacity"
                                    type="number"
                                    placeholder="capacity"
                                    onChange={handleChange}
                                    name="capacity"
                                    defaultValue={satellite["capacity"]}
                                    required
                                    className="bg-transparent text-white"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th className="text-white bg-[#97979736] rounded">
                                <label htmlFor="model">MODEL</label>
                            </th>
                            <td className="py-2 bg-[#9e9e9e21] rounded">
                                <select
                                    id="model"
                                    name="model"
                                    onChange={handleChange}
                                    required
                                    defaultValue=""
                                    className="bg-transparent text-yellow-500 font-bold"
                                >
                                    <option disabled value="">
                                        Select an option
                                    </option>
                                    {model.map((item) => (
                                        <option
                                            key={item}
                                            value={item}
                                            className="text-black font-bold"
                                        >
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th className="text-white bg-[#97979736] rounded">
                                <label htmlFor="cost">COST</label>
                            </th>
                            <td className="py-2 bg-[#9e9e9e21] rounded">
                                <select
                                    id="cost"
                                    name="cost"
                                    onChange={handleChange}
                                    required
                                    defaultValue=""
                                    className="bg-transparent text-yellow-500 font-bold"
                                >
                                    <option disabled value="">
                                        Select an option
                                    </option>
                                    {cost.map((item) => (
                                        <option
                                            key={item}
                                            value={item}
                                            className="text-black font-bold"
                                        >
                                            {`${item} credits`}
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th className="text-white bg-[#97979736] rounded">
                                <label htmlFor="class">CLASS</label>
                            </th>
                            <td className="py-2 bg-[#9e9e9e21] rounded">
                                <select
                                    id="class"
                                    name="class"
                                    onChange={handleChange}
                                    required
                                    defaultValue=""
                                    className="bg-transparent text-yellow-500 font-bold"
                                >
                                    <option disabled value="">
                                        Select an option
                                    </option>
                                    {classes.map((item) => (
                                        <option
                                            key={item}
                                            value={item}
                                            className="text-black font-bold"
                                        >
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="pt-10 pb-5">
                    <label
                        htmlFor="FileUpload"
                        className="bg-gradient-to-bl from-gray-500 to-gray-10 hover:cursor-pointer hover:bg-gradient-to-br py-5 px-10 rounded-xl text-white"
                    >
                        Upload File
                    </label>
                    <input
                        id="FileUpload"
                        type="file"
                        onChange={handleFileChange}
                        accept=".png, .jpeg, .jpg"
                        hidden
                        name="file"
                    />
                    <button
                        type="button"
                        onClick={resetImage}
                        className="px-5 pb-10 text-white font-bold sm:text-xl"
                    >
                        Remove Image
                    </button>
                    {satellite.file ? (
                        <div className="bg-[#97979736] p-5 text-white font-bold w-[400px]">
                            <center>
                                <img
                                    src={URL.createObjectURL(satellite.file)}
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
                <div className="py-5">
                    {isCreating ? (
                        <button
                            disabled
                            type="button"
                            className=" opacity-40 text-white bg-gradient-to-bl from-black to-gray-800 focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        >
                            Delete
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={(e) => handleDelete(e, satellite.id)}
                            className="text-white bg-gradient-to-bl from-black to-gray-800 hover:bg-gradient-to-b focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        >
                            Delete
                        </button>
                    )}
                    <button
                        type="submit"
                        className="text-white bg-gradient-to-bl from-black to-gray-800 hover:bg-gradient-to-b focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
