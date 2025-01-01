import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { getAuthToken, removeAuthToken } from '../utils/auth';
import { fetchUserProfile } from '../services/api';
import { RootStackParamList, User } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';

const ProfileScreen = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const loadUserProfile = async () => {
      const token = await getAuthToken();
      if (token) {
        try {
          const profileData = await fetchUserProfile();
          setUser(profileData as User);
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
        }
      }
      setLoading(false);
    };

    loadUserProfile();
  }, []);

  const handleLogout = async () => {
    await removeAuthToken();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const handleEditProfile = () => {
    if (user) {
      navigation.navigate('EditProfile', { user });
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <LoadingSpinner />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No user data available.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Picture */}
      <View style={styles.profilePictureContainer}>
        <Image
          source={{ uri: 'https://tse3.mm.bing.net/th?id=OIP.K8yunvrQA8a0MY5khxh_iQHaFR&pid=Api&P=0&h=180' }} // Static fallback image
          style={styles.profilePicture}
        />
      </View>

      {/* Profile Details */}
      <View style={styles.profileCard}>
        <View style={styles.profileField}>
          <Text style={styles.profileLabel}>Username</Text>
          <Text style={styles.profileValue}>{user.username}</Text>
        </View>
        <View style={styles.profileField}>
          <Text style={styles.profileLabel}>Email</Text>
          <Text style={styles.profileValue}>{user.email}</Text>
        </View>
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F4F4', // Light greyish background for a soft modern feel
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#B0B0B0', // Soft grey border for profile image
    marginBottom: 20,
  },
  profileCard: {
    backgroundColor: '#FFFFFF', // White background for profile card
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  profileField: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0', // Light grey for separator line
    paddingBottom: 10,
  },
  profileLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#5A5A5A', // Subtle grey for labels
  },
  profileValue: {
    fontSize: 16,
    color: '#333333', // Darker grey for values
    marginTop: 5,
  },
  button: {
    backgroundColor: '#6C757D', // Grey button color
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  logoutButton: {
    backgroundColor: '#D9534F', // Subtle red for logout
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF', // White text on buttons
  },
  text: {
    fontSize: 16,
    color: '#5A5A5A', // Neutral grey text color for messages
    textAlign: 'center',
  },
});

export default ProfileScreen;
