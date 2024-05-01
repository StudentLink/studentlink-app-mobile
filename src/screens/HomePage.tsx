import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store'
import { Colors } from '../utils/colors';
import { jwtDecode } from 'jwt-decode';
import User from '../data/customTypes/User';
import PostType from '../data/customTypes/Post';
import Post from '../components/Post';
import { formatDate } from '../data/FormatDate';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import Profile from './Profile';


const HomePage = () => {

    const [profilePicture, setProfilePicture] = useState('');
    const [posts, setPosts] = useState<PostType[]>([]);

    const getProfilePicture = async (name: string) => {
        const pictureRequest = await fetch(`https://ui-avatars.com/api/?format=png&size=512&rounded=true&name=${name.replaceAll(/[ -'_]+/g, '+')}`);
        const blob = await pictureRequest.blob();
        const picture = URL.createObjectURL(blob);
        setProfilePicture(picture);
    }

    const getPosts = async () => {
        try {
            const response = await fetch(`https://studentlink.etudiants.ynov-bordeaux.com/api/posts`, {
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
        getPosts();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {
                    posts.map((post, index) => {
                        getProfilePicture(post.user.name);
                        return (
                            <Post
                                key={index}
                                label={post.content}
                                name={post.user.name}
                                username={post.user.username}
                                school="School name"
                                comments={post.comments}
                                date={formatDate(post.createdAt)}
                                profilePicture={profilePicture}
                            />
                        )
                    })
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomePage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DARKEN_BLUE,
        alignItems: 'center',
        justifyContent: 'center',
    },
})