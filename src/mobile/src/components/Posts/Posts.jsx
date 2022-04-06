import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Timeline from './Timeline';

const Posts = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get('https://api.telescope.cdot.systems/v1/posts/?page=1')
      .then((data) => setData(data.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <View>
      <Timeline data={data} />
    </View>
  );
};

export default Posts;
