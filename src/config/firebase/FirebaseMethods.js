import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import app from "./firebaseconfig.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { lazy } from "react";


  const storage = getStorage(app);
  
  const auth = getAuth(app);
  
  //initialize firestore database
  const db = getFirestore(app);
  
  // register user
  
  let signUpUser = (formData) => {
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then(async (res) => {
          resolve((formData.uid = res.user.uid));
          delete formData.password;
          const dbObj = {
            ...formData,
            uid: res.user.uid
          }
          await addDoc(collection(db, "student"), dbObj)
            .then((res) => {
              console.log("user added to database successfully");
              // navigate('/student')
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  };
  
  
  

  // login user
  let loginUser = (obj) => {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, obj.email, obj.password)
        .then(async () => {
          const q = query(
            collection(db, "students"),
            where("uid", "==", auth.currentUser.uid)
            
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            resolve(doc.data());
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  
  //signout User
  const signOutUser = () => {
    return new Promise((resolve, reject) => {
      signOut(auth)
        .then(() => {
          resolve("user Signout Successfully");
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  
  //send data to firestore
  const sendData = (obj, colName) => {
    return new Promise((resolve, reject) => {
      addDoc(collection(db, colName), obj)
        .then((res) => {
          resolve("data send to db successfully");
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  
  //get data with id from firestore
  const getData = (colName, userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const dataArr = [];
        const q = query(collection(db, colName), where("uid", "==", userId));
        const querySnapshot = await getDocs(q);
  
        querySnapshot.forEach((doc) => {
          dataArr.push(doc.data());
        });
        resolve(dataArr);
      } catch (error) {
      
        reject(error.message);
      }
    });
  };
  // const getData = (colName,userId) => {
  //   return new Promise(async (resolve, reject) => {
  //     const dataArr = []
  //     const q = query(
  //       collection(db, colName),
  //       where("uid", "==", userId)
  //     );
  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.forEach((doc) => {
  //       dataArr.push(doc.data())
  //       resolve(dataArr);
  //     });
  //     reject("error occured");
  //   });
  // };
  
  //get all data
  const getAllData = (colName) => {
    return new Promise(async (resolve, reject) => {
      const dataArr = []
      const querySnapshot = await getDocs(collection(db, colName));
      querySnapshot.forEach((doc) => {
        const obj = { ...doc.data(), documentId: doc.id }
        dataArr.push(obj)
        resolve(dataArr);
      });
      reject("error occured")
    })
  }
  
  //Delete document by id
  const deleteDocument = async (id, name) => {
    return new Promise((resolve, reject) => {
      deleteDoc(doc(db, name, id));
      resolve("document deleted")
      reject("error occured")
    })
  }
  
  //update document by id
  const updateDocument = async (obj, id, name) => {
    return new Promise((resolve, reject) => {
      const update = doc(db, name, id);
      updateDoc(update, obj)
      resolve("document updated")
      
      reject("error occured")
    })
  }

  // const files = profile.files[0]
  const addImageToStorage = (file, email) => {
    return new Promise(async (resolve, reject) => {
      try {
        const storageRef = ref(storage, file.name); 
        await uploadBytes(storageRef, file);
  
        const imageUrl = await getDownloadURL(storageRef);
        
  
        resolve(imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
        reject(error);
      }
    });
  };
  export { storage, signUpUser, loginUser, signOutUser, sendData, getData, getAllData, deleteDocument, updateDocument, addImageToStorage };