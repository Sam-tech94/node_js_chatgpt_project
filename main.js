const OpenAI = require('openai-api');
const fs = require('fs');
require('dotenv').config();

//Load OpenAI API key from enviroment vairables
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

//Initialize OpenAI API client
const openai = new OpenAI(OPENAI_API_KEY);

const sampleText = 'This is some sample text to be written to the input.txt file.';

fs.writeFile('input.txt', sampleText, (err) => {
  if (err) throw err;
  console.log('Input file created!');

  const inputText = fs.readFileSync('input.txt', 'utf-8');

  const parameters = {
    "prompt": inputText,
    "temperature": 0.7,
    "max_tokens": 60,
    "top_p": 1,
    "frequency_penalty": 0,
    "presence_penalty": 0
  };

  openai.complete(parameters)
    .then(response => {
      const answer = response.data.choices[0].text.trim();
      console.log(answer)
    })
    .catch(error => {
      console.log(error)
    });
});
