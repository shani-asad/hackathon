import { NextPage } from "next/types";
import { useRouter } from "next/router";

const DetailDriver: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <></>;
};

export default DetailDriver;
