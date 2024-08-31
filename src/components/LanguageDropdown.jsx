import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../components/ui/dropdown-menu";
import Flag from "react-world-flags";

export const LanguageDropdown = ({ setLanguage }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-gray-200 p-2 rounded">
        Select Language
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setLanguage("ES")}>
          <Flag code="ES" className="inline-block mr-2 w-6 h-6" />
          Español
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("FR")}>
          <Flag code="FR" className="inline-block mr-2 w-6 h-6" />
          Français
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("PT")}>
          <Flag code="PT" className="inline-block mr-2 w-6 h-6" />
          Português
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
