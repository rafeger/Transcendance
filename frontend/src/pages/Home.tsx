import { Link } from "react-router-dom";
import { AiFillThunderbolt } from "react-icons/ai";
import { BiSolidTrophy } from "react-icons/bi";
import { GiBrain } from "react-icons/gi";
import { useTheme } from "../contexts/ThemeContext";
import { SiQuizlet } from "react-icons/si";


function Home() {
  const { isDark } = useTheme();

  return (
    <main className={`min-h-screen px-4 py-16 ${isDark ? "bg-slate-800" : "bg-slate-50"}`}>
      <section className="flex flex-col items-end px-8">
        <SiQuizlet size={48} />
      </section>

      <section className="flex flex-col items-center px-6 py-24 text-center md:py-32">
        <span className={`rounded-full border border-blue-400/30 bg-blue-400/10 px-4 
        py-2 text-sm font-semibold ${isDark
                                ? "border-white/20 bg-purple-900"
                                : "bg-red-500 text-blue-500"}`}
        >
          The challenge begins here
        </span>

        <h1 className={`mt-8 max-w-4xl text-4xl font-extrabold tracking-tight 
        sm:text-6xl md:text-7xl ${isDark
                                ? "text-red-500"
                                : "text-purple-500"}`}>
          Test your knowledges.
        </h1>

        <Link
          to="/quiz"
          className="mt-10 inline-flex items-center gap-3 rounded-xl bg-blue-500 px-7 py-4 font-bold text-white transition hover:-translate-y-1 hover:bg-blue-400"
        >
          Begin to play
          <span aria-hidden="true">{' ->'}</span>
        </Link>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 
      pb-24 sm:grid-cols-3">
        <article className="border rounded-lg px-4 py-4 bg-pink-500">
          <span className="text-3xl">
            <GiBrain size={40} color="pink" />
          </span>
          <h2 className="mt-4 text-xl font-bold">Knowledges</h2>
          <p>
            Discover some new subjects.
          </p>
        </article>

        <article className="border rounded-lg px-4 py-4 bg-blue-500">
          <span className="text-3xl">
            <BiSolidTrophy size={40} color="yellow" />
          </span>
          <h2 className="mt-4 text-xl font-bold">Scores</h2>
          <p>
            Get some results and watch your progress!
          </p>
        </article>

        <article className="border rounded-lg px-4 py-4 bg-green-500">
          <span className="text-3xl">
            <AiFillThunderbolt size={40} color="yellow" />
          </span>
          <h2 className="mt-4 text-xl font-bold">Challenges</h2>
          <p>
            Put your knowledge to the test.
          </p>
        </article>
      </section>
    </main>
  );
}

export default Home;
