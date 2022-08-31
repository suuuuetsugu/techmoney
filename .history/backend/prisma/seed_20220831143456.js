async function main() {
    // ... you will write your Prisma Client queries here
    const allUsers = await prisma.user.findMany()
    console.log(allUsers)
  }