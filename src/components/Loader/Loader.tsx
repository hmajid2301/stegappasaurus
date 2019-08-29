import * as React from "react";
import { ActivityIndicator, View } from "react-native";
import { colors } from "~/modules";

import styles from "./styles";

interface IProps {
  loading: boolean;
  overlay?: string;
}

const Loader = ({ loading, overlay }: IProps) => {
  if (loading) {
    return (
      <View
        style={[
          styles.loaderContainer,
          {
            backgroundColor: overlay
          }
        ]}
      >
        <ActivityIndicator color={colors.primary} size={"large"} />
      </View>
    );
  }

  return <View />;
};

export default Loader;
