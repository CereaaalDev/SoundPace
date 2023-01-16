import CryptoJS from "crypto-js";


export const getEncodedVerifier = (code_verifier) => {
  let encoded_code_challenge = CryptoJS.SHA256(code_verifier)
    .toString(CryptoJS.enc.Base64)
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replace(/=+$/, "");
  return encoded_code_challenge;
};


export function generateRandomString(length) {
   var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; //!@#$%^&*() backup for special characters
   var charLength = chars.length;
   var result = '';
   for ( var i = 0; i < length; i++ ) {
      result += chars.charAt(Math.floor(Math.random() * charLength));
   }
   return result;
}
 
