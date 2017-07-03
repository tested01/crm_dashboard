import React, { Component } from 'react';
import {
  Input,
  Menu,
  Icon,
  Segment,
  Label,
  Button,
  Modal,
  Table,
  Popup,
  Statistic
} from 'semantic-ui-react';
import ReactQuill from 'react-quill';
//import ReactHtmlParser from 'react-html-parser';
//import theme from 'react-quill/dist/quill.snow.css';

class UShowHeader extends Component{
  componentWillMount(){
    this.state = {
      activeItem: '指標',
      star: false,
      starClass: "fa fa-star-o",
      starTip: "點星星以篩選好文",
      notifText: '',
      openNotifConfirm: false,
      openNotifAdd: false
     }
  }
  constructor(props){
    super(props);
    this.renderSearch = this.renderSearch.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleStarClick = this.handleStarClick.bind(this);
    this.handleQuillChange = this.handleQuillChange.bind(this);
    this.handleQuillChange = this.handleQuillChange.bind(this);
    this.addNewNotifArea = this.addNewNotifArea.bind(this);
    this.handleAddNotifClick = this.handleAddNotifClick.bind(this);


  }



  addNewNotifArea(){
    if(this.state.openNotifAdd){
      return(
        <div>
        <div style={{margin: 5}} onClick={this.handleAddNotifClick}>
        <Button circular icon='remove' color='google plus'/>
        <Label pointing='left'>點擊以 取消 新增 uShow 課務通知</Label>
        </div>
        <Segment>
          <Label>
           標題
          </Label>
          <Input placeholder='標題...'
            style={{width: '99%', margin: 5}}
           />
           <Label>
            內容
           </Label>
           <ReactQuill value={this.state.notifText}
                      style={{margin: 5}}
                      onChange={this.handleQuillChange} />

          <div style={{width: 10, height: 10, marginTop: 10}}></div>
          <div style={{margin: 5}}>
            <Button primary >發布</Button>
            <Button secondary>取消</Button>
          </div>
        </Segment>
        </div>
      );
    }else{
      return(
        <div>
        <div style={{margin: 5}} onClick={this.handleAddNotifClick}>

          <Button circular icon='add' color='twitter'/>
          <Label pointing='left'>點擊以新增 uShow 課務通知</Label>
        </div>
        </div>
      );
    }

  }

  handleAddNotifClick(){
    if(this.state.openNotifAdd){
      this.setState({openNotifAdd: false});
    }else{
      this.setState({openNotifAdd: true});
    }
  }

  handleQuillChange(value){
    this.setState({ notifText: value })
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  handleStarClick(e) {
    if(this.state.star){
      this.setState({ star: false });
      this.setState({ starClass: "fa fa-star-o"});
      this.setState({ starTip: "點星星以篩選好文"});
    }else{
      this.setState({ star: true });
      this.setState({ starClass: "fa fa-star"});
      this.setState({ starTip: "點星星取消篩選好文"});
    }

  }

  renderSearch(){
    if(this.state.activeItem === '好文'){
      return(
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <Popup
          trigger={
            <Input
             icon={
               <Icon
                 name='search' inverted circular link
                 onClick={()=>console.log('se')}
               />}
             placeholder='搜尋文章標題...'
             style={{flex: 1, margin: 5}}
             onChange={(e,d)=>console.log(d.value)}
             />
          }
          header='搜尋 uShow 文章標題'
          content={
            <div>
              <br/>
              <span> 輸入文字後, 點擊 </span>
              <Icon name='search' style={{fontSize: 10}} inverted circular link/>
              <span> 以進行搜尋 </span>
            </div>
           }
          on='focus'
          position='bottom right'
        />

          <Popup
            trigger={
              <i className={this.state.starClass}
                 style={{fontSize: 30, color: '#b3d9ff', margin: 5}}
                 onClick={this.handleStarClick}
                 ></i>
            }
            content={this.state.starTip}
            on='hover'
            position='bottom right'
          />


        </div>
      );
  }else{
    return(
      <div />
    );
  }

  }

  renderContent(){
    if(this.state.activeItem === '通知'){
      return(
        <div>

          {this.addNewNotifArea()}

          <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>標題</Table.HeaderCell>
          <Table.HeaderCell>內文...</Table.HeaderCell>
          <Table.HeaderCell>時間</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Label ribbon>First</Label>
          </Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
        </Table.Row>
      </Table.Body>

      <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan='3'>
          <Menu floated='right' pagination>
            <Menu.Item as='a' icon>
              <Icon name='left chevron' />
            </Menu.Item>
            <Menu.Item as='a'>1</Menu.Item>
            <Menu.Item as='a'>2</Menu.Item>
            <Menu.Item as='a'>3</Menu.Item>
            <Menu.Item as='a'>4</Menu.Item>
            <Menu.Item as='a' icon>
              <Icon name='right chevron' />
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
      </Table.Footer>
    </Table>

        </div>
      );
    }

    if(this.state.activeItem === '指標'){
      return(
        <div>

        <Statistic>
          <Statistic.Value>5,550</Statistic.Value>
          <Statistic.Label>Downloads</Statistic.Label>
        </Statistic>

        </div>
      );
    }

    if(this.state.activeItem === '好文'){
      return(
          <div> good </div>
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

        <Segment style={{flex: 1}}>
         { this.renderSearch() }
          <div>
            { this.renderContent() }
          </div>
        </Segment>
      </div>
    )
  }
}

export default UShowHeader ;
