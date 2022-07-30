
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './HomePage.js';
import LoginPage from './LoginPage.js';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="LoginPage" component={LoginPage} options={{ title: 'Login Screen' }} />
      <Stack.Screen name="HomePage" component={Home} options={{ title: 'Welcome' }} />
    </Stack.Navigator>
  </NavigationContainer>
  );
  }
export default App;
