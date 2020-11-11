import { Card, List, ProgressBar, Colors } from 'react-native-paper';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import Course from './Course';
import React from 'react';

const Category = ({ name, total, addedCourses: courses, moveCourse, removeCourse, index }) => {
  const progressColors = [Colors.red600, Colors.orange600, Colors.yellow600, Colors.green600];
  const colorMap = value => progressColors[Math.floor(((progressColors.length - 1) * (value)))];

  const [headerWidth, setHeaderWidth] = React.useState(0)

  const headerSize = event => setHeaderWidth(.85 * event.nativeEvent.layout.width);

  const addedCourses = courses || []
  const styledHeading = (
    <View>
      {total ? (
        <>
          <Text style={styles.categoryTitle}>{name}</Text>
          <View style={styles.header} onLayout={headerSize}>
            <ProgressBar style={{ backgroundColor: 'lightgrey', width: headerWidth }} progress={Math.max(0.035, addedCourses.length / total)}
              color={colorMap(addedCourses.length / total)} />
            <Text style={styles.progressLabel}>
              {`${addedCourses.length}/${total}`}
            </Text>
          </View>
        </>
      ) : (
          <View style={styles.unallocated}>
            <Text style={styles.numCourses}>{`${addedCourses.length} `}</Text>
            <Text style={styles.categoryTitle}>{name}</Text>
          </View>
        )}
    </View>
  );
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);

  return (
    <Card style={styles.category}>
      <List.Accordion
        title={styledHeading}
        style={styles.list}
        titleStyle={styles.listTitle}
        expanded={expanded}
        onPress={handlePress}
      >
        {addedCourses.map((course, i) => (
          <Course
            removeCourse={removeCourse}
            key={i}
            index={i}
            moveCourse={moveCourse}
            categoryId={index}
            {...course}
          />
        ))}
      </List.Accordion>
    </Card>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  numCourses: {
    color: 'darkgrey',
    paddingRight: 10,
    fontSize: 20
  },
  category: {
    marginBottom: 10,
    marginHorizontal: 10
  },
  unallocated: {
    flexDirection: 'row',
  },
  categoryTitle: {
    fontSize: 20
  },
  list: {
    backgroundColor: '#e3e1e1',
    padding: 10,
  },
  listTitle: {
    fontSize: 18,
  },
  progressLabel: {
    paddingLeft: 8,
    color: 'grey'
  }
});

export default Category;
