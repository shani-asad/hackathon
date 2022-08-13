import React from "react";
import EditTruck from "../components/EditTruck";

export default function editTruck() {
  return <EditTruck />;
}

// export async function getServerSideProps() {
//   // Fetch data from external API
//   const res = await fetch(`https://localhost:3000/api/transporter/trucks/types/get`);
//   const data = await res.json();

//   // Pass data to the page via props
//   return { props: { data } };
// }