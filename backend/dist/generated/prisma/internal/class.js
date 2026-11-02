import * as runtime from "@prisma/client/runtime/client";
const config = {
    "previewFeatures": [],
    "clientVersion": "7.10.1",
    "engineVersion": "d1b3f377ca835d73fd50954a5e22128b9ebdd6b8",
    "activeProvider": "postgresql",
    "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Get a free hosted Postgres database in seconds: `npx create-db`\n\ngenerator client {\n  provider = \"prisma-client\"\n  output   = \"../src/generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\nmodel Question {\n  id       Int    @id @default(autoincrement())\n  question String @default(\"The Answer to the Ultimate Question of Life, the Universe, and Everything\")\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    },
    "parameterizationSchema": {
        "strings": [],
        "graph": ""
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"Question\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"question\",\"kind\":\"scalar\",\"type\":\"String\"}],\"dbName\":null,\"schema\":null}},\"enums\":{},\"types\":{}}");
config.parameterizationSchema = {
    strings: JSON.parse("[\"where\",\"Question.findUnique\",\"Question.findUniqueOrThrow\",\"orderBy\",\"cursor\",\"Question.findFirst\",\"Question.findFirstOrThrow\",\"Question.findMany\",\"data\",\"Question.createOne\",\"Question.createMany\",\"Question.createManyAndReturn\",\"Question.updateOne\",\"Question.updateMany\",\"Question.updateManyAndReturn\",\"create\",\"update\",\"Question.upsertOne\",\"Question.deleteOne\",\"Question.deleteMany\",\"having\",\"_count\",\"_avg\",\"_sum\",\"_min\",\"_max\",\"Question.groupBy\",\"Question.aggregate\",\"AND\",\"OR\",\"NOT\",\"id\",\"question\",\"equals\",\"in\",\"notIn\",\"lt\",\"lte\",\"gt\",\"gte\",\"contains\",\"startsWith\",\"endsWith\",\"not\",\"set\",\"increment\",\"decrement\",\"multiply\",\"divide\"]"),
    graph: "KwsQBRwAACIAMB0AAAQAEB4AACIAMB8CAAAAASABACQAIQEAAAABACABAAAAAQAgBRwAACIAMB0AAAQAEB4AACIAMB8CACMAISABACQAIQADAAAABAAgAwAABQAwBAAAAQAgAwAAAAQAIAMAAAUAMAQAAAEAIAMAAAAEACADAAAFADAEAAABACACHwIAAAABIAEAAAABAQgAAAkAIAIfAgAAAAEgAQAAAAEBCAAACwAwAQgAAAsAMAIfAgArACEgAQAqACECAAAAAQAgCAAADgAgAh8CACsAISABACoAIQIAAAAEACAIAAAQACACAAAABAAgCAAAEAAgAwAAAAEAIA8AAAkAIBAAAA4AIAEAAAABACABAAAABAAgBRUAACUAIBYAACYAIBcAACkAIBgAACgAIBkAACcAIAUcAAAaADAdAAAXABAeAAAaADAfAgAbACEgAQAcACEDAAAABAAgAwAAFgAwFAAAFwAgAwAAAAQAIAMAAAUAMAQAAAEAIAUcAAAaADAdAAAXABAeAAAaADAfAgAbACEgAQAcACENFQAAHgAgFgAAIQAgFwAAHgAgGAAAHgAgGQAAHgAgIQIAAAABIgIAAAAEIwIAAAAEJAIAAAABJQIAAAABJgIAAAABJwIAAAABKwIAIAAhDhUAAB4AIBgAAB8AIBkAAB8AICEBAAAAASIBAAAABCMBAAAABCQBAAAAASUBAAAAASYBAAAAAScBAAAAASgBAAAAASkBAAAAASoBAAAAASsBAB0AIQ4VAAAeACAYAAAfACAZAAAfACAhAQAAAAEiAQAAAAQjAQAAAAQkAQAAAAElAQAAAAEmAQAAAAEnAQAAAAEoAQAAAAEpAQAAAAEqAQAAAAErAQAdACEIIQIAAAABIgIAAAAEIwIAAAAEJAIAAAABJQIAAAABJgIAAAABJwIAAAABKwIAHgAhCyEBAAAAASIBAAAABCMBAAAABCQBAAAAASUBAAAAASYBAAAAAScBAAAAASgBAAAAASkBAAAAASoBAAAAASsBAB8AIQ0VAAAeACAWAAAhACAXAAAeACAYAAAeACAZAAAeACAhAgAAAAEiAgAAAAQjAgAAAAQkAgAAAAElAgAAAAEmAgAAAAEnAgAAAAErAgAgACEIIQgAAAABIggAAAAEIwgAAAAEJAgAAAABJQgAAAABJggAAAABJwgAAAABKwgAIQAhBRwAACIAMB0AAAQAEB4AACIAMB8CACMAISABACQAIQghAgAAAAEiAgAAAAQjAgAAAAQkAgAAAAElAgAAAAEmAgAAAAEnAgAAAAErAgAeACELIQEAAAABIgEAAAAEIwEAAAAEJAEAAAABJQEAAAABJgEAAAABJwEAAAABKAEAAAABKQEAAAABKgEAAAABKwEAHwAhAAAAAAABLAEAAAABBSwCAAAAAS0CAAAAAS4CAAAAAS8CAAAAATACAAAAAQAAAAAFFQAGFgAHFwAIGAAJGQAKAAAAAAAFFQAGFgAHFwAIGAAJGQAKAQIBAgMBBQYBBgcBBwgBCQoBCgwCCw0DDA8BDRECDhIEERMBEhQBExUCGhgFGxkL"
};
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await import('node:buffer');
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
        return await decodeBase64AsWasm(wasm);
    },
    importName: "./query_compiler_fast_bg.js"
};
export function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map