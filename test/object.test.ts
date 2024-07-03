import { assertEquals } from "@std/assert";
import {
  extractObjectValue,
  narrowdownArrayObject,
  typedJsonParse,
} from "../object.ts";

interface SampleObject {
  text: string;
  num: number;
  bool: boolean;
}

const sampleObject: SampleObject[] = [
  {
    "text": "あああああ",
    "num": 0,
    "bool": false,
  },
  {
    "text": "いいいいいい",
    "num": 1,
    "bool": true,
  },
  {
    "text": "ううううううう",
    "num": 2,
    "bool": false,
  },
];

Deno.test("extractObjectValue", () => {
  const testVal = extractObjectValue<SampleObject>(sampleObject, "bool");
  assertEquals<(string | number | boolean)[]>(testVal, [false, true, false]);
});

Deno.test("narrowdownArrayObject", () => {
  const testVal = narrowdownArrayObject<SampleObject>(
    sampleObject,
    "bool",
    false,
  );
  assertEquals<SampleObject[]>(testVal, [
    {
      "text": "あああああ",
      "num": 0,
      "bool": false,
    },
    {
      "text": "ううううううう",
      "num": 2,
      "bool": false,
    },
  ]);
});

Deno.test("typedJsonParse", () => {
  const testVal = typedJsonParse<SampleObject[]>(JSON.stringify(sampleObject));
  assertEquals<SampleObject[]>(testVal, sampleObject);
});
