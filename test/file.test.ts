import {
  getFileList,
  isExistFile,
  isExistFileSync,
  readFile,
  readFileSync,
  TreeEntry,
  typedFetch,
  writeFile,
  writeFileSync,
} from "../file.ts";
import { join, resolve } from "path";
import { assertEquals } from "asserts";

const currentDir = resolve(Deno.cwd(), ".");

Deno.test("isExistFile", async () => {
  const testVal = await isExistFile(
    join(currentDir, "test/folders/file1.txt"),
  );
  assertEquals<boolean | undefined>(testVal, true);
});

Deno.test("isExistFileSync", () => {
  const testVal = isExistFileSync(
    join(currentDir, "test/folders/file1.txt"),
  );
  assertEquals<boolean | undefined>(testVal, true);
});

Deno.test("writeFile", async () => {
  const filename = join(currentDir, "test/folders/file3.txt");
  await writeFile("aiueo", filename);
  const testVal = await readFile(filename);
  assertEquals<string>(testVal, "aiueo");
});

Deno.test("writeFileSync", () => {
  const filename = join(currentDir, "test/folders/file3.txt");
  writeFileSync("aiueo", filename);
  const testVal = readFileSync(filename);
  assertEquals<string>(testVal, "aiueo");
});

Deno.test("readFile", async () => {
  const testVal = await readFile(
    join(currentDir, "test/folders/file1.txt"),
  );
  assertEquals<string>(
    testVal,
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consequat elementum enim sed posuere. Nullam vel tempus elit. Maecenas vel tortor ac nibh lacinia mollis ac sit amet erat. Phasellus nisi mi, placerat at mi congue, cursus imperdiet purus. Aenean pretium bibendum auctor. Donec hendrerit metus ut enim imperdiet, vitae tincidunt arcu tincidunt. Cras magna sem, mollis in justo id, placerat lacinia enim. Praesent efficitur lorem id elit pulvinar dignissim. Nulla sit amet porta felis, et dictum tortor. Etiam iaculis diam non tellus volutpat varius.\n",
  );
});

Deno.test("readFileSync", () => {
  const testVal = readFileSync(
    join(currentDir, "test/folders/file1.txt"),
  );
  assertEquals<string>(
    testVal,
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consequat elementum enim sed posuere. Nullam vel tempus elit. Maecenas vel tortor ac nibh lacinia mollis ac sit amet erat. Phasellus nisi mi, placerat at mi congue, cursus imperdiet purus. Aenean pretium bibendum auctor. Donec hendrerit metus ut enim imperdiet, vitae tincidunt arcu tincidunt. Cras magna sem, mollis in justo id, placerat lacinia enim. Praesent efficitur lorem id elit pulvinar dignissim. Nulla sit amet porta felis, et dictum tortor. Etiam iaculis diam non tellus volutpat varius.\n",
  );
});

interface TypedFetchReturnObject {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
type TypedFetchReturnType = string | ArrayBuffer | TypedFetchReturnObject;
Deno.test("typedFetch", async () => {
  const testVal = await typedFetch<TypedFetchReturnObject>({
    url: "https://jsonplaceholder.typicode.com/todos/1",
    wanttype: "json",
  });
  assertEquals<TypedFetchReturnType>(testVal, {
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false,
  });
});

Deno.test("getFileList", async () => {
  const testVal = await getFileList(join(currentDir, "test"));
  assertEquals<TreeEntry[]>(testVal, [
    {
      name: "text.test.ts",
      isFile: true,
      isDirectory: false,
      isSymlink: false,
      path: "/Users/windchime-yk/Documents/web/deno-util/test/text.test.ts",
      ext: ".ts",
    },
    {
      name: "file.test.ts",
      isFile: true,
      isDirectory: false,
      isSymlink: false,
      path: "/Users/windchime-yk/Documents/web/deno-util/test/file.test.ts",
      ext: ".ts",
    },
    {
      name: "file3.txt",
      isFile: true,
      isDirectory: false,
      isSymlink: false,
      path:
        "/Users/windchime-yk/Documents/web/deno-util/test/folders/file3.txt",
      ext: ".txt",
    },
    {
      name: "file1.txt",
      isFile: true,
      isDirectory: false,
      isSymlink: false,
      path:
        "/Users/windchime-yk/Documents/web/deno-util/test/folders/file1.txt",
      ext: ".txt",
    },
    {
      name: "file3.txt",
      isFile: true,
      isDirectory: false,
      isSymlink: false,
      path:
        "/Users/windchime-yk/Documents/web/deno-util/test/folders/file3.txt",
      ext: ".txt",
    },
    {
      name: "file2.txt",
      isFile: true,
      isDirectory: false,
      isSymlink: false,
      path:
        "/Users/windchime-yk/Documents/web/deno-util/test/folders/folder/file2.txt",
      ext: ".txt",
    },
    {
      name: "object.test.ts",
      isFile: true,
      isDirectory: false,
      isSymlink: false,
      path: "/Users/windchime-yk/Documents/web/deno-util/test/object.test.ts",
      ext: ".ts",
    },
  ]);
});
