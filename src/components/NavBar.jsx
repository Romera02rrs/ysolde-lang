import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export default function NavBar({
  isDarkMode,
  handleDarkModeToggle,
  handlePricingModalToggle,
  handleMoreModalToggle,
  handleLoginModalToggle,
}) {
  
  return (
    <nav className="hidden md:flex space-x-4">
      <div>
        <Button
          variant="outline"
          onClick={handlePricingModalToggle}
          className={`${
            isDarkMode
              ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
              : "bg-white text-[#0077b6] hover:bg-gray-200"
          }`}
        >
          Pricing
        </Button>
      </div>
      <div>
        <Button
          variant="outline"
          onClick={handleDarkModeToggle}
          className={`${
            isDarkMode
              ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
              : "bg-white text-[#0077b6] hover:bg-gray-200"
          }`}
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </Button>
      </div>
      <div>
        <Button
          variant="outline"
          onClick={handleMoreModalToggle}
          className={`${
            isDarkMode
              ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
              : "bg-white text-[#0077b6] hover:bg-gray-200"
          }`}
        >
          More
        </Button>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={`${
                isDarkMode
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-white text-[#0077b6] hover:bg-gray-200"
              }`}
            >
              <UserIcon className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleLoginModalToggle}>
              Log In
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLoginModalToggle}>
              Register
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}