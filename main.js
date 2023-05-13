import { Configuration,  OpenAIApi} from "openai";
import fs from "fs";

const configuration = new Configuration({
  organization: "org-Gf8whMorZe2ki2KK6xgEVNKj",
  apiKey: "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"
});

const openai = new OpenAIApi(configuration);

const sampleText = 'This is some sample text to be written to the input.txt file.';

fs.writeFile('input.txt', sampleText, (err) => {
  if (err) throw err;
  console.log('Input file created!');

  const inputText = fs.readFileSync('input.txt', 'utf-8');

  console.log("input text", inputText)

  openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: inputText}],
  })
  .then(response => {
    const answer = response.data.choices[0]?.text?.trim();
    if (answer) {
      // console.log(answer);
      fs.writeFile("output.txt", answer, (err) => {
        if (err) throw err;
        console.log("Output saved to output.txt");
      });
    } else {
      console.log("Error: Empty response from OpenAI API");
    }
  })
  .catch(error => {
    console.log(error)
  });
});

