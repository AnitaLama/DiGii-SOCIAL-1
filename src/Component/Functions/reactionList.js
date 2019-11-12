// LIST OF EMOJIS USED FOR REACTIONS FOR POST
import React from 'react';
import {
  FaSmile,
  FaRegSadTear,
  FaRegGrinHearts,
  FaRegAngry,
  FaRegGrin
} from 'react-icons/fa';

const ReactionsList = [
  { id: 1, name: 'smile', value: <FaSmile /> },
  { id: 2, name: 'sad', value: <FaRegSadTear /> },
  { id: 3, name: 'wow', value: <FaRegGrinHearts /> },
  { id: 4, name: 'angry', value: <FaRegAngry /> },
  { id: 5, name: 'happy', value: <FaRegGrin /> }
];

export default ReactionsList;
