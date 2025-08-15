# Contributing to NHL Era Adjuster

Thanks for your interest in contributing! This is a temporary personal project, created to explore data scraping and hone skills, and to practice real-world GitHub workflows. It's also perfect for beginners, so don't be afraid to contribute even if you haven't before.

**This repo is not actively maintained long term.** You're still welcome to fork it, explore the code, and even open pull requests. Just be aware that support may be limited.

---

## 🛠 Local Setup

To get started locally, you'll need to create a fork of this repository:

1.  **Fork the repository:** Click the "Fork" button in the top right corner of the GitHub page. This will create a copy of the project under your own GitHub account.
2.  **Clone your fork:**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/nhl-era-adjuster.git](https://github.com/YOUR_USERNAME/nhl-era-adjuster.git)
    cd nhl-era-adjuster
    ```
    (Be sure to replace `YOUR_USERNAME` with your GitHub username.)
3.  **Set the upstream remote:** To keep your fork in sync with the original repository, you'll want to add a remote.
    ```bash
    git remote add upstream [https://github.com/Damon-Thomas/nhl-era-adjuster.git](https://github.com/Damon-Thomas/nhl-era-adjuster.git)
    ```

Install dependencies:
pnpm install

Run dev server:
pnpm run dev

Build the project:
pnpm run build (make sure the project builds successfully before submitting a PR)

This project doesn't use a database or require API keys. It relies on public NHL API endpoints.

📂 Project Structure

nhl-era-rewind/
├── public/ images
├── src/
│ ├── components/ UI elements of project
│ ├── data/
│ │ ├── handlers/ files used to scrape/fetch data-Not used in project
│ │ ├── league/ static data about 2024-2025 season stats
│ │ └── staticData/ data needed: some used, some were used
│ │ to compile other data
│ └── types/ typescript definitions
├── app.tsx: app logic
└── main.tsx: entry point of app, any contexts

✅ How to Contribute

🔧 Issues
Look for open issues tagged with good first issue or help wanted
Or open a new issue if you find a bug, have an idea, or need help understanding the project

🔀 Pull Requests
Fork the repo and create a new branch for your fix/feature

- Keep PRs focused and minimal (one issue per PR)
- Link to an issue when possible (Closes #3)
- Use clear commit messages (e.g. feat: add adjustment factor for 1990s)
- If it adds new logic, please write a basic test

🔍 Code Style

No strict style rules, but try to keep things consistent:

- TypeScript preferred for any new files
- Use existing formatting as a guide
- npm run lint (once it's set up)

🧪 Testing
To run tests:
pnpm test
Tests will be added gradually. Feel free to contribute tests for any utility functions you touch.

🙏 A Note on Support
This project was built for learning and fun. It may be archived after it's complete. That said, all contributions are welcome. Just be patient if responses are delayed. If you're new, feel free to try or reach out to me. This will be a simple project that anyone can contribute to with a little bit of TypeScript and React knowledge.

📄 License
MIT — you're free to fork, remix, and build on this however you'd like.
