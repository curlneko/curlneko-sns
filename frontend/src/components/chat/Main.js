import { useState, useEffect } from "react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";

import { socket } from '../../socket';


export default function Main() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [chatMsg, setChatMsg] = useState([]);


  function sendHello() {
    socket.emit("hello", "world");
  }

  function connectWS() {
    socket.connect();
    setIsConnected(true);
    console.log('onConnect');
  }

  function disconnectWS() {
    socket.disconnect();
    setIsConnected(false);
    console.log('onDisconnect');
  }

  let chats = [];

  useEffect(() => {
    connectWS();

    function onHelloEvent(arg, callback) {
      console.log(arg); // "world"
      callback("got it");// world
    }

    function onChatMsgEvent(arg, callback) {
      console.log(arg);
      console.log(typeof arg);
      callback("got chatMsg");
      setChatMsg(arg);

      Object.keys(arg).forEach((key) => {
        console.log(arg[key].text);

        chats.push({
          props: {
            model: { message: arg[key].text, sentTime: "15 mins ago", sender: "Eliot", direction: "incoming", position: "single" },
          }
        });
      })

      console.log(chats);
      setChatMsg(chats);

    }

    socket.on("hello", onHelloEvent);
    socket.on("chatMsg", onChatMsgEvent);

    return () => {
      socket.off("hello", onHelloEvent);
      socket.off("chatMsg", onChatMsgEvent);
      disconnectWS();
    };
  }, []);


  return (
    <div style={{ position: "relative", height: "500px" }}>
      <MainContainer>
        <ChatContainer>
          <MessageList>
            {chatMsg.map((m, i) => <Message key={i} {...m.props} />)}
          </MessageList>
          <MessageInput placeholder="Type message here" />
        </ChatContainer>
      </MainContainer>
    </div>
  );
  // <>
  //     <button onClick={connect}>Connect</button>
  //     <button onClick={disconnect}>Disconnect</button>
  //     <button onClick={sendHello}>SendHello</button>
  //   </>


}
