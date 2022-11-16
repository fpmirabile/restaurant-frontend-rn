import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  commentStyle: {
    flexDirection:'row',
    // justifyContent: 'space-between',
    alignItems:'stretch',
    flex: 1,
  },
  dishPhoto:{
    marginLeft:16,
    alignItems: 'center',
    justifyContent:'center',
    flex:1,
  },
  imageStyle:{
    height:56,
    width:100,
  },
  textStyle:{
    margin:16,
    alignItems:'flex-start',
    flex:3,
  },
});
