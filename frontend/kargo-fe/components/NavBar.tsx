import React from "react";

function NavBar() {
  return (
    <div className="border">
      <nav className="px-2 sm:px-4 py-2.5 rounded ">
        <div className="container flex flex-wrap items-center mx-auto">
          <a href="#" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap">LMS</span>
          </a>
          <p className="px-20">|</p>
          <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="navbar-hidden">
            <ul className="flex space-between p-4 mt-4 rounded-lg border md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
              <li>
                <a href="/trucks" className="py-2 pr-4 pl-3 rounded">
                  Trucks
                </a>
              </li>
              <li>
                <a href="/drivers" className="py-2 pr-4 pl-3">
                  Drivers
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
