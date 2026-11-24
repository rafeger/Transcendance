import { Link, NavLink } from 'react-router-dom';
import { useTheme } from "../contexts/ThemeContext";
import { useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";

function Header() {
  const { isDark, toggleTheme } = useTheme();
  const [isSettingOpen, setSettingOpen] = useState(false);

  return (
    <header className="border-b border-white/50 bg-linear-65 from-purple-500 to-pink-500 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5">
        <div className="relative z-50">
          <button
            type="button"
            onClick={() => setSettingOpen((open) => !open)}
            className={`rounded-lg border px-4 py-2 transition ${
            isDark
              ? "border-white/20 bg-blue-700 hover:bg-blue-600"
              : "border-slate-300 bg-white hover:bg-slate-200"
              }`}
            >
            <IoSettingsSharp size={24} color='black'/>
          </button>
          {isSettingOpen && (
            <section className={`mt-4 max-w-sm rounded-xl border p-5 ${
              isDark ? "bg-slate-900" : "bg-white"
              }`}
            >
            <h2 className="text-xl font-bold text-blue-500">
              Settings
            </h2>
      
            <div className="mt-4 flex items-center justify-between gap-4">
              <span className='text-blue-500'>Theme</span>
      
              <button type="button" onClick={toggleTheme}
              className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-500"
              >
                {isDark ? "Light" : "Dark"}
              </button>
            </div>
          </section>
        )}
      </div>

        <Link to="/" className="text-5xl font-extrabold tracking-wide">
          <span className='text-pink-400'>Quiz</span>
          <span className="text-blue-400">Arena</span>
        </Link>
        <nav
          aria-label="Navigation principale"
          className="flex items-center gap-4 md:gap-8"
        >
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `hidden text-xl font-semibold transition hover:text-white sm:block ${
                isActive ? 'text-white' : 'text-slate-400'
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/quiz"
            className={({ isActive }) =>
              `text-xl font-semibold transition hover:text-white ${
                isActive ? 'text-white' : 'text-slate-400'
              }`
            }
          >
            Quiz
          </NavLink>

          <NavLink
            to="/lobby"
            className={({ isActive }) =>
              `text-xl font-semibold transition hover:text-white ${
                isActive ? 'text-white' : 'text-slate-400'
              }`
            }
          >
            Lobby
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `text-xl font-semibold transition hover:text-white ${
                isActive ? 'text-white' : 'text-slate-400'
              }`
            }
          >
            Profile
          </NavLink>

          <NavLink
            to="/friends"
            className={({ isActive }) =>
              `text-xl font-semibold transition hover:text-white ${
                isActive ? 'text-white' : 'text-slate-400'
              }`
            }
          >
            Friends
          </NavLink>

          <NavLink
            to="/ranking"
            className={({ isActive }) =>
              `text-xl font-semibold transition hover:text-white ${
                isActive ? 'text-white' : 'text-slate-400'
              }`
            }
          >
            Ranking
          </NavLink>

          <Link
            to="/auth"
            className="rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-400"
          >
            Connexion
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
