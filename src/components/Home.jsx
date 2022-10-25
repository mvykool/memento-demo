import React, { useEffect, useState } from 'react'

import firebaseApp from '../firebase'
import { getAuth, signOut } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

import TaskList from './TaskList'
import AddTask from './AddTask'

import { useColorMode, Button, Box, Text } from '@chakra-ui/react'

/** starting firebase auth and firestore */

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

/** starting firebase auth and firestore */


const Home = ({ userEmail }) => {
  console.log(userEmail)

/** doing fake data to test app */

  const fakeData = [{
    id: 1,
    content: "fake task 1",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/640px-A_small_cup_of_coffee.JPG"
  },
  {
    id: 2,
    content: "fake task 2",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/640px-A_small_cup_of_coffee.JPG"
  },
  {
    id: 3,
    content: "fake task 3",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/640px-A_small_cup_of_coffee.JPG"
  },
]
/** doing fake data to test app */

/** color mode toggle chakra ui */
const { colorMode, toggleColorMode } = useColorMode()

/** color mode toggle chakra ui */

/** geting or creating the actual data from firestore */

async function getDocOrCreateDoc (docId){
  /**create reference to docu */
  const docRef = doc(firestore, `users/${docId}`);
  /**search for doc */
  const searchDoc = await getDoc(docRef);

  /**check if it exist */

  if(searchDoc.exists()){
  /**if exist*/
  const data = searchDoc.data()
  return data.task;
  }else {
  /**if it doesnt exist*/
  await setDoc(docRef, { task: [...fakeData] });
  const searchDoc = await getDoc(docRef);
  const data = searchDoc.data()
  return data.task;
  }
}

/** geting or creating the actual data from firestore */

/**usestate of tasks */
const [tasks, setTasks] = useState(null);
/**usestate of tasks */

/**useEffect to get the info in the first render */
useEffect(()=> {
  async function fetchTasks(){
    const fetchedTasks = await getDocOrCreateDoc(userEmail);
    setTasks(fetchedTasks);
  }

  fetchTasks();
}, [])
/**useEffect to get the info in the first render */


  return (
  <Box>
        <Box m={5}>
          <Text fontSize={32} fontWeight="bold">
            Home
          </Text>
        </Box>
          <Button m={2} bg='cyan.700' _hover={{background: 'blue'}} onClick={()=> signOut(auth)}>Sign Out</Button>
          <Button m={2} onClick={toggleColorMode}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>
          {tasks ? <TaskList
            tasks={tasks}
            setTasks={setTasks}
            userEmail={userEmail}/>: <Text m={10} border='1px' borderColor='white' width='20%' p={10} borderRadius='md'>"no tasks"</Text>}
          <AddTask
            tasks={tasks}
            setTasks={setTasks}
            userEmail={userEmail}
          />
  </Box>
  )
}

export default Home