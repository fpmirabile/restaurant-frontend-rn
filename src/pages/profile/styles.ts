import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
    paddingTop: 25,
  },
  sectionListContainer: {
    padding: 24,
  },
  personalInformationContainer: {
    flexDirection: 'row',
    flex:1,
    marginTop:24,
    marginBottom:32,
  },
  image:{
    flex:1,
    flexDirection:'column',
    alignItems:'center'
  },
  personalNameContainer: {
    flex:4,
    flexDirection: 'column',
    marginLeft: 16,
  },
  profileName: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign:''
  },
  editIcon: {
    flex:1,
    marginLeft: 8,
  },
  buttonContainer: {
    marginVertical: 4,
  },
  title:{
    marginBottom:16,
    marginTop:24,
  }
});
