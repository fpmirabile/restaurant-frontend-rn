import * as React from 'react';
import { View, ScrollView, StyleProp, ViewStyle } from 'react-native';
import { styles } from './styles';

interface PropTypes {
  nestedScrollEnabled?: boolean;
  viewStyles?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

export function ScrollPage({
  children,
  viewStyles = {},
  nestedScrollEnabled = false,
}: PropTypes) {
  return (
    <ScrollView
      nestedScrollEnabled={nestedScrollEnabled}
      style={styles.scrollView}>
      <View style={[styles.containerView, viewStyles]}>{children}</View>
    </ScrollView>
  );
}
