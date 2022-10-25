import React, { useState } from 'react'
/**chakra ui */
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Circle,
  FormControl,
  FormLabel,
  Input
} from '@chakra-ui/react'

/**importing uuid */
import { v4 as uuidv4 } from 'uuid';

/**fireabase, firestore, storage */
import firebaseApp from '../firebase/index';
import { getFirestore, updateDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

/**initiallizing firestore and storage */
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);


const AddTask = ({tasks, setTasks, userEmail}) => {

  /**url ref for upload pic */

  const [urlRef, setUrlRef] = useState(null)

  console.log(urlRef)

  console.log(userEmail)
  /**open modal with chakra ui */
  const { isOpen, onOpen, onClose } = useDisclosure();

  /**handle image */

  async function handleImage(e){
    //**detect file */
    const fileImage = e.target.files[0];
    //**load it to the firebase storage */
    const fileRef = ref(storage, `documents/${fileImage.name}`);
    await uploadBytes(fileRef, fileImage);
    //**get URL */
    const urlRefFromFiles = await getDownloadURL(fileRef);
    setUrlRef(urlRefFromFiles)
  }

  /**handle form */

  async function handleForm(e){
    e.preventDefault();
    const content = e.target.formId.value

    /**create new array */
    const newTasks = [...tasks, {id: uuidv4(), content: content, image: urlRef } ];
    /**update database */
    const docRef = doc(firestore, `users/${userEmail}`);
    updateDoc(docRef, { task: [...newTasks]});
    /**update state */
    setTasks(newTasks);
  }



  return (
  <>
	<Circle bg='gray.100' size={16} cursor='pointer' color='black' m={10} fontSize={35} onClick={onOpen}>+</Circle>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Task:</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleForm}>
          <ModalBody>
          
          <FormLabel htmlFor='formId'>Task:</FormLabel>
          <Input type='text' placeholder='Task' id='formId'autoComplete="off" />
          <FormLabel>Image:</FormLabel>
          <label htmlFor="filePicker" style={{ background:"grey", padding:"8px 10px" }} className='input-file-style'>
          Upload Image
          </label>
          <input id="filePicker" style={{visibility:"hidden"}} type="file" onChange={handleImage}/>
          </ModalBody>

          <ModalFooter mt={10}>
            <Button colorScheme='blue' mr={3}  onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost' type='submit' onClick={onClose}>Add Task</Button>
          </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddTask