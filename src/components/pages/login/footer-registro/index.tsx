import * as React from 'react';
import { View, Text } from 'react-native';
import { Button } from '../../../shared';
import { styles } from './styles';
import { Body2,Caption } from '../../../shared/morfando-text';
import { TouchableText } from '../../../shared';

export function RegistroTandC() {
  return (
    <View>
    <View style={styles.registerContainer}>
        <Body2>¿No tenes cuenta? </Body2>
        <TouchableText 
                type='body2Darpink'
                message="Registrate"/>
    </View>
    <View style={styles.tandc}>
        <Caption>
        * Al registrarse, usted acepta nuestros 
        </Caption>
        <TouchableText
        type='captionDarkpink'
        message="Términos y condiciones"
        />
    </View>
    </View>
    )
};