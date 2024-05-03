import { SafeAreaView, StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import PostType from '../data/customTypes/Post';
import User from '../data/customTypes/User';
import * as SecureStore from 'expo-secure-store'
import { jwtDecode } from 'jwt-decode';
import Post from '../components/Post';
import { formatDate } from '../data/FormatDate';
import { Colors } from '../utils/colors';



type Props = {}

const FeedSchools = (props: Props) => {

    const [user, setUser] = useState<User | null>(null);
    const [posts, setPosts] = useState<PostType[]>([]);

    const decodeToken = () => {
        const token = SecureStore.getItem('token');
        if (token) {
            const tokenDecode = jwtDecode(token);
            return tokenDecode;
        }
        return null;
    }

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
    }

    const getPostsSchoolsUser = async () => {
        if (!user) return;

        try {
            const response = await fetch(`https://studentlink.etudiants.ynov-bordeaux.com/api/schools/${user.school.id}/posts`, {
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
    }

    useEffect(() => {
        getUserConnected();;
    }, [])

    useEffect(() => {
        getPostsSchoolsUser();
    }, [user])

    if (posts) {
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
                            />
                        ))
                    }
                </ScrollView>
            </SafeAreaView>
        );
    }
    else {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Image source={require('../assets/images/studentlink-logo-white.png')} style={styles.logo} />
                </View>
                <ScrollView style={styles.scroll}>
                    <Text style={{ color: Colors.WHITE }}>Aucun post</Text>
                </ScrollView>
            </SafeAreaView>
        );

    }

}

export default FeedSchools

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
        marginBottom: 50,
    },
})