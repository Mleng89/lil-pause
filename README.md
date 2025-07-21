# Lil Pause

A mindful daily logging application that encourages reflection and presence through gentle prompts and journaling.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Local Development Setup](#local-development-setup)
- [Usage Examples](#usage-examples)
  - [Daily Reflection Practice](#daily-reflection-practice)
  - [Sample Daily Prompts](#sample-daily-prompts)
- [Journaling Tips](#journaling-tips)
- [Application Structure](#application-structure)
- [Key Components](#key-components)
  - [Daily Logger](#daily-logger)
  - [Daily Prompt (Self-care)](#daily-prompt-self-care)
- [Contributing](#contributing)
  - [Development Guidelines](#development-guidelines)
- [Support](#support)
- [Acknowledgments](#acknowledgments)

## Overview

Lil-Pause is a simple daily logging application designed to help users create moments of mindfulness in your daily routine. Rather than rushing through your day, this application provides thoughtful prompts the encourage reflection, gratitude, and intentional living through the practice of daily journaling.

### Features

- **Daily Prompts**: Thoughtfully crafted questions and prompts to guide your daily reflection
- **Daily Logger**: Clean interface for journaling and capturing thoughts
- **Mindful Design**: Minimalistic UI that promotes focus and calmness
- **Privacy-Focused**: Your entries are stored locally - your thoughts remain private (You are also able to download your entries if you wish to clear your local cache!)
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices

### Installation

**Prerequisites**

- Node.js (Version 16 or higher)
- npm or yarn package manager

**Local development Setup**

1. **Clone the repository**

```
git clone https://github.com/Mleng89/lil-pause.git
cd lil-pause
```

2. **Install dependencies**

```
npm install
# or
yarn install
```

3. **Start the development server**

```
npm run dev
# or
yarn run dev
```

4. Open your browser and navigate to `http://localhost:5173/` to view the application

---

## Usage Examples

### Daily Reflection Practice

1. **Routine Setup**: Open Lil-Pause at a dedicated time during your day
2. **Read the Daily Promp**t: Take a moment to read the prompt and reflect, but if you do not like the prompt, you can always click on "Redo" to change the prompt.
3. **Journal Your Response**: Use the "Daily Logger" to write your thoughts, feelings, and/or reponses to the prompts.
4. **Mindful Moments**: Throughout the day, you can return to add observations or insights to your entries.

### Sample Daily Prompts:

- "What is something that made you smile today? Describe it in detail.
- "What is something that you're struggling with right now, and what steps can you take to address it?
- "Where do you feel most happy and relaxed?"

## Journaling Tips

- **Be honest** - Be authentic, these are _your_ entries, nobody else can see them unless you wish to share it.
- **Stay present** - Focus on the current moment rather than dwelling on the past or thinking about the future.
- **Keep it simple** - Even a sentence or two can be highly meaningful, you do not have to write a lot if you do not want to.
- **Regular practice** - Consistency matters more than the length of entries.

---

## Application structure

```
src/
├── components/         # React components for the application (Currently: daily prompt, daily logger, and footer)
├── utils/              # Placeholder for future helper functions
├── data/               # Static data (Current prompts)
├── App.tsx             # Main application component
└── App.css             # Main Tailwind styling file
```

## Key Components

### Daily Logger

- Write and edit your daily entries
- Save entries locally in your brower's storage
- Abilit to export your enteries as a PDF file if you wish to clear your brower's cache.

### Daily prompt (Self-care)

- Curated collection of mindfulness and reflection prompts
- Rotates daily to provide a variety of prompts, but user has the ability to also choose a different prompt if they wish

### Contributing

Contributions are welcomed to make Lil-Pause even better!

1. Fork the repository
2. Create a feature branch `git checkout -b feature/new-feature`
3. Make your changes
4. Commit your changes `git commit -m "feat: what new feature you created"`
5. Push to the branch `git push origin feature/new-feature`
6. Open a Pull Request!

### Development Guidelines

- Write clear and concise commit messages
- Ensure your code follows the existing style conventions
- Test your changes thoroughly before making a pull request
- Update any documentation as needed

## Support

If you encounter any issues or have suggestions on making this application better:

- Open an issue on GitHub (check existing issues before creating new ones)
- Provide as much detail as possible when reporting bugs (ie: step-by-step in recreating the issue or show screenshots)

## Acknowledgements

- Inspired by mindfulness practices of my daily life and the benefit of reflection.
- Built with the intention to help people seeking more presence in their daily life.

---

**Reminder**: The goal is not perfect entries or having profound insights every single day. The goal is to create a gentle practice of pausing in our hectic lives and reflecting and connecting with ourselves.
