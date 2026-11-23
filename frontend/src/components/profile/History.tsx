import type { MatchHistory } from "../../types/history";
import { useState } from "react";
import { Button, Card } from "../ui";

type Props = {
    matches: MatchHistory[];
};

function History({ matches }: Props) {
    const [currentPage, setCurrentPage] = useState(1);
    const matchesPerPage = 5;
    const totalPages = Math.ceil(matches.length / matchesPerPage);
    const startIndex = (currentPage - 1) * matchesPerPage;
    const currentMatches = matches.slice(startIndex, startIndex + matchesPerPage);

    return (
        <section className="mt-10">
            <h2 className="mb-6 text-2xl font-bold">Match history</h2>

            {matches.length === 0 ? (
                <p className="text-center text-slate-400">No match played yet.</p>
            ) : (
            <>
                <div className="space-y-4">{currentMatches.map((match) => 
                    (<Card key={match.id} padding="md">
                        <div className="flex justify-between">
                            <div>
                                <p>{new Date(match.date).toLocaleDateString("fr-FR")}</p>
                                <p>Opponents: {match.opponents.join(", ")}</p>
                            </div>

                            <div>
                                <p>Score: {match.score} - {match.opponentScore}</p>
                                <p>Rank: #{match.rank}</p>
                            </div>
                        </div>
                    </Card>
                ))}
                </div>

                <div className="mt-6 flex items-center justify-center gap-4">
                    <Button type="button" variant="secondary"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}>Previous</Button>

                    {Array.from({ length: totalPages }, (_, index) => {
                        const page = index + 1;

                        return (
                            <Button key={page} type="button"
                            variant={currentPage === page ? "primary" : "secondary"}
                            onClick={() => setCurrentPage(page)}>{page}</Button>
                        );
                    })}

                    <Button type="button" variant="secondary"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}>Next</Button>
                </div>
            </>
        )}
        </section>
    );
}

export default History;