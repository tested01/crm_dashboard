import React, { Component } from 'react';
import { Input, Menu, Segment } from 'semantic-ui-react'

class UShowHeader extends Component{
  constructor(props){
    super(props);
    this.renderSearch = this.renderSearch.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.state = { activeItem: 'home' }
  }


  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  renderSearch(){
    if(this.state.activeItem === '好文'){
      return(<Input icon='search' placeholder='Search...' style={{width:'100%'}} />);
  }else{
    return(
      <div />
    );
  }

  }

  render() {
    const { activeItem } = this.state



    return (
      <div>
        <Menu pointing>
          <Menu.Item name='指標' active={activeItem === 'home'} onClick={this.handleItemClick} />
          <Menu.Item name='通知' active={activeItem === 'messages'} onClick={this.handleItemClick} />
          <Menu.Item name='好文' active={activeItem === 'friends'} onClick={this.handleItemClick} />
          <Menu.Menu position='right'>
            <Menu.Item>
              <div> avatar </div>
            </Menu.Item>
          </Menu.Menu>
        </Menu>

        <Segment>
         {this.renderSearch()}
          <div>test</div>
        </Segment>
      </div>
    )
  }
}

export default UShowHeader ;
