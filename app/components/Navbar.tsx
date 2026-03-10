import React from "react";
import { Plus } from "lucide-react";
import { logout } from "../actions/auth";
const Navbar = () => {
  const handleLogout = async () => {
    await logout();
  };
  return (
    <header className="border-b border-gray-300 bg-white  text-gray-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-5 lg:px-8 flex items-center justify-between">
        <a href='#hero' className="space-y-0">
          <h1 className="text-2xl font-light tracking-tight ">Expenses</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Track your spending mindfully
          </p>
        </a>
        <div className="flex gap-10 items-center">
          <a
            href="#analytics"
            className="text-xs uppercase tracking-widest text-gray-500 hover:text-green-800 transition-colors"
          >
            Overview
          </a>
          <a
            href="#transactions"
            className="text-xs uppercase tracking-widest text-gray-500 hover:text-green-800 transition-colors"
          >
            Transactions
          </a>
          <a
            href="#add-expense"
            className="text-xs uppercase tracking-widest text-white bg-green-800 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors"
          >
            + Add
          </a>
          <button
            onClick={handleLogout}
            className="gap-2 flex items-center border bg-gray-50 cursor-pointer border-gray-300 p-2 rounded-lg"
          >
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
