import { jwtDecoder, JWTDecoded } from "@kinde/jwt-decoder";
import { getActiveStorage } from ".";
import { StorageKeys } from "../../sessionManager";
/**
 *
 * @param tokenType Type of token to decode
 * @returns { Promise<JWTDecoded | null> }
 */
export const getDecodedToken = async <
  T = JWTDecoded & {
    permissions: string[];
    org_code: string;
  },
>(
  tokenType: "accessToken" | "idToken" = "accessToken",
): Promise<T | null> => {
  const activeStorage = getActiveStorage();

  const token = (await activeStorage.getSessionItem(
    tokenType === "accessToken" ? StorageKeys.accessToken : StorageKeys.idToken,
  )) as string;

  if (!token) {
    return null;
  }

  return jwtDecoder<T>(token);
};
