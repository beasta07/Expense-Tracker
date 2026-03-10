import 'dotenv/config'
import prisma from '../lib/prisma'

async function main() {
  try {
    console.log('Testing connection...')
    const result = await prisma.$queryRaw`SELECT 1`
    console.log('Connection successful!', result)
    
    console.log('\nCreating user...')
    const user = await prisma.user.create({
      data: {
        name: "John Doe",
        email: "john@example.com",
        password: "hashed_password_here"
      }
    })
    console.log('User created:', user)

    console.log('\nCreating expense...')
    const expense = await prisma.expense.create({
      data: {
        amount: 50.00,
        description: "Groceries",
        date: new Date(),
        category: "Food",
        userId: user.id
      }
    })
    console.log('Expense created:', expense)
  } catch (error) {
    console.error('Error:', error)
  }
}

main()
  .finally(async () => await prisma.$disconnect())