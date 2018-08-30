import React, {Component} from 'react';

class UsernameForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
        }

        // onChange(e){...} 이런식으로 function 작성하면 아래처럼 bind를 해줘야 한다. 
        // 하지만 화살표 함수를 사용하면 onChange = (e) => {} bind가 필요 없다.
        // this가 화살표 함수에서는 알아서 클래스로 들어가지만, 그냥 함수에서는 함수를 호출한 놈이 this가 돼서 그런가..?
        // https://github.com/FEDevelopers/tech.description/wiki/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%97%90%EC%84%9C-%EC%82%AC%EC%9A%A9%EB%90%98%EB%8A%94-this%EC%97%90-%EB%8C%80%ED%95%9C-%EC%84%A4%EB%AA%85-2#71-%ED%99%94%EC%82%B4%ED%91%9C-%ED%95%A8%EC%88%98%EC%97%90%EC%84%9C%EC%9D%98-this
        //this.onChange = this.onChange.bind(this);
        //this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (e)=>{
        this.setState({
            username: e.target.value,
        });
    } 

    onSubmit = (e)=>{
        e.preventDefault();
        this.props.onSubmit(this.state.username);
    }

    render(){
        const {onChange, onSubmit} = this;

        return <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="이름이 뭐니?" onChange={onChange} />
                <input type="submit"/>
            </form>
        </div>
    };
}

export default UsernameForm;