import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Scanner from '../pages/Scanner';
import FavorityList from '../pages/FavorityList';
import HistoryList from '../pages/HistoryList';

const BottomTabNavigator = createBottomTabNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <BottomTabNavigator.Navigator
        initialRouteName="Scanner"
        tabBarOptions={{
          activeTintColor: '#7159c1',
          inactiveTintColor: '#f1f1f1',
          style: {
            backgroundColor: '#24292e',
          },
          tabStyle: {
            backgroundColor: '#24292e',
            borderTopColor: '#24292e',
          },
        }}
      >
        <BottomTabNavigator.Screen
          name="HistoryList"
          component={HistoryList}
          options={{
            title: 'Histórico',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="history"
                size={size}
                color={color}
              />
            ),
          }}
        />

        <BottomTabNavigator.Screen
          name="Scanner"
          component={Scanner}
          options={{
            title: 'Scanear',
            tabBarIcon: ({ color, size, focused }) => (
              <MaterialCommunityIcons
                name={focused ? 'qrcode-scan' : 'qrcode'}
                size={size}
                color={color}
              />
            ),
          }}
        />

        <BottomTabNavigator.Screen
          name="FavorityList"
          component={FavorityList}
          options={{
            title: 'Favoritos',
            tabBarIcon: ({ color, size, focused }) => (
              <MaterialCommunityIcons
                name={focused ? 'heart' : 'heart-outline'}
                size={size}
                color={color}
              />
            ),
          }}
        />
      </BottomTabNavigator.Navigator>
    </NavigationContainer>
  );
};

export { Routes };
