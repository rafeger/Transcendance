import { Link } from 'react-router-dom';
import { AiFillThunderbolt } from 'react-icons/ai';
import { BiSolidTrophy } from 'react-icons/bi';
import { GiBrain } from 'react-icons/gi';
import { SiQuizlet } from 'react-icons/si';
import { useTheme } from '../contexts/ThemeContext';
import { Card, buttonStyles } from '../components/ui';

function Home() {
  const { isDark } = useTheme();

  return (
    <main
      className={`min-h-screen px-4 py-16 ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}
    >
      <section className="flex flex-col items-end px-8">
        <SiQuizlet size={48} aria-hidden="true" />
      </section>

      <section className="flex flex-col items-center px-6 py-24 text-center md:py-32">
        <span
          className={`rounded-full border px-4 py-2 text-sm font-semibold ${
            isDark
              ? 'border-white/20 bg-purple-700 text-pink-500'
              : 'border-blue-400/30 bg-sky-400 text-purple-500'
          }`}
        >
          The challenge begins here
        </span>

        <h1
          className={`mt-8 mb-12 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl ${
            isDark ? 'text-pink-500' : 'text-purple-500'
          }`}
        >
          Test your knowledges.
        </h1>

        {/* Un lien avec l'apparence d'un bouton (pas de <button> dans un <a>) */}
        <Link
          to="/quiz"
          className={buttonStyles({
            size: 'lg',
            className:
              'duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-purple-500',
          })}
        >
          Begin to play
        </Link>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 pt-4 pb-4 sm:grid-cols-3">
        <Card as="article" padding="md">
          <div className="text-xl">
            <GiBrain size={40} className="text-pink-400" aria-hidden="true" />
            <h2 className="mt-4 text-4xl font-bold text-blue-500">Knowledges</h2>
            <p className="py-4">Discover some new subjects</p>
          </div>
        </Card>

        <Card as="article" padding="md">
          <div className="text-xl">
            <BiSolidTrophy size={40} className="text-yellow-300" aria-hidden="true" />
            <h2 className="mt-4 text-4xl font-bold text-blue-500">Scores</h2>
            <p className="py-4">Get some results and watch your progress!</p>
          </div>
        </Card>

        <Card as="article" padding="md">
          <div className="text-xl">
            <AiFillThunderbolt size={40} className="text-yellow-300" aria-hidden="true" />
            <h2 className="mt-4 text-4xl font-bold text-blue-500">Challenges</h2>
            <p className="py-4">Put your knowledge to the test</p>
          </div>
        </Card>
      </section>
    </main>
  );
}

export default Home;
