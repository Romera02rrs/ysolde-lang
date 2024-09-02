"use client";

// components/Dialog.jsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import terms from "../content/legalterms";
import { LanguageDropdown } from "./LanguageDropdown";
import { useState } from "react";

export default function Dialogs({
  isTopicModalOpen,
  setIsTopicModalOpen,
  isMoreModalOpen,
  setIsMoreModalOpen,
  isPricingModalOpen,
  setIsPricingModalOpen,
  isLoginModalOpen,
  setIsLoginModalOpen,
  isDarkMode,
  setLanguage,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("User registered:", data.message);
        alert("Registration successful. You can now log in.");
      } else {
        console.error("Error registering user:", data.error);
        alert(`Registration failed: ${data.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Login successful:", data.message);
        localStorage.setItem("token", data.token); // Guardar el token en el localStorage
        alert("Login successful");
        setIsLoginModalOpen(false); // Cerrar el modal después de iniciar sesión
      } else {
        console.error("Error logging in:", data.error);
        alert(`Login failed: ${data.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Topic Selection Dialog */}
      <Dialog open={isTopicModalOpen} onOpenChange={setIsTopicModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Select Conversation Topic</DialogTitle>
            <DialogDescription>
              Choose a topic to start a new conversation.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Button
              variant="outline"
              className={`w-full ${
                isDarkMode
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-white text-[#0077b6] hover:bg-gray-200"
              }`}
            >
              Grammar and Sentence Structure
            </Button>
            <Button
              variant="outline"
              className={`w-full ${
                isDarkMode
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-white text-[#0077b6] hover:bg-gray-200"
              }`}
            >
              Vocabulary and Idioms
            </Button>
            <Button
              variant="outline"
              className={`w-full ${
                isDarkMode
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-white text-[#0077b6] hover:bg-gray-200"
              }`}
            >
              Cultural Differences and Etiquette
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* More Information Dialog */}
      <Dialog open={isMoreModalOpen} onOpenChange={setIsMoreModalOpen}>
        <DialogContent className="sm:max-w-[500px] space-y-4">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              More Information
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-2">
            <h3 className="text-md font-medium">Contact</h3>
            <DialogDescription>
              <a
                href="mailto:contacto@rubenromera.com"
                className="text-blue-600 underline"
              >
                contacto@rubenromera.com
              </a>
            </DialogDescription>
          </div>

          <div className="space-y-2">
            <h3 className="text-md font-medium">Language</h3>
            <DialogDescription>
              <LanguageDropdown setLanguage={setLanguage} />
            </DialogDescription>
          </div>

          <div className="space-y-2">
            <h3 className="text-md font-medium">Copyright</h3>
            <DialogDescription>
              &copy; 2024 Ysolde. All rights reserved.
            </DialogDescription>
          </div>

          <div className="space-y-2">
            <h3 className="text-md font-medium">Terms and Policies</h3>
            <DialogDescription>
              <textarea
                readOnly
                className="w-full h-32 p-2 border rounded-md resize-none overflow-y-scroll bg-gray-100"
                value={terms}
              />
            </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>

      {/* Pricing Dialog */}
      <Dialog open={isPricingModalOpen} onOpenChange={setIsPricingModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Pricing</DialogTitle>
            <DialogDescription>
              Choose a pricing plan that suits your needs.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Card
              className={`${
                isDarkMode
                  ? "bg-gray-800 text-gray-300"
                  : "bg-white text-gray-900"
              }`}
            >
              <CardHeader>
                <CardTitle>Basic</CardTitle>
                <CardDescription>$9/month</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>
                    <CheckIcon
                      className={`w-4 h-4 ${
                        isDarkMode ? "text-green-400" : "text-green-500"
                      } mr-2`}
                    />
                    Access to basic features
                  </li>
                  <li>
                    <CheckIcon
                      className={`w-4 h-4 ${
                        isDarkMode ? "text-green-400" : "text-green-500"
                      } mr-2`}
                    />
                    Limited conversation topics
                  </li>
                  <li>
                    <XIcon
                      className={`w-4 h-4 ${
                        isDarkMode ? "text-red-400" : "text-red-500"
                      } mr-2`}
                    />
                    No custom conversation topics
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className={`w-full ${
                    isDarkMode
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      : "bg-white text-[#0077b6] hover:bg-gray-200"
                  }`}
                >
                  Select Plan
                </Button>
              </CardFooter>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      {/* Login/Register Dialog */}
      <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Log In or Register</DialogTitle>
            <DialogDescription>
              Access your account or create a new one.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              className={`w-full ${
                isDarkMode
                  ? "bg-gray-800 text-gray-300 focus:bg-gray-700 focus:text-gray-200"
                  : "bg-white text-gray-900 focus:bg-gray-200 focus:text-gray-900"
              }`}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className={`w-full ${
                isDarkMode
                  ? "bg-gray-800 text-gray-300 focus:bg-gray-700 focus:text-gray-200"
                  : "bg-white text-gray-900 focus:bg-gray-200 focus:text-gray-900"
              }`}
            />
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={handleLogin}
                disabled={isLoading}
                className={`${
                  isDarkMode
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    : "bg-white text-[#0077b6] hover:bg-gray-200"
                }`}
              >
                {isLoading ? "Logging In..." : "Log In"}
              </Button>
              <Button
                variant="outline"
                onClick={handleRegister}
                disabled={isLoading}
                className={`${
                  isDarkMode
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    : "bg-white text-[#0077b6] hover:bg-gray-200"
                }`}
              >
                {isLoading ? "Registering..." : "Register"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function CheckIcon(props) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function XIcon(props) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
