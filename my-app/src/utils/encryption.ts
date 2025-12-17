import CryptoJS from "crypto-js";
import { SECRET_KEY } from "@/config/api";

export const setEncryptedItem = (key: string, value: any) => {
  try {
    const encryptedValue = CryptoJS.AES.encrypt(
      JSON.stringify(value),
      SECRET_KEY
    ).toString();

    localStorage.setItem(key, encryptedValue);
  } catch (error) {
    console.error("Error setting encrypted item", error);
  }
};

export const getDecryptedItem = <T = any>(key: string): T | null => {
  try {
    const encryptedValue = localStorage.getItem(key);
    if (!encryptedValue) return null;

    const bytes = CryptoJS.AES.decrypt(encryptedValue, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    return decrypted ? JSON.parse(decrypted) : null;
  } catch (error) {
    console.error("Error getting encrypted item", error);
    return null;
  }
};

export const removeEncryptedItem = (key: string) => {
  localStorage.removeItem(key);
};
