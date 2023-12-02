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

import dataBaseContext from '../context/DataBaseContext/dataBaseContext';
import { CHATS, LOADING, COLLECTION, CURRENT_CHAT } from '../types';

const useDataBase = () => {

  const DataBaseContext = useContext(dataBaseContext);
  const { 
    chats, 
    loading,
    _collection,
    currentChat,
    setDataBaseContextState 
  } = DataBaseContext;

  const handleChats = async (id) => {
    let _chats = [];
    const querySnapshot = await getCollectionData(id);
    querySnapshot.forEach(doc => _chats.push({...doc.data(), id:doc.id}));
    setDataBaseContextState(CHATS, _chats);
  };

  const addChat = () => {
    const newChats = [ ...chats ];
    const newChat = {
      id: uuidv4(),
      name: 'New chat',
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
    setDataBaseContextState(LOADING, true);
    const newQuestion = {
      id: questionId,
      content,
      answer: [
        `Thought I found a way`,
        `Thought I found a way out (found)`,
        `But you never go away (never go away)`,
        `So I guess I gotta stay now`,
        `Oh, I hope some day I'll make it out of here`,
        `Even if it takes all night or a hundred years`,
        `Need a place to hide, but I can't find one near`,
        `Wanna feel alive, outside I can't fight my fear`,
        `Isn't it lovely, all alone?`,
        `Heart made of glass, my mind of stone`,
        `Tear me to pieces, skin to bone`,
        `Hello, welcome home`,
        `Walkin' out of time`,
        `Lookin' for a better place (lookin' for a better place)`,
        `Something's on my mind (mind)`,
        `Always in my head space`,
        `But I know some day I'll make it out of here`,
        `Even if it takes all night or a hundred years`,
        `Need a place to hide, but I can't find one near`,
        `Wanna feel alive, outside I can't fight my fear`,
        `Isn't it lovely, all alone?`,
        `Heart made of glass, my mind of stone`,
        `Tear me to pieces, skin to bone`,
        `Hello, welcome home`,
        `Whoa, yeah`,
        `Yeah, ah`,
        `Whoa, whoa`,
        `Hello, welcome home`,
      ]
    };

    await setTimeout(() => {
      setDataBaseContextState(LOADING, false);
    }, 3000);

    if (currentChat === null) {
      const newChat = addChat();
      await setTimeout(() => {
        newChat.questions.push(newQuestion);
      }, 100);
      newChats.push(newChat);
      newChats.map(chat => {
        if (chat.id == chatId) {
          chat.questions = newChat.questions;
        }
      });
      const chatAddedDoc = doc(firestore, _collection, newChat.id);
      await setDoc(chatAddedDoc, newChat);
    } else {
      const _doc = doc(firestore, _collection, chatId); 
      const newChat = newChats.filter(chat => chat.id == chatId)[0];
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
    }
  };

  const changeCurrentChat = (chat) => {
    if (currentChat && currentChat.questions.length === 0) {
      deleteChat(currentChat.id);
    }
    setDataBaseContextState(CURRENT_CHAT, chat);
    document.title = chat.name;
  };

  const deleteChat = async (id) => {
    const newChats = chats.filter(chat => chat.id !== id);
    if (currentChat && id === currentChat.id) {
      setDataBaseContextState(CURRENT_CHAT, null);
    }
    setDataBaseContextState(CHATS, newChats);
    await deleteDoc(doc(firestore, _collection, id));
  };

  const renameChat = async (id, newName) => {
    if (newName !== '') {
      const newChats = [ ...chats ];
      const modifiedChat = chats.filter(chat => chat.id == id)[0];
      modifiedChat.name = newName;
      newChats.map(chat => {
        if (chat.id == id) {
          chat = modifiedChat;
        }
      });
      setDataBaseContextState(CHATS, newChats);
      const _doc = doc(firestore, _collection, id);
      await updateDoc(_doc, modifiedChat);
    }
  };

  const getCollectionData = async (id) => {
    const dataCollection = collection(firestore, id);
    setDataBaseContextState(COLLECTION, id);
    const querySnapshot = await getDocs(dataCollection);
    return querySnapshot;
  };

  return {
    DataBaseContext,
    handleChats,
    addChat,
    addQuestion,
    changeCurrentChat,
    deleteChat,
    renameChat
  };
};

export default useDataBase;
