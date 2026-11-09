import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../lib/api";

type Friend = {
    id: number;
    username: string;
    online: boolean;
};

function Friends() {
    const { data: friends, isPending, isError } = useQuery({
        queryKey: ['friends'], queryFn: () => apiFetch<Friend[]>("/friends"),
    });

    if (isPending) {
        return (
            <main className="min-h-screen bg-slate-950 text-white px-4 py-16">
                <div className="mx-auto max-w_3xl">
                    <p className="text-slate-400">Loading friends...</p>
                </div>
            </main>
        );
    }

    if (isError) {
        return (
            <main className="min-h-screen bg-slate-950 text-white px-4 py-16">
                <div className="mx-auto max-w_3xl">
                    <p className="text-slate-400">Impossible to load friends.</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-950 text-white px-4 py-16">
            <div className="mx-auto max-w_3xl">
                <h1 className="text-3xl font-bold">My Friends</h1>
            </div>

            <section className="mt-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">My friends list</h2>
                    <span className="text-sm text-slate-400">{friends.length} ami(s)</span>
                </div>

                <div className="mt-4 space-y-3">
                    {friends.map((friend) => (
                        <div key={friend.id} className="flex items-center gap-4">
                            <div className="min-w-0 flex-1">
                                <h3 className="truncate font-semibold">{friend.username}</h3>
                                <p className={`mt-1 text-sm ${friend.online ?
                                    "text-emerald-400" : "text-slate-500"
                                 }`}>
                                {friend.online ? "Connected" : "Disconnected"}
                                </p>
                            </div>
                        </div>
                    ))}
                    {friends.length === 0 && (
                        <p className="rounded-xl bg-slate-900 p-6 text-center text-slate-400">You still don't have any friends.</p>
                    )}
                </div>
            </section>
        </main>
    );
}

export default Friends;