
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './components/login/Login';
import { useFonts } from 'expo-font';
import { Bobo } from './components/login/bobo';
import { QRCodeScanner } from './diagnosis/QRCodeScanner';
import { Splashscreen } from './components/login/Splashscreen';
import { getToken } from './utils/TokenManager';
import * as React from 'react';
import { AuthContext } from './auth/AuthContext';
import * as SecureStore from 'expo-secure-store';
import { Register } from './components/register/Register'
import { RegisterForm } from './components/register/RegisterForm'
import { RegisterFormPassword } from './components/register/RegisterFormPassword'
 
const Stack = createNativeStackNavigator();

export default function App()  {

  const [isLoading, setIsLoading] = React.useState(true);
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  
  const [loaded] = useFonts({
    PoppinsBold: require('./assets/fonts/Poppins-Bold.ttf'),
    PoppinsRegular: require('./assets/fonts/Poppins-Regular.ttf'),
    PoppinsSemiBold: require('./assets/fonts/Poppins-SemiBold.ttf')
  });

  const authContext = {isLoading, setIsLoading, isSignedIn, setIsSignedIn};

  React.useEffect(() => {
    const lookForToken = async () => {
      try {
        // await SecureStore.deleteItemAsync('token');
        // await SecureStore.deleteItemAsync('refreshToken');
        
        await getToken();
        setTimeout(() => {setIsLoading(false);}, 2000)
        
        setIsSignedIn(true);

      } catch (error) {
        //this means there is no token
        
        if (error.message === 'no_valid_tokens' || error.message === 'no_token_saved') {
          setTimeout(() => {setIsLoading(false);}, 2000)

        } else {
          console.log("uncatched_error_" + error.message);
        }
      }
    }
    lookForToken();
  }, []);

  if (!loaded) {
    return null;
  }

  return (

    <AuthContext.Provider value={authContext}>
      <NavigationContainer >
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isLoading ? (
            <Stack.Screen name="Splashscreen" component={Splashscreen} />
          ) : (!isLoading && !isSignedIn) ? (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="RegisterForm" component={RegisterForm} />
              <Stack.Screen name="RegisterFormPassword" component={RegisterFormPassword} />
            </>
          ) : (
            <>
              <Stack.Screen name="Bobo" component={Bobo} />
              <Stack.Screen name="QRScanner" component={QRCodeScanner} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>

  );
}
