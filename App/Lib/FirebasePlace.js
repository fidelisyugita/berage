/* eslint-disable curly */
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

class FirebasePlace {
  constructor(placeId, currentUser) {
    this.state = {
      placeId: placeId,
      currentUser: currentUser,
    };
  }

  get onlineUsersRef() {
    const {placeId} = this.state;
    console.tron.log({placeId});
    return database().ref(`onlineUsers/${placeId}/`);
  }

  onOnlineUsers = callback => {
    const {placeId} = this.state;

    this.onlineUsersRef
      // .child(placeId)
      .limitToLast(30)
      .on('value', snapshot => {
        snapshot.forEach(childSnapshot => {
          callback(childSnapshot.val());
        });
      });
  };

  get timestamp() {
    return database.ServerValue.TIMESTAMP;
  }

  joinOnline = () => {
    const {currentUser, placeId} = this.state;

    /**
     * TODO
     * find better method
     */

    this.onlineUsersRef
      // .child(placeId)
      .child(currentUser.uid)
      .update({...currentUser, timestamp: this.timestamp});
  };

  offOnlineUsers() {
    console.tron.log('!!!!!!!!OFF-ONLINE-USERS!!!!!!!!');

    const {placeId} = this.state;

    this.onlineUsersRef
      // .child(placeId)
      .off();
  }
}

export default FirebasePlace;
