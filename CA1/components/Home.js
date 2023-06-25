import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Todo from './TodoList';
import Chat from './ChatGPTDemo';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Todo" component={Todo}/>
        <Tab.Screen name="Chat" component={Chat}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
