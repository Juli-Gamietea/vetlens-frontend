
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Login } from './components/login/Login';
import { useFonts } from 'expo-font';
import { Bobo } from './components/login/bobo';
import { QRCodeScanner } from './components/diagnosis/QRCodeScanner'
import { Splashscreen } from './components/login/Splashscreen';
import { getToken } from './utils/auth/TokenManager';
import * as React from 'react';
import { AuthContext } from './utils/auth/AuthContext';
import * as SecureStore from 'expo-secure-store';
import { Dashboard } from './components/dashboards/Dashboard';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Register } from './components/register/Register'
import { RegisterForm } from './components/register/RegisterForm'
import { RegisterFormPassword } from './components/register/RegisterFormPassword'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { View } from 'react-native';
import { RegisterFormVet } from './components/register/RegisterFormVet';
import { TermsAndConditions } from './components/register/TermsAndConditions';
import { RegisterSuccess } from './components/register/RegisterSuccess';
import { MyDogs } from './components/dogs/MyDogs';
import { DogProfile } from './components/dogs/DogProfile';
import { Questionary } from './components/diagnosis/Questionary';
import { History } from './components/diagnosis/History';
import { Diagnosis } from './components/diagnosis/Diagnosis';
import { Treatments } from './components/diagnosis/Treatments';
import { Profile } from './components/profile/Profile';
import { ChangePassword } from './components/profile/ChangePassword';
import { MessageScreen } from './components/diagnosis/MessageScreen';
import { TakePicture } from './components/diagnosis/TakePicture';
import { GenerateQR } from './components/diagnosis/GenerateQR';
import { Anamnesis } from './components/diagnosis/Anamnesis';
import { Validation } from './components/diagnosis/Validation';
import { ValidationSelection } from './components/diagnosis/ValidationSelection';
import { GalleryPictureSelection } from './components/diagnosis/GalleryPictureSelection';
 
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function DashboardTabStack() {

  return (
    <Stack.Navigator >
      <Stack.Screen options={{headerShown: false}} name="Dashboard" component={Dashboard} />
      <Stack.Screen options={{headerShown: true, title: "Cuestionario",
        headerTitleStyle: {
          fontFamily: "PoppinsRegular"
        },
        headerTitleAlign: 'center'
      }} name="Questions" component={Questionary}/>
      <Stack.Screen name="QRScanner" component={QRCodeScanner} options={{
        title: "Encontrar un diagnóstico",
        headerTitleStyle: {
          fontFamily: "PoppinsRegular"
        },
        headerTitleAlign: 'center'
      }} />
      <Stack.Screen name="MyDogs" options={{headerShown: false, title: ""}} initialParams={{action: 'mydogs'}} component={MyDogs}/>
      <Stack.Screen name="DogProfile" options={{headerTitleAlign: 'center', headerTitleStyle: { fontFamily: 'PoppinsRegular'}}} component={DogProfile} />
      <Stack.Screen name="MessageScreen" options={{headerShown: true}} component={MessageScreen}/>
      <Stack.Screen name="GenerateQR" options={{headerShown: true, title: "Código QR", headerTitleAlign: 'center', headerTitleStyle: { fontFamily: 'PoppinsRegular'}}} component={GenerateQR}/>
      <Stack.Screen name="Anamnesis" options={{headerShown: true, title: "Cuestionario", headerTitleAlign: 'center', headerTitleStyle: { fontFamily: 'PoppinsRegular'}}} component={Anamnesis}/>
      <Stack.Screen name="Diagnosis" options={{headerShown: false}} component={Diagnosis} />
      <Stack.Screen name="Treatments" options={{headerShown: false}} component={Treatments} />
      <Stack.Screen name="Validation" options={{headerShown: true, title: "Validación", headerTitleAlign: 'center', headerTitleStyle: { fontFamily: 'PoppinsRegular'}}} component={Validation} />
      <Stack.Screen name="ValidationSelection" options={{headerShown: true, title: "Validación", headerTitleAlign: 'center', headerTitleStyle: { fontFamily: 'PoppinsRegular'}}} component={ValidationSelection} />
      <Stack.Screen name="History" options={{headerShown: false}} component={History}/>
      <Stack.Screen name="GallerySelection" options={{headerShown: true, title: "Seleccionar Foto", headerTitleAlign: 'center', headerTitleStyle: { fontFamily: 'PoppinsRegular'}}} component={GalleryPictureSelection}/>

    </Stack.Navigator>
  )
}

function ScannerTabStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen name="QRScanner" 
      component={QRCodeScanner}
      options={{
        title: "Encontrar un diagnóstico",
        headerTitleStyle: {
          fontFamily: "PoppinsRegular"
        },
        headerTitleAlign: 'center'
      }}/>
      <Stack.Screen name="Diagnosis" options={{headerShown: false}} component={Diagnosis} />
      <Stack.Screen name="Treatments" options={{headerShown: false}} component={Treatments} />
      <Stack.Screen name="Anamnesis" options={{headerShown: true, title: "Cuestionario", headerTitleAlign: 'center', headerTitleStyle: { fontFamily: 'PoppinsRegular'}}} component={Anamnesis}/>
      <Stack.Screen name="Validation" options={{headerShown: true, title: "Validación", headerTitleAlign: 'center', headerTitleStyle: { fontFamily: 'PoppinsRegular'}}} component={Validation} />
      <Stack.Screen name="GenerateQR" options={{headerShown: true, title: "Código QR", headerTitleAlign: 'center', headerTitleStyle: { fontFamily: 'PoppinsRegular'}}} component={GenerateQR}/>
    </Stack.Navigator>
  )
}

function DogsTabStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="MyDogs" options={{headerShown: false}} initialParams={{action: 'mydogs'}} component={MyDogs}/>
      <Stack.Screen name="DogProfile" options={{headerTitleAlign: 'center', headerTitleStyle: { fontFamily: 'PoppinsRegular'}}} component={DogProfile} />
    </Stack.Navigator>
  )
}

function ProfileTabStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Profile" options={{headerShown: false}} component={Profile}/>
      <Stack.Screen name="ChangePassword" options={{headerShown: false}} component={ChangePassword}/>
    </Stack.Navigator>
  )
}

function HistoryTabStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="History" options={{headerShown: false}} component={History}/>
      <Stack.Screen name="Diagnosis" options={{headerShown: false}} component={Diagnosis} />
      <Stack.Screen name="Treatments" options={{headerShown: false}} component={Treatments} />
      <Stack.Screen name="Anamnesis" options={{headerShown: true, title: "Cuestionario", headerTitleAlign: 'center', headerTitleStyle: { fontFamily: 'PoppinsRegular'}}} component={Anamnesis}/>
      <Stack.Screen name="Validation" options={{headerShown: true, title: "Validación", headerTitleAlign: 'center', headerTitleStyle: { fontFamily: 'PoppinsRegular'}}} component={Validation} />
      <Stack.Screen name="GenerateQR" options={{headerShown: true, title: "Código QR", headerTitleAlign: 'center', headerTitleStyle: { fontFamily: 'PoppinsRegular'}}} component={GenerateQR}/>
    </Stack.Navigator>
  )
}

function TabsVet() {

  return (
    <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        height: 64,
        borderTopColor: "rgba(170, 170, 170, .66)",
        borderTopWidth: 1,
        fontFamily: "PoppinsSemiBold",
        paddingBottom: 2
      },
      tabBarActiveTintColor: "#00A6B0",
      tabBarInactiveTintColor: "#949494"
    }}
    >
      <Tab.Screen
        name="DashboardTab"
        component={DashboardTabStack}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={35} color={color} />
            ),
            
        }}
      />
      <Tab.Screen
        name="HistoryUser"
        component={HistoryTabStack}
        options={{
          tabBarLabel: 'Historial',
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-file-tray-full-outline" size={35} color={color} />
            ),
            
            
          }}
      />
      <Tab.Screen
        name="Scan"
        component={ScannerTabStack}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <View style={{ backgroundColor: "#00A6B0", borderRadius: 500, width: 72, height: 72, justifyContent: 'center', alignItems: 'center', marginTop: 4 }}>
              <MaterialCommunityIcons name="qrcode-scan" size={35} color="white" />
            </View>
          ),
          
          
        }}
      />
      <Tab.Screen
        name="Dogs"
        component={DogsTabStack}
        options={{
          tabBarLabel: 'Perros',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="dog" size={35} color={color} />
            ),
          }}
      />
      <Tab.Screen
        name="ProfileUser"
        component={ProfileTabStack}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={35} color={color} />
            ),
          }}
      />
    </Tab.Navigator>
  );
}


export default function App() {

  const [isLoading, setIsLoading] = React.useState(true);
  const [isSignedIn, setIsSignedIn] = React.useState(false);

  const [loaded] = useFonts({
    PoppinsBold: require('./assets/fonts/Poppins-Bold.ttf'),
    PoppinsRegular: require('./assets/fonts/Poppins-Regular.ttf'),
    PoppinsSemiBold: require('./assets/fonts/Poppins-SemiBold.ttf')
  });
  
  const authContext = { isLoading, setIsLoading, isSignedIn, setIsSignedIn };
  
  React.useEffect(() => {
    const lookForToken = async () => {
      try {
        //await SecureStore.deleteItemAsync('token');
        //await SecureStore.deleteItemAsync('refreshToken');
        
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
              <>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="RegisterForm" component={RegisterForm} />
                <Stack.Screen name="RegisterFormPassword" component={RegisterFormPassword} />
                <Stack.Screen name="RegisterFormVet" component={RegisterFormVet} />
                <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
                <Stack.Screen name="RegisterSuccess" component={RegisterSuccess} />
              </>
            ) : (
              <>
                <Stack.Screen name="TabsVet" component={TabsVet} />
                <Stack.Screen name="Bobo" component={Bobo} />
                <Stack.Screen name="QRScanner" component={QRCodeScanner} />
                <Stack.Screen name="MyDogs" component={MyDogs} />
                <Stack.Screen name="Picture" options={{headerShown: true, title: "Tomar Foto", headerTitleAlign: 'center', headerTitleStyle: { fontFamily: 'PoppinsRegular'}}} component={TakePicture}/>
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </AuthContext.Provider>

  );
}
