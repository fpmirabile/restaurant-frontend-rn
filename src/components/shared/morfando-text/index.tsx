import * as React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';
import { COLORS } from '../../../style-constants';

type Fonts = 'regular' | 'italic' | 'bold';

interface AppTextProps extends TextProps {
  children: React.ReactNode;
  center?: boolean;
  darkpinkcolor?: boolean;
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
    style={[styles.ctatext, center && styles.center, style]}
  />
);

export const Body = ({
  style,
  center,
  darkpinkcolor,
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
        darkpinkcolor && styles.darkpinkcolor,
        ...font,
        style,
      ]}
    />
  );
};

export const Body2 = ({
  style,
  center,
  darkpinkcolor,
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
        darkpinkcolor && styles.darkpinkcolor,
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
  darkpinkcolor,
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
        darkpinkcolor && styles.darkpinkcolor,
        ...font,
        style,
      ]}
    />
  );
};



const styles = StyleSheet.create({
  text: {
    fontSize: 22,
  },
  title: {
    fontFamily: 'FredokaOne-Regular',
    fontSize: 34,
    color: COLORS.darkpink,
  },
  headline5: {
    fontFamily: 'FredokaOne-Regular',
    fontSize: 24,
    color: COLORS.darkpink,
  },
  headline6: {
    fontFamily: 'FredokaOne-Regular',
    fontSize: 20,
    color: COLORS.blueSecondary,
  },
  ctatext: {
    fontFamily: 'FredokaOne-Regular',
    fontSize: 16,
    color: COLORS.blueSecondary,
  },
  body: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    color: COLORS.blueSecondary,
  },
  body2: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    color: COLORS.blueSecondary,
  },
  error: {
    color: 'red',
    fontWeight: '600',
  },
  caption: {
    fontSize: 12,
    color: COLORS.blueSecondary,
  },
  center: {
    textAlign: 'center',
  },
  darkpinkcolor: {
    color: COLORS.darkpink,
  },
  bold: {
    fontFamily: 'OpenSans-Bold',
  },
  italic: {
    fontFamily: 'OpenSans-Italic',
  },
});
