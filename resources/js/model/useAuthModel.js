export default function useAuthModel() {
    const Login = async (data) => {
        console.log("final data for login ", data);
        return await axios.post("/login", data);
    };

    const Register = async (data) => {
        console.log("final data for registration ", data);
        return await axios.post("/register", data);
    };

    const getUser = async () => {
        const result = await fetch(`/user`);
        return await result.json();
    };

    const isLoggedIn = async () => {
        const result = await fetch("/isLoggedIn");
        return await result.json();
    };

    const Logout = async () => {
        console.log("link = ", "/logout");
        return await axios.post("/logout", {}, { withCredentials: true });
    };
    return { Login, Register, getUser, Logout, isLoggedIn };
}
