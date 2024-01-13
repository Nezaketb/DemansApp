import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer} from '@react-navigation/native';
import {config} from './components/Config';
import  Login  from './pages/Login';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer theme={config}>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Login" component={Login}/>
      </Stack.Navigator>
      </NavigationContainer>
  );
} 

export default App;