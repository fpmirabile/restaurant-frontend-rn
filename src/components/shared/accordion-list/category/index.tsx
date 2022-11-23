import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { Headline6, Body } from '../../morfando-text';
import { ImageButton } from '../../image-button';
import { ICONS } from '../../../../constants';
import { AccordionItem } from '../../accordion-item/category';
import { Category } from '../../../../api/restaurant.api';
import { styles } from './styles';

interface PropTypes {
  category: Category;
}

export function CategoriesAccordion({ category }: PropTypes) {
  const [showContent, setShowContent] = React.useState(false);
  const handleShowContent = React.useCallback(() => {
    setShowContent(!showContent);
  }, [setShowContent, showContent]);

  return (
    <View style={[styles.container]}>
      <TouchableOpacity onPress={handleShowContent}>
        <View style={styles.titleContainer}>
          {category && (
            <>
              <Headline6>{category.name}</Headline6>
              {showContent ? (
                <ImageButton imageSvg={ICONS.upChevron} />
              ) : (
                <ImageButton imageSvg={ICONS.downChevron} />
              )}
            </>
          )}
        </View>
      </TouchableOpacity>
      {showContent && category.items.length === 0 && (
        <View style={[styles.body, styles.childCategory]}>
          <Body>Este menu no disponible de platos disponibles</Body>
        </View>
      )}
      {showContent &&
        category.items.length > 0 &&
        category.items.map((item, index) => {
          return (
            <View key={item.name} style={[styles.body, styles.childCategory]}>
              <AccordionItem itemsCategory={item} key={index} />
            </View>
          );
        })}
    </View>
  );
}

interface CategoriesProps {
  categories: Category[];
}
export function CategoryAccordion({ categories }: CategoriesProps) {
  const [showContent, setShowContent] = React.useState(false);
  const handleShowContent = React.useCallback(() => {
    setShowContent(!showContent);
  }, [setShowContent, showContent]);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleShowContent}>
        <View style={styles.titleContainer}>
          <View style={{ flexDirection: 'row' }}>
            <ImageButton
              imageStyle={{ marginLeft: 16, marginRight: 10 }}
              imageSvg={ICONS.restaurant}
            />
            <Headline6>Menu</Headline6>
          </View>
          {showContent ? (
            <ImageButton imageSvg={ICONS.upChevron} />
          ) : (
            <ImageButton imageSvg={ICONS.downChevron} />
          )}
        </View>
      </TouchableOpacity>
      {showContent &&
        categories.length > 0 &&
        categories.map(item => {
          return (
            <View key={item.id} style={styles.body}>
              <CategoriesAccordion category={item} />
            </View>
          );
        })}
    </View>
  );
}
