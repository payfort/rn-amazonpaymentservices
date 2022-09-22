const checkColorOrDefault = (defaultColor: string, hexColor?: string) => {
  const reg = /^#[0-9A-F]{6}$/i;
  return hexColor && reg.test(hexColor) ? hexColor : defaultColor;
};

export default checkColorOrDefault;
