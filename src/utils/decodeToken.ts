import { jwtDecode } from "jwt-decode";
import * as SecureStore from "expo-secure-store";

const decodeToken = () => {
  const token = SecureStore.getItem("token");
  if (token) {
    const tokenDecode = jwtDecode(token);
    return tokenDecode;
  }
  return null;
};

export default decodeToken;
