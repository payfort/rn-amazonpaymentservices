import { Platform } from 'react-native';

const nativeResponseSelector = (response: any) => {
  let result: any;
  try {
    if (Platform.OS === 'ios') {
      result = response?.nativeEvent?.response;
    } else {
      result = JSON.parse(response);
    }
  } catch (e) {
    result = null;
  }
  return result;
};

export default nativeResponseSelector;
