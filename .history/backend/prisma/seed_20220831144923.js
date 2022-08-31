const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {

  await prisma.profile.deleteMany()
  await prisma.profile.create({
    data: {
        id: 1,
        name: 'Taro'
      }
  })

  await prisma.helpedList.deleteMany()
  await prisma.helpedList.createMany({
    data: [
        { id: 1, name: 'お風呂掃除'},
        { id: 2, name: 'お皿洗い'},
        { id: 3, name: '魚のエサやり'}
    ]
  })
    
  await prisma.helped.deleteMany()
  await prisma.helped.create({
    data: {
       day: new Date() ,
       profileId: 1,
       listId: 1
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })