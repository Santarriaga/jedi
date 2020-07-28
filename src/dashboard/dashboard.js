import React from 'react';
import ChatListComponent from '../chatList/chatList';
import ChatViewComponent from '../chatView/chatView';
import ChatTextBoxComponent from '../chatTextBox/chatTextBox';
import {Button, withStyles} from '@material-ui/core';
import styles from './styles'

const firebase = require("firebase");

class DashboardComponent extends React.Component{

    constructor(){
        super();
        this.state = {
            selectedChat: null,
            newChatFormVisible: false,
            email:null,
            chats: []
        };
    }

    render(){

        const {classes} = this.props;
        return(
            <div>
                <ChatListComponent
                history={this.props.history}
                newchatBtnFn={this.newChatBtnClicked}
                selectChatFn={this.selectChat}
                chats={this.state.chats}
                userEmail={this.state.email}
                selectedChatIndex={this.state.selectedChat}></ChatListComponent>
                {
                    this.state.newChatFormVisible ?
                    null:
                    <ChatViewComponent
                        user={this.state.email}
                        chat={this.state.chats[this.state.selectedChat]}
                        ></ChatViewComponent>
                }
                {
                    this.state.selectedChat !== null && !this.state.newChatFormVisible ?
                    <ChatTextBoxComponent messageReadFn={this.messageRead}submitMessageFn={this.submitMessage} ></ChatTextBoxComponent> :
                    null
                }
                <Button className={classes.signOutBtn} onClick={this.signOut}> Sign Out</Button>

            </div>
        );
    }

    //sign out function for button
    signOut = () => firebase.auth().signOut();

    //props for chatlist
    selectChat = async (chatIndex) => {
        await this.setState({selectedChat: chatIndex});
        this.messageRead();
    }
    //props fo chatlist
    newChatBtnClicked = () => this.setState({newChatFormVisible: true, selectedChat: null})


    //
    submitMessage =(msg) => {
        const docKey = this.buildDocKey(this.state.chats[this.state.selectedChat].users.filter(_usr => _usr !== this.state.email)[0]);
        firebase
            .firestore()
            .collection('chats')
            .doc(docKey)
            .update({
                messages: firebase.firestore.FieldValue.arrayUnion({
                    sender: this.state.email,
                    message: msg,
                    timestamp: Date.now()
                }),
                receiverHasRead: false
            });
    }


    messageRead = () =>{
        const docKey = this.buildDocKey(this.state.chats[this.state.selectedChat].users.filter(_usr => _usr !== this.state.email)[0]);
        if(this.clickedChatWhereNotSender(this.state.selectedChat)){
            firebase
                .firestore()
                .collection('chats')
                .doc(docKey)
                .update({receiverHasRead: true })
        }else{
            console.log('error');
        }
    }

    clickedChatWhereNotSender = (chatIndex) => this.state.chats[chatIndex].messages[this.state.chats[chatIndex].messages.length -1].sender !== this.state.email;

    //function for
    buildDocKey = (friend) => [this.state.email, friend].sort().join(':');


    // firebase
    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(async _usr => {
            if(! _usr)
                this.props.history.push('./login');
            else{
                await firebase
                    .firestore()
                    .collection('chats')
                    .where('users', 'array-contains', _usr.email)
                    .onSnapshot(async res => {
                        const chats = res.docs.map(_doc => _doc.data());
                        await this.setState({
                            email: _usr.email,
                            chats: chats
                        });
                        console.log(this.state);
                    })
            }
        })
    }
}

export default withStyles(styles)(DashboardComponent);
