🧭 NearWise

Smart Nearby Places Recommender

NearWise is a location-based recommendation web application that suggests nearby places based on user mood and real-time contextual factors such as distance, ratings, availability, and price range.

Users can select a mood (Work, Date, Quick Bite, Budget), and the app intelligently filters and ranks nearby places using Google Maps and Places APIs.

🚀 Features

📍 Detects user’s current location

🎯 Mood-based place recommendations

📏 Distance-based sorting (nearest first)

⭐ Rating and price-level filtering

🕒 Real-time open/closed status

🧠 Smart weighted scoring logic for ranking places

🗺️ Interactive map view with place markers

🧠 How It Works

User selects a mood (Work, Date, Quick Bite, Budget)

App fetches nearby places using Google Places API

Each place is evaluated using a weighted scoring algorithm

Results are sorted and displayed in:

List view (details)

Map view (markers)

📊 Recommendation Logic (Sample)
Final Score =
  (Rating × 0.4)
+ (Distance × 0.3)
+ (Price Level × 0.2)
+ (Open Now × 0.1)


Weights are dynamically adjusted based on the selected mood.

🛠️ Tech Stack

Frontend

React.js (Hooks & Component-based architecture)

JavaScript (ES6+)

HTML5, CSS3

APIs

Google Maps JavaScript API

Google Places API

Tools

Git & GitHub (version control)

REST API handling

Client-side filtering & sorting logic

📂 Project Structure
src/
├── components/     # Reusable UI components
├── services/       # API integration logic
├── utils/          # Scoring & helper functions
├── hooks/          # Custom React hooks
├── styles/         # Global styles
├── App.jsx
└── index.js

⚙️ Setup Instructions

Clone the repository:

git clone https://github.com/AnuragBhashkar/NearWise.git
cd NearWise


Install dependencies:

npm install


Create environment variables:

REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here


Run the app:

npm start

🌱 Future Enhancements

🔐 User authentication & saved favorites

🕒 Time-based recommendations

🌙 Dark mode

🧠 Personalized suggestions

📱 Mobile-first responsive UI

☁️ Backend integration

🌐 Deployment

Deployment link will be added after project completion.

👤 Author

Anurag Bhashkar

GitHub: https://github.com/AnuragBhashkar

LinkedIn: https://www.linkedin.com/in/anurag-bhashkar/

⭐ Show Your Support

If you like this project, consider giving it a ⭐ on GitHub!
