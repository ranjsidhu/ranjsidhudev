// Module scope keeps this file's mock names private.
export {};

const mockPino = jest.fn((options: unknown) => ({ options }));
jest.mock("pino", () => ({
  __esModule: true,
  default: (options: unknown) => mockPino(options),
}));

const env = process.env as Record<string, string | undefined>;
const saved = { NODE_ENV: env.NODE_ENV, LOG_LEVEL: env.LOG_LEVEL };

// Loads lib/logger fresh with the given environment.
const loadLoggerOptions = (vars: { NODE_ENV?: string; LOG_LEVEL?: string }) => {
  env.NODE_ENV = vars.NODE_ENV;
  if (vars.LOG_LEVEL === undefined) delete env.LOG_LEVEL;
  else env.LOG_LEVEL = vars.LOG_LEVEL;
  jest.isolateModules(() => {
    require("@/lib/logger");
  });
  return mockPino.mock.calls.at(-1)?.[0] as Record<string, unknown>;
};

afterAll(() => {
  env.NODE_ENV = saved.NODE_ENV;
  if (saved.LOG_LEVEL === undefined) delete env.LOG_LEVEL;
  else env.LOG_LEVEL = saved.LOG_LEVEL;
});

describe("logger", () => {
  it("defaults to the info level with no base fields", () => {
    const options = loadLoggerOptions({ NODE_ENV: "production" });
    expect(options).toEqual({ level: "info", base: {} });
  });

  it("uses LOG_LEVEL when set", () => {
    expect(
      loadLoggerOptions({ NODE_ENV: "production", LOG_LEVEL: "debug" }).level,
    ).toBe("debug");
  });

  it("uses plain JSON output outside development", () => {
    expect(loadLoggerOptions({ NODE_ENV: "production" })).not.toHaveProperty(
      "transport",
    );
    expect(loadLoggerOptions({ NODE_ENV: "test" })).not.toHaveProperty(
      "transport",
    );
  });

  it("pretty-prints in development", () => {
    const options = loadLoggerOptions({ NODE_ENV: "development" });
    expect(options.transport).toEqual({
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "SYS:standard",
        ignore: "pid,hostname",
      },
    });
  });
});
