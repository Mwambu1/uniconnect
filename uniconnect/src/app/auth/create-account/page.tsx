"use client";
import { useState } from "react";
import { createNewUser } from "@/lib/firebase/auth/userAuth"; // Adjust the import path as per your project structure
import { useRouter } from "next/navigation";
import { User } from "@/lib/model/types";
import { appRoutes } from "@/lib/routes";

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
      router.push(appRoutes.feed);  // Redirect to dashboard or another page on success
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className=" bg-white p-5 m-3 rounded-lg">
      <h1 className="text-xl font-bold mb-6 text-center text-gray-500">Create New User</h1>
      
      <form onSubmit={submit} className="grid grid-cols-1 gap-6">
        <div>
          <label className="text-sm text-black">First Name</label>
          <input 
            type="text" 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} 
            className="border rounded-md w-full py-2 px-3 h-10" 
            required
          />
        </div>

        <div>
          <label className="text-sm text-black">Last Name</label>
          <input 
            type="text" 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)} 
            className="border rounded-md h-10 w-full py-2 px-3" 
            required
          />
        </div>

        <div>
          <label className="text-sm text-black">Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="border rounded-md w-full py-2 px-3" 
            required
          />
        </div>

        <div>
          <label className="text-sm text-black">Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="border rounded w-full py-2 px-3" 
            required
          />
        </div>

        <div>
          <label className="text-sm text-black">Program</label>
          <input 
            type="text" 
            value={program} 
            onChange={(e) => setProgram(e.target.value)} 
            className="border rounded w-full py-2 px-3" 
            required
          />
        </div>

        <div>
          <label className="text-sm text-black">Year of Study</label>
          <input 
            type="number" 
            value={yearOfStudy} 
            onChange={(e) => setYearOfStudy(Number(e.target.value))} 
            className="border rounded w-full py-2 px-3" 
            required
          />
        </div>

        <div>
          <label className="text-sm text-black">Student Number</label>
          <input 
            type="number" 
            value={studentNumber} 
            onChange={(e) => setStudentNumber(Number(e.target.value))} 
            className="border rounded w-full py-2 px-3" 
            required
          />
        </div>

        <div>
          <label className="text-sm text-black">Bio</label>
          <textarea 
            value={bio} 
            onChange={(e) => setBio(e.target.value)} 
            className="border rounded w-full py-2 px-3"
          />
        </div>

        <div>
          <label className="text-sm text-black">Profile Picture URL</label>
          <input 
            type="text" 
            value={profilePictureUrl} 
            onChange={(e) => setProfilePictureUrl(e.target.value)} 
            className="border rounded w-full py-2 px-3" 
          />
        </div>

        <div>
          <label className="text-sm text-black">Background Profile URL</label>
          <input 
            type="text" 
            value={backgroundProfile} 
            onChange={(e) => setBackgroundProfile(e.target.value)} 
            className="border rounded w-full py-2 px-3" 
          />
        </div>

        <div>
          <label className="text-sm text-black">School</label>
          <input 
            type="text" 
            value={school} 
            onChange={(e) => setSchool(e.target.value)} 
            className="border rounded w-full py-2 px-3" 
            required
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Create User
        </button>
      </form>
    </div>
  );
}
