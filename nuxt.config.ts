// https://nuxt.com/docs/api/configuration/nuxt-config
import { NuxtConfig } from "@nuxt/types";

const config: NuxtConfig = {
  devtools: { enabled: true },
  buildModules: ["@nuxt/typescript-build"],
};
export default config;
