import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import { makeDataUpdate } from "../makeDataUpdate";

describe("makeDataUpdate", () => {
  beforeEach(async () => {
    jest.clearAllMocks();
  });

  it("should return correct data", async () => {
    const data = makeDataUpdate({ name: "Hello World", age: undefined });
    expect(data).toEqual({ name: "Hello World" });
  });
});
