const core = require("@actions/core");
const fs = require("fs");

try {
  const filePath = core.getInput("filePath");
  const content = core.getInput("content");

  fs.writeFileSync(filePath, content, { encoding: "utf8", flag: "w" });

  console.log(`Filled content into: ${filePath}`);
} catch (error) {
  core.setFailed(error.message);
}
