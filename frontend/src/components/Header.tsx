import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { IoSettingsSharp } from 'react-icons/io5';
import { useTheme } from '../contexts/ThemeContext';
import { buttonStyles } from './ui';

function navLinkClass({ isActive }: { isActive: boolean }) {
  return `text-xl font-semibold transition hover:text-white ${
    isActive ? 'text-white' : 'text-white/70'
  }`;
}

function Header() {
  const { isDark, toggleTheme } = useTheme();
  const [isSettingOpen, setSettingOpen] = useState(false);

  return (
    <header className="border-b border-white/50 bg-linear-65 from-purple-500 to-pink-500 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5">
        {/* Réglages (thème) */}
        <div className="relative z-50">
          <button
            type="button"
            aria-label="Settings"
            aria-expanded={isSettingOpen}
            onClick={() => setSettingOpen((open) => !open)}
            className="rounded-lg border border-white/30 bg-white/20 p-2 transition hover:bg-white/30"
          >
            <IoSettingsSharp size={24} aria-hidden="true" />
          </button>

          {isSettingOpen && (
            <section className="absolute left-0 top-full mt-2 w-64 rounded-xl border border-border bg-surface p-5 text-fg shadow-lg">
              <h2 className="text-xl font-bold text-primary">Settings</h2>

              <div className="mt-4 flex items-center justify-between gap-4">
                <span>Theme</span>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className={buttonStyles({ size: 'sm' })}
                >
                  {isDark ? 'Light' : 'Dark'}
                </button>
              </div>
            </section>
          )}
        </div>

        {/* Logo */}
        <Link to="/" className="text-5xl font-extrabold tracking-wide">
          <span className="text-pink-400">Quiz</span>
          <span className="text-blue-400">Arena</span>
        </Link>

        {/* Navigation */}
        <nav
          aria-label="Navigation principale"
          className="flex items-center gap-4 md:gap-8"
        >
          <NavLink
            to="/"
            end
            className={(state) => `hidden sm:block ${navLinkClass(state)}`}
          >
            Home
          </NavLink>

          <NavLink to="/quiz" className={navLinkClass}>
            Quiz
          </NavLink>

          <NavLink to="/lobby" className={navLinkClass}>
            Lobby
          </NavLink>

          <NavLink to="/profile" className={navLinkClass}>
            Profile
          </NavLink>

          <NavLink to="/friends" className={navLinkClass}>
            Friends
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
