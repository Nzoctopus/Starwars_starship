import useDetailCustomship from "./useDetailCustomship";

export default function DetailCustomshipPage() {
    const {
        ship,
        handleChange,
        Title,
        handleSubmit,
        FetchError,
        handleDelete,
        isCreating,
        satellites,
        resetImage,
        handleFileChange,
        models,
        manufacturers,
        mglt,
        starship_classes,
    } = useDetailCustomship();

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
                onSubmit={(e) => handleSubmit(e, ship)}
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
                                    value={ship["name"]}
                                    required
                                    className="bg-transparent text-white"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th className="text-white bg-[#97979736] rounded">
                                <label htmlFor="cost">COST</label>
                            </th>
                            <td className="py-2 bg-[#9e9e9e21] rounded">
                                <input
                                    id="cost"
                                    type="number"
                                    placeholder="cost"
                                    onChange={handleChange}
                                    name="cost"
                                    value={ship["cost"]}
                                    required
                                    className="bg-transparent text-white"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th className="text-white bg-[#97979736] rounded">
                                <label htmlFor="length">LENGTH</label>
                            </th>
                            <td className="py-2 bg-[#9e9e9e21] rounded">
                                <input
                                    id="length"
                                    type="number"
                                    placeholder="length"
                                    onChange={handleChange}
                                    name="length"
                                    value={ship["length"]}
                                    required
                                    className="bg-transparent text-white"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th className="text-white bg-[#97979736] rounded">
                                <label htmlFor="max_atmo_speed">
                                    MAX ATMO SPEED
                                </label>
                            </th>
                            <td className="py-2 bg-[#9e9e9e21] rounded">
                                <input
                                    id="max_atmo_speed"
                                    type="number"
                                    placeholder="max_atmo_speed"
                                    onChange={handleChange}
                                    name="max_atmo_speed"
                                    value={ship["max_atmo_speed"]}
                                    required
                                    className="bg-transparent text-white"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th className="text-white bg-[#97979736] rounded">
                                <label htmlFor="crew">CREW</label>
                            </th>
                            <td className="py-2 bg-[#9e9e9e21] rounded">
                                <input
                                    id="crew"
                                    type="number"
                                    placeholder="crew"
                                    onChange={handleChange}
                                    name="crew"
                                    value={ship["crew"]}
                                    required
                                    className="bg-transparent text-white"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th className="text-white bg-[#97979736] rounded">
                                <label htmlFor="passengers">PASSENGERS</label>
                            </th>
                            <td className="py-2 bg-[#9e9e9e21] rounded">
                                <input
                                    id="passengers"
                                    type="number"
                                    placeholder="passengers"
                                    onChange={handleChange}
                                    name="passengers"
                                    value={ship["passengers"]}
                                    required
                                    className="bg-transparent text-white"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th className="text-white bg-[#97979736] rounded">
                                <label htmlFor="cargo_capacity">
                                    CARGO CAPACITY
                                </label>
                            </th>
                            <td className="py-2 bg-[#9e9e9e21] rounded">
                                <input
                                    id="cargo_capacity"
                                    type="number"
                                    placeholder="cargo_capacity"
                                    onChange={handleChange}
                                    name="cargo_capacity"
                                    value={ship["cargo_capacity"]}
                                    required
                                    className="bg-transparent text-white"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th className="text-white bg-[#97979736] rounded">
                                <label htmlFor="consumables">CONSUMABLES</label>
                            </th>
                            <td className="py-2 bg-[#9e9e9e21] rounded">
                                <input
                                    id="consumables"
                                    type="text"
                                    placeholder="consumables"
                                    onChange={handleChange}
                                    name="consumables"
                                    value={ship["consumables"]}
                                    required
                                    className="bg-transparent text-white"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th className="text-white bg-[#97979736] rounded">
                                <label htmlFor="hyperdrive_rating">
                                    HYPERDRIVE RATING
                                </label>
                            </th>
                            <td className="py-2 bg-[#9e9e9e21] rounded">
                                <input
                                    id="hyperdrive_rating"
                                    type="text"
                                    placeholder="hyperdrive_rating"
                                    onChange={handleChange}
                                    name="hyperdrive_rating"
                                    value={ship["hyperdrive_rating"]}
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
                                    {models.map((item) => (
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
                                <label htmlFor="manufacturer">
                                    MANUFACTURER
                                </label>
                            </th>
                            <td className="py-2 bg-[#9e9e9e21] rounded">
                                <select
                                    id="manufacturer"
                                    name="manufacturer"
                                    onChange={handleChange}
                                    required
                                    defaultValue=""
                                    className="bg-transparent text-yellow-500 font-bold"
                                >
                                    <option disabled value="">
                                        Select an option
                                    </option>
                                    {manufacturers.map((item) => (
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
                                <label htmlFor="mglt">MGLT</label>
                            </th>
                            <td className="py-2 bg-[#9e9e9e21] rounded">
                                <select
                                    id="mglt"
                                    name="mglt"
                                    onChange={handleChange}
                                    required
                                    defaultValue=""
                                    className="bg-transparent text-yellow-500 font-bold"
                                >
                                    <option disabled value="">
                                        Select an option
                                    </option>
                                    {mglt.map((item) => (
                                        <option
                                            key={Number(item)}
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
                                <label htmlFor="starship_class">Starship Class</label>
                            </th>
                            <td className="py-2 bg-[#9e9e9e21] rounded">
                                <select
                                    id="starship_class"
                                    name="starship_class"
                                    onChange={handleChange}
                                    required
                                    defaultValue=""
                                    className="bg-transparent text-yellow-500 font-bold"
                                >
                                    <option disabled value="">
                                        Select an option
                                    </option>
                                    {starship_classes.map((item) => (
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
                        <tr key="satellites">
                            <th className="text-white bg-[#97979736] rounded py-3">
                                <label htmlFor="select_satellite">
                                    Linked Satellite
                                </label>
                            </th>
                            <td className="py-2 bg-[#9e9e9e21] rounded ">
                                <select
                                    id="linked_satellite_id"
                                    name="linked_satellite_id"
                                    onChange={handleChange}
                                    required
                                    defaultValue=""
                                    className="bg-transparent text-yellow-500 font-bold"
                                >
                                    <option disabled value="">
                                        Select an option
                                    </option>
                                    {satellites.map((item) => (
                                        <option key={item.name} value={item.id}>
                                            {item.name}
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
                    {ship.file ? (
                        <div className="bg-[#97979736] p-5 text-white font-bold w-[400px]">
                            <center>
                                <img src={URL.createObjectURL(ship.file)} />
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
                            onClick={(e) => handleDelete(e, ship.id)}
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
