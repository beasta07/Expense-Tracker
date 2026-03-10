export function decodeToken(token:string){
    try{
        const payload = token.split('.')[1]
        const decoded = JSON.parse(atob(payload))
        return decoded
    }
    catch(error){
        console.error(error)
        return null
    }
}