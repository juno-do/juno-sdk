import { Element, FilterOptions, ListTypeReturn } from "./types.ts";



export function getParameterValue(name: string) {
  return new Promise((resolve, reject) => {
    const uuid = generateUUID();
    self.postMessage({ action: 'getParam', uuid, param:name });

    self.addEventListener("message", (e) => {
      const { action, error, responseUUID, paramValue } = e.data;

      if (action === 'returnParam' && responseUUID === uuid ) {
        if (error) {
          reject(error);
        } else {
          resolve(paramValue);
        }
      }
    });
  });
}

/**
 * Retorna el listado de elementos al cliente
 * @param response listado de elementos
 */
export function returnListResponse(response: ListTypeReturn) {
  return response;
}

export function returnFilterOptionsResponse(options: FilterOptions[]) {
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
}) {
  return data;
}

export function returnResponse(response: unknown) {
  return response;
}

export function returnOneItemResponse(response: Element) {
  return response;
}


  /**
 * Fetch que añade en la cabecera de autorizacion el token de la integracion del usuario
 * @param url
 * @param options
 */
  export function junoFetch(
    input: URL | Request | string,
    init?: RequestInit,
  ): Promise<Response> {
    return new Promise((resolve, reject) => {
      const uuid = generateUUID();
      
      self.postMessage({ action: 'fetch', uuid,fetch: {input,init} });
  
      self.addEventListener("message", (e) => {
        const { action, error, responseUUID,fetchResponse } = e.data;
        if (action === 'fetchResponse' && responseUUID === uuid && fetchResponse) {
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
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.trunc(Math.random() * 16);
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }