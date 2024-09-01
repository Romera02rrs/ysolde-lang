"use client";

import { useState } from "react";
import Header from "../components/Header";
import MainContent from "../components/MainContent";
import Dialogs from "../components/Dialogs";
import HamburguerNavBar from "../components/HamburguerNavBar";
import DrawerConversation from "../components/DrawerConversation";

const conversations = [
  {
    avatarSrc: "/placeholder-user.jpg",
    initials: "JD",
    title: "Conversation 1",
    description: "Discussing grammar rules and sentence structure.",
  },
  {
    avatarSrc: "/placeholder-user.jpg",
    initials: "JD",
    title: "Conversation 2",
    description: "Learning new vocabulary.",
  },
  {
    avatarSrc: "/placeholder-user.jpg",
    initials: "JD",
    title: "Conversation 3",
    description: "Talking about cultural differences.",
  },
];

export default function Component() {
  const [isRecording, setIsRecording] = useState(false);
  const [isHandleHamburguerOpen, setIsHandleHamburguerOpen] = useState(false);
  const [isConversationPanelOpen, setIsConversationPanelOpen] = useState(false);
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [isMoreModalOpen, setIsMoreModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [languague, setLanguage] = useState('ES')

  const handleMicClick = () => setIsRecording((prev) => !prev);
  const handleHamburguerOpen = () => setIsHandleHamburguerOpen((prev) => !prev);
  const handleModalToggle = () => setIsTopicModalOpen((prev) => !prev);
  const handlePricingModalToggle = () => setIsPricingModalOpen((prev) => !prev);
  const handleMoreModalToggle = () => setIsMoreModalOpen((prev) => !prev);
  const handleDarkModeToggle = () => setIsDarkMode((prev) => !prev);
  const handleLoginModalToggle = () => setIsLoginModalOpen((prev) => !prev);
  const handleConversationPanelToggle = () =>
    setIsConversationPanelOpen((prev) => !prev);

  const navBarProps = {
    handleDarkModeToggle,
    handlePricingModalToggle,
    handleMoreModalToggle,
    handleLoginModalToggle,
    isDarkMode,
  };

  return (
    <div
      className={`flex flex-col min-h-screen font-sans ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <Header
        isDarkMode={isDarkMode}
        handleHamburguerOpen={handleHamburguerOpen}
        {...navBarProps}
      />
      <HamburguerNavBar
        isHandleHamburguerOpen={isHandleHamburguerOpen}
        setIsHandleHamburguerOpen={setIsHandleHamburguerOpen}
        isDarkMode={isDarkMode}
        handleDarkModeToggle={handleDarkModeToggle}
        handlePricingModalToggle={handlePricingModalToggle}
        handleMoreModalToggle={handleMoreModalToggle}
        handleLoginModalToggle={handleLoginModalToggle}
      />
      <DrawerConversation
        isConversationPanelOpen={isConversationPanelOpen}
        setIsConversationPanelOpen={setIsConversationPanelOpen}
        conversations={conversations}
      />
      <MainContent
        isDarkMode={isDarkMode}
        isRecording={isRecording}
        handleMicClick={handleMicClick}
        handleConversationPanelToggle={handleConversationPanelToggle}
        handleModalToggle={handleModalToggle}
      />
      <Dialogs
        isTopicModalOpen={isTopicModalOpen}
        setIsTopicModalOpen={setIsTopicModalOpen}
        isMoreModalOpen={isMoreModalOpen}
        setIsMoreModalOpen={setIsMoreModalOpen}
        isPricingModalOpen={isPricingModalOpen}
        setIsPricingModalOpen={setIsPricingModalOpen}
        isLoginModalOpen={isLoginModalOpen}
        setIsLoginModalOpen={setIsLoginModalOpen}
        isDarkMode={isDarkMode}
        setLanguage={setLanguage}
      />
    </div>
  );
}
