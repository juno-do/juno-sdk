import { encode } from "./deps.ts";
import { Element, ListTypeReturn } from "./types.ts";

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
export function returnListResponse(response: ListTypeReturn) {
  console.log(encode(JSON.stringify(response)));
}

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
