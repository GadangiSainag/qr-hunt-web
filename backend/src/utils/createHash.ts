import cryptolib from "crypto";

export default function createHash(str: string,
  salt?: string,
  length=10): string {
    const hash = cryptolib
    .createHash("sha256")
    .update(str + salt) // Concatenate string and salt
    .digest("hex");
  return hash.slice(0, length);
}
