import { ColumnOptions, ColumnType, Column as OriginalColumn } from "typeorm";
import { UpdateDateColumn as OriginalUpdateDateColumn } from "typeorm";
import { CreateDateColumn as OriginalCreateDateColumn } from "typeorm";

const Env = { isTest: process.env.NODE_ENV === "test" };

export function Column(columnOptions: ColumnOptions = {}) {
  return OriginalColumn(EnvSpecificDecoratorValue(columnOptions));
}

export function CreateDateColumn(columnOptions: ColumnOptions = {}) {
  return OriginalCreateDateColumn(EnvSpecificDecoratorValue(columnOptions));
}

export function UpdateDateColumn(columnOptions: ColumnOptions = {}) {
  return OriginalUpdateDateColumn(EnvSpecificDecoratorValue(columnOptions));
}

export function EnvSpecificDecoratorValue(options: ColumnOptions = {}) {
  if (options.type) options.type = resolveType(options.type);
  if (options.default) options.default = resolveDefault(options.default);
  return options;
}

function resolveType(type: ColumnType): ColumnType {
  if (!Env.isTest) return type;
  if (type === "timestamp") return "datetime";
  if (type === "mediumblob") return "blob";
  if (type === "mediumtext") return "text";
  if (type === "jsonb") return "text";
  if (type === "json") return "text";
  if (type === "enum") return "text";
  if (type === "uuid") return "text";

  return type;
}

function resolveDefault(defaultValue: unknown): any {
  if (!Env.isTest) return defaultValue;
  const whitelist = ["string", "number"];
  const type = typeof defaultValue;
  if (type === "function") {
    const checkFunctionReturnValue = JSON.stringify((defaultValue as Function)());
    return checkFunctionReturnValue;
  }
  if (!whitelist.includes(type)) return JSON.stringify(defaultValue);

  return defaultValue;
}
