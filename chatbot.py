import openai

# Replace with your own OpenAI API key
openai.api_key = ""

def chat_with_openai(prompt, model="gpt-4"):
    response = openai.Completion.create(
        model=model,
        prompt=prompt,
        max_tokens=150,
        temperature=0.7,
        n=1,
        stop=None
    )
    return response.choices[0].text.strip()

print("Welcome to the Chatbot! Type 'quit' to exit.")

while True:
    user_input = input("You: ")
    if user_input.lower() == "quit":
        print("Goodbye!")
        break
    
    # Send the user's message to OpenAI and get a response
    try:
        bot_response = chat_with_openai(user_input)
        print("Bot:", bot_response)
    except Exception as e:
        print("Error:", e)
