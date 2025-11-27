# PortfolioMaker

PortfolioMaker is a modern, easy-to-use web application designed to help professionals, developers, and designers create, preview, and share their portfolios in minutes. With a multi-step builder and a live preview, you can craft a beautiful portfolio and export it as a PDF or print it directly.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/asdfs-projects-3c81a99f/v0-portfolio-form-preview)

## ✨ Key Features

- **Intuitive Multi-Step Builder:** A guided process to input your basic information, skills, certifications, awards, and projects.
- **Real-Time Live Preview:** See your portfolio take shape as you type.
- **Rich Text Editing:** Markdown support for project descriptions, roles, and issues, allowing for detailed and well-formatted text.
- **Image Uploads:** Add a personal touch with a profile picture and logos for each project.
- **Multiple Export Options:** Download your portfolio as a professionally formatted PDF or print it directly from your browser.
- **Theme Support:** Switch between light and dark modes for a comfortable editing experience.
- **Internationalization (i18n):** Support for multiple languages (English, Korean, Japanese, Chinese) to reach a wider audience.

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Markdown Editor:** [@uiw/react-md-editor](https://uiwjs.github.io/react-md-editor/)
- **PDF Generation:** [html2canvas](https://html2canvas.hertzen.com/) & [jsPDF](https://github.com/parallax/jsPDF)
- **Package Manager:** [pnpm](https://pnpm.io/)

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (version 18 or later) and [pnpm](https://pnpm.io/installation) installed on your machine.

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/your-repository-name.git
   ```
2. Navigate to the project directory:
   ```sh
   cd your-repository-name
   ```
3. Install the dependencies:
   ```sh
   pnpm install
   ```

### Running the Development Server

Once the dependencies are installed, you can run the development server:

```sh
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1.  Navigate to the **Build Portfolio** page.
2.  Follow the multi-step form to fill in your personal and professional details.
3.  Use the live preview on the right to see your changes in real-time.
4.  Once complete, use the "PDF" or "Print" buttons to export your portfolio.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.