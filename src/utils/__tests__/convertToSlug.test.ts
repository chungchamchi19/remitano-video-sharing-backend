import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import { convertToSlug } from "../convertToSlug";

describe("convertToSlug", () => {
  beforeEach(async () => {
    jest.clearAllMocks();
  });

  it("should return correct slug", async () => {
    const slug = convertToSlug("Hello World");
    expect(slug).toBe("hello-world");
  });

  it("should return empty string when input is undefined", async () => {
    const slug = convertToSlug(undefined);
    expect(slug).toBe("");
  });
});
