import { PrismaClient } from "../src/generated/prisma"; // ajuste se necessário
import { encryptPassword } from "../src/services/crypto"; // ou caminho real do seu crypto.ts

const prisma = new PrismaClient();

async function main() {
  const existingUser = await prisma.user.findUnique({
    where: { email: "demo@driven.com.br" }
  });

  if (existingUser) {
    console.log("Usuário já existe.");
    return;
  }

  const encryptedPassword = encryptPassword("demo123");

  await prisma.user.create({
    data: {
      name: "Demo",
      email: "demo@driven.com.br",
      password: encryptedPassword
    }
  });

  console.log("Usuário base criado com sucesso.");
}

main()
  .catch((e) => {
    console.error("Erro ao rodar o seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
