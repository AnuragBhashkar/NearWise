function MoodSelector({ mood, setMood }) {
  return (
    <div>
      <button onClick={() => setMood("work")}>Work</button>
      <button onClick={() => setMood("date")}>Date</button>
      <button onClick={() => setMood("quick")}>Quick Bite</button>
      <button onClick={() => setMood("budget")}>Budget</button>
    </div>
  );
}

export default MoodSelector;