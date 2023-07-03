import React, { useState, useEffect } from 'react';
import { Text, FlatList, View, Image, TextInput } from 'react-native';
 

const Question2 = () => {
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(true);
    const [ingredient, setIngredient] = useState("chicken_breast");

    const getMeals = async () => {
        try {
          const url = "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + ingredient;
          const response = await fetch(url);
          const json = await response.json();
          if (json.meals) {
            setData(json.meals);
          } else {
            setData([]);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    useEffect(() => {getMeals()}, [ingredient])

    return(
        <View style={{padding:30}}>
            <Text style={{fontSize: 60}}>Meal Finder</Text>
            <Text style={{fontSize: 26}}>Main Ingredient: {ingredient} </Text>
            <Text style={{fontSize: 26}}>Enter the new Ingredient:</Text>
            <TextInput
                style={{height: 40, borderWidth: 1}}
                onChangeText={setIngredient}
            />
            <FlatList
                data={data.slice(0,20)}
                keyExtractor={({ idMeal }, index) => idMeal}
                renderItem={({ item }) => (
                    <Meal
                        name={item.strMeal}
                        image={item.strMealThumb}
                    />
                )}
            />
        </View>
    );
}

export default Question2;