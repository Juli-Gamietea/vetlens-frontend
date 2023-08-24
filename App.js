import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import { Login } from './components/login/Login';
import { useFonts } from 'expo-font';
import { Bobo } from './components/login/bobo';
import { Register } from './components/register/Register';
import { RegisterForm } from './components/register/RegisterForm';
import { RegisterFormPassword } from './components/register/RegisterFormPassword';

const Stack = createNativeStackNavigator();

export default function App() {

  //loading fonts
  const [loaded] = useFonts({
    PoppinsBold: require('./assets/fonts/Poppins-Bold.ttf'),
    PoppinsRegular: require('./assets/fonts/Poppins-Regular.ttf'),
    PoppinsSemiBold: require('./assets/fonts/Poppins-SemiBold.ttf')
  });
  
  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Login} />
        <Stack.Screen name="Bobo" component={Bobo} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="RegisterForm" component={RegisterForm} />
        <Stack.Screen name="RegisterFormPassword" component={RegisterFormPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
