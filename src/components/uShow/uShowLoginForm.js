import React, { Component } from 'react';
import {
  Input,
  Form,
  Button
} from 'semantic-ui-react';

class UShowInputForm extends Component{

  constructor(props){
    super(props);
    this.submitHandler = this.submitHandler.bind(this);
  }
  componentWillMount(){
    this.state = {
      email: '',
      password: ''

    }
  }
  submitHandler(){
    console.log(this.state.email, this.state.password, 'submit...');
    this.props.loginHandler(this.state.email, this.state.password);
  }
  render(){
    return(
      <Form onSubmit={this.submitHandler}>
      <Form.Field>
        <label>Email</label>
        <Input  value={this.state.email}
                onChange={
                  (event, data)=>{
                    console.log(data.value);
                    this.setState({email: data.value});
                  }
                }
        />
      </Form.Field>
      <Form.Field>
        <label>Enter Password</label>
        <Input type='password' value={this.state.password}
               onChange={
                 (event, data)=>{
                   console.log(data.value);
                   this.setState({password: data.value});
                 }
               }
         />
      </Form.Field>
      <Button type='submit' >Submit</Button>
      </Form>
    );
  }
}
export { UShowInputForm };
