import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
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
  getDoc,
} from "firebase/firestore";
import app from './FirebaseConfig'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


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
  
  
  export async function getUser(id) {
    try {
      const docRef = doc(db, "student", id);  // Reference to the document
      const docSnap = await getDoc(docRef);    // Fetch the document snapshot
  
      if (docSnap.exists()) {
        return docSnap.data();  // Return the document data
      } else {
        console.log("No such document!");
        return null;  // Handle the case where the document does not exist
      }
    } catch (error) {
      console.error("Error getting document:", error);
      return null;  // Handle errors and return null or handle it as needed
    }
  }
  

  // login user
  let loginUser = (obj) => {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, obj.email, obj.password)
        .then(async () => {
          const q = query(
            collection(db, "student"),
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
    try {
      const updateRef = doc(db, name, id); // Reference to the document to update
      await updateDoc(updateRef, obj); // Update the document with the new data
      return "Document updated successfully";
    } catch (error) {
      console.error("Error updating document:", error);
      throw error; // Throw the error to be caught by the caller
    }
  };
  

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