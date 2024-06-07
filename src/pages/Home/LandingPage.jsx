import React, { useState } from "react";
import ReactDom from "react-dom";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

export default function LandingPage({ onStartChat }) {
  return (
    <div
      className="landing"
      style={{
        position: "relative",
        height: "600px",
        width: "300px",
        border: "1px solid lightblue",
      }}
    >
      <div className="image-container-landing">
        <img
          src="../images/landing.png"
          style={{ height: "400px", width: "300px" }}
        />
      </div>
      <h1>Welcome!</h1>
      <h3>Receive Career Help from ReX!</h3>
      <p>Start a conversation with ReX right now!</p>
      <button onClick={onStartChat}>Start chat with ReX</button>
    </div>
  );
}
