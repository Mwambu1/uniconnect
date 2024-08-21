import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../config";

export async function testFunction() {
    await addDoc(collection(db,"test"),{
           name: "Mwambu",
           age: "23"
    })
    return true;  
}

export async function createPost(data: String) {
    await addDoc(collection(db,"posts"), {
        data
    })
}