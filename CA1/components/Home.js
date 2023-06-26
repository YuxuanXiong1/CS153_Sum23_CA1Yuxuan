import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Todo from './TodoList';
import ChatGPTDemo from './ChatGPTDemo';  
import Photo from './PhotoRecorder';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Todo" component={Todo}/>
        <Tab.Screen name="Chat" component={ChatGPTDemo}/>
        <Tab.Screen name="Photo Recorder" component={Photo}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
