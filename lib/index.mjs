import r from "fs";
import e from "js-yaml";
import n from "path";
import { fileURLToPath as l } from "url";
const i = l(import.meta.url), c = n.dirname(i);
function s() {
  const o = n.join(c, "..", "colors.yml"), t = r.readFileSync(o, "utf8");
  return e.load(t);
}
function m(o = "dmun") {
  return s().shades[o] || null;
}
function a(o = "light") {
  return s().themes[o] || null;
}
function d() {
  return s().themes;
}
const u = {
  shades: "../dist/dmun-tailwind-shades.css",
  light: "../dist/dmun-daisyUI-light.css",
  dark: "../dist/dmun-daisyUI-dark.css"
}, y = {
  loadColors: s,
  getColorPalette: m,
  getTheme: a,
  getAllThemes: d,
  cssFiles: u
};
export {
  u as cssFiles,
  y as default,
  d as getAllThemes,
  m as getColorPalette,
  a as getTheme,
  s as loadColors
};
