
import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL is not set')
}

const adapter = new PrismaPg({ 
  connectionString,
  ssl: false  // <- Add this for local PostgreSQL
})

const prisma = new PrismaClient({ adapter })

export default prisma