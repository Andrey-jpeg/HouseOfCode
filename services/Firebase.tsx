import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';

/*This function checks if the userState has changed and awaits currentuser. 
I could check if a user with the id alrady exists in the database but this is fine as,
if the user updates their info it will be auto updated when signing in to the app.
*/
export const storeUserInDB = async () => {
  try {
    auth().onAuthStateChanged(async userState => {
      const user: FirebaseAuthTypes.User | null = await auth().currentUser;
      if (userState !== null && user !== null) {
        const db = await firestore();
        try {
          db.collection('users').doc(user.uid).set({
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            email: user.email,
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        return;
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export async function onGoogleButtonPress() {
  try {
    GoogleSignin.configure({
      webClientId:
        '822067726768-qb2n6u07eo3khn1qmkukq69rjckmp36m.apps.googleusercontent.com',
    });

    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  } catch (error) {
    throw error;
  } finally {
    storeUserInDB();
  }
}

export async function onFacebookButtonPress() {
  try {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  } catch (error) {
    throw error;
  } finally {
    storeUserInDB();
  }
}

export async function signOut() {
  auth()
    .signOut()
    .then(() => console.log('User signed out!'));
}
