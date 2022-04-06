import { View, Text, useWindowDimensions, StyleSheet, Image } from 'react-native';
import React, { useEffect } from 'react';
import axios from 'axios';
import RenderHtml from 'react-native-render-html';
import useState from 'react-usestateref';

const PostComponent = ({ url }) => {
  const styles = StyleSheet.create({
    postAuthor: {
      color: 'black',
      fontSize: 15,
    },
    postAvatar: {
      height: 50,
      width: '20%',
    },
    postHeader: {
      alignItems: 'center',
      borderBottomColor: '#cccccc',
      borderBottomWidth: 1.5,
      flexDirection: 'row',
    },
    postInfo: {
      width: '80%',
    },
    postTitle: {
      color: '#121D59',
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
        return console.log(postRef.current);
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
      <View style={styles.postHeader}>
        <Image style={styles.postAvatar} source={require('../../assets/adaptive-icon.png')} />
        <View style={styles.postInfo}>
          <Text style={styles.postTitle}>{postRef.current.title}</Text>
          <Text style={styles.postAuthor}>{postRef.current.feed.author}</Text>
        </View>
      </View>

      <RenderHtml contentWidth={width} source={postRef.current} />
    </View>
  );
};

export default PostComponent;
