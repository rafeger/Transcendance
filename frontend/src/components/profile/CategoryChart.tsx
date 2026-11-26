import { ResponsiveContainer, PieChart, Pie, Sector, Tooltip } from "recharts";

export type CategoryStat = { category: string; games: number; };

type Props = {
    categories: CategoryStat[];
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function CategoryChart({ categories }: Props) {
    if (categories.length === 0) {
        return <p>No category data available</p>
    }

    return (
        <section className="mt-6 rounded-xl border border-muted bg-surface p-4">
            <h2 className="mb-4 text-xl font-bold">
                Games by category
            </h2>

            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={categories} dataKey="games" nameKey="category"
                        cx="50%" cy="50%" outerRadius={120}
                        label={({name, percent}) =>
                        `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                            shape={(props) => (
                                <Sector {...props}
                                fill={COLORS[props.index % COLORS.length]}
                                />
                            )}
                        />
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-4 flex flex-wrap justify-center gap-4">
                {categories.map((item, index) => (
                    <div key={item.category} className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }} />

                        <span className="text-sm text-fg">
                            {item.category}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default CategoryChart;