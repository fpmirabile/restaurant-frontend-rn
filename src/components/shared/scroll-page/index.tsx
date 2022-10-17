import * as React from 'react';
import { View, ScrollView, StyleProp, ViewStyle } from 'react-native';
import { styles } from './styles';

interface PropTypes {
  nestedScrollEnabled?: boolean;
  scrollViewStyles?: StyleProp<ViewStyle>;
  internalContainerStyles?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

export function ScrollPage({
  children,
  internalContainerStyles = {},
  scrollViewStyles = {},
  nestedScrollEnabled = false,
}: PropTypes) {
  return (
    <ScrollView
      nestedScrollEnabled={nestedScrollEnabled}
      style={[styles.scrollView, scrollViewStyles]}>
      <View style={[styles.containerView, internalContainerStyles]}>
        {children}
      </View>
    </ScrollView>
  );
}
