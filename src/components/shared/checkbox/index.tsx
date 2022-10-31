import * as React from 'react';
import {
  View,
} from 'react-native';
import { styles } from './styles';
import CheckBox from '@react-native-community/checkbox';
import { useState } from 'react';
import { Body } from '../morfando-text';

interface PropTypes {
  placeholder?: string;
}

export function Checkbox({
  placeholder,
}: PropTypes) {

  const [toggleCheckBox, setToggleCheckBox] = useState(false)

  return (
    <View style={[styles.container]}>
      <Body style={styles.body}>{placeholder}</Body>
      <CheckBox
        tintColors={{ true:'#FB0067', false: '#FB0067'}}
        disabled={false}
        value={toggleCheckBox}
        onValueChange={(newValue) => setToggleCheckBox(newValue)}
      />
    </View>
  );
}
