import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/navigation';

type AppReactNavigation = NativeStackNavigationProp<RootStackParamList>;
export function useAppNavigation() {
  return useNavigation<AppReactNavigation>();
}
