async function main() {
    // ... you will write your Prisma Client queries here
    const help = await prisma.Helped.findMany()
    console.log(help)
  }