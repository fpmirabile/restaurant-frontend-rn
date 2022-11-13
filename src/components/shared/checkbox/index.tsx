import * as React from 'react';
import { View } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useState } from 'react';
import { Body } from '../morfando-text';
import { styles } from './styles';

interface PropTypes {
  previousValue?: boolean;
  placeholder?: string;
  onValueChanged?: (value: boolean) => void;
}

export function Checkbox({
  previousValue,
  placeholder,
  onValueChanged,
}: PropTypes) {
  const [toggleCheckBox, setToggleCheckBox] = useState(previousValue || false);

  const handleValueChanged = (value: boolean) => {
    setToggleCheckBox(value);
    if (onValueChanged) {
      onValueChanged(value);
    }
  };

  return (
    <View style={[styles.container]}>
      <Body style={styles.body}>{placeholder}</Body>
      <CheckBox
        tintColors={{ true: '#FB0067', false: '#FB0067' }}
        disabled={false}
        value={toggleCheckBox}
        onValueChange={handleValueChanged}
      />
    </View>
  );
}
