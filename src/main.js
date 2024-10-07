const core = require("@actions/core");
const fs = require("fs").promises;

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    const filePath = core.getInput("filePath", { required: true });
    const content = core.getInput("content", { required: true });

    if (!filePath || !content) {
      throw new Error("filePath and content inputs are required");
    }

    await fs.writeFile(filePath, content, { encoding: "utf8", flag: "w" });
    core.info(`Filled content into: ${filePath}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

module.exports = {
  run,
};
