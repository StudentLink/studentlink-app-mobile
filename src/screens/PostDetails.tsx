import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../utils/colors'
import { useNavigation, useRoute } from '@react-navigation/native'
import PostType from '../data/customTypes/Post'
import { formatDate } from '../data/FormatDate'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackButton from '../components/Button/BackButton'
import * as SecureStore from 'expo-secure-store'
import Comment from '../components/Comment'
import { ScrollView } from 'react-native-gesture-handler'
import CommentType from '../data/customTypes/Comment'

const PostDetails = () => {

  const route = useRoute();
  const { post } = route.params as { post: PostType };

  const [comments, setComments] = useState<CommentType[]>([]);

  const navigation = useNavigation();

  const getComments = async () => {
    try {
      const response = await fetch(`https://studentlink.etudiants.ynov-bordeaux.com/api/posts/${post.id}/comments`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + (await SecureStore.getItemAsync('token'))
        },
      });
      const json = await response.json();
      setComments(json);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getComments();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <BackButton onclick={() => navigation.goBack()} />
      <View style={styles.post}>
        <View style={styles.userInfo}>
          <Image src={`https://ui-avatars.com/api/?format=png&size=512&rounded=true&name=${post.user.name.replaceAll(/[ -'_]+/g, '+')}`} style={styles.picture} />
          <View style={styles.infoData}>
            <View style={styles.userPost}>
              <Text style={styles.name}>{post.user.name}</Text>
              <Text style={styles.username}>@{post.user.username}</Text>
            </View>
            <Text style={styles.school}>{post.location}</Text>
          </View>
        </View>
        <View style={{ flex: 1, height: 1, backgroundColor: Colors.WHITE, marginVertical: 15, opacity: 0.1 }} />
        <View>
          <Text style={styles.content}>{post.content}</Text>
          <View style={styles.footer}>
            <Text style={styles.footerData}>{(post.comments.length == 0) ? "Ajouter un commentaire" : `${post.comments.length} commentaire${post.comments.length > 1 ? 's' : ''}`}</Text>
            <Text style={styles.footerData}>{formatDate(post.createdAt)}</Text>
          </View>
        </View>
      </View>
      {comments.length > 0 ? (
        <ScrollView style={styles.scroll}>
          {
            comments?.map((comment, index) => (
              <Comment
                key={index}
                content={comment.content}
                createdAt={formatDate(comment.createdAt)}
                name={comment.user.name}
                username={comment.user.username}
                profilePicture={`https://ui-avatars.com/api/?format=png&size=512&rounded=true&name=${comment.user.name.replaceAll(/[ -'_]+/g, '+')}`} />
            ))
          }
        </ScrollView>
      ) : <Text style={styles.noComment}>Aucun commentaire</Text>}
    </SafeAreaView>
  )
}

export default PostDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DARKEN_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  post: {
    marginTop: 40,
    paddingVertical: 30,
    backgroundColor: Colors.DARKEN_BLUE_LIGHTER,
    height: 'auto',
    width: '100%',
    borderRadius: 10,
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 5,
  },
  picture: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontSize: 25,
    marginLeft: 10,
  },
  username: {
    color: Colors.WHITE,
    fontSize: 20,
    marginLeft: 10,
    opacity: 0.5,
  },
  school: {
    flexDirection: 'column',
    color: Colors.WHITE,
    fontSize: 15,
    marginLeft: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  content: {
    color: Colors.WHITE,
    fontSize: 25,
  },
  footerData: {
    marginTop: 10,
    color: Colors.WHITE,
    fontSize: 18,
    opacity: 0.5,
  },
  scroll: {
    marginTop: 20,
  },
  noComment: {
    flex: 1,
    color: Colors.WHITE,
    marginTop: 20,
    fontSize: 20,
    opacity: 0.5,
  }
})