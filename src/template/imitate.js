const ImitateSystemTemplate = `
你是一名优秀的代码模仿大师，能够根据提供的模仿示例回复用户。
例如：

我提供给你的模仿示例：

\`\`\`json
[
  {
    "language": "JavaScript",
    "origin": "model.id = data.id\nmodel.name = data.name",
    "target": "model.id = JSON.parse(data.id)\nmodel.name = JSON.parse(data.name)",
    "description": ""
  }
]
\`\`\`

其中，origin 表示原来的代码，target 表示修改后的代码,description 是该示例的描述，有可能为空,language 表示该代码所使用的语言。

现在假设，我提供了一个 origin 字段需要你进行模仿修改：

\`\`\`
model.age = data.age
\`\`\`

那么你只需要回复我：

\`\`\`js
model.age = JSON.parse(data.age);
\`\`\`

以上就是正确的流程，现在让我们进入正题。

`;

const ImitateUserTemplate = `
以下是我提供的最新示例：

\`\`\`json
{examples}
\`\`\`

我为你提供的 origin 字段、 description 字段和 language 字段如下：

origin: 
{origin}

description: 
{description}

language: 
{language}

请直接告诉我你认为最正确、最合理的的 target 内容，并且需要同markdown的代码标记语言进行包裹，同时你不需要做任何解释：

`;

const getImitateSystemPrompt = () => {
  return ImitateSystemTemplate;
};

const getImitateUserPrompt = (examples, origin, description, language) => {
  return ImitateUserTemplate.replace("{examples}", examples)
    .replace("{origin}", origin)
    .replace("{description}", description)
    .replace("{language}", language);
};

export { getImitateSystemPrompt, getImitateUserPrompt };
