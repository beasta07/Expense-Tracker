Expense Tracker

I built this because I needed it.
Tired of losing track of where my money was going every month, I decided to build my own expense tracker instead of relying on apps that were either too bloated or too simple. The inspiration came from something I read about the developers behind Git and Linux — they built tools because they genuinely needed them, not to sell them. That stuck with me. The best software comes from real problems, not manufactured ones.
So here it is. A personal expense tracker built with Next.js, Prisma, PostgreSQL, and TypeScript.

What it does

Sign up and log in securely with hashed passwords and JWT authentication
Add, edit, and delete your expenses
View your spending broken down by category with a pie chart
Track how your spending changes month to month with a bar chart
See your total spending and daily average for the current month at a glance


What's under the hood

Next.js 15 with server actions and middleware
Prisma + PostgreSQL for the database
JWT stored in httpOnly cookies — no localStorage, properly secure
bcrypt for password hashing
Recharts for data visualization
Tailwind CSS for styling


Roadmap
This is a living project. I plan to keep improving it — better UI, budget tracking, spending goals, and more. I'm still learning and building in public, so if you have feedback, suggestions, or spot something that could be done better, I genuinely want to hear it. Feel free to open an issue or reach out directly.
Every bit of feedback helps me grow as a developer.
