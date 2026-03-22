import NepaliDate from "nepali-date-converter";

export default function getNepaliMonthAndYear(jsDate:Date){
    const npDate = new NepaliDate(jsDate)
    const month = npDate.getMonth() + 1 as number
    const monthName = npDate.format('MMMM') as string
    const year = parseInt(npDate.format('YYYY')) as number

    return {month,year,monthName}

}