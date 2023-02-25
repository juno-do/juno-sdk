import { AES} from "./deps.ts";
import "https://deno.land/x/dotenv@v3.2.2/load.ts";

export async function encrypt(text:string) {
    const aes = getAesClient();
    const cipher = await aes.encrypt(text);
    return cipher.hex();
}

export async function decrypt(encreptedTextHex:string) {
    try {
        const aes = getAesClient();
        const encreptedText = new Uint8Array(encreptedTextHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
        const plain = await aes.decrypt(encreptedText);
        return plain.toString();
    } catch (e)  {
        throw new Error(e);
    }

}

function getAesClient(){
     const key = Deno.env.get("ENCRYPTION_ACCES_USER_TOKEN_KEY")
    const iv = Deno.env.get("ENCRYPTION_ACCES_USER_TOKEN_IV");
    if (!key || !iv) {
      throw new Error(
        "ENCRYPTION_ACCES_USER_TOKEN_KEY or ENCRYPTION_ACCES_USER_TOKEN_IV is not defined",
      );
    }
     const aes = new AES(key, {
        mode: "cbc",
        iv
    });
    return aes;
}