import { jwtVerify } from "jose";

export function getJwtSecretKey() {
  const secret = process.env.SECRET;

  if (!secret) {
    throw new Error("JWT Secret key is not matched");
  }

  return new TextEncoder().encode(secret);
}

export async function verifyJwtToken(token) {
  try {
    const payload = jwtVerify(token, getJwtSecretKey());
    return payload;
  } catch (error) {
    return null;
  }
}
