import React, { useState, useEffect } from 'react';
import { Text, FlatList, View, Image, TextInput, Button } from 'react-native';

const Exam3cStart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ingredient, setIngredient] = useState('chicken_breast');

    const getMeals = async () => {
        try {
          const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
          const response = await fetch(url);
          const json = await response.json();
          setData(json.meals); 
        } catch (error) {
          console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMeals()},[ingredient]);

    const renderMeal = ({item}) => (
        <View>
            <Text>{item.strMeal}</Text>
            <Image 
                source = {{uri: item.strMealThumb}} 
                style = {{width: '50%', height: 100}}
            />
        </View>
    )

    return(
        <View>
            <Text>Food Searching by Key Word</Text>
            <TextInput
                style={{ height: 30, borderColor: 'black', borderWidth: 1}}
                onChangeText = {text => setIngredient(text)}
                value = {ingredient}
                placeholder = "Enter ingredient"
            />
            <Text>Main Ingredient: {ingredient}</Text>
                <FlatList 
                    data = {data} 
                    renderItem = {renderMeal} 
                    keyExtractor = {item => item.idMeal}
                />
        </View>
    );
}

export default Exam3cStart;
