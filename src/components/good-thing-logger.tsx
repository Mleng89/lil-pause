import { useState } from "react";
import jsPDF from "jspdf";

const GoodThingLogger: React.FC = () => {
  const [entry, setEntry] = useState<string>("");
  const [editingDate, setEditingDate] = useState<string | null>(null);
  const [editedEntry, setEditedEntry] = useState<string>("");
  const currentDate = new Date().toLocaleDateString();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!entry.trim()) return;

    const existingEntry = localStorage.getItem(currentDate);

    const updatedEntry = existingEntry
      ? `${existingEntry}\n\n ${entry.trim()}`
      : ` ${entry.trim()}`;

    localStorage.setItem(currentDate, updatedEntry);
    setEntry("");
    console.log("this is the entry", localStorage.getItem(currentDate));
  }
  function handleEdit(date: string) {
    const entries = localStorage.getItem(date);
    if (entries) {
      setEditedEntry(entries);
      setEditingDate(date);
    }
  }

  function handleSaveEdit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editedEntry.trim() || !editingDate) return;

    localStorage.setItem(editingDate, editedEntry.trim());
    setEditingDate(null);
    setEditedEntry("");
  }

  function handleExport() {
    // Initialize PDF document
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPosition = 20;

    // Add title
    doc.setFontSize(20);
    doc.text("Daily Journal Entries", pageWidth / 2, yPosition, {
      align: "center",
    });
    yPosition += 20;

    // Set font size for content
    doc.setFontSize(12);

    // Collect and sort entries by date
    const entries: { [key: string]: string } = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        // Only include entries that are valid dates
        try {
          const date = new Date(key);
          if (!isNaN(date.getTime())) {
            const value = localStorage.getItem(key);
            if (value && !value.includes("redoCount")) {
              entries[key] = value.trim();
            }
          }
        } catch {
          // Skip invalid dates
          continue;
        }
      }
    }

    // Sort dates from newest to oldest
    const sortedDates = Object.keys(entries).sort().reverse();

    if (sortedDates.length === 0) {
      alert("No journal entries found to export!");
      return;
    }

    // Add entries to PDF
    sortedDates.forEach((date) => {
      // Format the date nicely
      const formattedDate = new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      // Add date header
      doc.setFont("helvetica", "bold");
      doc.text(formattedDate, 20, yPosition);
      yPosition += 10;

      // Add entry content
      doc.setFont("helvetica", "normal");
      const entry = entries[date];

      // Split text into lines that fit the page width
      const lines = doc.splitTextToSize(entry, pageWidth - 40);

      // Check if we need a new page
      if (
        yPosition + lines.length * 7 >
        doc.internal.pageSize.getHeight() - 20
      ) {
        doc.addPage();
        yPosition = 20;
      }

      // Add the lines to the PDF
      doc.text(lines, 20, yPosition);
      yPosition += lines.length * 7 + 15;
    });

    // Save the PDF
    doc.save(`journal-entries-${new Date().toISOString().split("T")[0]}.pdf`);
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

      <h2 className="text-lg p-1">Entries:</h2>
      <div className="space-y-4">
        {(() => {
          // Collect all entries
          const entries: { [key: string]: string } = {};
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key) {
              try {
                const date = new Date(key);
                if (!isNaN(date.getTime())) {
                  const value = localStorage.getItem(key);
                  if (value && !value.includes("redoCount")) {
                    entries[key] = value.trim();
                  }
                }
              } catch {
                continue;
              }
            }
          }

          // Sort dates from newest to oldest
          const sortedDates = Object.keys(entries).sort().reverse();

          if (sortedDates.length === 0) {
            return <p>No entries found, make your first entry!</p>;
          }

          return sortedDates.map((date) => {
            const formattedDate = new Date(date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            });

            return (
              <div
                key={date}
                className="p-4 border rounded-lg bg-gray-50 shadow-sm group relative hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="font-bold text-gray-800">{formattedDate}</p>
                  <button
                    onClick={() => handleEdit(date)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-gray-700 text-sm"
                  >
                    ✎ Edit
                  </button>
                </div>
                {editingDate === date ? (
                  <form
                    onSubmit={handleSaveEdit}
                    className="flex flex-col gap-2"
                  >
                    <textarea
                      value={editedEntry}
                      onChange={(e) => setEditedEntry(e.target.value)}
                      className="p-2 border rounded resize-none"
                      rows={4}
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingDate(null)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="text-gray-600">
                    <p className="whitespace-pre-line text-left">
                      {entries[date]}
                    </p>
                  </div>
                )}
              </div>
            );
          });
        })()}
      </div>
      <p className="text-sm text-center">
        Note: Your entries are saved locally in your browser. Clearing browser
        data will erase them. Want to back them up? Export your entries!
      </p>
      <button
        onClick={handleExport}
        className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
      >
        Export
      </button>
    </div>
  );
};

export default GoodThingLogger;
