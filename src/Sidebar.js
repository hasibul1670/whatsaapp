import React from 'react'
import './Sidebar.css'
import { Avatar, IconButton, Icon } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {SearchOutlined} from '@material-ui/icons';
import Sidebarchat from './Sidebarchat';
import { useState } from 'react';
import { useEffect } from 'react';
import db from './firebase';
import { useStateValue } from './StateProvider';

function Sidebar() {
    const [rooms,setrooms]=useState([]);
    const [{user},dispatch]= useStateValue();
    useEffect(()=>{
const unsub= db.collection('rooms').onSnapshot(snapshot=>(
    setrooms(snapshot.docs.map(doc=>
        ({
            id:doc.id,
            data:doc.data()
        })
        ))
));
return()=>{
    unsub();
}
    },[])

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <Avatar src={user?.photoURL} />
                <div className="sidebar-headerright">
                    <IconButton>

                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />

                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />

                    </IconButton>

                </div>
            </div>
            <div className="sidebar-search">

              
<div className="search-con">
<SearchOutlined />

<input placeholder='search or start new chat' type="text"/>


</div>
            </div>

            <div className="sidebar-chat">

<Sidebarchat addnewchat/>


{rooms.map(room=>(
<Sidebarchat key={room.id} id={room.id}
name={room.data.name} />

))}



            </div>
        </div>
    )
}

export default Sidebar
