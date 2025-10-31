<div align="center">
  <a href="https://github.com/buggy-bits/qr-hunt-web">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="assets/logos/logo-light.png" />
      <source media="(prefers-color-scheme: light)" srcset="assets/logos/logo-dark.png" />
      <img src="assets/logos/logo-light.png" alt="QR Hunt logo" width="300" height="300">
    </picture>
  </a>
</div>

<h3 align="center">QR HUNT</h3>
<p align="center">A modern, tech-powered treasure hunt game built with QR codes, designed for collaborative play and real-world exploration.</p>

<div align="center">

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Firestore](https://img.shields.io/badge/Firestore-FFA000?style=for-the-badge&logo=firebase&logoColor=white)](https://firebase.google.com/products/firestore/)
[![JWT](https://img.shields.io/badge/JWT-77216F?style=for-the-badge&logo=jsonwebtoken&logoColor=white)](https://jwt.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](./LICENSE)

</div>

<h5 align="center">Made with ❤️ by <a href="https://github.com/buggy-bits">Sainag</a></h5>



## About

QR Hunt brings the fun of traditional treasure hunting into the digital age. It combines logical reasoning, physical exploration, and teamwork through a unique system of QR code challenges.  

This project was first designed and deployed during an on-campus event to make the experience more engaging and tech-oriented.

Live demo: [qr-hunt-web.vercel.app](https://qr-hunt-web.vercel.app)


## Inspiration

The idea stems from the joy of classical treasure hunts — solving clues, exploring locations, and racing to the finish.  
The goal was to reimagine this experience using technology — blending outdoor activity with modern web and mobile tools.  

QR Hunt introduces a digital layer where every clue is linked to a unique QR code placed at real-world locations. Scanning these codes not only progresses the game but also adds a competitive, real-time edge through live leaderboards and tracked timings.


## How It Works

1. **Organizer Setup**
   - The game administrator creates a series of clues with hidden locations (e.g., a park bench, notice board, or library corner).
   - Each location is assigned a two-digit code, which the admin uses to generate a QR code for that spot.

2. **Team Registration**
   - Teams register through the organizer’s interface.
   - Each team receives a unique **login QR** to access the player dashboard.

3. **Gameplay**
   - Players scan their login QR to start.
   - The timer begins once the team starts the hunt.
   - Teams solve clues, locate real-life QR codes, and scan them to verify progress.
   - After completing all challenges, teams must return to the starting point to stop the timer.

4. **Scoring**
   - Each completed challenge earns points.
   - Overall ranking is based on the shortest completion time.
   - Live updates are reflected instantly via Firestore.


## Features

- Role-based authentication for admin and players.
- Real-time leaderboard and progress updates.
- QR-based login for players, eliminating manual entry.
- Firestore-backed instant data synchronization.
- Organized dashboard for adding teams, challenges, and managing hunts.
- Secure session handling using JWT.
- Simple UI built with React, Tailwind CSS, and Vite.



## Project Highlights

- Designed with responsive UI for mobile-first gameplay.  
- Uses Firestore’s live update feature for real-time score tracking.  
- Built to handle both local and college-scale events.  
- Encourages teamwork, competitive play, and outdoor engagement.


## License

This project is licensed under the [MIT License](./LICENSE).


<h4 align="center">Built to make old-school hunts smarter and more fun.</h4>
