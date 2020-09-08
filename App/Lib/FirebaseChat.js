import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

class FirebaseChat {
  constructor(targetUser) {
    console.tron.log({targetUser});
    this.state = {
      targetUser: targetUser,
      targetUid: targetUser ? targetUser._id || targetUser.uid : '',
      currentUid: (auth().currentUser && auth().currentUser.uid) || '',
    };
  }

  get messageRef() {
    const {currentUid, targetUid} = this.state;
    return database().ref(`messages/${currentUid}/${targetUid}`);
  }

  get targetMessageRef() {
    const {currentUid, targetUid} = this.state;
    return database().ref(`messages/${targetUid}/${currentUid}`);
  }

  get roomRef() {
    const {currentUid, targetUid} = this.state;
    return database().ref(`rooms/${currentUid}/${targetUid}`);
  }

  get targetRoomRef() {
    const {currentUid, targetUid} = this.state;
    return database().ref(`rooms/${targetUid}/${currentUid}`);
  }

  parse = snapshot => {
    const {timestamp: numberStamp, text, user} = snapshot.val();
    const {key: _id} = snapshot;
    const createdAt = new Date(numberStamp);
    const message = {
      _id,
      createdAt,
      updatedAt: createdAt,
      text,
      user,
    };
    console.tron.log({'parse snapshot': message});
    return message;
  };

  onMessages = callback =>
    this.messageRef
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));

  onRooms = callback => {
    console.tron.log({callback});
    // this.roomRef
    //   .limitToLast(20)
    //   .on('child_added', snapshot => callback(this.parse(snapshot)));

    this.roomRef.limitToLast(100).on('value', snapshot => {
      snapshot.forEach(childSnapshot => {
        callback(this.parse(childSnapshot));
      });
    });
  };

  get timestamp() {
    return database.ServerValue.TIMESTAMP;
  }
  // send the message to the Backend
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const {text, user} = messages[i];
      const message = {
        text,
        user: {...user, receiver: false},
        timestamp: this.timestamp,
      };
      this.append(message);
    }
  };

  append = message => {
    console.tron.log({message});
    const {targetUser} = this.state;

    this.messageRef.push(message);
    this.targetMessageRef.push(message);

    this.roomRef.update({
      ...message,
      user: {
        _id: targetUser._id || targetUser.uid,
        avatar: targetUser.avatar || targetUser.photoURL,
        name: targetUser.name || targetUser.displayName,
        fcmToken: targetUser.fcmToken,
        receiver: true,
      },
    });
    this.targetRoomRef.update(message);
  };

  // close the connection to the Backend
  off() {
    console.tron.log('!!!!!!!!OFF!!!!!!!!');
    this.messageRef.off();
    this.targetMessageRef.off();

    // this.roomRef.off();
    this.targetRoomRef.off();
  }

  offRooms() {
    console.tron.log('!!!!!!!!OFF-ROOMS!!!!!!!!');
    this.roomRef.off();
  }
}

FirebaseChat.shared = new FirebaseChat();
export default FirebaseChat;
