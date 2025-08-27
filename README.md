
# 🚀 Project Manager

A beautiful, modern, and responsive web app to submit and browse student projects. Built with Next.js, React, and MongoDB, it features a premium UI, mobile-first design, and a seamless project submission experience.

---

## ✨ Features

- **Project Submission Form**: Elegant, mobile-first form for submitting projects with teammate details and descriptions.
- **Project Listing**: Browse all submitted projects with stylish cards and gradient backgrounds.
- **Validation**: Ensures teammate IDs are unique and all required fields are filled.
- **First Visit Warning**: Helpful tips for new users to avoid duplicate submissions.
- **Premium UI**: Subtle gradients, blur effects, and beautiful color themes for a delightful experience.
- **Responsive Design**: Looks great on all devices, from mobile to desktop.

---

## 🖥️ Technologies Used

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [MongoDB](https://www.mongodb.com/) & Mongoose
- [Tailwind CSS](https://tailwindcss.com/) (for utility classes)
- [Geist Font](https://vercel.com/font)

---

## 🚦 Getting Started

1. **Install dependencies:**
	```bash
	npm install
	```
2. **Start the development server:**
	```bash
	npm run dev
	```
3. **Open in browser:**
	[http://localhost:3000](http://localhost:3000)

---

## 📋 Project Submission

- Go to the homepage and fill out the form with teammate names, IDs, project name, and (optionally) a description.
- Only one member per team needs to submit.
- View all submitted projects before submitting to avoid duplicates.
- Duplicate projects saved later won’t be counted.

---

## 📂 Project Structure

```
project-manager/
├── app/
│   ├── page.js           # Main form and submission logic
│   ├── Projects/page.js  # Project listing page
│   ├── components/       # UI components (Navbar, FirstVisitWarning, etc.)
│   ├── layout.js         # App layout and font setup
│   └── globals.css       # Global styles
├── models/
│   └── project.js        # Mongoose schema for projects
├── services/
│   └── projectService.js # Project creation and validation logic
├── public/               # Static assets (SVGs, icons)
├── package.json          # Project metadata and scripts
└── README.md             # This file
```

---

## 🧑‍💻 Author

Made by Mahto with ❤️

---

## 📄 License

This project is licensed under the MIT License.

---

## 🌐 Live Demo

Deploy easily on [Vercel](https://vercel.com/) or your favorite platform.

---

## 🙌 Contributing

Pull requests and suggestions are welcome!

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
