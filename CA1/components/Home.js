import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Todo from './TodoList';
import ChatGPTDemo from './ChatGPTDemo';  
import PhotoRecorder from './PhotoRecorder';
import CameraScreen from './CameraScreen';  

const Tab = createBottomTabNavigator();
//here is the mainpage for our program
const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Todo" component={Todo}/>
        <Tab.Screen name="Chat" component={ChatGPTDemo}/>
        <Tab.Screen name="Photo Recorder" component={PhotoRecorder}/>
        <Tab.Screen name="Camera" component={CameraScreen}/> 
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
