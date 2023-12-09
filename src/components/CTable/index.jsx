import { Paper } from "@mui/material";
import { forwardRef } from "react";
import CPagination from "../CPagination";
import EmptyDataComponent from "../EmptyDataComponent";
import TableLoader from "../TableLoader";
import "./style.scss";

export const CTable = ({
  children,
  filters,
  count,
  page,
  className,
  stickyActions,
  setCurrentPage,
  removableHeight = 186,
  disablePagination = true,
}) => {
  return (
    <Paper className={`CTableContainer ${className}`}>
      {filters}
      <div
        className="table"
        style={{
          height: removableHeight
            ? `calc(100vh - ${removableHeight}px)`
            : "auto",
        }}
      >
        <table className={stickyActions ? "sticky_actions" : ""}>
          {children}
        </table>
      </div>
      {(!disablePagination || page) && (
        <CPagination
          count={count}
          page={page}
          setCurrentPage={setCurrentPage}
        />
      )}
    </Paper>
  );
};

export const CTableHead = ({ children }) => {
  return <thead className="CTableHead">{children}</thead>;
};

export const CTableHeadRow = ({ children }) => {
  return <tr className="CTableHeadRow">{children}</tr>;
};

export const CTableBody = forwardRef(
  function CTableBody(
    { children, columnsCount, loader = false, dataLength, ...props },
    ref
  ) {
    if (!loader && !dataLength)
      return <EmptyDataComponent isVisible={!loader && !dataLength} />;

    return (
      <tbody className="CTableBody" {...props} ref={ref}>
        {!loader && children}
        <TableLoader isVisible={loader} columnsCount={columnsCount} />
      </tbody>
    );
  }
);

CTableBody.displayName = 'CTableBody'; // Add display name to the component

export const CTableRow = ({ children, ...props }) => {
  return (
    <tr className="CTableRow" {...props}>
      {children}
    </tr>
  );
};

export const CTableCell = ({ children, className = "", ...props }) => {
  return (
    <td className={`CTableCell ${className}`} {...props}>
      {children}
    </td>
  );
};
