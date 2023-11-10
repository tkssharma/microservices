import crypto from "crypto";

const secret = process.env.PASSWORD_SECRET || "";

export const authentication = (salt: string, password: string): string => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(secret)
    .digest("hex");
};

export const random = () => crypto.randomBytes(128).toString("base64");
