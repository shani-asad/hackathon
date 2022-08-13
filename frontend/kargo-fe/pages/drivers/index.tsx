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
import {
  DriverTable,
  Driver,
  DriverDocument,
  DriverStatus,
} from "../../types/driver";
import { HeadTable } from "../../components/drivers/TableHead";
import { NextPage } from "next";
import DriversTable from "../../components/drivers/Table";

const DriverPage: NextPage = () => {
  return (
    <>
      <DriversTable />
    </>
  );
};

export default DriverPage;
