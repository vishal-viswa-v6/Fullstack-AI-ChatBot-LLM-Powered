const messagesContainer = document.getElementById("messages-container");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const statusArea = document.getElementById("status-indicator");


function displayMessage(role, content) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");


if (role === "user") {
    messageDiv.classList.add("user-message");

} else if (role === "bot") {
    messageDiv.classList.add("bot-message");
}

messageDiv.innerHTML = content;
messagesContainer.appendChild(messageDiv);
messagesContainer.scrollTop = messagesContainer.scrollHeight;

}

function sendMessage() {

    const input = userInput.value.trim();
    if (input === "") return;

    displayMessage("user", input);
    userInput.value = "";

    getAIMessage(input);
}

sendButton.addEventListener("click", sendMessage);

userInput.addEventListener("keydown", function (event) {
    if (event.key === "enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
});

let conversationHistory = [
    {role: "system", content: "You are a helpful assistant."}
];

async function getAIMessage(userMessage) {
    conversationHistory.push({role: "user", content: userMessage});
    const statusArea = document.getElementById("status-area");
    statusArea.textContent = "Bot is typing..";
//disable input and button
    const input = document.getElementById("user-input");
    const button = document.getElementById("send-button");
    input.disabled = true;
    button.disabled = true;

    try {
        const response = await fetch ("http://localhost:8000/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                messages: conversationHistory
            })
        });

        if (!response.ok) {
            throw new Error (`Server ERROR: ${response.status}`);
        }

        const data = await response.json();
        const aiResponse = data?.choices?.[0]?.message?.content || "No Response";

            conversationHistory.push({role: "assistant", content: aiResponse});

            displayMessage("bot", aiResponse);

        }   catch(error) {
            console.error("Error fetching from backend: ", error);
            displayMessage("bot", "something went wrong. try again.")
        }   finally {
            input.disabled = false;
            button.disabled = false;
            statusArea.textContent = "";
        }

    }

document.getElementById("send-button").addEventListener("click", () => {
    const input = document.getElementById("user-input");
    const userMessage = input.value.trim();
    if (!userMessage) return;

    displayMessage("user", userMessage);
    getAIMessage(userMessage);
    input.value = "";
});