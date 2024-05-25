import { describe, it, expect } from "@jest/globals";
import getErrorMessage from "../getErrorMessage";

describe("getErrorMessage", () => {
  it("should return Bad Request message when status code is 400", () => {
    expect(getErrorMessage(400)).toBe("Bad Request");
  });

  it("should return Unauthorized message when status code is 401", () => {
    expect(getErrorMessage(401)).toBe("Unauthorized");
  });

  it("should return Not allowed message when status code is 403", () => {
    expect(getErrorMessage(403)).toBe("Not allowed");
  });

  it("should return Request not found message when status code is 404", () => {
    expect(getErrorMessage(404)).toBe("Request not found");
  });

  it("should return Too many requests message when status code is 429", () => {
    expect(getErrorMessage(429)).toBe("Too many requests");
  });

  it("should return Something went wrong message when status code is 500", () => {
    expect(getErrorMessage(500)).toBe("Something went wrong");
  });

  it("should return Duplicate message when status code is 409", () => {
    expect(getErrorMessage(409)).toBe("Duplicate");
  });
  it("should return null when status code is 200", () => {
    expect(getErrorMessage(200)).toBe(null);
  });
});
