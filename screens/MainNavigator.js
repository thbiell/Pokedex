import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Image } from "react-native";
import Search from './Search';
import Home from './Home';
import Pokemon from './Pokemon';
import Pokedex from './Pokedex';

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();
  const logo = require(`../assets/pokemon.png`);
  
  
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#A020F0',
        },
        headerTintColor: 'black',
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: () => (
            <Image
              source={logo}
              style={styles.logo}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerTitle: 'Search',
        }}
      />
      <Stack.Screen
        name="Pokemon"
        component={Pokemon}
        options={{
          headerTitle: () => (
            <Image
              source={logo}
              style={styles.logo}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Pokedex"
        component={Pokedex}
        options={{
          headerTitle: 'Pokedex',
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  logo: {
    height: 100,
    resizeMode: "contain",
    width: 100,
  },
});

export default MainNavigator;
