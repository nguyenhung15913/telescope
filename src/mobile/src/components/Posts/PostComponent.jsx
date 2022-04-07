import { View, Text, useWindowDimensions, StyleSheet, Image } from 'react-native';
import React from 'react';
import RenderHtml from 'react-native-render-html';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

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

  const { data, error } = useSWR(url, fetcher);

  if (error) return <Text>An error has occurred.</Text>;
  if (!data) return <Text>Loading Post...</Text>;
  return (
    <View>
      <View style={styles.postHeader}>
        <Image style={styles.postAvatar} source={require('../../assets/adaptive-icon.png')} />
        <View style={styles.postInfo}>
          <Text style={styles.postTitle}>{data.title}</Text>
          <Text style={styles.postAuthor}>{data.feed.author}</Text>
        </View>
      </View>

      <RenderHtml contentWidth={width} source={data} />
    </View>
  );
};

export default PostComponent;
