import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
  validateSync,
  ValidationError,
} from 'class-validator';


enum Env {
  DEV = 'development',
  PROD = 'production',
  TEST = 'test',
}

class EnvVar {
  @IsEnum(Env)
  NODE_ENV!: Env;

  @IsInt()
  @Min(1)
  @Max(65535)
  PORT!: number;

  @IsString()
  @IsNotEmpty()
  DATABASE_URL!: string;
}

function formatErrors(errors: ValidationError[]): string {
  const lines = errors.map((error) => {
    const reasons = Object.values(error.constraints ?? {}).join(', ');
    return `  - ${error.property}: ${reasons}`;
  });
  return lines.join('\n');
}

export function validate(config: Record<string, unknown>): EnvVar {
  const validated = plainToInstance(EnvVar, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validated, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(`Invalid env vars:\n${formatErrors(errors)}`);
  }
  return validated;
}
