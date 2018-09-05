import React, {Component} from 'react';

class SendMessageForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: '',
        }
    }

    onChange = (e)=>{
        this.setState({
            text: e.target.value,
        });
        this.props.onChange();
    } 

    onSubmit = (e)=>{
        e.preventDefault();
        this.props.onSubmit(this.state.text);
    }

    render(){
        const {onChange, onSubmit} = this;

        return <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="하고싶은말이 뭐니?" onChange={onChange} />
                <input type="submit"/>
            </form>
        </div>
    };
}

export default SendMessageForm;