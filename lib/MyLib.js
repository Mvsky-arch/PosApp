import crypto from "crypto";

export const encrypt = (text) => {
  const chiperKey = crypto.createCipher(
    "aes-128-cbc",
    process.env.CRYPTO_SECRET_KEY
  );

  let encrypted = chiperKey.update(text, "utf8", "hex");
  encrypted += chiperKey.final("hex");
  return encrypted;
};

export const decrypt = (encryptText) => {
  const deChiperKey = crypto.createDecipher(
    "aes-128-cbc",
    process.env.CRYPTO_SECRET_KEY
  );

  let decrypted = deChiperKey.update(encryptText, "hex", "utf8");
  decrypted += deChiperKey.final("utf8");
  return decrypted;
};

export const createRandomString = (length) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};
