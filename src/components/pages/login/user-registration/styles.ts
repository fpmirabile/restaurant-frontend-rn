import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../style-constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    
      },

  textContainer:{
    marginTop: 16,
    fontFamily:"FredokaOne-Regular",
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text:{
    paddingTop:8,
    alignItems: 'center',
  },
  title:{
    flex:1,
    marginTop:32,
    alignItems: 'center',
    width:328,
  },
  loginBox: {
    backgroundColor: COLORS.white,
    borderRadius: 4,
    marginHorizontal: 24,
    minHeight: 278,
    minWidth: 312,
    maxHeight: 410,
    flexDirection: 'column',
  },
  elevation:{
    elevation: 20,
    shadowColor: '#FEBDD8',
  },
  emailInput: {
    marginTop: 16,
    marginBottom: 9,
  },
  selectedLoginContent: {
    display: 'flex',
    flexDirection: 'column',
    marginVertical: 16,
    marginHorizontal: 16,
  },
  button:{
    flex:1,
    width:280
  },
  cancelcta:{
    alignItems:'center',
    marginTop:16,
  }

});
