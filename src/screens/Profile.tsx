import { StyleSheet, Text, View, Image, ActivityIndicator, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import "core-js/stable/atob";
import { Colors } from '../utils/colors';
import Post from '../components/Post';
import User from '../data/customTypes/User';
import PostType from '../data/customTypes/Post';
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatDate } from '../data/FormatDate';
import CityJson from '../data/cities.json';
import City from '../data/customTypes/City';
import { CapitalizeData } from '../utils/verification';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import decodeToken from '../utils/decodeToken';
import getLocalisationName from '../utils/getLocalisationName';
import { API_URL } from '@env';

const Profile = () => {

    const [user, setUser] = useState<User | null>(null);
    const [profilePicture, setProfilePicture] = useState('');
    const [posts, setPosts] = useState<PostType[]>([]);
    const [locations, setLocations] = useState<string[]>([]);

    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const getUserConnected = async () => {
        const token = decodeToken();
        if (!token) return;

        try {
            const response = await fetch(`${API_URL}/users/${token.sub}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + (await SecureStore.getItemAsync('token'))
                },
            });
            const json = await response.json();
            setUser(json);
            if (user) {
                getProfilePicture();
            }
        } catch (error) {
            console.error(error)
        }
    };

    const getProfilePicture = async () => {
        if (user) {
            const pictureRequest = await fetch(`https://ui-avatars.com/api/?format=png&size=512&rounded=true&name=${user.name.replaceAll(/[ -'_]+/g, '+')}`);
            const blob = await pictureRequest.blob();
            const picture = URL.createObjectURL(blob);
            setProfilePicture(picture);
        }
    };

    const getUserPosts = async () => {
        const token = decodeToken();
        if (!token) return;

        try {
            const response = await fetch(`${API_URL}/users/${token.sub}/posts`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + (await SecureStore.getItemAsync('token'))
                },
            });
            const json = await response.json();
            setPosts(json);
        } catch (error) {
            console.error(error)
        }
    };

    const getLocations = async () => {
        if (user) {
            if (user.locations && user.locations.length > 0) {
                const data = user.locations.map(x => {
                    const city = (CityJson as City[]).find(y => {
                        return y.insee_code == `${x}`;
                    });
                    if (city) {
                        return CapitalizeData(`${city.label}/`);
                    }
                    return 'N/A';
                });
                setLocations(data);
            }
        }
    };

    useEffect(() => {
        if (isFocused) {
            getUserConnected();
            getUserPosts();
        }
    }, [isFocused]);

    useEffect(() => {
        if (user) {
            getProfilePicture();
            getLocations();
        }
    }, [user]);

    if (user) {
        return (
            <SafeAreaView style={styles.container}>
                <Ionicons name="log-out-outline" size={30} color={Colors.BLUE} style={{ position: 'absolute', top: 60, right: 20 }} onPress={() => { SecureStore.deleteItemAsync('token'), navigation.navigate('Authentication') }} />
                <Ionicons name="create-outline" size={30} color={Colors.BLUE} style={{ position: 'absolute', top: 60, left: 20 }} onPress={() => { navigation.navigate('Settings') }} />
                <Image src={profilePicture} style={styles.picture} />
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.username}>@{user.username}</Text>
                <View style={styles.innerContainer}>
                    <Text style={styles.data}>Email : {user.email}</Text>
                    <Text style={styles.data}>Localisations suivis : {locations}</Text>
                    <Text style={styles.data}>École : {user.school.name}</Text>
                </View>
                <ScrollView style={styles.scroll}>
                    {
                        posts.map((post, key) => {
                            return (
                                <Post
                                    key={key}
                                    name={user.name}
                                    username={user.username}
                                    profilePicture={profilePicture}
                                    schoolOrLocation={post.school ? post.school.name : getLocalisationName(post.location)}
                                    content={post.content}
                                    comments={post.comments}
                                    date={formatDate(post.createdAt)}
                                    onClick={() => { navigation.navigate('PostDetails', { post: post }) }}
                                />
                            );
                        })
                    }
                </ScrollView>
            </SafeAreaView>
        );
    }
    else {
        return (
            <View style={styles.container}>
                <ActivityIndicator size={70} color={Colors.BLUE} />
            </View>
        );
    }
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DARKEN_BLUE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        color: Colors.BLUE,
        fontSize: 30,
    },
    username: {
        color: Colors.WHITE,
        fontSize: 20,
        marginBottom: 30,
    },
    picture: {
        width: 125,
        height: 125,
        marginBottom: 20,
    },
    innerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    data: {
        color: Colors.WHITE,
        fontSize: 20,
        marginBottom: 10,
    },
    scroll: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 5,
        marginBottom: 55,
    }
});