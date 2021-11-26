import { useState, useEffect } from "react";
import "./App.css";
import { db, auth } from "./firebase-config";
import firebase from 'firebase';
import index from './index.css';
import { useAuthState } from 'react-firebase-hooks/auth'




// import {
//   collection,
//   getDocs,
//   addDoc,
//   updateDoc,
//   deleteDoc,
//   doc,
//   docs,
// } from "firebase/firestore";


function App() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [users, setUsers] = useState([]);
  const [user] = useAuthState(auth)

  // const { uid, photoURL } = auth.currentUser;

  //   console.log("auth or user does not exist")


  // const usersCollectionRef = collection(db, "users");


  const getUsers = async () => {
    await db.collection('users').onSnapshot(snapshot => {
      setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    });
  };

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
  };

  const createUser = async () => {
    const { uid, photoURL } = auth.currentUser;


    await db.collection('users').add({
      'name': newName,
      'age': Number(newAge),
      photoURL,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {

    });

    setNewName('');
    setNewAge(0);
    // await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
    // await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
  };

  const updateUser = async (id, age) => {

    await db.collection('users').doc(id).update({
      'age': '20',
      'name': 'Updated Name'
    }).then(() => {

    });
  };

  const deleteUser = async (id) => {
    await db.collection('users').doc(id).delete().then(() => {
    });
  };

  //this will render as the screen loads 
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      {
        user ? <div className="App">
          <input
            value={newName}
            placeholder="Name..."
            onChange={(event) => {
              setNewName(event.target.value);
            }}
          />
          <input
            value={newAge}
            type="number"
            placeholder="Age..."
            onChange={(event) => {
              setNewAge(event.target.value);
            }}
          />
          <button onClick={createUser}> Create User</button>
          {
            users ?
              <> <button className="logoutButton" onClick={() => auth.signOut()}> Sign Out</button></>
              :
              <button className="registerButton" onClick={signInWithGoogle}> Sign in your google account</button>
          }

          {/* <img src={photoURL} alt="Image Not Found" /> */}
          {users.map((user) => {
            return (
              <div>
                {" "}
              <p>
                <img className="imgdata" src={user.photoURL} alt="" />
              </p>
                <h1>Name: {user.name}</h1>
                <h1>Age: {user.age}</h1>
                <button
                  onClick={() => {
                    updateUser(user.id, user.age);
                  }}
                >
                  {" "}
                  Increase Age
                </button>
                <button
                  onClick={() => {
                    deleteUser(user.id);
                  }}
                >
                  {" "}
                  Delete User
                </button>
              </div>
            );
          })}
        </div> : <div> User Does not Exist
          <button className="registerButton" onClick={signInWithGoogle}> Sign in your google account</button>
        </div>
      }
    </>
  );
}

export default App;