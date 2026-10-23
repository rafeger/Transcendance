import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 text-slate-400">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row md:px-12">
        {/* Copyright */}
        <Link
          to="/"
          className="text-lg font-bold text-white transition hover:text-blue-400"
        >
          Quiz <span className="text-blue-400">Arena</span>
        </Link>

        <p className="text-center text-sm">
          © {new Date().getFullYear()} Quiz Arena. Tous droits réservés.
        </p>

        {/* Liens légaux */}
        <nav aria-label="Liens légaux" className="flex flex-wrap justify-center gap-5 text-sm">
          <Link
            to="/privacy"
            className="transition hover:text-white"
          >
            Politique de confidentialité
          </Link>

          <Link
            to="/terms"
            className="transition hover:text-white"
          >
            CGU
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;