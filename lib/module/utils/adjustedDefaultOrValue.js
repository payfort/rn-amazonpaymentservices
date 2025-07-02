import { PixelRatio } from 'react-native';
const adjustedDefaultOrValue = (defaultValue, value, withMultiplier) => {
  const adjustment = withMultiplier ? 1.7 : 1;
  return value ? PixelRatio.getPixelSizeForLayoutSize(value) * adjustment : PixelRatio.getPixelSizeForLayoutSize(defaultValue) * adjustment;
};
export default adjustedDefaultOrValue;
//# sourceMappingURL=adjustedDefaultOrValue.js.map