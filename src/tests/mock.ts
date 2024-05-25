import { jest } from "@jest/globals";
import { Response } from "express";

export const res = {
  status: jest.fn().mockReturnValue({
    json: jest.fn(),
  }),
  cookie: jest.fn(),
} as any as Response;
