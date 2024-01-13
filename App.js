import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer} from '@react-navigation/native';
import {config} from './components/Config';
import  Login  from './pages/Login';
import Register from './pages/Register';
import MedicinesInformation from './pages/MedicinesInformation';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer theme={config}>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="MedicinesInformation" component={MedicinesInformation}/>
      </Stack.Navigator>
      </NavigationContainer>
  );
} 

export default App;