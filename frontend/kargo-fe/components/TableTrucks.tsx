import React from "react";

export default function TableTrucks() {
  const products = [
    { id: 1, name: "B 1234 A", truckType: "Tronton", plateType: "Yellow", productionYear: "2001", status: "Active" },
    { id: 2, name: "B 1234 A", truckType: "Tronton", plateType: "Yellow", productionYear: "2001", status: "Active" },
    { id: 3, name: "B 1234 A", truckType: "Tronton", plateType: "Yellow", productionYear: "2001", status: "Active" },
  ];
  return (
    <div>
      <div className="p-5 flex flex-row justify-between">
        <div>
          <select
            id="underline_select"
            className="block py-2.5 px-0 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          >
            <option selected>Choose a country</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
        </div>

        <div>
          <label>
            <input
              className="placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Search for anything..."
              type="text"
              name="search"
            />
          </label>
        </div>
      </div>
      {/* Table */}
      <div className="mt-10 px-5 rd1200:px-30 overflow-auto">
        <table className="w-full rounded-md">
          <thead className="bg-slate-500">
            <tr className="bg-text-secondary shadow-sm text-center">
              <th className="border border-black p-2">License Number</th>
              <th className="border border-black">Truck Type</th>
              <th className="border border-black">Plate type</th>
              <th className="border border-black">Production year</th>
              <th className="border border-black"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="text-center border">
                <td className="border p-3">{product.name}</td>
                <td className="border">{product.truckType}</td>
                <td className="border">{product.plateType}</td>
                <td className="border">{product.productionYear}</td>
                <td className="border">{product.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
