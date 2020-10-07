import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import CategoryContext from '../CategoryContext';
import { Button } from 'react-native-paper';

import { mockCourses } from '../mockCourses';
import Category from '../components/Category';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const HomeScreen = ({navigation}) => {
    const [categories, setCategories] = useState([
        {
            name: 'Unallocated Courses',
            addedCourses: mockCourses.slice(0, 10),
            total: null
        },
        {
            name: 'Basic Engineering',
            total: 5,
            addedCourses: mockCourses.slice(10, 11),
        },
        {
            name: 'Basic Sciences',
            total: 3,
            addedCourses: mockCourses.slice(12, 13),
        },
    ]);

    const [myCourses, setMyCourses] = useState(mockCourses.slice(0, 10));

    const moveCourse = (oldCategoryIdx, oldCourseIdx, newCategoryIdx) => {
        const newCategories = categories.slice(0);
        const course = newCategories[oldCategoryIdx].addedCourses[oldCourseIdx];

        newCategories[oldCategoryIdx].addedCourses.splice(oldCourseIdx, 1)
        newCategories[newCategoryIdx].addedCourses.push(course);

        setCategories(newCategories);
    }
    const addCategory = (newCategory) => {
        const newCategories = categories.slice(0);
        newCategories.push(newCategory)
        setCategories(newCategories)
        navigation.navigate('HomeScreen')
    }

    return (
        <CategoryContext.Provider value={categories}>
            <View style={styles.container}>
                <Button raised theme={{ roundness: 3 }}
                        onPress={() => navigation.navigate('AddCategoryScreen', { addCategory })}> Add Category </Button>
                <ScrollView>
                    {categories.map((category, i) => (
                        <Category moveCourse={moveCourse} key={i} index={i} {...category} />
                    ))}
                </ScrollView>
            </View>
        </CategoryContext.Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
});


export default HomeScreen
