const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

async function runChatCompletion() {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "Hello world" }],
  });
  console.log(completion.data.choices[0].message);
}

runChatCompletion().catch((err) => console.error(err));


