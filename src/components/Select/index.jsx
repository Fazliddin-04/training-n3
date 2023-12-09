import { useRef } from "react";
import RcSelect from "react-select";
import { useTheme } from "@mui/material";

export const customStyles = ({
  error = false,
  borderRight = "1px solid #eee",
  borderLeft = "1px solid #eee",
  width = "100%",
  height = "32px",
  showClearIcons,
  dropdownIndicator,
  minWidth,
  backgroundColor,
  color,
}) => ({
  control: (styles) => {
    return {
      ...styles,
      width: width,
      minHeight: height,
      borderRadius: 6,
      minWidth: minWidth,
      // minWidth: minWidth || 176,
      border: error
        ? "1px solid rgb(220, 38, 37)"
        : "1px solid rgba(229, 231, 235)",
      ":hover": {
        border: error
          ? "1px solid rgb(220, 38, 37, 0.5)"
          : "1px solid rgba(64, 148, 247, 1)",
      },
      borderRight: borderRight,
      boderLeft: borderLeft,
      backgroundColor,
      color,
      ":focus-within": {
        border: "1px solid var(--primary-color)",
        boxShadow:
          "var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)",
      },
    };
  },
  singleValue: (state) => ({ ...state, color: "inherit" }),
  valueContainer: (provided) => ({
    ...provided,
    padding: "0 14px",
    color,
    fontSize: "14px",
    lineHeight: "140%",
  }),
  multiValue: (provided, { data }) => ({
    ...provided,
    backgroundColor: data?.color ? data?.color : "#EEF0F2",
    borderRadius: "4px",
    padding: `0px ${data?.isFixed ? "5px" : "0px"} 0px 5px`,
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "#303940",
    // fontSize: "100%",
    // padding: "2px 5px 2px 0",
  }),
  input: (provided) => ({
    ...provided,
    margin: "0px",
    color,
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: height,
  }),
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#999",
    };
  },
  menu: (base) => {
    return { ...base, zIndex: 30 };
  },
  option: (styles, { isDisabled, isSelected }) => ({
    ...styles,
    fontWeight: 500,
    color: isDisabled ? "#3039408F" : isSelected ? "#fff" : "#303940",
    paddingLeft: isDisabled ? "6px" : "24px",
    borderBottom: "1px solid #E5E9EB",
    display: isDisabled ? "flex" : "block",
    alignItems: isDisabled ? "center" : undefined,
    gap: isDisabled ? "4px" : undefined,
  }),
  multiValueRemove: (provided, { data }) =>
    !showClearIcons || data?.isFixed
      ? { ...provided, display: "none" }
      : {
          ...provided,
          borderRadius: "4px",
          color: "#9aa6ac",
          fontSize: "16px",
          cursor: "pointer",
        },
  dropdownIndicator: (base) => {
    return !showClearIcons || !dropdownIndicator
      ? { ...base, display: "none" }
      : { ...base, padding: "6px 8px" };
  },
});

function Select({
  className = "",
  placeholder = "",
  width = "100%",
  height = "32px",
  isClearable = false,
  isSearchable = false,
  isMulti = false,
  disabled = false,
  isLoading = false,
  options = [],
  borderRight,
  borderLeft,
  maxMenuHeight = "initial",
  defaultValue,
  style,
  error,
  onChange,
  onInputChange,
  useZIndex,
  dropdownIndicator = true,
  showClearIcons = true,
  ...rest
}) {
  const selectRef = useRef();
  const theme = useTheme();

  return (
    <div style={style} className={`${className} text-body`}>
      <RcSelect
        className="basic-single"
        classNamePrefix="select"
        ref={selectRef}
        placeholder={placeholder}
        defaultValue={defaultValue}
        isDisabled={disabled}
        isLoading={isLoading}
        isMulti={isMulti}
        isClearable={isClearable}
        isSearchable={isSearchable}
        maxMenuHeight={maxMenuHeight}
        options={options}
        styles={customStyles({
          error,
          borderRight,
          borderLeft,
          width,
          height,
          showClearIcons,
          dropdownIndicator,
          backgroundColor: theme.palette.background.default,
          color: theme.palette.background.contrastText,
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        })}
        onChange={onChange}
        onInputChange={onInputChange}
        menuPortalTarget={useZIndex && document.querySelector("body")}
        {...rest}
      />
    </div>
  );
}

export default Select;
