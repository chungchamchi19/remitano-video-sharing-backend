import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import { Column, CreateDateColumn, EnvSpecificDecoratorValue, UpdateDateColumn } from "../dbAwareColumn";

describe("dbAwareColumn", () => {
  beforeEach(async () => {
    jest.clearAllMocks();
  });

  describe("Column", () => {
    it("should return Column", async () => {
      const result = Column();
      expect(result).toBeInstanceOf(Function);
    });
  });

  describe("CreateDateColumn", () => {
    it("should return CreateDateColumn", async () => {
      const result = CreateDateColumn();
      expect(result).toBeInstanceOf(Function);
    });
  });

  describe("UpdateDateColumn", () => {
    it("should return UpdateDateColumn", async () => {
      const result = UpdateDateColumn();
      expect(result).toBeInstanceOf(Function);
    });
  });

  describe("EnvSpecificDecoratorValue when default is function", () => {
    it("should return EnvSpecificDecoratorValue", async () => {
      const result = EnvSpecificDecoratorValue({
        type: "bool",
        default: () => {
          return "test";
        },
      });
      expect(result.type).toBe("bool");
      expect(typeof result.default).toBe("string");
    });
  });

  describe("EnvSpecificDecoratorValue when default is string", () => {
    it("should return EnvSpecificDecoratorValue", async () => {
      const result = EnvSpecificDecoratorValue({
        type: "bool",
        default: "test",
      });
      expect(result.type).toBe("bool");
      expect(result.default).toBe("test");
    });
  });
});
