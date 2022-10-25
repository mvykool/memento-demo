import React from 'react'
import { Box, Button } from '@chakra-ui/react'

import firebaseApp from '../firebase/index'
import { getFirestore, updateDoc, doc } from 'firebase/firestore'

/**setting firestore */

const firestore = getFirestore(firebaseApp);

const TaskList = ({tasks, userEmail, setTasks}) => {

  /**handle delete task button  */

async function handleDeleteTask(taskId) {
  /**create new array of tasks */
  const newTasks = tasks.filter(
    (task) => task.id !== taskId
  );
  /**update database in firestore */
  const docRef = doc(firestore, `users/${userEmail}`);
  updateDoc(docRef, {task: [...newTasks] });
  /**update state */
  setTasks(newTasks);
}

  /**handle delete task button  */

  return (
	<Box display='flex'>
    {tasks.map((task)=> {
      return(
        <Box m={10} bg='gray.100' color='black' p={10} borderRadius='md' key={task.id}>
        <Button borderRadius='100%' bg='red.500'_hover={{background: 'red.800'}} size='sm' color='white' mt='-50px' ml={28} position='absolute'
        onClick={()=> handleDeleteTask(task.id)}
        >x</Button>
          <p>{task.content}</p>
          <img src={task.image} className="task-image" alt="" />
          <img src={task.url} alt=""  />
        </Box>
      )
    })}
  </Box>
  )
}

export default TaskList