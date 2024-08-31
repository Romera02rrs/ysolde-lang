// components/MainContent.js
import { Button } from "../components/ui/button";
import MicIcon from "./icons/MicIcon";

export default function MainContent({
  isDarkMode,
  isRecording,
  handleMicClick,
  handleConversationPanelToggle,
  handleModalToggle,
}) {
  return (
    <main
      className={`flex flex-col items-center justify-center flex-1 p-4 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-800 to-gray-700"
          : "bg-gradient-to-br from-[#0077b6] to-[#00b7ff]"
      }`}
    >
      <div
        className={`relative w-full max-w-[300px] h-[300px] rounded-full ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } flex items-center justify-center cursor-pointer shadow-lg`}
      >
        <div
          className={`absolute w-[280px] h-[280px] rounded-full ${
            isDarkMode ? "bg-gray-700" : "bg-[#0077b6]"
          } ${isRecording ? "animate-pulse" : ""}`}
        />
        <button
          className={`relative z-10 w-[240px] h-[240px] rounded-full ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } flex items-center justify-center transition-transform ${
            isRecording ? "animate-wiggle" : "hover:scale-105"
          } shadow-md`}
          onClick={handleMicClick}
        >
          <MicIcon
            className={`w-16 h-16 ${
              isDarkMode ? "text-gray-300" : "text-[#0077b6]"
            } ${isRecording ? "animate-shake" : ""}`}
          />
        </button>
      </div>
      <p
        className={`mt-8 text-2xl font-medium ${
          isDarkMode ? "text-gray-300" : "text-white"
        }`}
      >
        Speak to your English Practice AI
      </p>
      <div className="flex flex-col justify-center gap-4 mt-8 w-full sm:flex-row">
        <Button
          variant="outline"
          onClick={handleConversationPanelToggle}
          className={`${
            isDarkMode
              ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
              : "bg-white text-[#0077b6] hover:bg-gray-200"
          }`}
        >
          Previous Conversations
        </Button>
        <Button
          variant="outline"
          onClick={handleModalToggle}
          className={`${
            isDarkMode
              ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
              : "bg-white text-[#0077b6] hover:bg-gray-200"
          }`}
        >
          Select Conversation Topic
        </Button>
      </div>
    </main>
  );
}
