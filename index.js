const core = require("@actions/core");
const fs = require("fs");

try {
  const filePath = core.getInput("filePath");
  const secretName = core.getInput("secretName");

  const content = readSecretContent(secretName);
  replaceContent(filePath, content);

  console.log(`Filled secret content into: ${filePath}`);
} catch (error) {
  core.setFailed(error.message);
}

const readSecretContent = (secretName) => {
  return process.env[secretName];
};

const replaceContent = (filePath, content) => {
  fs.writeFileSync(filePath, content, { encoding: "utf8", flag: "w" });
};
