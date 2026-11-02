var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { plainToInstance } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty, IsString, Max, Min, validateSync, } from 'class-validator';
var Env;
(function (Env) {
    Env["DEV"] = "development";
    Env["PROD"] = "production";
    Env["TEST"] = "test";
})(Env || (Env = {}));
class EnvVar {
    NODE_ENV;
    PORT;
    DATABASE_URL;
}
__decorate([
    IsEnum(Env),
    __metadata("design:type", String)
], EnvVar.prototype, "NODE_ENV", void 0);
__decorate([
    IsInt(),
    Min(1),
    Max(65535),
    __metadata("design:type", Number)
], EnvVar.prototype, "PORT", void 0);
__decorate([
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], EnvVar.prototype, "DATABASE_URL", void 0);
function formatErrors(errors) {
    const lines = errors.map((error) => {
        const reasons = Object.values(error.constraints ?? {}).join(', ');
        return `  - ${error.property}: ${reasons}`;
    });
    return lines.join('\n');
}
export function validate(config) {
    const validated = plainToInstance(EnvVar, config, {
        enableImplicitConversion: true,
    });
    const errors = validateSync(validated, { skipMissingProperties: false });
    if (errors.length > 0) {
        throw new Error(`Invalid env vars:\n${formatErrors(errors)}`);
    }
    return validated;
}
//# sourceMappingURL=env.validation.js.map