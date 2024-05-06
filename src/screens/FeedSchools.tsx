import { SafeAreaView, StyleSheet, Text, View, Image, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import PostType from '../data/customTypes/Post';
import User from '../data/customTypes/User';
import * as SecureStore from 'expo-secure-store'
import Post from '../components/Post';
import { formatDate } from '../data/FormatDate';
import { Colors } from '../utils/colors';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import decodeToken from '../utils/decodeToken';

const FeedSchools = () => {

    const [user, setUser] = useState<User | null>(null);
    const [posts, setPosts] = useState<PostType[]>();

    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const getUserConnected = async () => {
        const token = decodeToken();
        if (!token) return;

        try {
            const response = await fetch(`https://studentlink.etudiants.ynov-bordeaux.com/api/users/${token.sub}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + (await SecureStore.getItemAsync('token'))
                },
            });
            const json = await response.json();
            setUser(json);
        } catch (error) {
            console.error(error)
        }
    };

    const getPostsSchoolsUser = async () => {
        if (!user) return;

        try {
            const response = await fetch(`https://studentlink.etudiants.ynov-bordeaux.com/api/feed/school`, {
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

    useEffect(() => {
        if (isFocused) {
            getUserConnected();
        }
    }, [isFocused]);

    useEffect(() => {
        getPostsSchoolsUser();
    }, [user]);

    if (posts) {
        if (posts.length >= 1) {
            return (
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <Image source={require('../assets/images/studentlink-logo-white.png')} style={styles.logo} />
                    </View>
                    <ScrollView style={styles.scroll}>
                        {

                            posts.map((post, index) => (
                                <Post
                                    key={index}
                                    content={post.content}
                                    name={post.user.name}
                                    username={post.user.username}
                                    schoolOrLocation={post.school ? post.school.name : ''}
                                    comments={post.comments}
                                    date={formatDate(post.createdAt)}
                                    profilePicture={`https://ui-avatars.com/api/?format=png&size=512&rounded=true&name=${post.user.name.replaceAll(/[ -'_]+/g, '+')}`}
                                    onClick={() => { navigation.navigate('PostDetails', { post: post }) }}
                                />
                            ))
                        }
                    </ScrollView>
                </SafeAreaView>
            );
        }
        else if (posts.length === 0) {
            return (
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <Image source={require('../assets/images/studentlink-logo-white.png')} style={styles.logo} />
                    </View>
                    <ScrollView style={styles.scroll}>
                        <Text style={{ color: Colors.WHITE, opacity: 0.5 }}>Aucun post</Text>
                    </ScrollView>
                </SafeAreaView>
            );
        }
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Image source={require('../assets/images/studentlink-logo-white.png')} style={styles.logo} />
                </View>
                <ScrollView style={styles.scroll}>
                    <ActivityIndicator size={70} color={Colors.BLUE} />
                </ScrollView>
            </SafeAreaView>
        );
    }
};

export default FeedSchools;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DARKEN_BLUE,
        alignItems: 'center',
        justifyContent: 'center',

    },
    header: {
        height: 75,
        width: "100%",
        backgroundColor: Colors.DARKEN_BLUE,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },
    logo: {
        width: 125,
        height: 50
    },
    scroll: {
        flex: 1,
        paddingHorizontal: 5,
        marginBottom: 55,
    },
});