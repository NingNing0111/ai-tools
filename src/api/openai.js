import OpenAI from "openai";

const streamChat = async (model, messages, callBack) => {
  const openai = new OpenAI({
    apiKey: "sk-W9kYeE3J********fAd460353Dc7a",
    baseURL: "https://api.mnzdna.xyz/v1",
    dangerouslyAllowBrowser: true,
  });
  console.log(messages);
  const stream = await openai.chat.completions.create({
    model: model,
    messages: messages,
    stream: true,
  });

  for await (const chunk of stream) {
    callBack(chunk.choices[0]?.delta?.content || "");
  }
};

export { streamChat };
