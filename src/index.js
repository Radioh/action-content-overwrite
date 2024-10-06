const core = require("@actions/core");
const fs = require("fs").promises;

async function run() {
  try {
    const filePath = core.getInput("filePath", { required: true });
    const content = core.getInput("content", { required: true });

    if (!filePath || !content) {
      throw new Error("filePath and content inputs are required");
    }

    await fs.writeFile(filePath, content, { encoding: "utf8", flag: "w" });
    console.log(`Filled content into: ${filePath}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
