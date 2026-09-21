// Importamos el cliente de Prisma que generó el contrato
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Intentando conectar a la base de datos...");
    await prisma.user.findMany();
    // Hacemos una consulta muy sencilla para probar la conexión (ej. listar registros de un modelo o probar la conexión general)
    // Si tienes el modelo User, puedes probar con: await prisma.user.findMany();
    console.log(
      "¡Conexión establecida y cliente de Prisma funcionando correctamente!",
    );
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
