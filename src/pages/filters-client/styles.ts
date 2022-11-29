import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export const styles = StyleSheet.create({
  containerView: {
    backgroundColor: COLORS.background,
    flex: 1,
    flexGrow: 1,
  },
  container: {
    padding: 16,
    flex: 1,
    flexGrow: 1,
  },
  title: {
    marginTop: 8,
    textAlign: 'left',
  },
  subtitle: {
    textAlign: 'left',
    marginTop: 24,
    marginBottom: 8,
  },
  applyFilter: {
    paddingVertical: 18,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
    flex: 1,
  },
  newDishButton: {
    width: 328,
    height: 48,
  },
  containerIngredient: {
    flexDirection: 'row',
  },
  containerInput: {
    flex: 8,
  },
  close: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  containerSlider: {
    marginTop: 24,
    alignItems: 'center',
  },
  slider: {
    backgroundColor: COLORS.darkPink,
    height: 4,
  },
  sliderUnselected: {
    height: 4,
  },
  sliderButton: {
    backgroundColor: COLORS.darkPink,
    width: 20,
    height: 20,
  },
  sliderButtonSelected: {
    backgroundColor: COLORS.darkPink,
    width: 24,
    height: 24,
  },
  cleanFiltersButton: {
    marginBottom: 16,
  },
});
