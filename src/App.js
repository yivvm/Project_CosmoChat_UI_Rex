import { useState } from "react";

import "./App.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

function App() {
  const [typing, setTyping] = useState(false);

  const [messages, setMessages] = useState([
    {
      message: "Hello, I am ChatGPT!",
      sender: "ChatGPT",
      direction: "incoming",
    },
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };

    const newMessages = [...messages, newMessage]; // all the old messages, + the new message

    // update our messages state
    setMessages(newMessages);

    // set a type indicator (chatgpt is typing)
    setTyping(true);

    // process message to ChatGPT (send it over and see the response)
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    // chatMessages { sender: "user" or "ChatGPT", message: "The message content here" }
    // apiMessages { role: "user" or "assistant", content: "The message content here" }

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return {
        role: role,
        content: messageObject.message,
      };
    });

    // role: "user" -> a message from the user, "assistant" -> a response from chatgpt
    // "system" -> generally one initial message defining HOW we want chatgpt to talk

    const systemMessage = {
      role: "system",
      content:
        "Explain all concepts like a 10 years of experience software engineer.", // speak like a pirate. Explain like I am a 10 years of experience software engineer.
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages], // [message1, message2, message3]
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        console.log(data.choice[0].message.content);
        setMessages([
          ...chatMessages,
          {
            message: data.choice[0].message.content,
            sender: "ChatGPT",
            direction: "incoming",
          },
        ]);
      });
  }

  return (
    <div className="App">
      <div style={{ position: "relative", height: "600px", width: "300px" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={
                typing ? <TypingIndicator content="ChatGPT is typing" /> : null
              }
            >
              {messages.map((message, index) => {
                return <Message key={index} model={message} />;
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default App;
