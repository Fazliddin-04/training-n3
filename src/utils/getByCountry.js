import i18n from "@/locales/i18n";
import { store } from "@/store";

export function getCurrency() {
  const country = store.getState().auth?.user?.country;
  const currency = country === "KAZ" ? "₸" : i18n.t("soum");
  return currency;
}

export function getCountryCode() {
  const country = store.getState().auth?.user?.country;
  const code = country === "KAZ" ? "7" : "998";
  return code;
}
