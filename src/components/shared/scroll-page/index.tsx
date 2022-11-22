import * as React from 'react';
import { View, ScrollView, StyleProp, ViewStyle } from 'react-native';
import { styles } from './styles';

interface PropTypes {
  nestedScrollEnabled?: boolean;
  horizontal?: boolean;
  scrollViewStyles?: StyleProp<ViewStyle>;
  internalContainerStyles?: StyleProp<ViewStyle>;
  contentViewStyles?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

export function ScrollPage({
  children,
  internalContainerStyles = {},
  scrollViewStyles = {},
  contentViewStyles = {},
  nestedScrollEnabled = false,
  horizontal,
}: PropTypes) {
  return (
    <ScrollView
      horizontal={horizontal}
      nestedScrollEnabled={nestedScrollEnabled}
      contentContainerStyle={[styles.scrollViewContent, contentViewStyles]}
      style={[styles.scrollView, scrollViewStyles]}>
      <View style={[styles.containerView, internalContainerStyles]}>
        {children}
      </View>
    </ScrollView>
  );
}
