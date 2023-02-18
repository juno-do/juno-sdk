import { AES} from "./deps.ts";
import "https://deno.land/x/dotenv@v3.2.2/load.ts";

export async function encrypt(text:string) {
    const aes = getAesClient();
    const cipher = await aes.encrypt(text);
    return cipher.hex();
}

export async function decrypt(encreptedTextHex:string) {
    const aes = getAesClient();
    const encreptedText = new Uint8Array(encreptedTextHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
    const plain = await aes.decrypt(encreptedText);
    return plain.toString();
}

function getAesClient(){
    const key = Deno.env.get("SECRET_KEY")
    if(!key){
        throw new Error("No key");
    }
    const IV_LENGTH = 16;
    const aes = new AES(key, {
        mode: "cbc",
        iv: new Uint8Array(IV_LENGTH)
    });
    return aes;
}

