import cryptolib, { Encoding } from "crypto";

export default function createSHA256Hash(string: string, salt?: string) {
  const hash = cryptolib.createHash("sha256");

  hash.update(string, salt as Encoding);
  hash.update(hash.toString(), salt as Encoding);
  return hash.digest("hex");
}
