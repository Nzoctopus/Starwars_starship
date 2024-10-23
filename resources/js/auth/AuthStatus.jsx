import useAuthStatus from "./useAuthStatus";

export default function AuthStatus() {
    const { handleClick, User, isLogged, handleLogout } = useAuthStatus();
    return (
        <div>
            {isLogged ? (
                <div className="fixed flex flex-wrap gap-3 top-3 right-0 px-3">
                    <div className="w-16 h-16 rounded-full overflow-hidden UserPfp">
                        <img className=" object-cover object-center w-full h-full hover:cursor-pointer" src="/images/user_placeholder.jpg" alt="userimage" onClick={(e)=>handleClick(e, '/starships/user')}/>
                    </div>
                    <div>
                        <h1 className="text-white">Connected as {User.name}</h1>
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="text-white bg-gradient-to-bl from-black to-gray-800 hover:bg-gradient-to-b focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            ) : (
                <div className="fixed top-3 right-0 px-3">
                    <div className="flex flex-wrap justify-center">
                        <button
                            onClick={(e) =>
                                handleClick(e, `/starships/register`)
                            }
                            className="text-white bg-gradient-to-bl from-black to-gray-800 hover:bg-gradient-to-b focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 self-center"
                        >
                            Register
                        </button>
                        <button
                            onClick={(e) => handleClick(e, `/starships/login`)}
                            className="text-white bg-gradient-to-bl from-black to-gray-800 hover:bg-gradient-to-b focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 self-center"
                        >
                            Login
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
