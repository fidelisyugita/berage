/* eslint-disable curly */
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

class FirebasePlace {
  constructor(placeId, currentUser) {
    console.tron.log({placeId});
    console.tron.log({currentUser});
    this.state = {
      placeId: placeId,
      currentUser: currentUser,
    };
  }

  get onlineUsersRef() {
    const {placeId} = this.state;
    return database().ref(`onlineUsers/${placeId}/`);
  }

  get placeRef() {
    const {placeId} = this.state;
    return database().ref(`places/${placeId}/`);
  }

  onOnlineUsers = async callback => {
    const {placeId, currentUser} = this.state;
    // if (!currentUser) await auth().signInAnonymously();

    this.onlineUsersRef
      // .child(placeId)
      .limitToLast(30)
      .on('value', snapshot => {
        snapshot.forEach(childSnapshot => {
          callback(childSnapshot.val());
        });
      });
  };

  onPlace = async callback => {
    const {placeId, currentUser} = this.state;
    // if (!currentUser) await auth().signInAnonymously();

    this.placeRef
      // .child(placeId)
      .limitToLast(1)
      .on('value', snapshot => callback(snapshot.val()));
  };

  change = slotLeft => {
    this.placeRef.update({
      slotLeft,
    });
  };

  get timestamp() {
    return database.ServerValue.TIMESTAMP;
  }

  joinOnline = () => {
    const {currentUser, placeId} = this.state;

    console.log('currentUser');
    console.log(currentUser);

    this.onlineUsersRef
      // .child(placeId)
      .child(currentUser.uid)
      .update({...currentUser, timestamp: this.timestamp});

    // setTimeout(() => this.leave(), 5 * 60 * 1000); //leave after 5mins
  };

  leave() {
    const {currentUser, placeId} = this.state;

    if (currentUser && currentUser.uid)
      this.onlineUsersRef
        // .child(placeId)
        .child(currentUser.uid)
        .remove();

    this.offOnlineUsers();
  }

  offOnlineUsers() {
    console.tron.log('!!!!!!!!OFF-ONLINE-USERS!!!!!!!!');

    const {placeId} = this.state;

    this.onlineUsersRef
      // .child(placeId)
      .off();
  }

  off() {
    console.tron.log('!!!!!!!!OFF!!!!!!!!');

    const {placeId} = this.state;

    this.onlineUsersRef
      // .child(placeId)
      .off();
    this.placeRef
      // .child(placeId)
      .off();
  }
}

export default FirebasePlace;
