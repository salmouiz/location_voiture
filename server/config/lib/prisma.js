import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();
/*
const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected");
  } catch (error) {
    console.log("Database connection failed", error.message);
  }
};

export default connectDB;
*/
export default prisma ;