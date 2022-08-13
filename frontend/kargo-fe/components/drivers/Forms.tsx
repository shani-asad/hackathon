import { NextPage } from "next/types";
import { useState } from "react";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";

const FormDriver = (props: any = null) => {
  const [formValues, setFormValues] = useState({
    name: props.name || "",
    phoneNumber: props.phoneNumber || "",
    license: props.license || "",
    idCard: props.idCard || "",
  });

  const [open, setOpen] = useState(false);

  async function handleInputChange(e: any) {
    e.preventDefault();
    const newValue = e.currentTarget.value;
    const name = e.target.name;

    setFormValues({ ...formValues, [name]: newValue });
  }
  async function handleSubmit() {
    console.log("submit");
    console.log(props.title);
  }

  async function handleOpenToast() {
    setOpen(true);
  }

  async function handleCloseToast() {
    console.log("leave");

    setOpen(false);
  }

  return (
    <>
      {" "}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        message="Driver will receive an SMS on this phone number to register on Driver App"
        key={"top" + "center"}
      />
      <div className="container mx-auto">
        <div className="max-w-xl p-5 mx-auto my-10 bg-white rounded-md shadow-sm">
          <div className="text-center">
            <h1 className="my-3 text-3xl font-semibold text-gray-700">
              {props.title}
            </h1>
          </div>
          <div>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block mb-2 text-sm text-gray-600"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                required
                value={formValues.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
              />
            </div>
            {/* <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm text-gray-600"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@email.com"
                  required
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                />
              </div> */}
            <div className="mb-6">
              <label htmlFor="phoneNumber" className="text-sm text-gray-600">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="+62"
                required
                value={formValues.phoneNumber}
                onChange={handleInputChange}
                onFocus={handleOpenToast}
                onBlur={handleCloseToast}
                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="idCard" className="text-sm text-gray-600">
                ID Card
              </label>
              <input
                type="file"
                name="idCard"
                onChange={handleInputChange}
                required
                value={formValues.idCard}
                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="license" className="text-sm text-gray-600">
                Driver License
              </label>
              <input
                type="file"
                name="license"
                onChange={handleInputChange}
                required
                value={formValues.license}
                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
              />
            </div>
            <div className="mb-6">
              <button
                type="submit"
                className="w-full px-2 py-4 text-white bg-indigo-500 rounded-md  focus:bg-indigo-600 focus:outline-none"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormDriver;
