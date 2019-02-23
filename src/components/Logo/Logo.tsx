import React from "react";
import { Image, Text, View } from "react-native";

import { ThemeColors } from "~/util/interfaces";

import styles from "./styles";

const logoDark = require("~/assets/images/logo-dark.png");
const logoLight = require("~/assets/images/logo-light.png");

interface IProps {
  isDark: boolean;
  color: ThemeColors;
}

const Logo = ({ color, isDark }: IProps) => (
  <View style={styles.container}>
    <Text style={[styles.text, { color }]}>Steg</Text>
    <Image source={isDark ? logoLight : logoDark} style={styles.logo} />
    <Text style={[styles.text, { color }]}>ppasaurus</Text>
  </View>
);

export default Logo;
