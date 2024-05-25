import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import asyncMiddleware from "../async";
import { res } from "../../tests/mock";

describe("async middleware", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return next when function is success", async () => {
    const req = {} as any;
    const next = jest.fn();
    const fn = jest.fn().mockReturnValue("test");
    await asyncMiddleware(fn)(req, res, next);
    expect(fn).toHaveBeenCalled();
  });

  it("should return status 400 when function is fail with code 400", async () => {
    const req = {} as any;
    const next = jest.fn();
    //@ts-ignore
    const fn = jest.fn().mockRejectedValue({ code: 400 });
    await asyncMiddleware(fn)(req, res, next);
    expect(res.status(400).json).toHaveBeenCalled();
  });

  it("should return status 400 when function is fail with statusCode 400", async () => {
    const req = {} as any;
    const next = jest.fn();
    //@ts-ignore
    const fn = jest.fn().mockRejectedValue({ statusCode: 400 });
    await asyncMiddleware(fn)(req, res, next);
    expect(res.status(400).json).toHaveBeenCalled();
  });
});
