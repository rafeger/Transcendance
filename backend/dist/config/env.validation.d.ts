declare enum Env {
    DEV = "development",
    PROD = "production",
    TEST = "test"
}
declare class EnvVar {
    NODE_ENV: Env;
    PORT: number;
    DATABASE_URL: string;
}
export declare function validate(config: Record<string, unknown>): EnvVar;
export {};
