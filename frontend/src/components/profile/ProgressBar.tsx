type ProgressBarProps = {
    level: number;
    currentXP: number;
    requiredXP: number;
};

function ProgressBar({ level, currentXP, requiredXP }: ProgressBarProps) {
    const progress = requiredXP > 0 ? Math.min(100, (currentXP / requiredXP) * 100) : 0;

    return (
        <div className="w-full rounded-xl border border-muted bg-surface p-5 mb-6">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Level {level}</h2>
                </div>

                <span className="rounded-lg bg-purple-500/20 px-3 py-2 font-bold
                text-purple-500">{currentXP} / {requiredXP} XP</span>
            </div>

            <div className="h-4 w-full overflow-hidden rounded-full bg-slate-200
            dark:bg-slate-700" role="progressbar" aria-valuenow={progress}
            aria-valuemin={0} aria-valuemax={100} aria-label="XP Progress">
                <div className="h-full rounded-full bg-gradient-to-r from-purple-500
                to-cyan-400 transition-all duration-700"
                style={{ width: `${progress}%` }} />
            </div>

            <p className="mt-6 text-right text-xs text-muted">
                {requiredXP - currentXP} XP until next level
            </p>
        </div>
    );
}

export default ProgressBar;