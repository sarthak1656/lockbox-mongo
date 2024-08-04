import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-900 text-white   ">
      <div className=" flex justify-between px-2 items-center h-4 py-7">
        <div className="logo font-bold">
          <span className="text-orange-500  text-2xl">&lt;</span>
          LOCK
          <span className="text-orange-500">BOX/&gt;</span>
        </div>
        {/* <ul>
          <li className="flex gap-3">
            <a className="hover:font-bold" href="/">
              Home
            </a>
            <a className="hover:font-bold" href="/home">
              About
            </a>
            <a className="hover:font-bold" href="/home">
              Contact
            </a>
          </li>
        </ul> */}
        <button className="text-white bg-orange-600 flex justify-center items-center rounded-full ring-1 ring-white">
         <img  className="invert p-1 w-10" src="/icons/github.svg" alt="" />
         <span className="font-bold pr-4"> <a href="https://github.com/">Github</a></span>
         
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
