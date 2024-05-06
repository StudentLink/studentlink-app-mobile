import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors } from '../utils/colors';

type Props = {
  content: string,
  name: string,
  username: string,
  profilePicture: string;
  schoolOrLocation: string | number;
  comments: Array<string>;
  date: string;
  onClick: () => void;
}

const Post = ({ content, name, username, profilePicture, schoolOrLocation, comments, date, onClick }: Props) => {

  return (
    <>
      <View style={styles.container}>
        <View style={styles.userInfo}>
          <Image src={profilePicture} style={styles.picture} />
          <View style={styles.infoData}>
            <View style={styles.userPost}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.username}>@{username}</Text>
            </View>
            <Text style={styles.school}>{schoolOrLocation}</Text>
          </View>
        </View>
        <View style={{ flex: 1, height: 1, backgroundColor: Colors.WHITE, marginVertical: 15, opacity: 0.1 }} />
        <TouchableOpacity onPress={onClick}>
          <Text style={styles.content}>{content}</Text>
          <View style={styles.footer}>
            <Text style={styles.comment}>{(comments.length == 0) ? "Ajouter un commentaire" : `${comments.length} commentaire${comments.length > 1 ? 's' : ''}`}</Text>
            <Text style={styles.comment}>{date}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    backgroundColor: Colors.DARKEN_BLUE_LIGHTER,
    height: 'auto',
    width: '100%',
    borderRadius: 10,
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 5,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
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
  school: {
    flexDirection: 'column',
    color: Colors.WHITE,
    fontSize: 15,
    marginLeft: 10,
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
  comment: {
    marginTop: 10,
    color: Colors.WHITE,
    fontSize: 15,
    opacity: 0.5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  }
});