# Full-Stack LLM-Powered Chatbot (ChatGPT/Gemini/DeepSeek Clone)
## This is a full-stack conversational AI application that integrates a large language model (LLM) using a Python FastAPI backend and a dynamic JavaScript frontend. It supports real-time user interaction, conversation history, and contextual message handling — mimicking platforms like ChatGPT, Gemini, and DeepSeek.

### Tech Stack
- Frontend: HTML, CSS, JavaScript

- Backend: FastAPI (Python)

- LLM API: OpenRouter using DeepSeek-R1

- Hosting: Designed to be self-hosted (localhost or deployment-ready)

## How to Run Locally
#### Clone the Repository
- git clone https://github.com/yourusername/yourrepo.git
- cd yourrepo

#### Create API Key File
- Create a file called apikey.env in the root directory and add your OpenRouter API key:
- OPENROUTER_API_KEY=your_key_here

#### Install Dependencies
- pip install -r requirements.txt
  
#### Start the Backend
- uvicorn main:app --reload
  
#### Open the Frontend
- Open index.html in your browser (for proper testing, serve it via a local server if needed).

## Features
- Persistent conversation history
- Token-aware context window truncation (WIP or planned?)
- Full-stack architecture with clean separation
- Easy to swap LLM models via OpenRouter
