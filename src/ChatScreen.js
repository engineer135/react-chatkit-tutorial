import React, {Component} from 'react';
import Chatkit from '@pusher/chatkit-server';

class ChatScreen extends Component {
    componentDidMount(){
        // 컴포넌트가 화면에 나타나게 됐을때 호출
        // 주로 d3처럼 dom을 사용해야하는 외부 라이브러리 연동을 하거나
        // axios, fetch 등을 통해 ajax 요청을 하거나
        // dom의 속성을 읽거나 직접 변경하는 작업 진행
        const chatManager = new Chatkit.chatManager({
            instanceLocator: 'v1:us1:57303ea2-09c5-4bef-8221-12d7b37b21e7',
            userId: this.props.currentUsername,
            tokenProvider: new Chatkit.TokenProvider({
                url: 'http://localhost:3001/authenticate'
            })
        });

        chatManager
            .connect()
            .then(currentUser => console.log('currentUser', currentUser))
            .catch(error => console.error(error));
    }

    render(){
        return(
            <div>
                <h1>Chat</h1>
                <p>Hello, {this.props.currentUsername}</p>
            </div>
        )
    }
}

export default ChatScreen;