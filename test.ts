import { assertEquals } from "./test_deps.ts";
Deno.test("hello world", { permissions: { read: true } }, () => {
  assertEquals("1", "1");
});
