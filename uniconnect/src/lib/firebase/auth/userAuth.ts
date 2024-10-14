import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config";
import { User } from "@/lib/model/types";
import { addDoc, collection, updateDoc } from "firebase/firestore";

export async function createNewUser(userInfo: User) {
    try {

        //create new firebase auth account
        createUserWithEmailAndPassword(auth, userInfo.email,userInfo.password).then(async (cred)=>{
        //create new user document in users collection on firebase

        const userRef = collection(db,"users");

        const newUser: User = {
            userId: cred.user.uid,
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
            comments: userInfo.comments   
        }

        const docRef = await addDoc(userRef, newUser);

        await updateDoc(docRef, { userId: cred.user.uid });

        });

    } catch (error) {
        console.error("An error was encountered creating user", error);
    }
}

export async function signIn(userInfo: SignInProps): Promise<string> {
  try {
    // Await the promise returned by signInWithEmailAndPassword
    const cred = await signInWithEmailAndPassword(auth, userInfo.email, userInfo.password);
    
    // Return "success" if login is successful
    return "success";
    
  } catch (error) {
    // Log the error and rethrow it to handle elsewhere if needed
    console.error('An error was encountered', error);
    
    // Return an error message (or throw if you want to handle elsewhere)
    return "failure";
  }
}
