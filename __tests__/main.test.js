/**
 * Unit tests for the action's main functionality, src/main.js
 */
const core = require("@actions/core");
const fs = require("fs").promises;
const main = require("../src/main");

const getInputMock = jest.spyOn(core, "getInput").mockImplementation();
const setFailedMock = jest.spyOn(core, "setFailed").mockImplementation();
const coreInfoMock = jest.spyOn(core, "info").mockImplementation();
const writeFileMock = jest.spyOn(fs, "writeFile").mockImplementation();
const runMock = jest.spyOn(main, "run");

describe("action", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("writes content to the specified file", async () => {
    // Arrange
    const filePath = "test.txt";
    const content = "Hello, world!";

    getInputMock.mockImplementation((name) => {
      if (name === "filePath") return filePath;
      if (name === "content") return content;
    });

    // Act
    await main.run();

    // Assert
    expect(runMock).toHaveReturned();

    expect(writeFileMock).toHaveBeenCalledWith(filePath, content, {
      encoding: "utf8",
      flag: "w",
    });

    expect(coreInfoMock).toHaveBeenCalledWith(
      `Filled content into: ${filePath}`
    );
  });

  it("sets the action to failed on error", async () => {
    // Arrange
    const errorMessage = "An error occurred";

    getInputMock.mockImplementation(() => {
      throw new Error(errorMessage);
    });

    // Act
    await main.run();

    // Assert
    expect(runMock).toHaveReturned();

    expect(setFailedMock).toHaveBeenCalledWith(errorMessage);
  });
});
