import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#121D59',
    paddingHorizontal: 20,
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
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 6,
  },
  leftDivider: {
    backgroundColor: 'white',
    height: 2,
    marginBottom: 8,
    marginTop: 5,
    width: '60%',
  },
  column: {
    flexDirection: 'column',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    alignContent: 'space-between',
  },
  width50: {
    width: '50%',
  },
  rightDivider: {
    backgroundColor: 'white',
    height: 2,
    marginBottom: 10,
    marginTop: 5,
    width: '40%',
  },
});

const Footer = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.stretch} source={require('../assets/adaptive-icon.png')} />
      <View style={styles.column}>
        <View style={styles.row}>
          <View style={styles.width50}>
            <Text style={styles.heading}>Docs</Text>
            <View style={styles.leftDivider}></View>
            <Pressable>
              <Text style={styles.subheading}>Get Started</Text>
            </Pressable>
            <Pressable>
              <Text style={styles.subheading}>Contribute</Text>
            </Pressable>
          </View>

          <View style={styles.width50}>
            <Text style={styles.heading}>More</Text>
            <View style={styles.rightDivider}></View>
            <Pressable>
              <Text style={styles.subheading}>Planet CDOT Feed List</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.width50}>
          <Text style={styles.heading}>Community</Text>
          <View style={styles.leftDivider}></View>
        </View>
      </View>
    </View>
  );
};

export default Footer;
