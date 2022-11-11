import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { Headline6, ImageButton } from '../../../components/shared';
import { ICONS } from '../../../constants';
import { AccordionItem } from '../accordion-item';
import { styles } from './styles';

interface PropTypes {
  title: string;
  bodyText: string;
}

export function AccordionList({ title }: PropTypes) {
  const [showContent, setShowContent] = React.useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShowContent(!showContent)}>
        <View style={styles.titleContainer}>
          <Headline6>{title}</Headline6>
          {showContent ? (
            <ImageButton imageSvg={ICONS.upChevron} />
          ) : (
            <ImageButton imageSvg={ICONS.downChevron} />
          )}
        </View>
      </TouchableOpacity>
      {showContent && (
        <View style={styles.body}>
          <AccordionItem title="Flan Casero" price="800$" />
        </View>
      )}
    </View>
  );
}
