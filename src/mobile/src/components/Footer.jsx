import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import GitHubContributorCard from './GitHubContributorCard';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#121D59',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
  },
  stretch: {
    width: 150,
    height: 150,
  },
  heading: {
    color: 'white',
    fontSize: 25,
    textTransform: 'uppercase',
  },
  subheading: {
    color: 'white',
    fontSize: 18,
    paddingTop: 10,
    paddingBottom: 6,
  },
  leftDivider: {
    backgroundColor: 'white',
    height: 2,
    width: '60%',
  },
  column: {
    flexDirection: 'column',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  left: {
    width: '50%',
  },
  right: {
    width: '50%',
    alignItems: 'flex-end',
  },
  rightDivider: {
    backgroundColor: 'white',
    height: 2,
    width: '40%',
  },
  communityLogo: {
    paddingVertical: 15,
    marginRight: 10,
  },
  copyright: {
    color: 'white',
    fontSize: 15,
    paddingVertical: 10,
  },
});

const Footer = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.stretch} source={require('../assets/adaptive-icon.png')} />
      <View style={styles.column}>
        <View style={styles.row}>
          <View style={styles.left}>
            <Text style={styles.heading}>Docs</Text>
            <View style={styles.leftDivider}></View>
            <Pressable>
              <Text style={styles.subheading}>Get Started</Text>
            </Pressable>
            <Pressable>
              <Text style={styles.subheading}>Contribute</Text>
            </Pressable>
          </View>

          <View style={styles.right}>
            <Text style={styles.heading}>More</Text>
            <View style={styles.rightDivider}></View>
            <Pressable>
              <Text style={styles.subheading}>Planet CDOT Feed List</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.left}>
          <Text style={styles.heading}>Community</Text>
          <View style={styles.leftDivider}></View>
          <View style={{ flexDirection: 'row' }}>
            <Pressable>
              <AntDesign name="github" style={styles.communityLogo} size={24} color="white" />
            </Pressable>
            <Pressable>
              <Ionicons name="logo-slack" style={styles.communityLogo} size={24} color="white" />
            </Pressable>
          </View>
        </View>
      </View>
      <GitHubContributorCard />
      <View>
        <Text style={styles.copyright}>
          Copyright © 2022 Seneca's Centre for Development of Open Technology
        </Text>
      </View>
    </View>
  );
};

export default Footer;
