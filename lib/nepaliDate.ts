import NepaliDate from "nepali-date-converter";

export const BS_MONTH_ABBR = [
  "Bai",
  "Jes",
  "Asa",
  "Shr",
  "Bha",
  "Asw",
  "Kar",
  "Man",
  "Pou",
  "Mag",
  "Fal",
  "Cha",
] as const;

export type NepaliDateParts = {
  month: number;
  year: number;
  monthName: string;
  monthAbbr: string;
  day: number;
  formattedMonthYear: string;
  formattedFullDate: string;
};

export function getNepaliDateParts(jsDate: Date): NepaliDateParts {
  const npDate = new NepaliDate(jsDate);
  const monthIndex = npDate.getMonth() as number;
  const month = monthIndex + 1;
  const monthName = npDate.format("MMMM") as string;
  const year = Number(npDate.format("YYYY"));
  const day = Number(npDate.format("D"));
  const monthAbbr = BS_MONTH_ABBR[monthIndex] ?? monthName.slice(0, 3);

  return {
    month,
    year,
    monthName,
    monthAbbr,
    day,
    formattedMonthYear: `${monthName} ${year}`,
    formattedFullDate: `${monthName} ${day}, ${year}`,
  };
}

export function formatNepaliMonthYear(jsDate: Date) {
  return getNepaliDateParts(jsDate).formattedMonthYear;
}

export function formatNepaliFullDate(jsDate: Date) {
  return getNepaliDateParts(jsDate).formattedFullDate;
}

export default function getNepaliMonthAndYear(jsDate: Date) {
  const { month, year, monthName } = getNepaliDateParts(jsDate);
  return { month, year, monthName };
}
