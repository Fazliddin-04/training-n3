import { useTranslation } from "react-i18next";
import Tag from ".";

export default function StatusTag({ status, innerText, ...props }) {
  const { t } = useTranslation();
  
  return (
    <Tag size="large" {...props}>
      {innerText ? innerText : t(status ? "active" : "inactive")}
    </Tag>
  );
}
