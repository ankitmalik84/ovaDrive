// app/chat/components/TopNavigation.tsx
import React from "react";
import { Button } from "@/app/components/ui/button";

interface TopNavigationProps {
  onImageGenerate: () => void;
  onMusicGenerate: () => void;
  onScheduleEvent: () => void;
  onSummary: () => void;
}

const TopNavigation: React.FC<TopNavigationProps> = ({
  onImageGenerate,
  onMusicGenerate,
  onScheduleEvent,
  onSummary,
}) => {
  return (
    <div className="p-4 flex flex-col gap-2 z-20 rounded-xl relative bg-customBlack2">
      <h2 className="text-lg font-semibold bg-customBlack2">
        Try features like-
      </h2>
      <div className="flex flex-wrap gap-2 bg-customBlack2">
        <Button
          variant="outline"
          className="text-white border-white border-opacity-75 rounded-xl"
          onClick={onImageGenerate} // Add onClick handler
        >
          Generate an image for me
        </Button>
        <Button
          variant="outline"
          className="text-white border-white border-opacity-75 rounded-xl"
          onClick={onMusicGenerate} // Add onClick handler
        >
          Generate a music for me
        </Button>
        <Button
          variant="outline"
          className="text-white border-white border-opacity-75 rounded-xl"
          onClick={onScheduleEvent} // Add onClick handler
        >
          Schedule an event for me on calendar
        </Button>
        <Button
          variant="outline"
          className="text-white border-white border-opacity-75 rounded-xl"
          onClick={onSummary} // Add onClick handler
        >
          Write a summary of past 24 hours
        </Button>
      </div>
    </div>
  );
};

export default TopNavigation;
