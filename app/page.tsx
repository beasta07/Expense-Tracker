'use client'

import  { useActionState, useState } from 'react'
import ExpensesComp from './Landing/ExpensesComp'
import { ExpenseForm } from './Landing/ExpenseForm'
import { addExpense } from './actions/expenses';
import Navbar from './components/Navbar';
import Hero from './Landing/Hero/Hero';
import AnalyticsComp from './Landing/Hero/AnalyticsComp';
import BudgetComp from './Landing/BudgetComp';
import WishlistComp from './Landing/WishlistComp';

const Home = () => {
    const [state, actionFunction, isPending] = useActionState(addExpense, null);
const [expenseRefresh, setExpenseRefresh] = useState(0)

  return (
    <section className=''>
     <Navbar/>
     <div id="hero">
     <Hero state={state}/>

     </div>
    <section className='bg-zinc-50 '>
    <div id="budget"><BudgetComp state={state} /> </div>
 
<div id="analytics"><AnalyticsComp state={state} /></div>
<div id="transactions"><ExpensesComp expenseRefresh={expenseRefresh} state={state} /></div>
<div id="add-expense">
     <ExpenseForm state={state} actionFunction={actionFunction} isPending={isPending}/>

</div>
<div id="wishlist">
  <WishlistComp  setExpenseRefresh={setExpenseRefresh}  state={state} />
</div>
    </section>
    </section>
  )
}

export default Home
