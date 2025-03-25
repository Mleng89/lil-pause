import { useState } from "react";

const GoodThingLogger: React.FC = () => {
  const [entry, setEntry] = useState<string>("");
  const currentDate = new Date().toLocaleDateString();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!entry.trim()) return;

    const existingEntry = localStorage.getItem(currentDate);

    const updatedEntry = existingEntry
      ? `${existingEntry}\n\n• ${entry.trim()}`
      : `• ${entry.trim()}`;

    localStorage.setItem(currentDate, updatedEntry);
    setEntry("");
    console.log("this is the entry", localStorage);
  }
  return (
    <div className="px-4">
      <h1 className="text-xl text-center">Daily Journal</h1>
      <p>Today's date: {currentDate}</p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 max-w-md mx-auto"
      >
        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Type here..."
          className="p-2 border rounded resize-none"
          rows={4}
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
      <p className="text-sm text-center">
        Note: Your entries are saved locally in your browser. Clearing browser
        data will erase them. Want to back them up? Export your entries!
      </p>
      <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">
        {" "}
        Export{" "}
      </button>
      <h2 className="text-md">Entries:</h2>
      <div className="border p-2 rounded whitespace-pre-line">
        {localStorage.getItem(currentDate) ? (
          <p>{localStorage.getItem(currentDate)}</p>
        ) : (
          <p>No entries yet!</p>
        )}
      </div>
    </div>
  );
};

export default GoodThingLogger;
