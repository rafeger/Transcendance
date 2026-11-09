import { Link } from "react-router-dom";

function Error404() {
    return (
        <main className="flex flex-col min-h-screen bg-slate-950 text-white px-4 py-16 justify-center text-center">
            <span className="text-8xl font-extrabold tracking-tight">404</span>
            <h1 className="text-8xl font-extrabold tracking-tight">Page not found!</h1>
            <p className="mt-4 max-w-md leading-7 text-slate-400 mx-auto mt-8">
                Oops! The page you're looking for doesn't exist or has been moved.</p>
            
            <div className="mt-8 flex flex-col gap-4 sm:flex-row rounded-lg 
            border px-1 py-1 w-34">
                <Link to="/" className="">Return to Home</Link>
            </div>
        </main>
    );
}

export default Error404;