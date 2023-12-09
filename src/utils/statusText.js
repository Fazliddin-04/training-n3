import i18n from "@/locales/i18n";

export const statusText = (id) => {
  switch (id) {
    case "986a0d09-7b4d-4ca9-8567-aa1c6d770505":
      return i18n.t("new");
    case "8781af8e-f74d-4fb6-ae23-fd997f4a2ee0":
      return i18n.t("courier_accepted");
    case "6ba783a3-1c2e-479c-9626-25526b3d9d36":
      return i18n.t("courier_declined");
    case "84be5a2f-3a92-4469-8283-220ca34a0de4":
      return i18n.t("courier_picked_up");
    case "1b6dc9a3-64aa-4f68-b54f-71ffe8164cd3":
      return i18n.t("branch_accepted");
    case "b0cb7c69-5e3d-47c7-9813-b0a7cc3d81fd":
      return i18n.t("branch_prepared");
    case "c4227d1b-c317-46f8-b1e3-a48c2496206f":
      return i18n.t("branch_declined");
    case "79413606-a56f-45ed-97c3-f3f18e645972":
      return i18n.t("delivered");
    case "e665273d-5415-4243-a329-aee410e39465":
      return i18n.t("finished");
    case "bf9cc968-367d-4391-93fa-f77eda2a7a99":
      return i18n.t("pre_order");
    case "ccb62ffb-f0e1-472e-bf32-d130bea90617":
      return i18n.t("operator_accepted");
    case "b5d1aa93-bccd-40bb-ae29-ea5a85a2b1d1":
      return i18n.t("operator_declined");
    case "d39cb255-6cf5-4602-896d-9c559d40cbbe":
      return i18n.t("server_cancelled");
    default:
      return null;
  }
};
