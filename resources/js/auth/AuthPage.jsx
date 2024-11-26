import { useEffect, useState } from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

export default function AuthPage() {
    const [LoginState, setLoginState] = useState(true);
    const [ButtonDescText, setButtonDescText] = useState("Doesn't");
    const [ButtonText, setButtonText] = useState("Register");

    const ToggleLogin = () => {
        setLoginState(LoginState ? false : true);
    };

    useEffect(() => {
        setButtonDescText(LoginState ? "Doesn't" : "Already");
        setButtonText(LoginState ? "Register" : "Login");
    }, [LoginState])


    return (
        <div>
            {LoginState ? <LoginPage /> : <RegisterPage />}
            <p className="text-white">{`${ButtonDescText} have an account ?`}</p>
            <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                type="button"
                onClick={ToggleLogin}
            >
                {ButtonText}
            </button>
        </div>
    );
}
