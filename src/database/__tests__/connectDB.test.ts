import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import connectDB from "../connectDB";

describe("connectDB", () => {
  beforeEach(async () => {
    jest.clearAllMocks();
  });

  it("should run callback when has new connection to database", async () => {
    const callback = jest.fn();
    await connectDB(callback);
    expect(callback).toHaveBeenCalled();
  });
});
