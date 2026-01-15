import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/navigation/TabNavigator';
import AdBanner from './src/components/AdBanner';
import { COLORS } from './src/theme/premium';

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <StatusBar style="light" />
        <TabNavigator />
      </NavigationContainer>

      {/* 하단 광고 배너 - 탭바 아래 고정 */}
      <AdBanner style={styles.adBanner} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundGray,
  },
  adBanner: {
    paddingVertical: 8,
  },
});
