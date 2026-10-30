function Profile() {
    const username = "guest";
    const email = "guest@42.fr";
    const gamesPlayed = 10;
    const gamesWon = 5;

    return (
        <main className="min-h-screen bg-slate-950 px-4 py-16 text-white">
            <div className="mx-auto max-w-2xl">
            <h1 className="text-3xl font-bold">My Profile</h1>
                <p className="mt-2 text-slate-400">Watch your stats and your informations</p>

                <section className="mt-8 rounded-2xl border border-white/20 bg-slate-900 p-6">
                    <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold">
                            {username.charAt(0).toUpperCase()}
                        </div>

                        <div className="flex flex-col">
                            <h2 className="text-2xl font-bold">{username}</h2>
                            <p className=" text-slate-400">{email}</p>
                        </div>
                    </div>

                    <section className="mt-8">
                        <h1 className="text-2xl font-semibold border-b border-white/20">Stats</h1>
                    </section>

                    <div className="mt-8 grid grid-cols-2">
                        <div className="flex gap-1">
                            <p className="text-xl text-slate-400">Games played:</p>
                            <p className="text-xl">{gamesPlayed}</p>
                        </div>

                        <div className="flex gap-1">
                            <p className="text-xl text-slate-400">Games won:</p>
                            <p className="text-xl">{gamesWon}</p>
                        </div>
                    </div>

                    <section className="mt-8">
                        <h1 className="text-2xl font-semibold border-b border-white/20">Informations</h1>
                    </section>

                </section>
            </div>
        </main>
    );
}

export default Profile;