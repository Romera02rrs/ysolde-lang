import { Button } from "../components/ui/button";
import MicIcon from "./icons/MicIcon";
import { useState, useRef } from "react";

export default function MainContent({
  isDarkMode,
  handleConversationPanelToggle,
  handleModalToggle,
}) {
  const [recording, setRecording] = useState(false);
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const requestMicPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      setPermissionsGranted(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Microphone access denied.");
    }
  };

  const handleAudio = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Your browser does not support audio recording.");
      return;
    }

    if (!recording) {
      console.log("Recording");

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: "audio/webm",
        });
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorder.start();
        setRecording(true);
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    } else {
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });

        const formData = new FormData();
        formData.append("file", audioBlob, "audio.webm");

        const transcription = await fetch("/api/speech-to-text", {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => data.transcription);

        const chatResponse = await fetch("/api/chat", {
          method: "POST",
          body: JSON.stringify({ prompt: transcription }),
        })
          .then((res) => res.json())
          .then((data) => data.response);

        console.log("Chat: ", chatResponse);

        const token = localStorage.getItem("token");

        const saveConversationResponse = await fetch("api/saveConversation", {
          method: "POST",
          body: JSON.stringify({ text: chatResponse, token: token }),
        }).then((res) => res.json());

        const audioUrl = saveConversationResponse.audioUrl;

        const audioIA = new Audio(audioUrl);
        audioIA.play();

        audioChunksRef.current = [];
      };

      console.log("Stop recording");
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      setRecording(false);
    }
  };

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
          } ${recording ? "animate-pulse" : ""}`}
        />
        <button
          className={`relative z-10 w-[240px] h-[240px] rounded-full ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } flex items-center justify-center transition-transform ${
            recording ? "animate-wiggle" : "hover:scale-105"
          } shadow-md`}
          onClick={permissionsGranted ? handleAudio : null}
          disabled={!permissionsGranted}
        >
          <MicIcon
            className={`w-16 h-16 ${
              isDarkMode ? "text-gray-300" : "text-[#0077b6]"
            } ${recording ? "animate-shake animate-spin" : ""}`}
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
          onClick={requestMicPermission}
          className={`${
            permissionsGranted
              ? "bg-gray-400 text-gray-600 cursor-not-allowed"
              : isDarkMode
              ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
              : "bg-white text-[#0077b6] hover:bg-gray-200"
          } mb-4`}
        >
          {permissionsGranted ? "Permissions Granted" : "Request Microphone Access"}
        </Button>
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
