export const CONFIG_FILE_NAME = "deno.json";
export const getJsrVersionConfig = (version: string) => ({
  version,
});
export const mergeConfigFile = async (jsrConfig: { version: string }) => {
  const configFileData = JSON.parse(await Deno.readTextFile(CONFIG_FILE_NAME));
  const mergedConfigFileData = {
    ...configFileData,
    ...jsrConfig,
  };

  return {
    configFileData,
    mergedConfigFileData,
  };
};
