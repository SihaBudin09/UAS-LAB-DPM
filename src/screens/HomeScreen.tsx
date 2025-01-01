import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Book Tracking App!</Text>
      <Text style={styles.subtitle}>Manage your books and track your reading progress effortlessly.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4', // Soft light gray background
  },
  title: {
    fontSize: 32, // Increased font size for better emphasis
    fontWeight: '700', // Bold font weight for a more striking title
    color: '#616161', // Dark gray for the title
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 1, // Slight letter spacing for a more modern look
  },
  subtitle: {
    fontSize: 20, // Slightly larger font for readability
    textAlign: 'center',
    color: '#9e9e9e', // Medium gray for subtitle to ensure contrast but softer
    marginTop: 10,
    lineHeight: 26, // Increased line height for better readability
  },
});

export default HomeScreen;
