import React, { useEffect, useState } from "react";

interface User {
  username: string;
  active: boolean;
}

interface MessageUpdate {
  "@type": string;
  "@id": string;
  username: string;
  message: string;
}

interface SubscriptionUpdate {
  type: string;
  active: boolean;
  payload: User;
}

const type = "https://chat.example.com/Message";
const { hubURL, messageURITemplate, subscriptionsTopic, username } = JSON.parse(
  document.getElementById("config").textContent
);

function Chat() {
  const [userList, setUserList] = useState<Map<string, boolean>>(new Map());
  const [es, setEventSource] = useState<EventSource | null>(null);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      const resp = await fetch(new URL(subscriptionsTopic, hubURL), {
        credentials: "include",
      });
      const subscriptionCollection = await resp.json();
      const users = subscriptionCollection.subscriptions.reduce(
        (acc: [string, boolean][], { payload }: SubscriptionUpdate) => {
          if (payload.username !== username) {
            acc.push([payload.username, true]);
          }
          return acc;
        },
        []
      );
      const sortedUsers = users.sort();
      setUserList(new Map(sortedUsers));
      updateUserListView();

      const subscribeURL = new URL(hubURL);
      subscribeURL.searchParams.append(
        "lastEventID",
        subscriptionCollection.lastEventID
      );
      subscribeURL.searchParams.append("topic", messageURITemplate);
      subscribeURL.searchParams.append(
        "topic",
        `${subscriptionsTopic}{/subscriber}`
      );

      const eventSource = new EventSource(subscribeURL, {
        withCredentials: true,
      });
      eventSource.onmessage = ({ data }) => {
        const update = JSON.parse(data);

        if (update["@type"] === type) {
          displayMessage(update);
          return;
        }

        if (update["type"] === "Subscription") {
          updateUserList(update);
          return;
        }

        console.warn("Received an unsupported update type", update);
      };
      setEventSource(eventSource);
    };

    fetchSubscriptions();

    return () => {
      if (es) {
        es.close();
      }
    };
  }, []);

  const updateUserListView = () => {
    const $userList = document.getElementById("user-list");
    if ($userList) {
      $userList.textContent = "";
      userList.forEach((_, username) => {
        const el = document.createElement("div");
        el.className = "username";
        el.textContent = username;
        $userList.append(el);
      });
    }
  };

  const displayMessage = ({ username, message }: MessageUpdate) => {
    const $messages = document.getElementById("messages");
    const $messageTemplate = document.getElementById("message");
    if ($messages && $messageTemplate) {
      const el = document.createElement("div");
      el.className = "message";
      el.innerHTML = $messageTemplate.innerHTML;
      el.querySelector(".username")!.textContent = username;
      el.querySelector(".msg")!.textContent = message;
      $messages.append(el);

      // scroll at the bottom when a new message is received
      $messages.scrollTop = $messages.scrollHeight;
    }
  };

  const updateUserList = ({ active, payload }: SubscriptionUpdate) => {
    if (username === payload.username) return;

    const updatedUserList = new Map(userList);
    active
      ? updatedUserList.set(payload.username, true)
      : updatedUserList.delete(payload.username);

    const sortedUsers = [...updatedUserList.entries()].sort();
    setUserList(new Map(sortedUsers));
    updateUserListView();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const uid = window.crypto.getRandomValues(new Uint8Array(10)).join("");
    const messageTopic = messageURITemplate.replace("{id}", uid);

    const body = new URLSearchParams({
      data: JSON.stringify({
        "@type": type,
        "@id": messageTopic,
        username: username,
        message: e.currentTarget.elements.message.value,
      }),
      topic: messageTopic,
      private: true,
    });

    fetch(hubURL, { method: "POST", body, credentials: "include" });
    e.currentTarget.elements.message.value = "";
    e.currentTarget.elements.message.focus();
  };

  return (
    <div>
      <div id="username">{username}</div>
      <div id="user-list"></div>
      <div id="messages"></div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="message" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
