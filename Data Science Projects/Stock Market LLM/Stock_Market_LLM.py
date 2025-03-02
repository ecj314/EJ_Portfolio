import openai
client = openai.OpenAI(api_key="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")

completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "developer", "content": "You are a helpful assistant."},
        {
            "role": "user",
            "content": "Write a haiku about recursion in programming."
        }
    ]
)

print(completion.choices[0].message)