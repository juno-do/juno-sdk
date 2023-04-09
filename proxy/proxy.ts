import { decrypt } from "./crypto.ts";

const server = Deno.listen({ port: 8989 });
console.log(`HTTP webserver running.  Access it at:  http://localhost:8989/`);

for await (const conn of server) {
  serveHttp(conn);
}

async function serveHttp(conn: Deno.Conn) {
  const httpConn = Deno.serveHttp(conn);

  for await (const requestEvent of httpConn) {
    handleRequest(requestEvent);
  }
}

async function handleRequest(requestEvent: Deno.RequestEvent) {
  try {
    console.log("Peticion", new Date().toISOString());
    const accesTokenEncrypted = requestEvent.request.headers.get(
      "X-Juno-token-encrypted",
    );
    if (!accesTokenEncrypted) {
      throw new Error("No token");
    }
    const accesTokenDecrypted = await decrypt(accesTokenEncrypted);
    const input = requestEvent.request.headers.get("x-juno-input");
    if (!input) {
      throw new Error("No input");
    }
    const body = requestEvent.request.body
      ? await requestEvent.request.text()
      : undefined;

    const response = await fetch(input, {
      ...requestEvent.request,
      method: requestEvent.request.method,
      body: body,
      headers: {
        "Content-Type": requestEvent.request.headers.get("Content-Type") ??
          "application/json",
        Authorization: `Bearer ${accesTokenDecrypted}`,
      },
    });
    const responseJson = await response.text();
    console.log("Respuesta", responseJson, requestEvent.request.headers);
    requestEvent.respondWith(
      new Response(responseJson, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      }),
    );
  } catch (error) {
    console.error(error);
    requestEvent.respondWith(new Response(error.message, { status: 500 }));
  }
}
