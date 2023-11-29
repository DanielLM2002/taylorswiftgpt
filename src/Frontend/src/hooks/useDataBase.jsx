import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect, useState } from 'react';
import { firestore } from '../config/firebase';
import { 
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  updateDoc
} from 'firebase/firestore';

import dataBaseContext from '../context/DataBaseContext/databaseContext';
import { CHATS, COLLECTION, CURRENT_CHAT } from '../types';

const useDataBase = () => {

  const DataBaseContext = useContext(dataBaseContext);
  const { 
    chats, 
    _collection,
    currentChat,
    setDataBaseContextState 
  } = DataBaseContext;

  const handleChats = async (id) => {
    let _chats = [];
    const querySnapshot = await getCollectionData(id);
    querySnapshot.forEach(doc => _chats.push({...doc.data(), id:doc.id, name: `Chat #${_chats.length + 1}`}));
    setDataBaseContextState(CHATS, _chats);
  };

  const addChat = async () => {
    const newChats = [ ...chats ];
    const newChat = {
      id: uuidv4(),
      questions: []
    };
    newChats.push(newChat);
    setDataBaseContextState(CHATS, newChats);
    setDataBaseContextState(CURRENT_CHAT, newChat);
    return newChat;
  };

  const addQuestion = async (chatId, content) => {
    const questionId = uuidv4(); 
    const newChats = [...chats];
    const newQuestion = {
      id: questionId,
      content,
      answer: 'Test answer'
    };
    const newChat = newChats.filter(chat => chat.id == chatId)[0];
    const _doc = doc(firestore, _collection, chatId);

    newChat.questions.push(newQuestion);
    newChats.map(chat => {
      if (chat.id == chatId) {
        chat.questions = newChat.questions;
      }
    });

    if (currentChat.questions.length === 1) {
      await setDoc(_doc, newChat);
    } else {
      await updateDoc(_doc, newChat);
    }

    setDataBaseContextState(CHATS, newChats);
    setDataBaseContextState(CURRENT_CHAT, newChat);
  };

  const changeCurrentChat = (chat) => {
    if (currentChat && currentChat.questions.length === 0) {
      deleteChat(currentChat.id);
    }
    setDataBaseContextState(CURRENT_CHAT, chat);
  };

  const deleteChat = async (id) => {
    const newChats = chats.filter(chat => chat.id !== id);
    if (currentChat && id === currentChat.id) {
      setDataBaseContextState(CURRENT_CHAT, null);
    }
    setDataBaseContextState(CHATS, newChats);
    await deleteDoc(doc(firestore, _collection, id));
  };

  const getCollectionData = async (id) => {
    const dataCollection = collection(firestore, id);
    setDataBaseContextState(COLLECTION, id);
    const querySnapshot = await getDocs(dataCollection);
    return querySnapshot;
  };

  // useEffect(() => {
  //   // getCollectionData();
  //   handleSession
  // }, []);

  return {
    DataBaseContext,
    handleChats,
    addChat,
    addQuestion,
    changeCurrentChat,
    deleteChat
  };
};

export default useDataBase;
