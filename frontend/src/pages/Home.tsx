import { Link } from "react-router-dom";
import { useState } from "react";
import { AiFillThunderbolt } from "react-icons/ai";
import { BiSolidTrophy } from "react-icons/bi";
import { GiBrain } from "react-icons/gi";
import { IoSettingsSharp } from "react-icons/io5";
import { useTheme } from "../contexts/ThemeContext";

function Home() {
  const { isDark, toggleTheme } = useTheme();
  const [isSettingOpen, setSettingOpen] = useState(false);

  return (
    <main className={`min-h-screen transition-colors 
    ${isDark ? "bg-slate-950 text-white" : "bg-slate-200 text-slate-900"}`}>
      <div className="flex justify-start px-6 pt-6">
        <button type="button" onClick={() => setSettingOpen((open) => !open)}
          className={`rounded-lg border px-4 py-2 transition 
          ${isDark ? "border-white/20 bg-slate-800 hover:bg-slate-700" :
            "border-slate-300 bg-white hover:bg-slate-200"
          }`}><IoSettingsSharp size={24}/></button>
      </div>

      {isSettingOpen && (
        <section className={`mx-6 mr-auto max-w-sm rounded-xl border p-5 mt-4
          ${isDark ? "border-white/20 bg-slate-900" : "border-slate-200 bg-white"}`}>
          <h2 className="text-xl font-bold">Settings</h2>
            <div className="mt-4 flex items-center justify-between gap-4">
              <span>Theme</span>
              <button type="button" onClick={toggleTheme}
                className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-500">
                  {isDark ? "Light" : "Dark"}
              </button>
            </div>
        </section>
      )}

      <section className="flex flex-col items-center px-6 py-24 text-center md:py-32">
        <span className="rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm font-semibold">
          The challenge begins here
        </span>

        <h1 className="mt-8 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
          Test your knowledges.
        </h1>

        <Link
          to="/quiz"
          className="mt-10 inline-flex items-center gap-3 rounded-xl bg-blue-500 px-7 py-4 font-bold text-white transition hover:-translate-y-1 hover:bg-blue-400"
        >
          Begin to play
          <span aria-hidden="true">{" ->"}</span>
        </Link>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 pb-24 sm:grid-cols-3">
        <article className={`rounded-2xl border border-white/10 bg-white/5 p-7 transition hover:border-blue-400/50
          ${isDark ? "border-white/10 bg-white/5" :
            "border-slate-300 bg-white shadow-sm"
          }`}>
          <span className="text-3xl"><GiBrain size={40} color="pink"/></span>
          <h2 className="mt-4 text-xl font-bold">
            Knowledges
          </h2>
          <p className={`mt-2 leading-7 
           ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            Discover some new subjects.
          </p>
        </article>

        <article className={`rounded-2xl border border-white/10 bg-white/5 p-7 transition hover:border-blue-400/50
          ${isDark ? "border-white/10 bg-white/5" :
            "border-slate-300 bg-white shadow-sm"
          }`}>
          <span className="text-3xl"><BiSolidTrophy size={40} color="yellow"/></span>
          <h2 className="mt-4 text-xl font-bold">Scores</h2>
          <p className={`mt-2 leading-7 
           ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            Get some results and watch your progress!
          </p>
        </article>

        <article className={`rounded-2xl border border-white/10 bg-white/5 p-7 transition hover:border-blue-400/50
          ${isDark ? "border-white/10 bg-white/5" :
            "border-slate-300 bg-white shadow-sm"
          }`}>
          <span className="text-3xl"><AiFillThunderbolt size={40} color="yellow"/></span>
          <h2 className="mt-4 text-xl font-bold">Challenges</h2>
          <p className={`mt-2 leading-7 
           ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            Put your knowledge to the test.
          </p>
        </article>
      </section>
    </main>
  );
}

export default Home;