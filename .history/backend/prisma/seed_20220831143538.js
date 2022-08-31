async function main() {
    // ... you will write your Prisma Client queries here
    const helped = await prisma.helped.findMany()
    console.log(helped)
  }