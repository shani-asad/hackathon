import { NextPage } from "next/types";
import { useRouter } from "next/router";
import FormDriver from "../../../components/drivers/Forms";
import { useEffect, useState } from "react";
import axios from "axios";
import { DriverTable } from "../../../types/driver";

const EditDriver: NextPage = () => {
  return (
    <>
      <FormDriver title={"Edit Driver"} />
    </>
  );
};

export default EditDriver;
