import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect, useState } from 'react';
import { firestore } from '../config/firebase';
import {
  doc,
  onSnapshot,
  updateDoc,
  setDoc,
  deleteDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore';

import dataBaseContext from '../context/DataBaseContext/databaseContext';
import { SESSION, CURRENT_CHAT } from '../types';

const useDataBase = () => {
  const DataBaseContext = useContext(dataBaseContext);
  const { 
    session, 
    currentChat,
    setDataBaseContextState 
  } = DataBaseContext;

  const handleSession = async (id) => {
    let _session = null;
    const { docs } = await getCollectionData(id);
    docs.forEach(doc => {
      if (doc.id === id) {
        _session = {...doc.data(), id:doc.id}
      }
    });
    setDataBaseContextState(SESSION, _session);
  };

  const addChat = () => {
    const newSession = { ...session };
    const newChat = {
      id: uuidv4(),
      questions: []
    };
    newSession.chats.push(newChat);
    setDataBaseContextState(SESSION, newSession);
    setDataBaseContextState(CURRENT_CHAT, newChat);
    return newChat;
  };

  const addQuestion = async (chatId, content) => {
    const questionId = uuidv4(); 
    const newSession = {...session};
    const newQuestion = {
      id: questionId,
      content,
      answer: 'Test answer'
    };
    const newChat = newSession.chats.filter(chat => chat.id == chatId)[0];
    newChat.questions.push(newQuestion);
    newSession.chats.map(chat => {
      if (chat.id == chatId) {
        chat.questions = newChat.questions;
      }
    });
    setDataBaseContextState(SESSION, newSession);
    setDataBaseContextState(CURRENT_CHAT, newChat);
  };

  const changeCurrentChat = (chat) => {
    if (currentChat && currentChat.questions.length === 0) {
      deleteChat(currentChat.id);
    }
    setDataBaseContextState(CURRENT_CHAT, chat);
  };

  const deleteChat = (id) => {
    const { chats } = session;
    const newChats = chats.filter(chat => chat.id !== id);
    const newSession = {...session, chats: newChats};
    if (currentChat && id === currentChat.id) {
      setDataBaseContextState(CURRENT_CHAT, null);
    }
    setDataBaseContextState(SESSION, newSession);
  };

  const getCollectionData = async (id) => {
    const _collection = collection(firestore, 'session');
    return {
      _collection,
      docs: await getDocs(_collection, where('id', '==', id))
    };
  };

  // useEffect(() => {
  //   // getCollectionData();
  //   handleSession
  // }, []);

  return {
    DataBaseContext,
    handleSession,
    addChat,
    addQuestion,
    changeCurrentChat,
    deleteChat
  };
};

export default useDataBase;
