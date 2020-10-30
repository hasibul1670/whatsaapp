import React, { useState, useEffect } from 'react'
import "./Chat.css";
import AttachFile from '@material-ui/icons/AttachFile';
import ChatIcon from '@material-ui/icons/Chat';
import {SearchOutlined} from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Avatar, IconButton } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from "firebase";

function Chat() {

    const [input, setinput] = useState('');
    const [roomName, setRoomName] = useState('');
    const {roomId}=useParams();
    const [messages, setmessages] = useState([]);
    const [{user},dispatch]= useStateValue();

useEffect(()=>{
if(roomId){
    db.collection('rooms').doc(roomId).
    onSnapshot(snapshot=>(setRoomName(snapshot.data().name)
    ))

    db.collection("rooms").doc(roomId)
    .collection("messages")
    .orderBy('timestamp','asc')
    .onSnapshot(snapshot=> 
         setmessages(snapshot.docs.map(doc=>
            doc.data()))   
        );
}

},[roomId])


    // useEffect(() => {
    //     setseed(Math.floor(Math.random() * 5000))

    // }, [])

    const sendMessage=(e)=>{
        e.preventDefault();
        console.log(input);
        db.collection('rooms').doc(roomId).collection
        ('messages').add({
            message:input,
name:user.displayName,
timestamp:firebase.firestore.FieldValue.serverTimestamp(),

        })

        setinput("");


    }

    return (
        <div className="chat">
            <div className="chat-header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${roomId}.svg`} />

                <div className="chat-headerinfo">
    <h3>{roomName}</h3>
                    <p>Last seen {" "}
                    {new Date
                    (messages[messages.length - 1]?.
                    timestamp?.toDate()
                    ).toUTCString()} 
                        
                    </p>
                </div>
                <div className="chatheaderright">
                    <IconButton>
                        <SearchOutlined />

                    </IconButton>
                    <IconButton>
                    <AttachFile />

                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />

                    </IconButton>
                </div>

            </div>
            <div className="chat-body">
                {
                    messages.map((message)=>(
<p className={`chat-message ${message.name===user.displayName && "chat-ree"}`}>
    
                    <span className='chat-name'>{message.name}</span>{message.message}
               <span className='time'>
                 {new Date(message.timestamp?.toDate
                    ()).toUTCString()}           
               </span>
               
               </p>

                    ))}



            </div>

            <div className="chat-footer">
            <InsertEmoticonIcon />
            <form action="">
                <input value={input} onChange={e=>setinput(e.target.value)} placeholder='Type a message' type="text"/>
                <button onClick={sendMessage}  type='submit' >Send a message</button>
            </form>
            <MicIcon />
            </div>
        </div>
    )
}

export default Chat
