import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { Headline6, ImageButton } from '../../../components/shared';
import { ICONS } from '../../../constants';
import { AccordionItem } from '../accordion-item';
import { styles } from './styles';

interface PropTypes {
  category?: Category;
}

type Category = {
  title: string;
  items: ItemCategory[];
};

export type ItemCategory = {
  title: string;
  imageSource: string;
  price: string;
};

export function AccordionList({ category }: PropTypes) {
  const [showContent, setShowContent] = React.useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShowContent(!showContent)}>
        <View style={styles.titleContainer}>
          {category && (
            <>
              <Headline6>{category.title}</Headline6>
              {showContent ? (
                <ImageButton imageSvg={ICONS.upChevron} />
              ) : (
                <ImageButton imageSvg={ICONS.downChevron} />
              )}
            </>
          )}
        </View>
      </TouchableOpacity>
      {showContent && category && (
        <>
          {category.items.map((item, index) => {
            return (
              <View style={styles.body}>
                <AccordionItem itemCategory={item} key={index} />
              </View>
            );
          })}
        </>
      )}
    </View>
  );
}
