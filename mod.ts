import { decrypt } from "./crypto.ts";
import { encode } from "./deps.ts";
import { Element, ListTypeReturn } from "./types.ts";

/**
 * Obten el valor de un parametro que envia el cliente, solo
 * podras obtener el valor de los parametros que has definido en el manifest
 * @param name parameter name
 */
export function getArgmuentValue(name: string) {
  const prefix = `--payload=`;
  const args: string[] = Deno.args;
  const payloadUnDecoded = args.find((arg) => arg.includes(prefix));
  if (!payloadUnDecoded) {
    throw new Error("No payload");
  }
  const payload = payloadUnDecoded.replace(prefix, "");
  const payloadDecoded = atob(payload);
  const payloadJson: { name: string; value: string }[] = JSON.parse(
    payloadDecoded,
  );
  return payloadJson.find((item) => item.name === name)?.value;
}

/**
 * Retorna el listado de elementos al cliente
 * @param response listado de elementos
 */
export function returnListResponse(response: ListTypeReturn) {
  console.log(encode(JSON.stringify(response)));
}

/**
 * Guarda la configuracion de la integracion y redirige al cliente
 * @param name parameter name
 * @param email email del usuario
 * @param picture url de la imagen del usuario
 * @param displayName nombre del usuario
 * @param token token de la integracion
 */
export function saveIntegrationConfigAndRedirect(data: {
  token: string;
  email: string;
  picture: string;
  displayName: string;
}) {
  console.log(encode(JSON.stringify(data)));
}

export function returnResponse(response: unknown) {
  if (typeof response === "string") {
    console.log(encode(response));
  } else {
    console.log(encode(JSON.stringify(response)));
  }
}

export function returnOneItemResponse(response: Element) {
  console.log(encode(JSON.stringify(response)));
}

/**
 * Fetch que añade en la cabecera de autorizacion el token de la integracion del usuario
 * @param url
 * @param options
 */
export async function junoFetch(
  input: URL | Request | string,
  init?: RequestInit,
): Promise<Response> {
  const tokenCrypted = getArgmuentValue("token");
  if (!tokenCrypted) {
    throw new Error("No token");
  }
  const token = await decrypt(tokenCrypted);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  return await fetch(input, { ...init, headers });
}
