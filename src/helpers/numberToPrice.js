import { getCurrency } from "@/utils/getByCountry";

export default function numberToPrice(number, sep = " ") {
  return `${number
    ?.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, sep)} ${getCurrency()}`;
}
