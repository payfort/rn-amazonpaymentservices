const checkColorOrDefault = (defaultColor, hexColor) => {
  const reg = /^#[0-9A-F]{6}$/i;
  return hexColor && reg.test(hexColor) ? hexColor : defaultColor;
};
export default checkColorOrDefault;
//# sourceMappingURL=checkColorOrDefault.js.map