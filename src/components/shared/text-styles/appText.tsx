import * as React from 'react'
import { Text, StyleSheet, TextProps } from 'react-native'
import { COLORS } from '../../../style-constants';

interface AppTextProps extends TextProps{
    //childer: string,
    center?: boolean
}

export const AppText = ({style, center, ...props}: AppTextProps) => (
    <Text {...props} style ={[styles.text, center && styles.center, style]}/>
)


AppText.Title = ({style, center,  ...props}: AppTextProps) => (
    <AppText {...props} style={[styles.title, center && styles.center, style]}/>
)

AppText.Subtitle = ({style, center, ...props}: AppTextProps) => (
    <AppText {...props} style={[styles.subtitle, center && styles.center, style]}/>
)

AppText.Body = ({style, center, ...props}: AppTextProps) => (
    <AppText {...props} style={[styles.body, center && styles.center, style]}/>
)
AppText.Body2 = ({style, center, ...props}: AppTextProps) => (
    <AppText {...props} style={[styles.body, center && styles.center, style]}/>
)
AppText.Error = ({style, center, ...props}: AppTextProps) => (
    <AppText {...props} style={[styles.error, center && styles.center, style]}/>
)



const styles = StyleSheet.create({
    text:{
        fontSize:22
    },
    title:{
        fontFamily:'FredokaOne-Regular',
        fontSize:34,
        color: COLORS.darkpink,
        
      },
      subtitle:{
        fontFamily:'FredokaOne-Regular',
        fontSize:24,
        color: COLORS.darkpink,
      },
      body:{
        fontFamily:'OpenSans-Regular',
        fontSize:16,
        color: COLORS.blueSecondary,
      },
      body2:{
        fontFamily:'OpenSans-Regular',
        fontSize:14,
        color: COLORS.blueSecondary,
      },
      error:{
        color:'red',
        fontWeight:'600'
      },
      center:{
        textAlign:'center'
      }
})