import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, List } from 'react-native-paper';
import Course from './Course';


const Category = ({ name, total, addedCourses, moveCourse, index }) => {
  ;
  const heading = total ? `${name} ${addedCourses.length} out of ${total}` : `${addedCourses.length} ${name}`
  return (
    <Card style={styles.categoryStyle}>
      <Card.Title title={heading} />
      <Card.Content>
        <List.Section style={styles.listStyle}>
          {addedCourses.map((course, i) => (
            <Course key={i} index={i} moveCourse={moveCourse} categoryId={index} {...course} />
          ))}
        </List.Section>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginBottom: 0,
    padding: 15,
    backgroundColor: '#dbdbdb',
  },
  text: {
    color: '#000',
    fontSize: 25
  },
  categoryStyle: {
    marginBottom: 15,
  },
});

export default Category;
