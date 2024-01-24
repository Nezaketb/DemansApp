import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer} from '@react-navigation/native';
import {config} from './components/Config';
import  Login  from './pages/Login';
import Register from './pages/Register';
import EditMedicinesInformation from './pages/EditMedicinesInformation';
import Main from './pages/Main';
import Medicines from './pages/Medicines';
import AddCompanion from './pages/AddCompanion';
import AddMedicines from './pages/AddMedicines';
import AddMedicinesDetail from './pages/AddMedicinesDetail';
import AddPictures from './pages/AddPictures';
import Location from './pages/Location';
import UserProfile from './pages/UserProfile';
import WelcomeScreen from './pages/WelcomeScreen';
import LoginCompanion  from './pages/LoginCompanion';
import MainCompanion  from './pages/MainCompanion';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer theme={config}>
      <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen}/>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="LoginCompanion" component={LoginCompanion}/>
      <Stack.Screen name="UserProfile" component={UserProfile}/>
      <Stack.Screen name="AddMedicinesDetail" component={AddMedicinesDetail}/>
      <Stack.Screen name="AddMedicines" component={AddMedicines}/>
      <Stack.Screen name="AddPictures" component={AddPictures}/>
      <Stack.Screen name="Main" component={Main}/>
      <Stack.Screen name="MainCompanion" component={MainCompanion}/>
      <Stack.Screen name="Location" component={Location}/>
      <Stack.Screen name="Medicines" component={Medicines}/>
      <Stack.Screen name="AddCompanion" component={AddCompanion}/>
      <Stack.Screen name="Register" component={Register}/>
      <Stack.Screen name="EdditMedicinesInformation" component={EditMedicinesInformation}/>
      </Stack.Navigator>
      </NavigationContainer>
  );
} 

export default App;