"use client";
import { useState } from "react";
import { createNewUser } from "@/lib/firebase/auth/userAuth"; // Adjust the import path as per your project structure
import { useRouter } from "next/navigation";
import { User } from "@/lib/model/types";

export default function CreateUserPage() {
  const router = useRouter();
  
  // State to store user inputs
  const [userId, setUserId] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [program, setProgram] = useState<string>("");
  const [yearOfStudy, setYearOfStudy] = useState<number>(1);
  const [studentNumber, setStudentNumber] = useState<number>(0);
  const [bio, setBio] = useState<string>("");
  const [profilePictureUrl, setProfilePictureUrl] = useState<string>("");
  const [backgroundProfile, setBackgroundProfile] = useState<string>("");
  const [school, setSchool] = useState<string>("");
  
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload on form submit

    const userData: User = {
      userId,
      firstName,
      lastName,
      email,
      password,
      program,
      yearOfStudy,
      studentNumber,
      bio,
      profilePictureUrl,
      backgroundProfile,
      school,
      groups: [],
      connections: [],
      pages: [],
      posts: [],
      photos: [],
      comments: []
    };

    try {
      await createNewUser(userData);  // Call the function to create a new user
      router.push("/user-dashboard");  // Redirect to dashboard or another page on success
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="container mx-auto p-5 m-5">
      <h1 className="text-3xl font-bold mb-6">Create New User</h1>
      
      <form onSubmit={submit} className="grid grid-cols-1 gap-6">
        <div>
          <label>First Name</label>
          <input 
            type="text" 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} 
            className="border rounded w-full py-2 px-3" 
            required
          />
        </div>

        <div>
          <label>Last Name</label>
          <input 
            type="text" 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)} 
            className="border rounded w-full py-2 px-3" 
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="border rounded w-full py-2 px-3" 
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="border rounded w-full py-2 px-3" 
            required
          />
        </div>

        <div>
          <label>Program</label>
          <input 
            type="text" 
            value={program} 
            onChange={(e) => setProgram(e.target.value)} 
            className="border rounded w-full py-2 px-3" 
            required
          />
        </div>

        <div>
          <label>Year of Study</label>
          <input 
            type="number" 
            value={yearOfStudy} 
            onChange={(e) => setYearOfStudy(Number(e.target.value))} 
            className="border rounded w-full py-2 px-3" 
            required
          />
        </div>

        <div>
          <label>Student Number</label>
          <input 
            type="number" 
            value={studentNumber} 
            onChange={(e) => setStudentNumber(Number(e.target.value))} 
            className="border rounded w-full py-2 px-3" 
            required
          />
        </div>

        <div>
          <label>Bio</label>
          <textarea 
            value={bio} 
            onChange={(e) => setBio(e.target.value)} 
            className="border rounded w-full py-2 px-3"
          />
        </div>

        <div>
          <label>Profile Picture URL</label>
          <input 
            type="text" 
            value={profilePictureUrl} 
            onChange={(e) => setProfilePictureUrl(e.target.value)} 
            className="border rounded w-full py-2 px-3" 
          />
        </div>

        <div>
          <label>Background Profile URL</label>
          <input 
            type="text" 
            value={backgroundProfile} 
            onChange={(e) => setBackgroundProfile(e.target.value)} 
            className="border rounded w-full py-2 px-3" 
          />
        </div>

        <div>
          <label>School</label>
          <input 
            type="text" 
            value={school} 
            onChange={(e) => setSchool(e.target.value)} 
            className="border rounded w-full py-2 px-3" 
            required
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create User
        </button>
      </form>
    </div>
  );
}
