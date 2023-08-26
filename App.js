import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Login } from './login/Login';
import { useFonts } from 'expo-font';
import { Bobo } from './login/bobo';
import { QRCodeScanner } from './diagnosis/QRCodeScanner';
import { Splashscreen } from './login/Splashscreen';
import { getToken } from './utils/TokenManager';
import * as React from 'react';
import { AuthContext } from './auth/AuthContext';
import * as SecureStore from 'expo-secure-store';
import { DashboardVet } from './screens/dashboards/DashboardVet';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// function Tabs() {

//   return (
//     <Tab.Navigator initialRouteName='QRScanner'
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: {
//           height: 64,
//           borderTopColor: "#F7EAB5",
//           borderTopWidth: 5,
//           fontFamily: "PoppinsSemiBold"
//         },
//         tabBarActiveTintColor: "#00A6B0",
//         tabBarInactiveTintColor: "#949494"
//       }}
//     >
//       <Tab.Screen
//         name="Dashboard"
//         component={QRCodeScanner}
//         options={{
//           tabBarLabel: 'Inicio',
//           tabBarIcon: ({ color }) => (
//             <Entypo name="home" size={24} color={color} />
//           ),

//         }}
//       />
//       <Tab.Screen
//         name="History"
//         component={Bobo}
//         options={{
//           tabBarLabel: 'Historial',
//           tabBarIcon: ({ color }) => (
//             <Ionicons name="md-file-tray-full-outline" size={24} color={color} />
//           ),


//         }}
//       />
//       <Tab.Screen
//         name="Recipe"
//         component={Bobo}
//         options={{
//           tabBarLabel: '',
//           tabBarIcon: ({ color }) => (
//             <View style={{ backgroundColor: "#F3A200", borderRadius: 500, width: 72, height: 72, justifyContent: 'center', alignItems: 'center' }}>
//               <MaterialIcons name="local-restaurant" size={35} color='white' />
//             </View>
//           ),


//         }}
//       />
//       <Tab.Screen
//         name="Favourites"
//         component={Bobo}
//         options={{
//           tabBarLabel: 'Favoritos',
//           tabBarIcon: ({ color }) => (
//             <Feather name="bookmark" size={24} color={color} />
//           ),


//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={Bobo}
//         options={{
//           tabBarLabel: 'Perfil',
//           tabBarIcon: ({ color }) => (
//             <Feather name="user" size={24} color={color} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }


export default function App() {

  const [isLoading, setIsLoading] = React.useState(true);
  const [isSignedIn, setIsSignedIn] = React.useState(false);

  const [loaded] = useFonts({
    PoppinsRegular: require('./assets/fonts/Poppins-Regular.ttf'),
    PoppinsSemiBold: require('./assets/fonts/Poppins-SemiBold.ttf')
  });

  const authContext = { isLoading, setIsLoading, isSignedIn, setIsSignedIn };

  React.useEffect(() => {
    const lookForToken = async () => {
      try {
        // await SecureStore.deleteItemAsync('token');
        // await SecureStore.deleteItemAsync('refreshToken');

        await getToken();
        setTimeout(() => { setIsLoading(false); }, 2000)

        setIsSignedIn(true);

      } catch (error) {
        //this means there is no token

        if (error.message === 'no_valid_tokens' || error.message === 'no_token_saved') {
          setTimeout(() => { setIsLoading(false); }, 2000)

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
      <SafeAreaProvider>
        <NavigationContainer >
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isLoading ? (
              <Stack.Screen name="Splashscreen" component={Splashscreen} />
            ) : (!isLoading && !isSignedIn) ? (
              <Stack.Screen name="Login" component={Login} />
            ) : (
              <>
                <Stack.Screen name="DashboardVet" component={DashboardVet} />
                <Stack.Screen name="Bobo" component={Bobo} />
                <Stack.Screen name="QRScanner" component={QRCodeScanner} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </AuthContext.Provider>
  );
}
