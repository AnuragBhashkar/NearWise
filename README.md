# NearWise
Smart nearby places recommender using Google Maps &amp; Places APIs
A location-based recommendation web application that suggests nearby places based on user mood and real-time context such as distance, ratings, availability, and price range.

Users can choose a mood (Work, Date, Quick Bite, Budget), and the app intelligently filters and ranks nearby places using Google Maps & Places APIs.

🚀 Features

🌍 Detects user’s current location

🎯 Mood-based place recommendations

📏 Distance-based sorting (nearest first)

⭐ Rating and price-level filtering

🕒 Shows open/closed status in real time

🧠 Smart weighted scoring logic for ranking results

🔎 Interactive map view with place markers

🧠 How It Works

User selects a mood (e.g., Work, Date, Budget)

App fetches nearby places using Google Places API

Places are scored using a weighted recommendation algorithm based on:

Rating

Distance

Price level

Open status

Results are sorted and displayed on:

List view (details)

Map view (markers)

🛠️ Tech Stack

Frontend

React.js (Hooks, Component-based architecture)

JavaScript (ES6+)

HTML5, CSS3

APIs

Google Maps JavaScript API

Google Places API

Other

REST API handling

Client-side filtering & sorting logic

Git & GitHub for version control

📊 Recommendation Logic (Example)
Final Score =
  (Rating × 0.4)
+ (Distance × 0.3)
+ (Price Level × 0.2)
+ (Open Now × 0.1)


Each mood adjusts the weight distribution to prioritize relevant factors.

🖼️ Screenshots

Coming soon
(Will be added after UI completion)

🧪 Future Enhancements

🔐 User authentication & saved favorites

🕒 Time-based recommendations

🌙 Dark mode

🧠 AI-based personalization

📱 Responsive mobile-first UI

☁️ Backend integration for user preferences

🌐 Deployment

Deployment link will be added after project completion.

📂 Project Setup
git clone https://github.com/AnuragBhashkar/NearWise.git
cd smart-nearby-places
npm install
npm start

🔑 Environment Variables

Create a .env file in the root directory:

REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here

📌 Why This Project?

This project demonstrates:

Real-world problem solving

API integration skills

UX-focused frontend development

Scalable and modular code structure

👤 Author

Anurag Bhashkar

GitHub: https://github.com/AnuragBhashkar

LinkedIn: https://www.linkedin.com/in/anurag-bhashkar/

⭐ If you like this project

Give it a star ⭐ — it motivates me to build more!
