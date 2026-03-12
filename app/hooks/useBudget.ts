import React, { useEffect, useState } from 'react'
import { getBudget } from '../actions/budget'

const useBudget = (postState) => {
    const [budgetState,setBudgetState] = useState(null)
    const [budgetStateLoading,setBudgetStateLoading]= useState(true)
    const [error,setError]=useState(null)
    useEffect(() => {
        const fetchBudget = async () => {
        try{
              const result = await getBudget()
              console.log(result,'getBudget result')
              setBudgetState(result.budget)
           
        }
        catch(err){
            setError('Error fetching budget data',err)
        }
        finally{
            setBudgetStateLoading(false)
        }
    }
    fetchBudget()
    }, [postState])  
  return {budgetState,error,budgetStateLoading}
  
}

export default useBudget
