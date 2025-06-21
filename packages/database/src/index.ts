// index.ts
// client.ts
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

module.exports = {
  prisma,
};
