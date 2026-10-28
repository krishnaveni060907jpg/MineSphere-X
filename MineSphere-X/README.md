# MineSphere-X
**Predictive Intelligence for Mine Safety and Hazard Recurrence Prevention**
*Fix the Hazard. Prevent Its Return.*

| | |
|---|---|
| Project ID | SEC26ITSO144 |
| Domain | Artificial Intelligence |
| Type | College Innovation Prototype |
| Primary SDG | SDG 8 — Decent Work and Economic Growth |
| Additional SDGs | SDG 9 — Industry, Innovation and Infrastructure; SDG 16 — Peace, Justice and Strong Institutions |

## Problem
Repaired mining hazards can recur. Historical reports are hard to connect, corrective actions get delayed, repair evidence is often missing, and sensor data is disconnected from safety decisions.

## Proposed Solution
A unified platform linking hazard reporting, historical records, AI recurrence prediction, corrective-action approval, evidence review, and sensor-supported follow-up.

## Key Features
- Intelligent hazard reporting (equipment, severity, photo, timestamp)
- AI recurrence prediction (proposed Random Forest, 30-day window)
- Hazard Echo Score (0–100, illustrative) with Data Confidence
- Corrective-action management with escalation and human approval
- Closure Quality Index
- Sensor-supported verification (ESP32 + vibration sensor; stale readings shown as Unknown)
- Recurrence Autopsy
- Interactive demo dashboard (**demonstration data only — not live mine data**)

## Technology Stack
React 19, TanStack Start, Vite 7, Tailwind CSS v4, Lucide React, Recharts, TypeScript.
Proposed AI: Python, scikit-learn, SHAP. Proposed hardware: ESP32 (Arduino/PlatformIO).

## Folder Structure
```
public/                 static files
src/
  assets/               images
  components/site/      website sections (Navbar, Sections, Dashboard, Contact)
  components/ui/        reusable UI components
  data/demo.ts          sample demonstration data
  routes/               pages (index.tsx = landing page)
  styles.css            design system (colors, fonts)
.env.example            environment variable template
```
This repository currently contains the **frontend website**. Backend API, AI service and firmware are planned and not yet included.

## Installation & Running (VS Code)
```bash
git clone <your-repo-url>
cd minesphere-x
bun install        # or: npm install
bun run dev        # or: npm run dev  → http://localhost:8080
bun run build      # production build
bunx vitest run    # tests
```

## Environment Variables
Copy `.env.example` to `.env`:
- `VITE_CONTACT_API_URL` — optional endpoint for the contact form. If empty, the form is a frontend demonstration and sends nothing.

Never commit `.env` files.

## Hardware Overview (prototype)
ESP32 (data collection & Wi-Fi), MPU6050 (vibration), DHT22 (temperature/humidity), MQ-series gas sensor (experimental), RC522 RFID (equipment tags), small DC motor (simulated conveyor), LED/buzzer (advisory).
Flow: Sensors → ESP32 → Wi-Fi → Backend API → Database → Dashboard.

## Testing & Demonstration
Open the site, scroll to **Interactive Demo**, and press **Load Demo Data**. Submit the contact form empty to see validation.

## Limitations & Future Work
- No trained model yet; predictions shown are simulated. No accuracy results are claimed.
- No live sensor connection; dashboard uses sample data.
- Future: FastAPI backend, database, trained & evaluated models with SHAP, ESP32 firmware, real email delivery for the contact form.
