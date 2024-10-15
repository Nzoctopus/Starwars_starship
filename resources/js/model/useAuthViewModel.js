import useAuthModel from "./useAuthModel.js";

export default function useAuthViewModel() {
    const { getUser, Login, Register, Logout, isLoggedIn } = useAuthModel();
    return { getUser, Login, Register, Logout, isLoggedIn };
}
