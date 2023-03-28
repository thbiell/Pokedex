import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchTabId from "./Tabs/SearchTabId";
import SearchTabName from "./Tabs/SearchTabName";
import SearchTabType from "./Tabs/SearchTabType";

const Tab = createBottomTabNavigator();

const TabGroup = () => {
  // Adicionar 2 tabs, para termos 3 no total
  // Uma de busca por nome, outra busca por id e outra de busca por tipo
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Id" component={SearchTabId} />
      <Tab.Screen name="Name" component={SearchTabName} />
      <Tab.Screen name="Type" component={SearchTabType} />
    </Tab.Navigator>
  );
};

export default TabGroup;
