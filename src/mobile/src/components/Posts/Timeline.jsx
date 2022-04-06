import { View, Text } from 'react-native';
import React from 'react';
import PostComponent from './PostComponent';

const Timeline = ({ data }) => {
  return (
    <View>
      {data.map((post) => (
        <PostComponent url={post.url} key={post.id} />
      ))}
    </View>
  );
};

export default Timeline;
