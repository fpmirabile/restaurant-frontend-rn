import * as React from 'react';
import { Text, TextProps } from 'react-native';
import { styles } from './styles';

type Fonts = 'regular' | 'italic' | 'bold';

interface AppTextProps extends TextProps {
  children: React.ReactNode;
  center?: boolean;
  darkPinkColor?: boolean;
  fontType?: Fonts;
}

const AppText = ({ style, center, ...props }: AppTextProps) => (
  <Text {...props} style={[styles.text, center && styles.center, style]} />
);

export const Title = ({ style, center, ...props }: AppTextProps) => (
  <AppText {...props} style={[styles.title, center && styles.center, style]} />
);

export const Headline5 = ({ style, center, ...props }: AppTextProps) => (
  <AppText
    {...props}
    style={[styles.headline5, center && styles.center, style]}
  />
);

export const Headline6 = ({ style, center, ...props }: AppTextProps) => (
  <AppText
    {...props}
    style={[styles.headline6, center && styles.center, style]}
  />
);

export const CTAText = ({ style, center, ...props }: AppTextProps) => (
  <AppText
    {...props}
    style={[styles.ctaText, center && styles.center, style]}
  />
);

export const Body = ({
  style,
  center,
  darkPinkColor,
  fontType,
  ...props
}: AppTextProps) => {
  const font =
    fontType === 'regular'
      ? [styles.body]
      : fontType === 'bold'
      ? [styles.bold]
      : [];
  return (
    <AppText
      {...props}
      style={[
        styles.body,
        center && styles.center,
        darkPinkColor && styles.darkPinkColor,
        ...font,
        style,
      ]}
    />
  );
};

export const Body2 = ({
  style,
  center,
  darkPinkColor,
  fontType,
  ...props
}: AppTextProps) => {
  const font =
    fontType === 'regular'
      ? [styles.body]
      : fontType === 'bold'
      ? [styles.bold]
      : [];
  return (
    <AppText
      {...props}
      style={[
        styles.body2,
        center && styles.center,
        darkPinkColor && styles.darkPinkColor,
        ...font,
        style,
      ]}
    />
  );
};

export const Error = ({ style, center, ...props }: AppTextProps) => (
  <AppText {...props} style={[styles.error, center && styles.center, style]} />
);

export const Caption = ({
  style,
  center,
  darkPinkColor,
  fontType,
  ...props
}: AppTextProps) => {
  const font =
    fontType === 'regular'
      ? [styles.body]
      : fontType === 'bold'
      ? [styles.bold]
      : [];
  return (
    <AppText
      {...props}
      style={[
        styles.caption,
        center && styles.center,
        darkPinkColor && styles.darkPinkColor,
        ...font,
        style,
      ]}
    />
  );
};
