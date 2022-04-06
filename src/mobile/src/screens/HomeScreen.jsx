import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Banner from '../components/Banner/Banner';
import Posts from '../components/Posts/Posts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexDirection: 'column',
    width: '100%',
  },
});

const HomeScreen = ({ navigation }) => {
  const navigateToContact = () => {
    navigation.navigate('Contact');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Banner navigateToContact={navigateToContact} />
        <Posts />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
