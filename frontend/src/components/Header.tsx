import { Link, NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="border-b border-white/50 bg-linear-65 from-purple-500 to-pink-500 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-12">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold tracking-tight">
          Quiz <span className="text-blue-400">Arena</span>
        </Link>

        {/* Navigation */}
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
            Accueil
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
