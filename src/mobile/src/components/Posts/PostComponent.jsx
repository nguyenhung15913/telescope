import { View, Text, useWindowDimensions, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import axios from 'axios';
import RenderHtml from 'react-native-render-html';
import useState from 'react-usestateref';

const PostComponent = ({ url }) => {
  const styles = StyleSheet.create({
    postTitle: {
      color: 'red',
      fontSize: 20,
    },
  });

  const { width } = useWindowDimensions();
  const [post, setPost, postRef] = useState();
  useEffect(() => {
    axios
      .get(url)
      .then((data) => {
        setPost(data.data);
        return console.log(postRef.current.html);
      })
      .catch((error) => console.log(error));
  }, []);
  if (!postRef.current) {
    return (
      <View>
        <Text>No post yet</Text>
      </View>
    );
  }
  return (
    <View>
      <Text style={styles.postTitle}>{postRef.current.title}</Text>
      <RenderHtml contentWidth={width} source={postRef.current} />
    </View>
  );
};

export default PostComponent;
