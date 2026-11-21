# SustainAI 🌿
**AI-Powered Waste Management Assistant**

> 🏆 **Built for Alameda Hacks**

## 💡 The Problem
Recycling is confusing. Different plastics, mixed materials, and local rules make it hard for people to know what goes where. This leads to "wish-cycling" (throwing things in the bin hoping they get recycled), which actually contaminates the recycling stream.

## 🚀 The Solution
**SustainAI** is a smart web application that "sees" what you're holding and tells you exactly what to do with it. But we didn't stop there. We **gamified** sustainability.
SustainAI uses **Google Gemini Flash** to analyze waste in real-time, providing detailed disposal advice, while tracking your personal carbon footprint and rewarding you for every green action.

## ✨ Key Features
*   **🧠 Intelligent Vision**: Instantly identifies items (e.g., "Ceramic Mug", "No. 1 PET Plastic") and classifies them as Recycle, Compost, Trash, or Hazardous.
*   **📝 Detailed Action Plans**: Doesn't just say "Recycle" – it gives specific steps like *"Rinse and remove cap"* or *"Check local e-waste drop-off"*.
*   **👤 User Profiles & Auth**: Create a personal account to track your journey.
*   **🎮 Gamification**:
    *   **Points System**: Earn +50 for Recycling, +30 for Compost.
    *   **Level Up**: Progress from "Novice" to "Eco Warrior".
*   **📊 Real-Time Impact**: Track your total **CO2 Saved** (in kg) and items diverted from landfills.
*   **📜 History Log**: A persistent timeline of every item you've scanned.

## ⚙️ How It Works (Technical Breakdown)

### 1. Image Capture (The Eyes)
*   The app uses **React Webcam** to access the user's camera feed directly in the browser.

### 2. AI Processing (The Brain)
*   The image data is sent to a **Netlify serverless function**, which calls Google's Gemini API using a server-side API key.
*   **Multimodal Inference**: We use a complex system prompt enforcing a strict **JSON Output Schema**.
*   **Result**: The AI returns structured data including the Item Name, Category, Confidence Score, and Specific Advice.

### 3. Gamification Engine (The Heart)
*   We implemented a custom logic engine that assigns points and CO2 values based on the material type (e.g., Aluminum saves more energy than Paper).
*   User data is persisted via a secure local authentication service, ensuring your stats survive page reloads.

## 🛠️ Tech Stack
*   **Frontend**: React 18 + Vite (Fast, component-based UI)
*   **AI Model**: Google Gemini Flash (Multimodal Vision API)
*   **Serverless**: Netlify Functions
*   **Styling**: TailwindCSS (Custom "Glass" design system)
*   **Animations**: Framer Motion (Smooth UI transitions)
*   **Icons**: Lucide React

## 📦 Installation & Setup

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Install the Netlify CLI if it is not already available:
    ```bash
    npm install --global netlify-cli
    ```
4.  Run the development server with functions enabled:
    ```bash
    npm run dev:netlify
    ```
5.  Set `GEMINI_API_KEY` in your local `.env` file for local development and in the Netlify site environment variables for deployment. Do not use a `VITE_` prefix; it would expose the key in the browser bundle.
6.  Deploy the repository to Netlify. The included `netlify.toml` configures the build, function, API route, and SPA fallback.

---
**Made with ❤️ by Ankit Saini**
