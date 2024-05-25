import { describe, it, expect } from "@jest/globals";
import { validateSort } from "../validate";

describe("validateSort", () => {
  it("should return error when sort is invalid", async () => {
    try {
      validateSort(["abc"]);
    } catch (error) {
      expect((error as Error).message).toBe("Sort must be asc or desc");
    }
  });

  it("should validate successfully when sort is valid", async () => {
    const result = validateSort(["asc"]);
    expect(result).toBe(undefined);
  });
});
