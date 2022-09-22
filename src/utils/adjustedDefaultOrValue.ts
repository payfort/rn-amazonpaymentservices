import { PixelRatio } from 'react-native';

const adjustedDefaultOrValue = (
  defaultValue: any,
  value?: any,
  withMultiplier?: boolean
) => {
  const adjustment = withMultiplier ? 1.7 : 1;
  return value
    ? PixelRatio.getPixelSizeForLayoutSize(value) * adjustment
    : PixelRatio.getPixelSizeForLayoutSize(defaultValue) * adjustment;
};

export default adjustedDefaultOrValue;
