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
});
