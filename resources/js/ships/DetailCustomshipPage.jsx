import useDetailCustomship from "./useDetailCustomship";

export default function DetailCustomshipPage() {
    const {
        ship,
        handleChange,
        Title,
        fields,
        handleSubmit,
        FetchError,
        handleDelete,
        isCreating,
        satellites,
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
            <form onSubmit={(e) => handleSubmit(e, ship)}>
                <table className="table-auto border-separate border-spacing-2 bg-[#53535331]">
                    <tbody>
                        {fields.map((item, index) => (
                            <tr key={index}>
                                <th className="text-white bg-[#97979736] rounded">
                                    <label htmlFor={item[0]}>{item[0]}</label>
                                </th>
                                <td className="py-2 bg-[#9e9e9e21] rounded">
                                    <input
                                        id={item[0]}
                                        type={item[1]}
                                        placeholder={item[0]}
                                        onChange={handleChange}
                                        name={item[0]}
                                        value={ship[item[0]]}
                                        required
                                        className="bg-transparent text-white"
                                    />
                                </td>
                            </tr>
                        ))}
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
                                    className="bg-transparent text-yellow-500 font-bold"
                                >
                                    <option value="" disabled selected>
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
