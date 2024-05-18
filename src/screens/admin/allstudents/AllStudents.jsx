import React , {useState , useEffect} from 'react'
import { collection, getDocs, where , query} from "firebase/firestore"; 
import { db } from '../../../config/firebase/firebasemethods';

const AllStudents = () => {

  const [arr, setArr] = useState([]);

  useEffect(() => {
    gettingStudents();
  }, []);

  const gettingStudents = async () => {
    const q = query(collection(db, "students"), where('type', '==', 'student'));
    const querySnapshot = await getDocs(q);
    const studentsArray = [];
    querySnapshot.forEach((doc) => {
      studentsArray.push(doc.data());
    });
    setArr(studentsArray);
    console.log(studentsArray);
  };

  return (
    <div>AllStudents</div>
  )
}

export default AllStudents