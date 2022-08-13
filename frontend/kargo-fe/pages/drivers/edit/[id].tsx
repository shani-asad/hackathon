import { NextPage } from "next/types";
import { useRouter } from "next/router";
import FormDriver from "../../../components/drivers/Forms";

const EditDriver: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <FormDriver />
    </>
  );
};

export default EditDriver;
