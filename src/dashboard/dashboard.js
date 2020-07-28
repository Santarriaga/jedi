import React from 'react';
import ChatListComponent from '../chatList/chatList';
import ChatViewComponent from '../chatView/chatView';
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
                selectedChatIndex={this.state.selectedChat}>
                </ChatListComponent>
                <Button className={classes.signOutBtn} onClick={this.signOut}> Sign Out</Button>
                {
                    this.state.newChatFormVisible ?
                    null:
                    <ChatViewComponent
                        user={this.state.email}
                        chat={this.state.chats[this.state.selectedChat]}
                        ></ChatViewComponent>
                }
            </div>
        );
    }

    //sign out function for button
    signOut = () => firebase.auth().signOut();

    //props for chatlist
    selectChat = (chatIndex) => {
        this.setState({selectedChat: chatIndex});
    }
    //props fo chatlist
    newChatBtnClicked = () => this.setState({newChatFormVisible: true, selectedChat: null})

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
