import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { Colors } from '../utils/colors';

type Props = {
    content: string,
    createdAt: string,
    name: string,
    username: string,
    profilePicture: string;
}

const Comment = ({ content, createdAt, name, username, profilePicture }: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.userInfo}>
                <Image src={profilePicture} style={styles.picture} />
                <View style={styles.infoData}>
                    <View style={styles.userPost}>
                        <Text style={styles.name}>{name}</Text>
                    </View>
                        <Text style={styles.username}>@{username}</Text>
                </View>
            </View>
            <View>
                <Text style={styles.content}>{content}</Text>
                <View style={styles.footer}>

                    <Text style={styles.date}>{createdAt}</Text>
                </View>
            </View>
            <View style={{ flex: 1, height: 1, backgroundColor: Colors.WHITE, marginVertical: 15, opacity: 0.1 }} />
        </View>
    );
};

export default Comment;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.DARKEN_BLUE,
        height: 'auto',
        width: '100%',
        borderRadius: 10,
        alignContent: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    picture: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },
    infoData: {
        flexDirection: 'column',
    },
    userPost: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        color: Colors.BLUE,
        fontSize: 20,
        marginLeft: 10,
    },
    username: {
        color: Colors.WHITE,
        fontSize: 15,
        marginLeft: 10,
        opacity: 0.5,
    },
    content: {
        color: Colors.WHITE,
        fontSize: 20,
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    date: {
        marginTop: 10,
        color: Colors.WHITE,
        fontSize: 15,
        opacity: 0.5,
    },
});