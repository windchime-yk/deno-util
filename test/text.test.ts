import { assertEquals } from "../deps.ts";
import {
  Days,
  kakuyomuOriginalTagConvert,
  readDate,
  zeroPadding,
} from "../text.ts";

Deno.test("kakuyomuOriginalTagConvert - all", () => {
  const testVal = kakuyomuOriginalTagConvert("<p>|卵《たまご》かけ《《ごはん》》</p>");
  assertEquals(
    testVal,
    '<p><ruby class="util-ruby">卵<rt>たまご</rt></ruby>かけ<strong class="util-emphasis">ごはん</strong></p>',
  );
});

Deno.test("kakuyomuOriginalTagConvert - ruby", () => {
  const testVal = kakuyomuOriginalTagConvert("<p>|卵《たまご》かけごはん</p>");
  assertEquals(
    testVal,
    '<p><ruby class="util-ruby">卵<rt>たまご</rt></ruby>かけごはん</p>',
  );
});

Deno.test("kakuyomuOriginalTagConvert - emphasis", () => {
  const testVal = kakuyomuOriginalTagConvert("<p>卵かけ《《ごはん》》</p>");
  assertEquals(testVal, '<p>卵かけ<strong class="util-emphasis">ごはん</strong></p>');
});

Deno.test("zeroPadding", () => {
  const testVal = zeroPadding(20, 3);
  assertEquals(testVal, "020");
});

Deno.test("readDate - all", () => {
  const testVal = readDate({ date: "2021/01/21", zeropadding: true });
  assertEquals<string | number>(testVal.year, "2021");
  assertEquals<string | number>(testVal.month, "01");
  assertEquals<string | number>(testVal.date, "21");
  assertEquals<Days>(testVal.days, "木");
  assertEquals<string | number>(testVal.hour, "00");
  assertEquals<string | number>(testVal.minute, "00");
  assertEquals<string | number>(testVal.second, "00");
});

Deno.test("readDate - date only", () => {
  const testVal = readDate({ date: "2021/01/21" });
  assertEquals<string | number>(testVal.year, 2021);
  assertEquals<string | number>(testVal.month, 1);
  assertEquals<string | number>(testVal.date, 21);
  assertEquals<Days>(testVal.days, "木");
  assertEquals<string | number>(testVal.hour, 0);
  assertEquals<string | number>(testVal.minute, 0);
  assertEquals<string | number>(testVal.second, 0);
});
