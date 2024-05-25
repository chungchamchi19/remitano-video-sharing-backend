import { describe, it, expect } from "@jest/globals";
import getErrorMessage from "../getErrorMessage";

describe("getErrorMessage", () => {
  it("should return error message when code is 400", () => {
    expect(getErrorMessage(400)).toBe("Bad Request");
  });

  it("should return error message when code is 401", () => {
    expect(getErrorMessage(401)).toBe("Unauthorized");
  });

  it("should return error message when code is 403", () => {
    expect(getErrorMessage(403)).toBe("Not allowed");
  });

  it("should return error message when code is 404", () => {
    expect(getErrorMessage(404)).toBe("Request not found");
  });

  it("should return error message when code is 429", () => {
    expect(getErrorMessage(429)).toBe("Too many requests");
  });

  it("should return error message when code is 500", () => {
    expect(getErrorMessage(500)).toBe("Something went wrong");
  });

  it("should return error message when code is 409", () => {
    expect(getErrorMessage(409)).toBe("Duplicate");
  });
  it("should return null", () => {
    expect(getErrorMessage(200)).toBe(null);
  });
});
