import * as React from "react";
import { ActivityIndicator, View } from "react-native";
import { colors } from "~/modules";

import styles from "./styles";

interface IProps {
  loading: boolean;
}

const Loader = ({ loading }: IProps) => {
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator color={colors.primary} size={"large"} />
      </View>
    );
  }

  return <View />;
};

export default Loader;
