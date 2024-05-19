import React, { useState } from "react";
import EventDetailsModal from "./Components/Event";
import CommentsSection from "./Components/Comments";
import "./index.css";

const App = () => {
  const [event, setEvent] = useState({
    title: "",
    assignedTo: "",
    status: "Incomplete",
    isEditing: false, // Add isEditing state
  });

  return (
    <div>
      <EventDetailsModal event={event} setEvent={setEvent} />
      <CommentsSection />
    </div>
  );
};

export default App;
