import { Element, FilterOptions, ListTypeReturn } from "./types.ts";
export type { Element, FilterOptions, ListTypeReturn };

function getValueFromArgs(name: string, type: "parameters" | "secrets") {
  const prefix = `--${type}=`;
  const args: string[] = Deno.args;
  const payloadUnDecoded = args.find((arg) => arg.includes(prefix));
  if (!payloadUnDecoded) {
    return null;
  }
  const payload = payloadUnDecoded.replace(prefix, "");
  const payloadDecoded = atob(payload);
  const payloadJson: { name: string; value: string }[] =
    JSON.parse(payloadDecoded);
  const value = payloadJson.find((p) => p.name === name);
  if (!value) {
    return null;
  }
  return value?.value;
}

/**
 * Obten el valor de un parametro que envia el cliente, solo
 * podras obtener el valor de los parametros que has definido en el manifest
 * @param name parameter name
 */
export function getParameterValue(name: string): string | null {
  return getValueFromArgs(name, "parameters");
}

export function getSecretValue(key: string): string | null {
  return getValueFromArgs(key, "secrets");
}

/**
 * Retorna el listado de elementos al cliente
 * @param response listado de elementos
 */
export function returnListResponse(response: ListTypeReturn) {
  console.log(JSON.stringify(response));
}

export function returnFilterOptionsResponse(options: FilterOptions[]) {
  console.log(JSON.stringify(options));
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
  email: string;
  picture: string;
  displayName: string;
}) {
  console.log(JSON.stringify(data));
}

export function returnResponse(response: unknown) {
  if (typeof response === "string") {
    console.log(response);
  } else {
    console.log(JSON.stringify(response));
  }
}

export function returnOneItemResponse(response: Element) {
  console.log(JSON.stringify(response));
}

/**
 * Fetch que añade en la cabecera de autorizacion el token de la integracion del usuario
 * @param url
 * @param options
 */
export async function junoFetch(
  input: URL | Request | string,
  init?: RequestInit
): Promise<Response> {
  const PROXY_URL = Deno.env.get("PROXY_URL");
  if (!PROXY_URL) {
    throw new Error("No proxy url");
  }
  const response = await fetch(`http://${PROXY_URL}`, {
    ...init,
    headers: {
      ...init?.headers,
      "Content-Type": "application/json",
      "X-Juno-token-encrypted":
        getSecretValue("USER_INTEGRATION_TOKEN_ENCRYPTED") ?? "",
      "X-Juno-input": input.toString(),
    },
  });
  return response;
}
