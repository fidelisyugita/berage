import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

class FirebaseChat {
  constructor(targetUser) {
    console.tron.log({targetUser});
    this.state = {
      targetUser: targetUser,
      targetUid: (targetUser && targetUser._id) || '',
      currentUid: (auth().currentUser && auth().currentUser.uid) || '',
    };
  }

  get ref() {
    const {currentUid, targetUid} = this.state;
    return database().ref(`messages/${currentUid}/${targetUid}`);
  }

  get targetRef() {
    const {currentUid, targetUid} = this.state;
    return database().ref(`messages/${targetUid}/${currentUid}`);
  }

  get refRooms() {
    const {currentUid, targetUid} = this.state;
    return database().ref(`messages/${currentUid}/rooms/${targetUid}`);
  }

  get targetRefRooms() {
    const {currentUid, targetUid} = this.state;
    return database().ref(`messages/${targetUid}/rooms/${currentUid}`);
  }

  parse = snapshot => {
    console.tron.log({'parse snapshot': snapshot.val()});
    const {timestamp: numberStamp, text, user} = snapshot.val();
    const {key: _id} = snapshot;
    const createdAt = new Date(numberStamp);
    const message = {
      _id,
      createdAt,
      text,
      user,
    };
    console.tron.log({message});
    return message;
  };

  on = callback =>
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));

  onRooms = callback => {
    // this.refRooms
    //   .limitToLast(20)
    //   .on('child_added', snapshot => callback(this.parse(snapshot)));

    this.refRooms.limitToLast(20).on('value', snapshot => {
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
        user,
        timestamp: this.timestamp,
      };
      console.tron.log({message});
      this.append(message);
    }
  };

  append = message => {
    console.tron.log({message});
    const {targetUser} = this.state;

    this.ref.push(message);
    this.targetRef.push(message);

    this.refRooms.update({
      ...message,
      user: targetUser,
    });
    this.targetRefRooms.update(message);
  };

  // close the connection to the Backend
  off() {
    this.ref.off();
    this.targetRef.off();

    this.refRooms.off();
    this.targetRefRooms.off();
  }

  offRooms() {
    this.refRooms.off();
  }
}

FirebaseChat.shared = new FirebaseChat();
export default FirebaseChat;
