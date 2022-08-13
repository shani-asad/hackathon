import React from "react";

export default function EditTruck() {
  return (
    <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none m-auto max-w-[500px]">
      <h3 className="pt-4 text-2xl text-center">Add New Unit</h3>
      <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">License Number</label>
          <input className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="licenseNumber" type="text" placeholder="License Number" />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">License Type</label>
          <select className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline">
            <option value="yellow">Yellow</option>
            <option value="black">Black</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">Truck Type</label>
          <select className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline">
            <option value="yellow">Tronton</option>
            <option value="black">Container</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">STNK</label>
          <input className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="file_input" type="file" accept="image/png, image/jpg, image/jpeg" />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">KIR</label>
          <input className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="file_input" type="file" accept="image/png, image/jpg, image/jpeg" />
        </div>

        <div className="mb-4 text-center">
          <button className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="button">
            Submit
          </button>
        </div>
        <hr className="mb-6 border-t" />
      </form>
    </div>
  );
}
