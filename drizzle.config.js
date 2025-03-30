/** @type {import ("drizzle-kit").Config} */
export default {
    schema: "./utils/schema.js",
    dialect: "postgresql",
    dbCredentials: {
        url : 'postgresql://neondb_owner:npg_P5QWhLH2qIlO@ep-plain-sunset-a5eyo9tc-pooler.us-east-2.aws.neon.tech/ai-interview?sslmode=require',
    }
};