import { AsyncStorage } from "react-native";

const retrieveData = async (keyName: string) => {
  const value: string | null = await AsyncStorage.getItem(keyName);
  if (value !== null) {
    return value;
  }
  return "";
};

const storeData = async (keyName: string, value: any) => {
  await AsyncStorage.setItem(keyName, value);
};

export { retrieveData, storeData };
