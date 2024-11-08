export default function useAuthModel() {
    const Login = async (data) => {
        return await axios.post("/login", data);
    };

    const Register = async (data) => {
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
        return await axios.post("/logout", {}, { withCredentials: true });
    };

    const updateUser = async (data) => {
        return await axios.post('/modify/user', data, {
            headers: {
                'Content-Type': 'multipart/form-data', // Important for file uploads
            },
        });
    };
    return { Login, Register, getUser, Logout, isLoggedIn, updateUser};
}
