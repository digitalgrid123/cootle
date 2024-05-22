import Table from "react-bootstrap/Table";

export const TableHead = ({
  headerItems = [],
  className = "",
  tableConfig = {},
  handleSorting = () => {},
}) => {
  return (
    <thead className={`bg-light ${className}`}>
      <tr>
        {headerItems.map(({ id, label, isSortable }) => (
          <th
            scope="col"
            key={id}
            onClick={() => isSortable && handleSorting(id)}
            className={tableConfig?.sorting?.column === id ? "sorted" : ""}
          >
            {label}
            {isSortable && tableConfig?.sorting?.column === id && (
              <span className="mx-1">
                <i
                  className={`fa fa-sort-${
                    tableConfig?.sorting?.direction === "asc" ? "up" : "down"
                  }`}
                ></i>
              </span>
            )}
          </th>
        ))}
        {/* {headerItems.map(({ id, label }) => (
          <th scope="col" key={id}>
            {label}
          </th>
        ))} */}
      </tr>
    </thead>
  );
};

export const CustomTable = ({ children, className }) => (
  <Table className={className}>{children}</Table>
);

export const TableBody = ({ children, className }) => (
  <tbody className={className}>{children}</tbody>
);

export const TableRow = ({ children, className }) => (
  <tr className={className}>{children}</tr>
);

export const TableCell = ({ children, className, ...rest }) => (
  <td className={className} {...rest}>
    {children}
  </td>
);

export const NoDataFound = ({ message = "No data found", colSpan }) => (
  <TableRow>
    <TableCell colSpan={colSpan} align="center">
      {message}
    </TableCell>
  </TableRow>
);
