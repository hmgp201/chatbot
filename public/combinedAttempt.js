let conversation = [{
  role: "system",
  content: "You are a jamaican rastafarian. Your favorite word is BOMBOCLAT, always in all capitals. Remember this when you respond."
}]

async function callOpenRouter(input) {
  try {
      const response = await fetch("http://127.0.0.1:5000/api/chat", {
          method: "POST",
          headers: {
              "Authorization": "Bearer", //add API with env when figured out
              "HTTP-Referer": "<YOUR_SITE_URL>", 
              "X-Title": "<YOUR_SITE_NAME>", 
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              "model": "google/gemini-2.0-flash-lite-preview-02-05:free",
              "messages": conversation
          })
      });
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const answer = data.choices[0].message.content;
      return answer
  } catch (error) {
      console.error("Error:", error);
      return null;
  }
}

let messageToAnswer = ''

const createMessageHistoryUser = (string) => {
const obj = {
  "role": "user",
  "content": string
}
conversation.push(obj)
}

const createMessageHistoryAssistant = (string) => {
  const obj = {
    "role": "assistant",
    "content": string
  }
  conversation.push(obj)
  }

const AddLoader = () => {
const chats = document.getElementById('chats')
const load = document.createElement('div');
load.classList.add('loader');
chats.appendChild(load)
chats.style.paddingBottom = '20px';
}

const removeLoader = () => {
const chats = document.getElementById('chats');
const elementToRemove = chats.querySelector('.loader');
chats.removeChild(elementToRemove)
chats.style.paddingBottom = '20px';
}

const chatContainer = document.getElementById("msg-page");

const addSentence = (words) => {
  const newOutgoingChats = document.createElement("div");
  newOutgoingChats.classList.add("outgoing-chats");

  const newOutgoingChatsImg = document.createElement("div");
  newOutgoingChatsImg.classList.add("outgoing-chats-img");
  newOutgoingChats.appendChild(newOutgoingChatsImg);

  const icon = document.createElement("img");
  icon.src =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuvwJG3J0AvDmbaE8_obrEW5IHHEB2zDaYEw&s";
  newOutgoingChatsImg.appendChild(icon);

  const newOutgoingMessage = document.createElement("div");
  newOutgoingMessage.classList.add("outgoing-msg");
  newOutgoingChats.appendChild(newOutgoingMessage);

  const newOutgoingChatsMessage = document.createElement("div");
  newOutgoingChatsMessage.classList.add("outgoing-chats-msg");
  newOutgoingMessage.appendChild(newOutgoingChatsMessage);

  const lastChild = chatContainer.lastElementChild;
  let isSameSender = false;

  
  if (
    lastChild &&
    lastChild.classList.contains("outgoing-chats") &&
    lastChild.querySelector("p")
  ) {
    
    const lastP = lastChild.querySelector("p");
    if (lastP && !lastP.classList.contains("multi-msg")) {
      
      lastP.classList.add("multi-msg");
    }
    isSameSender = true;
  }

  const newP = document.createElement("p");
  newP.innerHTML = words; 

  if (isSameSender) {
    newP.classList.add("multi-msg");
    const span = lastChild.querySelector("span");
    lastChild.querySelector(".outgoing-chats-msg").insertBefore(newP, span);
    const forHistory = createMessageHistoryUser(newP.innerHTML);
    conversation.push(newP.innerHTML);
    messageToAnswer = newP.innerHTML;
    console.log(messageToAnswer);
    console.log(forHistory)
  } else {

    const newSpan1 = document.createElement("span");
    const now = new Date();
    function formatDate(isoString) {
      const date = new Date(isoString);

      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;

      const monthAbbr = date.toLocaleString("en-US", { month: "short" });

      const day = date.getDate();

      return `${hours}:${minutes}${ampm} | ${monthAbbr} ${day}`;
    }
    newSpan1.classList.add("time");
    newSpan1.innerHTML = formatDate(now);
    newOutgoingChatsMessage.appendChild(newP); 
    createMessageHistoryUser(newP.innerHTML)
    messageToAnswer = newP.innerHTML;
    console.log(conversation);
    console.log(messageToAnswer);
    newOutgoingChatsMessage.appendChild(newSpan1);
    chatContainer.appendChild(newOutgoingChats);
  }
  chatContainer.scrollTop = chatContainer.scrollHeight;
};

const addResponse = (words) => {
  const newReceivedChats = document.createElement("div");
  newReceivedChats.classList.add("received-chats");

  const newReceivedChatsImg = document.createElement("div");
  newReceivedChatsImg.classList.add("received-chats-img");
  newReceivedChats.appendChild(newReceivedChatsImg);

  const icon = document.createElement("img");
  icon.src =
    "https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small_2x/Basic_Ui__28186_29.jpg";
  newReceivedChatsImg.appendChild(icon);

  const newReceivedMessage = document.createElement("div");
  newReceivedMessage.classList.add("received-msg");
  newReceivedChats.appendChild(newReceivedMessage);

  const newReceivedMsgInbox = document.createElement("div");
  newReceivedMsgInbox.classList.add("received-msg-inbox");
  newReceivedMessage.appendChild(newReceivedMsgInbox);

  const newP1 = document.createElement("p");
  newP1.classList.add('gen-response')
  newP1.innerHTML = words;

 
  const targetLoader = document.querySelector(".your-class");
  chatContainer.appendChild(newReceivedChats);


  const lastChild1 = chatContainer.lastElementChild?.previousElementSibling;
  let isSameSender1 = false;

  if (
    lastChild1 &&
    lastChild1.classList.contains("received-chats") &&
    lastChild1.querySelector("p")
  ) {
    const lastP1 = lastChild1.querySelector("p");
    if (lastP1 && !lastP1.classList.contains("multi-msg")) {
      lastP1.classList.add("multi-msg");
    }
    isSameSender1 = true;
  }

  if (isSameSender1) {
    newP1.classList.add("multi-msg");
    const span1 = lastChild1.querySelector("span");

    if (span1) {
      lastChild1
        .querySelector(".received-msg-inbox")
        .insertBefore(newP1, span1); 
    } else {
      lastChild1.querySelector(".received-msg-inbox").appendChild(newP1); 
    }
    chatContainer.removeChild(newReceivedChats); 
  } else {
    const newSpan = document.createElement("span");
    const now = new Date();
    function formatDate(isoString) {
      const date = new Date(isoString);

      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;

      const monthAbbr = date.toLocaleString("en-US", { month: "short" });

      const day = date.getDate();

      return `${hours}:${minutes}${ampm} | ${monthAbbr} ${day}`;
    }
    newSpan.classList.add("time1");
    newSpan.innerHTML = formatDate(now);
    newReceivedMsgInbox.appendChild(newP1);
    newReceivedMsgInbox.appendChild(newSpan);
  }

  setTimeout(() => {
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, 0);
};

const sendButton = document.getElementById("send-button");
const input = document.getElementById("sender-input");

sendButton.addEventListener("click", () => {
  let inputValue = input.value;
  if (inputValue) {
    addSentence(inputValue);
    sendButton1.click();
  }
  input.value = ""; 
});

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendButton.click();
  }
});

const sendButton1 = document.getElementById("send-button1");
const input1 = document.getElementById("sender-input1");

sendButton1.addEventListener("click", async () => {
  AddLoader();
  try {
    const response = await callOpenRouter(conversation + messageToAnswer);
    removeLoader();
    console.log('success')
    addResponse(response);
    createMessageHistoryAssistant(response);
    console.log(conversation)
  } catch {
    console.error('error')
  }
});


