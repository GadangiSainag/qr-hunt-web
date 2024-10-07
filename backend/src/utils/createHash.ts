const cryptolib = require("crypto");

export default function createSHA256Hash(string: String, salt?: String  ) {
  const hash = cryptolib.createHash("sha256");
  hash.update(string, salt);
  return hash.digest("hex");
}
