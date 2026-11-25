import { Link, NavLink } from 'react-router-dom';
import { useTheme } from "../contexts/ThemeContext";
import { useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import { Button } from './ui';

function Header() {
  const { isDark, toggleTheme } = useTheme();
  const [isSettingOpen, setSettingOpen] = useState(false);

  return (
    <header className={`border-b ${isDark ?
    "bg-linear-to-r from-purple-700 to-pink-600" :
    "bg-linear-to-r from-teal-300 to-sky-300"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5">
        <div className="relative z-50">
          <Button
            type="button"
            onClick={() => setSettingOpen((open) => !open)}
            className={`rounded-lg border px-4 py-2 transition ${
            isDark
              ? "border-white/20 bg-blue-700"
              : "border-slate-300 bg-rose-200 hover:bg-rose-300"
              }`}
            >
            <IoSettingsSharp size={24} color='black'/>
          </Button>
          {isSettingOpen && (
            <section className={`mt-4 max-w-sm rounded-xl border p-5 ${
              isDark ? "bg-blue-700" : "bg-rose-200"
              }`}
            >
            <h2 className="text-xl font-bold">
              Settings
            </h2>
      
            <div className="mt-4 flex items-center justify-between gap-4">
              <span>Theme</span>
      
              <Button type="button" onClick={toggleTheme}
              className="text-white transition hover:bg-blue-500"
              >
                {isDark ? "Light" : "Dark"}
              </Button>
            </div>
          </section>
        )}
      </div>

        <Link to="/" className="text-5xl font-extrabold tracking-wide">
          <span className='text-pink-400'>Quiz</span>
          <span className="text-blue-500">Arena</span>
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
