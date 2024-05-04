import { StyleSheet, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store'
import { Colors } from '../utils/colors';
import PostType from '../data/customTypes/Post';
import Post from '../components/Post';
import { formatDate } from '../data/FormatDate';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import City from '../data/customTypes/City';
import { CapitalizeData } from '../utils/verification';
import CityJson from '../data/cities.json';
import { useNavigation } from '@react-navigation/native';


const HomePage = () => {

    const [posts, setPosts] = useState<PostType[]>([]);
    const navigation = useNavigation();

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

    const getLocalisationName = (inseeCode: number) => {
        const result = (CityJson as City[]).find((city) => (parseInt(city.insee_code) == inseeCode));
        if (result) {
            return CapitalizeData(result.label);
        }
        return 'N/A';
    }

    useEffect(() => {
        getPosts();
    }, []);

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
                                schoolOrLocation={post.school ? post.school.name : getLocalisationName(post.location)}
                                comments={post.comments}
                                date={formatDate(post.createdAt)}
                                profilePicture={`https://ui-avatars.com/api/?format=png&size=512&rounded=true&name=${post.user.name.replaceAll(/[ -'_]+/g, '+')}`}
                                onClick={() => { navigation.navigate('PostDetails', {post: post})}}
                            />
                        ))
                    }
                </ScrollView>
            </SafeAreaView>
        );
    }

}

export default HomePage

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