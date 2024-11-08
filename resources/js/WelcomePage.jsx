import useNavigationButtons from "./buttons/useNavigationButtons";

export default function WelcomePage() {
    const { handleClick } = useNavigationButtons();
    return (
        <div>
            <p className="text-white sm:text-6xl font-bold mt-10">
                WELCOME TO MY STARSHIP APP
            </p>
            <center>
            <button
                onClick={(e) => handleClick(e, "/starships/detail/user")}
                className="mt-10 text-white bg-gradient-to-bl from-black to-gray-800 hover:bg-gradient-to-b focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 self-center"
            >
                Register / Login
            </button>
            </center>
        </div>
    );
}
