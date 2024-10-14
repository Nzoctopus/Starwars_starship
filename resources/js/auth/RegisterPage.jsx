import useRegisterPage from "./useRegisterPage";

export default function RegisterPage() {
    const { handleChange, handleClick, handleSubmit, data} = useRegisterPage();

    return (
        <div>
            <h1 className="text-white sm:text-5xl font-bold py-5">Register</h1>
            <div>
                <form onSubmit={(e) => handleSubmit(e, data)}>
                    <table className="table-auto border-separate border-spacing-2 bg-[#53535331]">
                        <tbody>
                            <tr>
                                <th className="text-white bg-[#97979736] rounded">
                                    <label htmlFor="name">Name</label>
                                </th>
                                <td className="py-2 bg-[#9e9e9e21] rounded">
                                    <input
                                        id="name"
                                        type="name"
                                        placeholder="Your Name here"
                                        onChange={handleChange}
                                        name="name"
                                        value={data.name}
                                        required
                                        className="bg-transparent text-white"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th className="text-white bg-[#97979736] rounded">
                                    <label htmlFor="email">Email</label>
                                </th>
                                <td className="py-2 bg-[#9e9e9e21] rounded">
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="...@exemple.com"
                                        pattern="+@example\.com"
                                        onChange={handleChange}
                                        name="email"
                                        value={data.email}
                                        required
                                        className="bg-transparent text-white"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th className="text-white bg-[#97979736] rounded">
                                    <label htmlFor="password">Password</label>
                                </th>
                                <td className="py-2 bg-[#9e9e9e21] rounded">
                                    <input
                                        id="password"
                                        type="password"
                                        placeholder="Your password here"
                                        onChange={handleChange}
                                        name="password"
                                        value={data.password}
                                        required
                                        className="bg-transparent text-white"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="py-5 flex flex-wrap gap-5">
                        <div>
                            <p className="opacity-0" disabled>
                                a
                            </p>
                            <button
                                type="submit"
                                className="text-white bg-gradient-to-bl from-black to-gray-800 hover:bg-gradient-to-b focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            >
                                Submit
                            </button>
                        </div>
                        <div>
                            <p className="text-white">
                                Already have an account ?
                            </p>
                            <button
                                type="button"
                                onClick={(e) =>
                                    handleClick(e, "/starships/login")
                                }
                                className="text-white bg-gradient-to-bl from-black to-gray-800 hover:bg-gradient-to-b focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
