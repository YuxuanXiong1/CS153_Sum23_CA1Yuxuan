import * as React from 'react';
import {Button,Text,View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CountChange from './CountChange';
import TodoList from './TodoList';
import Food from './Food';

const Stack = createNativeStackNavigator();

const HomeScreen = ({navigation}) => {
    return (
     <View>
            <Button
                title="Go to Yuxuan's profile"
                onPress={() =>
                navigation.navigate('Profile', {name: 'Yuxuan Xiong'})
                }
            />
            <Button
                title="Go to Introduction"
                onPress={() =>
                navigation.navigate('Introduction')
                }
            />
            <Button
                title="Count Change"
                onPress={() =>
                navigation.navigate('CountChange') 
                }
            />
            <Button
                title="Todo list"
                onPress={() =>
                navigation.navigate('TodoList') 
                }
            />
            <Button
                title="Food Recommendation"
                onPress={() =>
                navigation.navigate('FoodRecommendation') 
                }
            />
      </View>
    );
  };

  const ProfileScreen = ({navigation, route}) => {
    return <Text>This is {route.params.name}'s profile</Text>;
  };

  const intro = ({navigation}) => {
    return <Text>This is an app developed by Yuxuan Xiong, whcih the user can input somethings he or she need to do
      after that, when user complete it, they can change the status of it into complete, and also they can level the importance of each things ther
      need to do.
    </Text>;
  };

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Welcome, this is the base of the final project'}}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Introduction" component={intro} />
        <Stack.Screen name="CountChange" component={CountChange} />
        <Stack.Screen name="TodoList" component={TodoList} />
        <Stack.Screen name="FoodRecommendation" component={Food} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
