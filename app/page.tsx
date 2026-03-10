'use client'

import  { useActionState } from 'react'
import ExpensesComp from './components/ExpensesComp'
import { ExpenseForm } from './components/ExpenseForm'
import { addExpense } from './actions/expenses';
import Navbar from './components/Navbar';
import Hero from './components/Hero/Hero';
import AnalyticsComp from './components/Hero/AnalyticsComp';

const Home = () => {
    const [state, actionFunction, isPending] = useActionState(addExpense, null);

  return (
    <section className=''>
     <Navbar/>
     <div id="hero">
     <Hero state={state}/>

     </div>
    <section className='bg-zinc-50 '>
x<div id="analytics"><AnalyticsComp state={state} /></div>
<div id="transactions"><ExpensesComp state={state} /></div>
<div id="add-expense">
     <ExpenseForm state={state} actionFunction={actionFunction} isPending={isPending}/>

</div>
    </section>
    </section>
  )
}

export default Home
