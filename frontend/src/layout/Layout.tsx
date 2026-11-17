import { useState } from "react";
import { Outlet } from "react-router-dom";
import { IoSettingsSharp } from "react-icons/io5";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTheme } from "../contexts/ThemeContext";

function Layout() {
    const { isDark, toggleTheme } = useTheme();
    const [isSettingOpen, setSettingOpen] = useState(false);

    return (
        <div
            className={`flex min-h-screen flex-col transition-colors ${
                isDark
                    ? "bg-slate-700 text-white"
                    : "bg-slate-100 text-slate-900"
            }`}
        >
            <Header />

            {/* Settings */}
            <div className="relative z-50 px-6 pt-6">
                <div className="flex justify-start">
                    <button
                        type="button"
                        onClick={() => setSettingOpen((open) => !open)}
                        className={`rounded-lg border px-4 py-2 transition ${
                            isDark
                                ? "border-white/20 bg-slate-800 hover:bg-slate-700"
                                : "border-slate-300 bg-white hover:bg-slate-200"
                        }`}
                    >
                        <IoSettingsSharp size={24} />
                    </button>
                </div>

                {isSettingOpen && (
                    <section
                        className={`mt-4 max-w-sm rounded-xl border p-5 ${
                            isDark
                                ? "border-white/20 bg-slate-900"
                                : "border-slate-200 bg-white"
                        }`}
                    >
                        <h2 className="text-xl font-bold">
                            Settings
                        </h2>

                        <div className="mt-4 flex items-center justify-between gap-4">
                            <span>Theme</span>

                            <button
                                type="button"
                                onClick={toggleTheme}
                                className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-500"
                            >
                                {isDark ? "Light" : "Dark"}
                            </button>
                        </div>
                    </section>
                )}
            </div>

            {/* Page content */}
            <main className="flex-1">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}

export default Layout;
