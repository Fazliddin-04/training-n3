import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import InputV2 from "@/components/Input/Inputv2";
import { InputAdornment } from "@mui/material";

const Search = ({
  setSearch,
  placeholder = "search",
  debounceTime = 300,
  size = "normal",
  className = "",
  fullWidth = false,
  ...props
}) => {
  const { t } = useTranslation();
  let debounce = setTimeout(() => {}, 0);

  const onSearch = (e) => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      setSearch(e.target.value);
    }, debounceTime);
  };

  return (
    <InputV2
      fullWidth={fullWidth}
      className={className}
      onChange={onSearch}
      placeholder={t(placeholder)}
      size={size}
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon style={{ color: "var(--primary-color)" }} />
        </InputAdornment>
      }
      {...props}
    />
  );
};

export default Search;
