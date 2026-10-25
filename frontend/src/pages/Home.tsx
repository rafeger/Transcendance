import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="flex flex-col items-center px-6 py-24 text-center md:py-32">
        <span className="rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm font-semibold text-blue-300">
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
        <article className="rounded-2xl border border-white/10 bg-white/5 p-7 transition hover:border-blue-400/50">
          <span className="text-3xl">🧠</span>
          <h2 className="mt-4 text-xl font-bold">
            Knowledges
          </h2>
          <p className="mt-2 leading-7 text-slate-400">
            Discover some new subjects.
          </p>
        </article>

        <article className="rounded-2xl border border-white/10 bg-white/5 p-7 transition hover:border-blue-400/50">
          <span className="text-3xl">🏆</span>
          <h2 className="mt-4 text-xl font-bold">Scores</h2>
          <p className="mt-2 leading-7 text-slate-400">
            Get some results and watch your progress!
          </p>
        </article>

        <article className="rounded-2xl border border-white/10 bg-white/5 p-7 transition hover:border-blue-400/50">
          <span className="text-3xl">⚡</span>
          <h2 className="mt-4 text-xl font-bold">Challenges</h2>
          <p className="mt-2 leading-7 text-slate-400">
            Put your knowledge to the test.
          </p>
        </article>
      </section>
    </main>
  );
}

export default Home;