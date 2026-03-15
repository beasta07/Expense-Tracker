import  { useEffect, useState } from 'react'
import { getBudget } from '../actions/budget'

const useBudget = (postState:unknown) => {
const [budgetState, setBudgetState] = useState<{id: number, month: number, userId: number, amount: number, year: number} | null>(null) 
   const [budgetStateLoading,setBudgetStateLoading]= useState(true)
    const [error,setError]=useState<string | null>(null)
    useEffect(() => {
        const fetchBudget = async () => {
        try{
              const result = await getBudget()
              console.log(result,'getBudget result')
if (result) setBudgetState(result.budget ?? null)           
        }
        catch(err){
setError('Error fetching budget data')
console.log(err)        }
        finally{
            setBudgetStateLoading(false)
        }
    }
    fetchBudget()
    }, [postState])  
  return {budgetState,error,budgetStateLoading}
  
}

export default useBudget
