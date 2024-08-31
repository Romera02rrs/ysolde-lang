// components/Header.js
import NavBar from "./NavBar";
import { Button } from "../components/ui/button";
import MenuIcon from "./icons/MenuIcon";

export default function Header({ isDarkMode, handleHamburguerOpen, ...navBarProps }) {
  return (
    <header
      className={`py-4 px-6 ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-[#0077b6] text-white"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">English Practice AI</h1>
        <NavBar isDarkMode={isDarkMode} {...navBarProps} />
        <div className="flex md:hidden">
          <Button
            variant="outline"
            onClick={handleHamburguerOpen}
            className={`${
              isDarkMode
                ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                : "bg-white text-[#0077b6] hover:bg-gray-200"
            }`}
          >
            <MenuIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
