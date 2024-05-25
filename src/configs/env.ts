import dotenv from "dotenv";

export const loadEnvConfig = () => {
  if (process.env.NODE_ENV === "test") {
    dotenv.config({ path: ".env.test" });
  } else {
    dotenv.config({ path: ".env" });
  }
};
