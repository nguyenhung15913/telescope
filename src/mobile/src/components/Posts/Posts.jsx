import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import useSWR from 'swr';
import Timeline from './Timeline';

const fetcher = (url) => fetch(url).then((res) => res.json());

const Posts = () => {
  const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
  });

  const { data, error } = useSWR('https://api.telescope.cdot.systems/v1/posts/?page=1', fetcher);

  if (error) return <Text>An error has occurred.</Text>;
  if (!data) return <Text>Loading Timeline...</Text>;

  return (
    <View style={styles.container}>
      <Timeline data={data} />
    </View>
  );
};

export default Posts;
