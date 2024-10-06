const core = require("@actions/core");
const fs = require("fs").promises;

// Mock the core and fs modules
jest.mock("@actions/core");
const getInputMock = jest.spyOn(core, "getInput").mockImplementation();
const setFailedMock = jest.spyOn(core, "setFailed").mockImplementation();
const writeFileMock = jest.spyOn(fs, "writeFile").mockImplementation();
const consoleLogMock = jest.spyOn(console, "log").mockImplementation();

describe("index.js", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules(); // Clear module cache
  });

  test("writes content to the specified file", async () => {
    // Arrange
    const filePath = "test.txt";
    const content = "Hello, world!";

    getInputMock.mockImplementation((name) => {
      if (name === "filePath") return filePath;
      if (name === "content") return content;
    });

    // Act
    await require("../src/index");

    // Assert
    expect(writeFileMock).toHaveBeenCalledWith(filePath, content, {
      encoding: "utf8",
      flag: "w",
    });

    expect(consoleLogMock).toHaveBeenCalledWith(
      `Filled content into: ${filePath}`
    );
  });

  test("sets the action to failed on error", async () => {
    // Arrange
    const errorMessage = "An error occurred";
    getInputMock.mockImplementation(() => {
      throw new Error(errorMessage);
    });

    // Act
    await require("../src/index");

    // Assert
    expect(setFailedMock).toHaveBeenCalledWith(errorMessage);
  });
});
