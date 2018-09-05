import React, {Component} from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit';
import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import TypingIndicator from './components/TypingIndicator';

class ChatScreen extends Component {
    constructor(){
        super();
        this.state = {
            messages: [],
            currentRoom: {},
            currentUser: {},
            usersWhoAreTyping: [],
        }
    }

    componentDidMount(){
        // 컴포넌트가 화면에 나타나게 됐을때 호출
        // 주로 d3처럼 dom을 사용해야하는 외부 라이브러리 연동을 하거나
        // axios, fetch 등을 통해 ajax 요청을 하거나
        // dom의 속성을 읽거나 직접 변경하는 작업 진행
        /* const chatManager = new Chatkit.chatManager({
            instanceLocator: 'v1:us1:57303ea2-09c5-4bef-8221-12d7b37b21e7',
            userId: this.props.currentUsername,
            tokenProvider: new Chatkit.TokenProvider({
                url: 'http://localhost:3001/authenticate'
            })
        }); 
        이렇게 했더니 안돼서, 아래처럼 수정함. 
        yarn add @pusher/chatkit
        import { ChatManager, TokenProvider } from '@pusher/chatkit'
        그리고 아래처럼.. 영상을 잘못 본건지 내가 잘못 본건지.. chatkit-server가 아니라 chatkit을 임포트해와야 하더라 흠...
        
        */

        const tokenProvider = new TokenProvider({
            url: `https://us1.pusherplatform.io/services/chatkit_token_provider/v1/57303ea2-09c5-4bef-8221-12d7b37b21e7/token`
        })

        const chatManager = new ChatManager({
            instanceLocator: 'v1:us1:57303ea2-09c5-4bef-8221-12d7b37b21e7',
            userId: this.props.currentUsername,
            tokenProvider: tokenProvider
        });

        chatManager
            .connect()
            .then(currentUser => {
                //console.log(currentUser);
                this.setState({
                    currentUser : currentUser
                });
                return currentUser.subscribeToRoom({
                 roomId:15410205, // 여기 룸아이디는, 챗킷 사이트에서 create new room 한뒤 나온 아이디를 입력해준다..
                 messageLimit:100,
                 hooks: {
                     onNewMessage: message => {
                         //console.log(message);
                         this.setState({
                            messages: [...this.state.messages, message]
                         })
                     },
                     onUserStartedTyping: user => {
                          this.setState({
                            usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name]
                          })
                    },
                     onUserStoppedTyping: user => { 
                        this.setState({
                            usersWhoAreTyping: this.state.usersWhoAreTyping.filter((username)=>
                                username !== user.name
                            )
                        })
                    }
                 }
             })   
            })
            .then(currentRoom => {
                this.setState({
                    currentRoom : currentRoom
                });
            })
            .catch(error => console.error(error));
    }

    // 텍스트 전송
    sendMessage = (text) => {
        this.state.currentUser.sendMessage({
            roomId:this.state.currentRoom.id,
            text
        });
    }

    sendTypingEvent = (e) => {
        console.log('sendTypingEvent...');
        this.state.currentUser
        .isTypingIn({roomId:this.state.currentRoom.id})
        .catch(error => console.error('error',error));
    }

    render(){
        return(
            <div>
                {/* <h1>Chat</h1> */}                
                <MessageList messages={this.state.messages}/>
                <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping}/>
                <SendMessageForm onSubmit={this.sendMessage} onChange={this.sendTypingEvent}/>
            </div>
        )
    }
}

export default ChatScreen;