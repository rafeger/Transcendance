import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

function Auth() {
    const [isRegister, setRegister] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        if (isRegister && username.trim() === "") {
            alert("You must enter a username.");
            return ;
        }
        if (email.trim() === "" || password === "") {
            alert("You must fill in all the fields.")
        }
        if (password.length < 8) {
            alert("Your password must contain at least 8 characters.");
            return ;
        }
    }

    return (
        <main className="min-h-screen bg-slate-950 text-white px-4 py-16">
            <div className="mx-auto max-w-md text-center">
                <h1 className="mb-6 text-3xl font-bold">{isRegister ? "Create an account" : "Welcome!"}</h1>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2 rounded-lg bg-indigo-950 p-1 w-150 mx-auto">
                <button type="button" onClick={() => setRegister(false)} className={`rounded-md px-4 py-2 font-medium transition ${
                    !isRegister ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
                }`}>Sign in</button>

                <button type="button" onClick={() => setRegister(true)} className={`rounded-md px-4 py-2 font-medium transition ${
                    isRegister ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
                }`}>Register</button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5 text-center">
                {isRegister && (
                    <div>
                        <label htmlFor="username" className="mb-2 block text-sm font-medium">Username</label>
                        <input id="username" type="text" value={username} onChange={(event) => setUsername(event.target.value)}
                            placeholder="Your username" className="rounded-lg border border-white/20 bg-indigo-950 py-1 outline-none"></input>
                    </div>
                )}

                <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">Email</label>
                    <input id="email" type="text" value={email} onChange={(event) => setEmail(event.target.value)}
                        placeholder="Your email" className="rounded-lg border border-white/20 bg-indigo-950 py-1 outline-none"></input>
                </div>

                <div>
                    <label htmlFor="password" className="mb-2 block text-sm font-medium">Password</label>
                    <input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)}
                        placeholder="Your password" className="rounded-lg border border-white/20 bg-indigo-950 py-1 outline-none"></input>
                    <button type="button" onClick={() => setShowPassword((visible) => !visible)}
                        className="">{showPassword ? <FaRegEyeSlash /> : <FaRegEye />}</button>
                </div>

                <button type="submit" className="mt-10 inline-flex items-center gap-3 rounded-xl bg-blue-500 px-7 py-4 
                font-bold text-white transition hover:-translate-y-1 hover:bg-blue-400">{isRegister ? "Create an account" : "Login"}</button>
            </form>
        </main>
    );
}

export default Auth;