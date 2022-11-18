import * as React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { Caption } from '../morfando-text';
import { styles } from './styles';

type Data = {
  key: string;
  value: string;
};

interface PropTypes {
  placeholder?: string;
  defaultPair?: Data | undefined;
  onValueChanged?: (value: any) => void;
  onValidateValue?: (value: Data | undefined) => boolean;
  data: Data[];
  searchable?: boolean;
  containerStyles?: StyleProp<ViewStyle>;
  errorMessage?: string;
}
export function Dropdown({
  placeholder,
  onValueChanged,
  defaultPair,
  data,
  searchable,
  containerStyles,
  errorMessage,
  onValidateValue,
}: PropTypes) {
  const [isValid, setIsValid] = React.useState<boolean>(true);
  const [selected, setSelected] = React.useState('');
  const fullList = [{ key: '-1', value: placeholder }, ...data];

  React.useEffect(() => {
    const key = selected;
    const element = data.find(i => i.key === key);
    if (onValueChanged) {
      if (onValidateValue) {
        setIsValid(onValidateValue(element));
      }

      onValueChanged(element?.value || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <View style={[styles.container, containerStyles]}>
      <SelectList
        defaultOption={defaultPair || fullList[0]}
        placeholder={placeholder}
        setSelected={setSelected}
        data={data}
        search={searchable || false}
        boxStyles={styles.dropDownBorder}
        dropdownStyles={styles.dropdownStyles}
        dropdownTextStyles={styles.dropdownTextStyles as any}
        inputStyles={styles.dropdownTextStyles as any}
      />
      {!isValid && (
        <Caption style={styles.errorMessage}>{errorMessage}</Caption>
      )}
    </View>
  );
}
