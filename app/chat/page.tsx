// app/chat/page.tsx

"use client";

import React, { useState, useEffect, useRef } from "react";
import { CalendarComp } from "@/app/chat/components/Calendar";
import { Button } from "@/app/components/ui/button";
import { Clock4, Smile, Album, Paperclip, Headphones } from "lucide-react";
import NavBar from "../components/NavBar";

// WEBSOCKETS IMPLEMENTATION FOR CHAT FUNCTIONALITY AND PRISMA IMPLEMENTATION FOR DB OPERATIONS WILL BE REMAINING
// IMPLEMENTATION OF SHOW CHATS FOR SELECTED DATE WILL BE REMAINING
// IMPLEMENTATION OF SCHEDULED ACTIONS WILL BE REMAINING
// IMPLEMENTATION OF SUMMARY PROMPTS WILL BE REMAINING
// IMPLEMENTATION OF MEDIA UPLOAD FUNCTIONALITY WILL BE REMAINING
// IMPLEMENTATION OF CALENDAR FUNCTIONALITY WILL BE REMAINING

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [showMediaOptions, setShowMediaOptions] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "model",
      content: "Hello, how can I assist you today?",
      time: "10:00 AM",
    },
    {
      sender: "user",
      content: "Can you tell me about the weather?",
      time: "10:01 AM",
    },
  ]);

  const mediaPopUp = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  // Handle scroll to the bottom when messages are updated
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Handle click outside of media options popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mediaPopUp.current &&
        !mediaPopUp.current.contains(event.target as Node)
      ) {
        setShowMediaOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMediaOptions]);

  // Event handler for message input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  // Handle sending a message and simulate a response from the model
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const currentTime = new Date().toLocaleTimeString("en-US", options);

    if (message.trim()) {
      const newMessage = {
        sender: "user",
        content: message,
        time: currentTime,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage("");

      // Simulate model response after 1 second
      setTimeout(() => {
        const modelMessage = {
          sender: "model",
          content: "The weather is sunny today with a high of 25°C.",
          time: new Date().toLocaleTimeString("en-US", options),
        };
        setMessages((prevMessages) => [...prevMessages, modelMessage]);
      }, 1000);
    }
  };

  // Toggle the media options popup
  const toggleMediaOptions = () => {
    setShowMediaOptions(!showMediaOptions);
  };

  const handleSummaryPromptClick = (prompt: string) => {
    console.log("Summary prompt clicked:", prompt);
    // Implement your logic here
  };

  const handleScheduledActionClick = (action: string) => {
    console.log("Scheduled action clicked:", action);
    // Implement your logic here
  };

  return (
    <div className="h-screen pb-4 xl:pb-14 2xl:pb-20 pt-2 md:px-12 lg:px-16 ">
      <NavBar />
      <div className="flex gap-2 h-full">
        {/* Left Sidebar */}
        <div className=" lg:w-[22%] xl:w-[23%] m-3 2xl:m-5 hidden lg:flex flex-col">
          {/* Left side Utilities */}
          <div className="flex flex-col">
            <h2 className="text-sm 2xl:text-base font-semibold mb-4 text-gray-400">
              Summary prompts
            </h2>
            <ul className="space-y-4 3xl:space-y-6">
              <li>
                <button
                  className="flex items-center w-full text-left text-sm 2xl:text-base"
                  onClick={() => handleSummaryPromptClick("Upcoming events")}
                >
                  <img
                    src="/images/icons/calendar.png"
                    alt="summary"
                    className="mr-2 h-4 2xl:h-6 w-4 2xl:w-6 object-cover"
                  />
                  Upcoming events
                </button>
              </li>
              <li>
                <button
                  className="flex items-center w-full text-left text-sm 2xl:text-base"
                  onClick={() => handleSummaryPromptClick("Summary about you")}
                >
                  <img
                    src="/images/icons/notes.png"
                    alt="summary"
                    className="mr-2 h-4 2xl:h-6 w-4 2xl:w-6 object-cover"
                  />
                  Summary about you
                </button>
              </li>
              <li>
                <button
                  className="flex items-center w-full text-left text-sm 2xl:text-base"
                  onClick={() =>
                    handleSummaryPromptClick("Guess your astrological sign")
                  }
                >
                  <img
                    src="/images/icons/star.png"
                    alt="summary"
                    className="mr-2 h-4 2xl:h-6 w-4 2xl:w-6 invert"
                  />
                  Guess your astrological sign
                </button>
              </li>
            </ul>
            <h2 className="text-sm 2xl:text-base font-semibold mt-4 3xl:mt-8 mb-4 text-gray-400">
              Scheduled actions
            </h2>
            <ul className="space-y-4 3xl:space-y-6 mb-6">
              <li>
                <button
                  className="flex items-center justify-between w-full text-left"
                  onClick={() => handleScheduledActionClick("Today's summary")}
                >
                  <span className="flex items-center text-sm 2xl:text-base">
                    <Clock4 className="mr-2 h-4 2xl:h-6 w-4 2xl:w-6" /> Today's
                    summary
                  </span>
                  <span className="text-xs text-gray-400">08:30 pm</span>
                </button>
              </li>
              <li>
                <button
                  className="flex items-center justify-between w-full text-left"
                  onClick={() =>
                    handleScheduledActionClick("Sentimental score")
                  }
                >
                  <span className="flex items-center text-sm 2xl:text-base">
                    <Smile className="mr-2 h-4 2xl:h-6 w-4 2xl:w-6" />{" "}
                    Sentimental score
                  </span>
                  <span className="text-xs text-gray-400">08:30 pm</span>
                </button>
              </li>
              <li>
                <button
                  className="flex items-center justify-between w-full text-left"
                  onClick={() =>
                    handleScheduledActionClick("Poem about your day")
                  }
                >
                  <span className="flex items-center text-sm 2xl:text-base">
                    <Album className="mr-2 h-4 2xl:h-6 w-4 2xl:w-6" /> Poem
                    about your day
                  </span>
                  <span className="text-xs text-gray-400">08:30 pm</span>
                </button>
              </li>
            </ul>
          </div>
          {/* Calendar Component */}
          <div className="mt-auto">
            <CalendarComp />
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 w-[100%] lg:w-[78%] xl:w-[77%] flex flex-col justify-between rounded-xl bg-customBlack2 relative">
          {/* Top Navigation */}
          <div className="p-4 flex flex-col gap-2 z-20 rounded-xl relative bg-customBlack2">
            <h2 className="text-lg font-semibold bg-customBlack2">
              Try features like-
            </h2>
            <div className="flex flex-wrap gap-2 bg-customBlack2">
              <Button
                variant="outline"
                className="text-white border-white border-opacity-75 rounded-xl"
              >
                Generate an image for me
              </Button>
              <Button
                variant="outline"
                className="text-white border-white border-opacity-75 rounded-xl "
              >
                Generate a music for me
              </Button>
              <Button
                variant="outline"
                className="text-white border-white border-opacity-75 rounded-xl"
              >
                Schedule an event for me on calendar
              </Button>
              <Button
                variant="outline"
                className="text-white border-white border-opacity-75 rounded-xl "
              >
                Write a summary of past 24 hours
              </Button>
            </div>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 pt-28 pb-16 p-4 overflow-y-auto z-10 absolute top-0 bottom-0 w-full">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                } mb-4`}
              >
                {msg.sender === "model" && (
                  <img
                    src="/images/logo.png"
                    alt="model logo"
                    className="h-7 w-7 mr-2"
                  />
                )}
                <div
                  className={`max-w-[80%] p-3  rounded-xl text-white ${
                    msg.sender === "model"
                      ? "bg-[#A600FC] rounded-tl-none"
                      : "bg-customPurple bg-opacity-40 rounded-tr-none"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-xs mt-2 text-right">{msg.time}</p>
                </div>
              </div>
            ))}
            {/* Invisible div to anchor the scroll position */}
            <div ref={bottomRef} />
          </div>

          {/* Message Input */}
          <form
            onSubmit={handleSendMessage}
            className="p-4 bg-customBlack2 flex items-center relative z-20 rounded-b-xl max-h-32"
          >
            {/* media upload options */}
            {showMediaOptions && (
              <div
                ref={mediaPopUp}
                className="absolute bottom-20 left-4 bg-customGray rounded-xl p-4 shadow-lg flex gap-4 z-50"
              >
                <div className="flex flex-col items-center gap-2">
                  <button className="h-10 w-10 bg-customPurple rounded-full text-center flex justify-center items-center text-white">
                    <img
                      src="/images/icons/camera.png"
                      className="h-7 w-7 invert"
                      alt="document icon"
                    />
                  </button>
                  <span className="text-xs">Camera</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <button className="h-10 w-10 bg-customPurple rounded-full text-center flex justify-center items-center text-white">
                    <img
                      src="/images/icons/document.png"
                      className="h-7 w-7 invert"
                      alt="document icon"
                    />
                  </button>
                  <span className="text-xs">Document</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <button className="h-10 w-10 bg-customPurple rounded-full text-center flex justify-center items-center text-white">
                    <img
                      src="/images/icons/gallery.png"
                      className="h-7 w-7 invert"
                      alt="gallery icon"
                    />
                  </button>
                  <span className="text-xs">Gallery</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <button className="h-10 w-10 bg-customPurple rounded-full text-center flex justify-center items-center text-white">
                    <Headphones className="h-7 w-7 text-white-500" />
                  </button>
                  <span className="text-xs">Audio</span>
                </div>
              </div>
            )}

            <div className="flex items-center h-auto flex-1 bg-customBlack text-white border-none rounded-xl relative">
              {/* Media Toggle Button */}
              <button
                type="button"
                className="absolute left-0 ml-2"
                onClick={toggleMediaOptions}
              >
                <Paperclip className="h-5 w-5" />
              </button>
              {/* Input Field */}
              <textarea
                placeholder="Type here"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown} // Handle key down events
                className="pt-3 pl-10 w-full bg-customBlack text-white border-none h-12 rounded-xl"
                style={{ maxHeight: "12rem" }}
              ></textarea>
            </div>
            {/* Send Button */}
            <Button
              type="submit"
              className="ml-2 w-10 h-10 bg-purple-600 rounded-full flex justify-center items-center"
            >
              <img
                src="/images/icons/send.png"
                className="h-6 w-6 invert"
                alt="send icon"
              />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
