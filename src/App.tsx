import { useState } from "react";
import DailyPrompt from "./components/daily-prompt";
import GoodThingLogger from "./components/good-thing-logger";
import Footer from "./components/footer";
import "./App.css";

const App = () => {
  const [view, setView] = useState<"randomizer" | "logger">("randomizer");

  return (
    <div className="flex flex-col min-h-screen bg-dark-50">
      <main className="flex-grow">
        <div className="flex justify-center gap-4 mb-6">
          <button onClick={() => setView("randomizer")}>🧘 Self-Care</button>
          <button onClick={() => setView("logger")}>📅 Daily Logger</button>
        </div>
        {view === "randomizer" ? <DailyPrompt /> : <GoodThingLogger />}
      </main>
      <Footer />
    </div>
  );
};

export default App;
