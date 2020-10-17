const core = require("@actions/core");
const fs = require("fs");

try {
  const filePath = core.getInput("filePath");
  const secretName = core.getInput("secretName");

  const content = process.env[secretName];
  fs.writeFileSync(filePath, content, { encoding: "utf8", flag: "w" });

  console.log(`Filled secret content into: ${filePath}`);
} catch (error) {
  core.setFailed(error.message);
}
