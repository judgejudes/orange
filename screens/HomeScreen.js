import React, { useCallback, useContext, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import { Button } from 'react-native-paper';
import Category from '../components/Category';
import CategoryContext from '../CategoryContext';
import { mockCourses } from '../mockCourses';


const storeCategories = (name, categories) => {
  console.info("storing",name,categories)
  try {
    AsyncStorage.setItem(name, JSON.stringify(categories));
  } catch (e) {
    console.error(e);
  }
}

const unallocated = {
  name: 'Unallocated',
  total: null,
  addedCourses: [],
};

const HomeScreen = ({ navigation, route }) => {
  const { template, addSelectedCourses, addCourseCategory } = route.params;
  const { categories, setCurrentCategories } = useContext(CategoryContext);
  const [storageKey, setStorageKey] = useState(null);

  console.info("HomeScreen rendering cats is", categories)

  useEffect(() => {
    if (addSelectedCourses && addCourseCategory !== undefined) {
      addCourseToCategory(addCourseCategory, addSelectedCourses);
    }
  }, [addSelectedCourses, addCourseCategory]);

  useEffect(() => {
    setStorageKey(template.name)
    const fetchLocalStorage = async () => {
      console.info("fetching from local storage")
      // fetching categories from react storage
      let storageCategories;
      try {
        storageCategories = JSON.parse(
          await AsyncStorage.getItem(template.name)
        );
      } catch (e) {
        storageCategories = null;
        console.error(e);
      }

      if (storageCategories) {
        setCurrentCategories(storageCategories);
      } else {
        const currentCategories = template.categories.slice(0);
        currentCategories.unshift(unallocated);
        setCurrentCategories(currentCategories);
      }
    };
    fetchLocalStorage();
  }, [template, setStorageKey]);

  const moveCourse = (oldCategoryIdx, oldCourseIdx, newCategoryIdx) => {
    const newCategories = categories.slice(0);
    const course = newCategories[oldCategoryIdx].addedCourses[oldCourseIdx];

    newCategories[oldCategoryIdx].addedCourses.splice(oldCourseIdx, 1);
    newCategories[newCategoryIdx].addedCourses.push(course);

    storeCategories(storageKey, newCategories)
    setCurrentCategories(newCategories);
  };

  const addCourseToCategory = (selectedCategory, selectedCourses) => {
    const newCategories = categories.slice(0);
    newCategories[selectedCategory].addedCourses.push(...selectedCourses);
    storeCategories(storageKey, newCategories)
    setCurrentCategories(newCategories);
  };

  const removeCourse = (categoryIdx, courseIdx) => {
    let newCategories = categories.slice(0);
    newCategories[categoryIdx].addedCourses = newCategories[categoryIdx].addedCourses.filter((course, i) => i != courseIdx)
    storeCategories(storageKey, newCategories)
    setCurrentCategories(newCategories);
  }


  const addCategory = useCallback((newCategory) => {
    const newCategories = categories.slice(0);
    newCategories.push(newCategory);
    storeCategories(storageKey, newCategories)
    setCurrentCategories(newCategories);
    navigation.navigate('HomeScreen')
  }, [categories, storageKey, storeCategories, setCurrentCategories])


  return (
    <>
      <Button
        mode='contained'
        labelStyle={styles.buttonStyle}
        contentStyle={styles.buttonWrapStyle}
        onPress={() =>
          navigation.navigate('AddCategoryScreen', { addCategory })
        }
      >
        {`   Add Category    `}
      </Button>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <ScrollView>
            {categories.map((category, i) => (
              <Category
                removeCourse={removeCourse}
                moveCourse={moveCourse}
                key={i}
                index={i}
                {...category}
              />
            ))}
          </ScrollView>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  buttonStyle: {
    color: 'white',
  },
  buttonWrapStyle: {
    paddingBottom: 5,
    paddingTop: 5,
  },
});

export default HomeScreen;
