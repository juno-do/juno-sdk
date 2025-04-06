import {
  Element,
  ListTypeReturn,
  ViewOptions,
  FilterOptionsSelected,
  FilterSubItem,
} from "./types.ts";
export type * from "./types.ts";

export function getParameterValue(name: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const uuid = generateUUID();
    // @ts-ignore: lack of types in deno
    self.postMessage({ action: "getParam", uuid, param: name });

    // @ts-ignore: lack of types in deno
    self.addEventListener("message", (e) => {
      if (e instanceof MessageEvent) {
        const { action, error, responseUUID, paramValue } = e.data;

        if (action === "returnParam" && responseUUID === uuid) {
          if (error) {
            reject(error);
          } else {
            resolve(paramValue);
          }
        }
      }
    });
  });
}

export async function getAllFilters(): Promise<FilterOptionsSelected[]> {
  const allFiltersRaw = (await getParameterValue("filters")) as string;
  let allFilters: FilterOptionsSelected[] = [];
  try {
    allFilters = JSON.parse(allFiltersRaw) ?? [];
    // deno-lint-ignore no-empty
  } catch (_error) {}
  return allFilters;
}

export async function getViewOptions(): Promise<ViewOptions> {
  const viewOptionsRaw = (await getParameterValue("viewOptions")) as string;
  let viewOptions: ViewOptions = {
    toogleOptions: [],
    selectOptions: [],
  };
  try {
    viewOptions = JSON.parse(viewOptionsRaw) ?? {};
  } catch (_error) {}
  return viewOptions;
}

/**
 * Retorna el listado de elementos al cliente
 * @param response listado de elementos
 */
export function returnListResponse(response: ListTypeReturn): ListTypeReturn {
  return response;
}

export function returnFilterOptionsResponse(
  options: FilterSubItem[]
): FilterSubItem[] {
  return options;
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
}): {
  email: string;
  picture: string;
  displayName: string;
} {
  return data;
}

export function returnResponse(response: unknown): unknown {
  return response;
}

export function returnOneItemResponse(response: Element): Element {
  return response;
}

/**
 * Fetch que añade en la cabecera de autorizacion el token de la integracion del usuario
 * @param url
 * @param options
 */
export function junoFetch(
  input: URL | Request | string,
  init?: RequestInit
): Promise<Response> {
  return new Promise((resolve, reject) => {
    const uuid = generateUUID();

    // @ts-ignore: lack of types in deno
    self.postMessage({ action: "fetch", uuid, fetch: { input, init } });
    // @ts-ignore: lack of types in deno
    self.addEventListener("message", (e: MessageEvent) => {
      const { action, error, responseUUID, fetchResponse } = e.data;
      if (
        action === "fetchResponse" &&
        responseUUID === uuid &&
        fetchResponse
      ) {
        const response = new Response(fetchResponse.body, fetchResponse.init);
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      }
    });
  });
}

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.trunc(Math.random() * 16);
    const v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
