import { CartesianGrid, Line, XAxis, YAxis,
    ResponsiveContainer, LineChart, Tooltip } from 'recharts';
import type { MatchHistory } from '../../types/history';

type Props = {
    histories: MatchHistory[];
};

function ScoreChart({ histories }: Props) {
    const sortedMatches = [...histories].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime());

    const chartData = sortedMatches.map((match, index) => ({
        match: `Match ${index + 1}`, score: match.score,
    }));

    if (histories.length === 0) {
        return <p>No match data available</p>;
    }

    return (
        <div className='mt-6 rounded-xl border border-muted bg-surface p-4'>
            <h2 className='mb-4 text-xl font-bold'>Score evolution</h2>

            <div className='h-72 w-full'>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <CartesianGrid stroke='#b8a4fe'/>
                        <XAxis dataKey="match" stroke='#c0bfbc'/>
                        <YAxis stroke='#c0bfbc' allowDecimals={false}/>
                        <Tooltip />
                        <Line type="monotone" dataKey="score" name='Score'
                        stroke='#8B5CF6' strokeWidth={3} dot={{ r: 4 }}
                        activeDot={{ r: 7 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default ScoreChart;