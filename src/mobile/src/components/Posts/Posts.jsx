import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Timeline from './Timeline';

const Posts = () => {
  const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
  });

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get('https://api.telescope.cdot.systems/v1/posts/?page=1')
      .then((data) => setData(data.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <View style={styles.container}>
      <Timeline data={data} />
    </View>
  );
};

export default Posts;
