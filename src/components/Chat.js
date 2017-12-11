import React from 'react';
import Backend from '../Backend';

import {
    GiftedChat
}from 'react-native-gifted-chat';

class Chat extends React.Component {
    state = {
        messages: []
    };
    componentWillMount() {
        
    }
    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={(messages) => {
                    Backend.sendMessage(messages);
                }}
                user={{
                    _id: Backend.getUid(),
                    name: this.props.user
                }} />
        );
    }

    componentDidMount() {
        Backend.loadMessages((message) => {
            this.setState((previousState) => {
                return {
                    messages: GiftedChat.append(previousState.messages, message),
                };
            });
        });
    }

    componentWillUnmount() {
        Backend.closeChat();
    }
}

Chat.defaultProps = {
    user: 'Tuan'
};

export default Chat;