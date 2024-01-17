import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer} from '@react-navigation/native';
import {config} from './components/Config';
import  Login  from './pages/Login';
import Register from './pages/Register';
import EditMedicinesInformation from './pages/EditMedicinesInformation';
import Main from './pages/Main';
import Medicines from './pages/Medicines';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer theme={config}>
      <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="Medicines" component={Medicines}/>
      <Stack.Screen name="Main" component={Main}/>
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="EdditMedicinesInformation" component={EditMedicinesInformation}/>
      </Stack.Navigator>
      </NavigationContainer>
  );
} 

export default App;