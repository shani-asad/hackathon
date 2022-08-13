import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  DriverTable,
  Driver,
  DriverDocument,
  DriverStatus,
  DriverResponse,
  Order,
  Action,
} from "../../types/driver";
import { HeadTable } from "./TableHead";
import { useRouter } from "next/router";
import axios from "axios";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function DriversTable(props: any) {
  const router = useRouter();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof DriverTable>("name");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState<DriverTable[]>([]);
  const [fetch, setFetch] = React.useState(true);
  const [text, setText] = React.useState<string>(props.text);

  React.useEffect(() => {
    if (fetch) {
      const getDrivers = async () => {
        try {
          const result = await axios.get(
            "http://localhost:3000/api/transporter/drivers/get"
          );
          console.log(result);

          return result.data.data;
        } catch (e: any) {
          console.log(e.message);
        }
      };
      getDrivers().then((data) => {
        const filtered: DriverTable[] = data.map((el: DriverResponse) => {
          const { name, phone, id, status, createdAt } = el;

          let dateObj = new Date(createdAt);

          let month = dateObj.getUTCMonth(); //months from 1-12
          let day = dateObj.getUTCDate();
          let year = dateObj.getUTCFullYear();

          let newdate = day + " " + monthNames[month] + " " + year;

          return { id, name, phoneNumber: phone, status, createdAt: newdate };
        });

        if (props.text != "") {
          const searched = filtered.filter((el) =>
            el.name.includes(props.text)
          );
          setRows(searched);
        } else {
          setRows(filtered);
        }
      });

      setFetch(false);
    }
  }, [fetch, text]);

  async function handleRequestSort(
    event: React.MouseEvent<unknown>,
    property: keyof DriverTable
  ) {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  }

  async function handleChangePage(event: unknown, newPage: number) {
    setPage(newPage);
  }

  async function handleChangeRowsPerPage(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  async function handleActionChange(e: SelectChangeEvent) {
    const value = e.target.value;
    const type = value.split(" ")[0];
    const id = value.split(" ")[1];

    if (type === Action.EDIT) {
      router.push(`/drivers/edit/${id}`);
    } else if (type === Action.DEACTIVATE) {
      const driver = rows.filter((el) => el.id == id);

      const update = async () => {
        const res = await axios.put(
          `http://localhost:3000/api/transporter/drivers/update/${id}`,
          {
            name: driver[0].name,
            phone: driver[0].phoneNumber,
            status: DriverStatus.INACTIVE,
          }
        );
      };

      update().then(() => {
        console.log("succeed");
        setFetch(true);
      });
      console.log("call deactivate");
    }
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"small"}
          >
            <HeadTable
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.name}
                    >
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right">{row.phoneNumber}</TableCell>
                      <TableCell align="right">{row.createdAt}</TableCell>
                      <TableCell align="right">{row.status}</TableCell>
                      <TableCell align="right">
                        <Select onChange={handleActionChange} label="Update">
                          <MenuItem value={`${Action.EDIT} ${row.id}`}>
                            Change Details
                          </MenuItem>
                          <MenuItem
                            value={`${Action.DEACTIVATE} ${row.id}`}
                            disabled={row.status === DriverStatus.INACTIVE}
                          >
                            Deactivate Driver
                          </MenuItem>
                        </Select>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
