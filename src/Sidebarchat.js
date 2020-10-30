import React, { useEffect, useState } from 'react'
import './Sidebarchat.css'
import { Avatar } from '@material-ui/core'
import db from './firebase';
import { Link } from 'react-router-dom';

function Sidebarchat({id, name, addnewchat}) {

const [seed,setseed]=useState('');
const [messages, setmessages] = useState([]);

useEffect(()=>{
    if(id){
db.collection('rooms')
.doc(id)
.collection('messages')
.orderBy('timestamp','desc')
.onSnapshot(snapshot=>
setmessages(snapshot.docs.map(doc=>
        doc.data())) 
);
}
},[])


useEffect(()=>{
    setseed(Math.floor(Math.random()*5000))

}, [])

const createChat =()=>{
    const roomName=prompt("Please Enter Name of chat room");
if(roomName){
db.collection('rooms').add({
    name:roomName,
});
}

};
    return!addnewchat ? (
        <Link to ={`/rooms/${id}`}>
    <div className="sidebarchat">
             <Avatar  src ={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
             <div className="sidebarchat-info">
    <h2>{name}</h2>
<p>{messages[0]?.message} </p>
                        </div>
        </div>
        </Link>
    
    ):(
<div onClick={createChat} className="sidebarchat">
    <h2>Add New Chat</h2>

</div>

    );
}

export default Sidebarchat
