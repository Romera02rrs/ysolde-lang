// components/HamburguerNavBar.js
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "./ui/drawer";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import UserIcon from "./icons/UserIcon";

export default function HamburguerNavBar({
  isHandleHamburguerOpen,
  setIsHandleHamburguerOpen,
  isDarkMode,
  handleDarkModeToggle,
  handlePricingModalToggle,
  handleMoreModalToggle,
  handleLoginModalToggle,
}) {
  return (
    <Drawer
      open={isHandleHamburguerOpen}
      onOpenChange={(isOpen) => setIsHandleHamburguerOpen(isOpen)}
      position="right"
      className="w-full max-w-[300px]"
    >
      <DrawerContent className="p-5">
        <DrawerHeader className="p-5 justify-center">
          <DrawerTitle>Menu</DrawerTitle>
        </DrawerHeader>
        <div>
          <nav className="grid gap-4">
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
                  User
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
          </nav>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
