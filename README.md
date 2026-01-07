
# Libaspace – Full Stack Software Engineer (AI Application) Challenge

## Overview
Full-stack prototype implementing a job board with recommendations and a real-time live interview / digital human experience.

---

## Tech Stack
- Frontend: Next.js (App Router), TypeScript, Tailwind CSS
- Backend: Node.js, Express
- Real-time: LiveKit
- AI Avatar: Tavus Persona API (integration prepared)

---

## Key Features
- Job board UI based on provided Figma design
- Responsive (H5) mobile layout
- Secure backend API for LiveKit token generation
- Real-time audio/video interview using LiveKit
- Digital Human (Tavus) integration prepared

---

## Real-Time & AI Feature
- LiveKit audio/video streaming fully implemented and working
- Backend securely generates LiveKit access tokens
- Tavus Persona API integration implemented on backend  
  (replica creation requires paid Tavus plan)

---

## Demo Instructions
1. Open the app in **two browser tabs**
2. Click **Start Live Interview**
3. Allow microphone and camera access
4. Verify real-time audio and video streaming between tabs
5. Resize browser to mobile width to verify H5 responsiveness

---

## Notes on Third-Party API Constraints
The Tavus Persona API requires a paid plan to create a valid `replica_id`.  
All integration points are implemented and documented. Once access is granted, the Digital Human feature can be activated immediately.

---
## How to Run Locally

### Backend

```bash
cd backend
npm install
node server.js
```
### Frontend
```bash
cd frontend
npm install
npm run dev

## Author
**Venkata**  
Full Stack Software Engineer (AI Applications)
=======
# Job-nova
A full-stack job recommendation platform built with Next.js and Spring Boot, featuring real-time video/audio sessions using LiveKit, secure API integration, and optional AI-powered digital human avatars (Tavus Persona) for interactive user experiences.
