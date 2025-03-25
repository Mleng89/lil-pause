# Lil Pause

[] Self-Care Prompt

- Maybe hardcoded array of prompts in `prompts.ts`
- On app load, show 1 prompt per day (store it in localStorage)
- Add "show new prompt" if user wants to reroll

[] "One good thing" Logger

- Input field + save button
- Save entries to localStorage with that day's date
- Show today's entry if it exists
- Display past entries

### Local storage

- Store:
  - promptForDate: string
  - entryForDate: string
- Functions:
  - getTodayPrompt()
  - saveTodayEntry()

### Stretch features

[] Streak counter?

- Show how many consecutive days user has logged in
- Show "You are on a x-day streak"

[] Offline/PWA?
[] Export entries
