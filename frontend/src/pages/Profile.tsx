function Profile() {
    const username = "guest";
    const email = "guest@42.fr";
    const gamesPlayed = 10;
    const gamesWon = 5;

    return (
        <main className="min-h-screen bg-slate-950 px-4 py-16 text-white">
            <div className="mx-auto max-w-2xl">
            <h1 className="text-3xl font-bold">My Profile</h1>
            </div>
        </main>
    );
}

export default Profile;