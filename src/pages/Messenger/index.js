// components 
import { Box, Container, Typography } from "@material-ui/core";
import { Height } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Header } from "../../components";
import "./messangerStyle.css"
// library 
import { useSelector, useDispatch, connect } from "react-redux";
// redux
import { getMessages, markAsSeen, messangerId, sendNewMessage } from "../../redux/actions/messagnerActions";
// import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
const Messenger = ({
  messangerId,
  messangerData,
  get_messages=[],
  getMessages,
   
}) => {
  const location =useHistory()
  const [messageValue, setMessageText]=useState("")
  const [load, reLoad]=useState(false);
  const localStorageData= localStorage.getItem("user")
  const localStorageFiltered=JSON.parse(localStorageData)
  const dispatch = useDispatch();

    useEffect(async() => { 
      messangerId(localStorageFiltered.id)
    }, [])

   const getMessangerData = useSelector((store) => store.MessangerReducer);
      console.log(messangerData, "messangerData mal")
   
    useEffect(async() => { 
        dispatch(markAsSeen(localStorageFiltered.id, 1))
    }, [])
useEffect(() => {  
        getMessages(1) 
    }, [load])
 const handilSendMessage = async(e)=>{
  e.preventDefault()
  const {created_at, file, id, is_seen, mess_id, message, status, updated_at, user_id, user_name, user_type}=  getMessangerData.messangerData.messages[0]
  await dispatch(sendNewMessage({
            message:messageValue,
            file:file,
            mess_id:mess_id,
            user_name: localStorageFiltered.username,
            user_id:localStorageFiltered.id,
            user_type:localStorageFiltered.module_type ,
            is_seen:0 ,
            status:0 ,
        }))
   await   reLoad(!load)
   await   setMessageText("")
 } 
 setInterval(function() {    
    getMessages(1)
  }, 6000);
    return (
          <>
          
            <Header history={location} />
               Chate section
               {getMessangerData?.messangerData?.messenger?.status=="1" ?
                <div className="messanger-main-container"> 
                     <div class="message-container">
                   { get_messages?.map((msg, i) => {
                      return (
                        <div id={i}> 
                            { msg.user_type=="1" || msg.user_type=="2"? 
                             <div className="message-blue">
                                  <div className="message-name-left">{msg.user_name}</div>
                                  <p className="message-content">{msg.message}</p>
                                  <div className="message-timestamp-left">{msg.created_at}</div>
                              </div> :
                              <div className="message-orange">
                                  <div className="message-name-right">{msg.user_name}</div>
                                  <p className="message-content">{msg.message}</p>
                                  <div className="message-timestamp-right">{msg.created_at}</div>
                              </div> 
                            }
                        </div>
                      )
                    })} 
                 </div>
                    <input placeholder="Type message" value={messageValue} onChange={(e)=>setMessageText(e.target.value)} className="messangerInput"/>
                    <Button className="messanger-send-btn" onClick={handilSendMessage}>Send</Button>
                </div>
               :
                <div className="messanger-main-container">
                      <div >Admin did't created messanger for you.</div>
                </div>} 
       </>
    );
  };

  // export default Messenger;
  

  const mapStateToProps = ({
    MessangerReducer: {
      messangerData , 
      get_messages
    },
    
  }) => ({ 
    messangerData,
    get_messages,
     
  });
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
      {
        messangerId,
        getMessages
      },
      dispatch
    );
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Messenger);