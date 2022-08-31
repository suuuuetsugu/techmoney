async function main() {
    // ... you will write your Prisma Client queries here
    const help = await prisma.helped.findMany()
    console.log(help)
  }