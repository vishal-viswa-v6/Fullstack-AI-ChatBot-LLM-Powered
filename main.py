from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware 
from pydantic import BaseModel
from typing import List, Dict
from dotenv import load_dotenv
import requests, os

load_dotenv("apikey.env")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_methods=["*"], allow_headers=["*"]
)

class ChatRequest(BaseModel):
    messages: List[Dict[str, str]]

@app.post("/api/chat")
def chat(req: ChatRequest):
    api_key = os.getenv("OPENROUTER_API_KEY")
    if not api_key:
        return {"ERROR: API key not found."}
    
    try:
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-type": "application/json",
            },
            json={
                "model": "deepseek/deepseek-r1:free",
                "messages": req.messages,
            },
          )
        return response.json()
    except Exception as e:
        return {"ERROR: ":str(e)}
    
