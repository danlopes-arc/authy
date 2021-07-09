import * as dotenv from 'dotenv';

dotenv.config();

export const variableNames = ['JWT_SECRET'] as const;

export type Env = {
  [key in typeof variableNames[number]]: string;
};

let variables: Env | null = null;

const missingVariables: string[] = [];

export function load(): void {
  const tempVariables = variableNames.reduce<Partial<Env>>((prev, name) => {
    const value = process.env[name];
    if (value === undefined) {
      missingVariables.push(name);
    }
    return {
      ...prev,
      [name]: value,
    };
  }, {});

  if (missingVariables.length) {
    throw `Environment variables are missing: ${missingVariables.join(', ')}`;
  }

  variables = tempVariables as Env;
}

export function getMissingVariables(): string[] {
  load();
  return [...missingVariables];
}

export function getEnv(): Env {
  load();
  return { ...variables } as Env;
}
