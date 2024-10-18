import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config";
import { User } from "@/lib/model/types";
import { addDoc, collection, doc, DocumentSnapshot, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { setUser } from "@/lib/redux/slices/user/userSlice";
import { useSelector } from "react-redux";
import { selectUser } from '../../redux/slices/user/selectors';

export async function createNewUser(userInfo: User) {
  try {
    // Create a new Firebase Auth account
    const cred = await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password);

    // Use the user's UID as the Firestore document ID
    const userRef = doc(db, "user", cred.user.uid);

    const newUser: User = {
      userId: cred.user.uid, // Use the UID from the created auth account
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      program: userInfo.program,
      password: userInfo.password,
      yearOfStudy: userInfo.yearOfStudy,
      studentNumber: userInfo.studentNumber,
      bio: userInfo.bio,
      profilePictureUrl: userInfo.profilePictureUrl,
      backgroundProfile: userInfo.backgroundProfile,
      email: userInfo.email,
      school: userInfo.school,
      groups: userInfo.groups,
      connections: userInfo.connections,
      pages: userInfo.pages,
      posts: userInfo.posts,
      photos: userInfo.photos,
      comments: userInfo.comments,
    };

    // Set the new user document with the user's UID as the document ID
    await setDoc(userRef, newUser);

    console.log("User created successfully with UID as document ID");
  } catch (error) {
    console.error("An error was encountered creating user", error);
  }
}

export async function signIn(userInfo: SignInProps): Promise<DocumentSnapshot | null> {
  try {
    console.log(userInfo)
    // Await the promise returned by signInWithEmailAndPassword
    const cred = await signInWithEmailAndPassword(auth, userInfo.email, userInfo.password);
    console.log(cred)
    const userRef = doc(db,'user', cred.user.uid);
    const signedInUser = await getDoc(userRef)
    console.log("***current user******")
    console.log(signedInUser)
    
    // Return "success" if login is successful
    return signedInUser;
    
  } catch (error) {
    // Log the error and rethrow it to handle elsewhere if needed
    console.error('An error was encountered', error);
    
    // Return an error message (or throw if you want to handle elsewhere)
    return null;
  }
}
