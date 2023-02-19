import { encode } from "./deps.ts";
import { Element, ListTypeReturn } from "./types.ts";

function getValueFromArgs(name: string,type:"parameters"|"secrets") {
  const prefix = `--${type}=`;
  const args: string[] = Deno.args;
  const payloadUnDecoded = args.find((arg) => arg.includes(prefix));
  if (!payloadUnDecoded) {
    throw new Error(`No ${type}`);
  }
  const payload = payloadUnDecoded.replace(prefix, "");
  const payloadDecoded = atob(payload);
  const payloadJson: { name: string; value: string }[] = JSON.parse(
    payloadDecoded,
  );
  const value = payloadJson.find((p) => p.name === name)?.value;
  if (!value) {
    throw new Error("No value");
  }
  return value;
}

/**
 * Obten el valor de un parametro que envia el cliente, solo
 * podras obtener el valor de los parametros que has definido en el manifest
 * @param name parameter name
 */
export function getParameterValue(name: string) {
  return getValueFromArgs(name,"parameters");
}

export function getSecretValue(key: string) {
  return getValueFromArgs(key,"secrets");
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

  const payloadToProxy = {
    token: getSecretValue("USER_INTEGRATION_TOKEN_ENCRYPTED"),
    integration: getSecretValue("INTEGRATION_NAME"),
    input,
    init,
  }
  const response = await fetch(`${getSecretValue("BASE_URL")}/proxy`, {
    method: "POST",
    body: JSON.stringify(payloadToProxy),
  });
  return response;
}
