import { Card } from "../ui";

type StatCardProps = {
    title: string;
    value: string | number;
};

function StatCard({ title, value }: StatCardProps) {
    return (
        <Card padding="md">
            <p className="text-sm text-slate-400">{title}</p>
            <p className="mt-2 text-3xl font-bold">{value}</p>
        </Card>
    );
}

export default StatCard;