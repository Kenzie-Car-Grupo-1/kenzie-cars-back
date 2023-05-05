"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const path_1 = __importDefault(require("path"));
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dataSourceConfig = () => {
    const entitiesPath = path_1.default.join(__dirname, "./entities/*.{js,ts}");
    const migrationsPath = path_1.default.join(__dirname, "./migrations/*.{js,ts}");
    const nodeEnv = process.env.NODE_ENV;
    if (nodeEnv === "production") {
        return {
            type: "postgres",
            url: process.env.DATABASE_URL,
            entities: [entitiesPath],
            migrations: [migrationsPath],
        };
    }
    return process.env.NODE_ENV === "test"
        ? {
            type: "sqlite",
            database: ":memory:",
            synchronize: true,
            entities: ["src/entities/*.ts"],
        }
        : {
            type: "postgres",
            host: process.env.PGHOST,
            port: parseInt(process.env.PGPORT),
            username: process.env.POSTGRES_USER,
            password: process.env.PGPASSWORD,
            database: process.env.PGDATABASE,
            logging: true,
            synchronize: true,
            entities: [path_1.default.join(__dirname, "./entities/**.{js,ts}")],
            migrations: [path_1.default.join(__dirname, "./migrations/**.{js,ts}")],
        };
};
const AppDataSource = new typeorm_1.DataSource(dataSourceConfig());
exports.default = AppDataSource;
