import os 
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client() 

def generate_quiz(topic):
    prompt = f"""
    Create exactly 5 MCQ questions about {topic}

    Format:

    Question:
    Options:
    A)
    B)
    C)
    D)

    Correct Answer:
    """

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )
    
    return response.text