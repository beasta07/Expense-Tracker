import 'dotenv/config'
import prisma from '../lib/prisma'

async function test() {
  try {
    console.log('Testing connection...')
    const result = await prisma.$queryRaw`SELECT 1`
    console.log('✅ Connection successful!', result)
    
    const users = await prisma.user.findMany()
    console.log('✅ Can fetch users:', users.length)
  } catch (error) {
    console.error('❌ Connection failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

test()