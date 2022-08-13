import React from "react";

export default function TableTrucks() {
  const products = [
    { id: 1, license: "B 1234 A", truckType: "Tronton", plateType: "Yellow", productionYear: "2001", status: "Active" },
    { id: 2, license: "B 1234 A", truckType: "Tronton", plateType: "Yellow", productionYear: "2001", status: "Active" },
    { id: 3, license: "B 1234 A", truckType: "Tronton", plateType: "Yellow", productionYear: "2001", status: "Active" },
  ];
  const handleDetailTrucks = () => {
    
  }

  return (
    <div>
      <div className="p-5 flex flex-row justify-between">
        <div>
          <div className="relative inline-flex">
            <svg className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232">
              <path
                d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                fill="#648299"
              />
            </svg>
            <select className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
              <option>Truck Type</option>
              <option value="tronton">Tronton</option>
              <option value="container  ">Container</option>
            </select>
          </div>
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
        <table className="w-full m-auto rounded-md max-w-[1500px]">
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
                <td className="border p-3" onClick={handleDetailTrucks}>{product.license}</td>
                <td className="border">{product.truckType}</td>
                <td className="border">{product.plateType}</td>
                <td className="border">{product.productionYear}</td>
                <td className="border">
                  <div className="relative inline-flex">
                    <svg className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232">
                      <path
                        d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                        fill="#648299"
                      />
                    </svg>
                    <select className="border border-gray-300 text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
                      <option>Update Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inctive</option>
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
