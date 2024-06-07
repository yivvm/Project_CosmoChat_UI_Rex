import { useState } from "react";

import "./App.css";
import ChatPage from "./pages/Chat/ChatPage.jsx";
import LandingPage from "./pages/Home/LandingPage.jsx";

function App() {
  const [showChat, setShowChat] = useState(false);

  const handleStartChat = () => {
    setShowChat(true);
  };

  return (
    <div className="App">
      <div style={{ position: "relative", height: "600px", width: "300px" }}>
        {/* <LandingPage /> */}
        {/* <ChatPage /> */}

        {showChat ? (
          <ChatPage />
        ) : (
          <LandingPage onStartChat={handleStartChat} />
        )}
      </div>
    </div>
  );
}

export default App;
