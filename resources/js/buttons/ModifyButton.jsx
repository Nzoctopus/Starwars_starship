import useNavigationButtons from "./useNavigationButtons";
import { useAtom } from "jotai";
import { isLoggedAtom } from "../atoms";

export default function ModifyButton({ link }) {
    const { handleClick } = useNavigationButtons();
    const [isLogged] = useAtom(isLoggedAtom);

    return isLogged ? (
        <button
            onClick={(e) => handleClick(e, link)}
            className="text-white bg-gradient-to-bl from-black to-gray-800 hover:bg-gradient-to-b focus:ring-4 focus:outline-none focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 self-center"
        >
            Modify Satellite
        </button>
    ) : null;
}
