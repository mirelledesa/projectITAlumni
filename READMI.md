# 🎓 ITAlumni — Connection & Mentorship Platform for Students and Alumni

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> A modern, accessible, and intuitive web platform designed to connect students, graduates, and mentors within the **IT Academy (Barcelona Activa)** training ecosystem, boosting knowledge sharing, active networking, and career opportunities in technology.

---

## 📌 Table of Contents

- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Architecture & Design System](#-architecture--design-system)
- [Technologies Used](#-technologies-used)
- [Repository Structure](#-repository-structure)
- [How to Run the Project Locally](#-how-to-run-the-project-locally)
- [Branching Strategy (GitFlow)](#-branching-strategy-gitflow)
- [Next Steps (Roadmap)](#-next-steps-roadmap)
- [Author](#-author)
- [License](#-license)

---

## 💡 About the Project

**ITAlumni** was born from the need to keep the IT Academy community active after completing specialization courses. The platform serves as a bridge between newly enrolled students, front-end developers in training, and professionals already in the tech job market.

The landing page highlights community benefits, alumni testimonials, subscription forms, and quick access points for login, mentorships, and network exploration.

---

## ✨ Key Features

- **Dynamic Hero Section:** Clear value proposition of the community with direct call-to-action (*CTA*) buttons.
- **Adaptive Responsive Navigation:** Header and navigation optimized for mobile (touch-first) and desktop screens (inline links and navigation shortcuts).
- **Benefits Section:** Responsive cards detailing mentorship opportunities, networking events, and career guidance.
- **Social Proof (Testimonials):** Card layout showcasing real feedback from community participants.
- **Integrated Search Filter:** Front-end search functionality (`search.js`) for quick content filtering.
- **Newsletter Footer:** Email capture field integrated into the footer with language selector support and social media links.

---

## 🎨 Architecture & Design System

The user interface was built following a **Mobile-First** approach with progressive enhancements for larger viewports using CSS Media Queries.

### Color Palette

| Color | Hex | Usage |
| :--- | :--- | :--- |
| **Primary Accent** | `#C83B89` | Action buttons, active links, highlighted icons |
| **Secondary Background** | `#FDF2F8` | Secondary buttons, highlighted card backgrounds |
| **Dark Neutral (Footer)** | `#1E2026` | Main footer and high-contrast background areas |
| **Text Dark** | `#333333` | Headings and high-legibility body text |
| **Border Neutral** | `#E5E7EB` | Dividers and card border strokes |

### Optimized Breakpoints

- **Mobile Standard (`< 768px`):** Single-column stacked layout with touch-friendly elements.
- **Tablet (`768px` to `1023px`):** Intermediate grid adjustments.
- **Desktop (`>= 1024px`):** Multi-column grid distribution, full inline header navigation, and expanded newsletter section.

---

## 🛠️ Technologies Used

- **Semantic HTML5:** Native structural tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) ensuring SEO and accessibility compliance.
- **Modern CSS3:** Flexbox, CSS Grid, Custom Properties / CSS Variables (`var(--color)`), and responsive Media Queries.
- **JavaScript (ES6+):** Lightweight vanilla JavaScript without heavy frameworks for fast load times.

