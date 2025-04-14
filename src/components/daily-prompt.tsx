import React, { useState, useEffect } from "react";
import prompts from "../data/prompts.json";

const DailyPrompt: React.FC = () => {
  type PromptKey = keyof typeof prompts;
  const promptKeys = Object.keys(prompts) as PromptKey[];
  const today = () => {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    const dayOfWeek = date.getDay();
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return `${daysOfWeek[dayOfWeek]} ${month}/${day}/${year}`;
  };

  const hash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
  };

  const [redoCount, setRedoCount] = useState<number>(() => {
    const storedRedoCount = localStorage.getItem(`redoCount-${today}`);
    return storedRedoCount ? parseInt(storedRedoCount, 10) : 0;
  });

  const index = (hash(today()) + redoCount) % promptKeys.length;
  const randomKey = promptKeys[index];
  const randomPrompt = prompts[randomKey];

  const handleRedo = () => {
    setRedoCount((prev) => {
      const newRedoCount = prev + 1;
      // Store the updated redo count in local storage
      localStorage.setItem(`redoCount-${today}`, newRedoCount.toString());
      return newRedoCount;
    });
  };

  // Ensure redoCount is stored in local storage on initial load
  useEffect(() => {
    localStorage.setItem(`redoCount-${today}`, redoCount.toString());
  }, [redoCount, today]);

  return (
    <div className="max-w-xl mx-auto p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Daily Prompt</h1>
      <h2 className="text-1xl font-bold mb-4"> {today()}</h2>
      <p className="text-lg bg-gray-900 p-4 rounded">{randomPrompt}</p>
      <button
        onClick={handleRedo}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Redo
      </button>
    </div>
  );
};

export default DailyPrompt;
