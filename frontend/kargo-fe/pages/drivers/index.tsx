import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { NextPage } from "next";
import DriversTable from "../../components/drivers/Table";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const DriverPage: NextPage = () => {
  const router = useRouter();
  const [text, setText] = useState("");
  async function handleChange(e: any) {
    e.preventDefault();
    const value = e.currentTarget.value;
    console.log(value);
  }

  async function handleChangePage() {
    router.push("/drivers/add");
  }

  useEffect(() => {}, [text]);

  return (
    <>
      <div className={"container mx-auto"}>
        <div className={"flex flex-row"}>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="Search"
              color="primary"
              variant="outlined"
              onChange={handleChange}
            />
          </Box>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleChangePage}
          >
            Add driver
          </Button>
        </div>
        <DriversTable />
      </div>
    </>
  );
};

export default DriverPage;
