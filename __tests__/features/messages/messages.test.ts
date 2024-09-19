import { parseMessage } from "@/features/messages/messages";

test("parseMessage", () => {
  expect(parseMessage("[angry]こんにちは")).toEqual({
    tag: "[angry]",
    body: "こんにちは",
  });
});
