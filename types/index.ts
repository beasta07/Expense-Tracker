export interface Users{
    name: string, 
    id: number ,
    password: string,
    expenses : Expense[]
}
export interface Expense{
    id: number ,
    amount: number, 
    description: string , 
    date: Date , 
   category: string | null;  // <- Also add null here
  userId: number | null;  // <- And here
}
export interface Session{
    id: number ,
    userId: number, 
    user: Users[] , 
    token: string , 

}
export type CategoryData = {
  name: string
  value: number
}

export interface Budget{
    id:number 
  amount:number 
  month:number 
  year:number 
  userId :number 
  user: Users[] 

}