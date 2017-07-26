import React, { Component } from 'react';
import { Button,
  Icon,
  Image,
  Item,
  Header,
  Form,
  Input,
  Popup,
  Modal,
  Label } from 'semantic-ui-react';
  import { connect } from 'react-redux';
  import { bindActionCreators } from 'redux';
import ImageGallery from 'react-image-gallery';
import { CONFIG } from '../../config';
import { UShowInputForm } from './uShowLoginForm';


//import Slider from 'react-slick';
/*
<Slider {...settings}>
  <div style={{height: 500, width: 800, backgroundColor: 'gray'}}>
    <img src='http://localhost:3000/uploads/591bbf993958b6032473dafd/593e869b3afd17815007144b/0.jpg' max-width='700'/>
  </div>
  <div style={{height: 500, width: 800, backgroundColor: 'gray'}}>
    <img src='http://placekitten.com/g/400/200' />
  </div>
  <div style={{height: 500, width: 800, backgroundColor: 'gray'}}>
    <img src='http://placekitten.com/g/400/200' />
  </div>
</Slider>
*/
const images = [
      {
        original: 'http://lorempixel.com/1000/600/nature/1/',
        thumbnail: 'http://lorempixel.com/250/150/nature/1/',
      },
      {
        original: 'http://lorempixel.com/1000/600/nature/2/',
        thumbnail: 'http://lorempixel.com/250/150/nature/2/',
        sizes: '20vw'
      },
      {
        original: 'http://lorempixel.com/1000/600/nature/3/',
        thumbnail: 'http://lorempixel.com/250/150/nature/3/'
      },
      {
        original: 'http://localhost:3000/uploads/591b0d753958b6032473dafb/593f74a53437ba9979bab452/0.jpg',
        thumbnail: 'http://localhost:3000/uploads/591b0d753958b6032473dafb/593f74a53437ba9979bab452/0.jpg'
      },
      {
        original: 'http://localhost:3000/uploads/591bbf993958b6032473dafd/593e869b3afd17815007144b/0.jpg',
        thumbnail: 'http://localhost:3000/uploads/591bbf993958b6032473dafd/593e869b3afd17815007144b/0.jpg'
      }
    ]

class SearchResults extends Component{

  constructor(props){
    super(props);
    this.formatName = this.formatName.bind(this);
    this.renderPost = this.renderPost.bind(this);
    this.viewPost = this.viewPost.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.show = this.show.bind(this);
    this.close = this.close.bind(this);
    this.handleStarClick = this.handleStarClick.bind(this);
    this.formatAsImgArr = this.formatAsImgArr.bind(this);
    this.uStar = this.uStar.bind(this);

    this.state = {
      width: '0',
      height: '0',

      detail: false,
      currentPost: {
        detail: {
          title: '',
          resources: []
        }
      }
     };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentWillMount(){
    this.state = { posts: [], open: false,
      star: false,
      starClass: "fa fa-star-o",
      starTip: "點星星設此篇聯合報之星",
      currentPost: {
        detail: {
          title: '',
          resources: []
        }
      },
      currentPostImgs: []
    };
    this.fetchAllResults();
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
  window.removeEventListener('resize', this.updateWindowDimensions);
}

  handleImageLoad(event) {
    console.log('Image loaded ', event.target)
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }


  show(dimmer){
    this.setState({ dimmer, open: true });
  }
  close(){
    this.setState({ open: false });
  }

  formatAsImgArr(post){
    /*
    {
      original: 'http://lorempixel.com/1000/600/nature/3/',
      thumbnail: 'http://lorempixel.com/250/150/nature/3/'
    }
    */
    let resources = post.detail.resources;
    let images = resources.map((resource)=>{
      return(
        {
          original: CONFIG.API_BASE_URL + resource.uri,
          thumbnail: CONFIG.API_BASE_URL + resource.uri
        }
      );
    });

    this.setState({currentPostImgs: images});
  }

  fetchAllResults(){


    fetch(CONFIG.API_BASE_URL.concat('/shows'), {
      method: 'GET',
      headers: {
      }
     })
      .then((response) => {
        if (response.status === 200) {

          response.json().then(json => {
                                //this.setState(Object.assign({}, this.state, json));
                                this.setState(Object.assign({}, this.state, {'posts': json.posts}));

                              });
        } else {
          console.log(response.status);
        }
      })
      .catch((error) => {
        console.log(error);
      });


  }
  clickHandler(post){
    this.setState({detail: true});
    console.log('post: ', post);
    this.setState({currentPost: post}, this.viewPost);
  }

  viewPost(){
    console.log(this.state.currentPost, 'this.currentPost');
    this.show('blurring');
  }

  formatName(man){
    return man.lastName + man.firstName;
  }

  renderPost(post, index){

    return(

          <Item key={index}>
            <Item.Image src={CONFIG.API_BASE_URL + post.detail.resources[0].uri} />
            <Item.Content>
              <Item.Header as='a'>{post.detail.title}</Item.Header>
              <Item.Meta>
                <span className='cinema'>{
                  '指導老師: ' + this.formatName(post.advisor) + '  ' +
                  '作者: ' + this.formatName(post.author)
              }</span>
              </Item.Meta>
              <Item.Description></Item.Description>
              <Item.Extra>
                <Button primary floated='right' onClick={()=>{
                  this.clickHandler(post);
                  console.log(this.state.currentPost.detail.resources);
                  this.formatAsImgArr(post);

                }}>
                  閱讀內文
                  <Icon name='right chevron' />
                </Button>
                <Label>IMAX</Label>
                <Label icon='globe' content='Additional Languages' />
              </Item.Extra>
            </Item.Content>
          </Item>




    );
  }

  renderModal(){

    const { open, dimmer } = this.state;
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    if(this.state.currentPost){
      return (
        <Modal dimmer={dimmer}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 'auto'
      }}
        size='large' open={open} onClose={this.close}>

          <Modal.Content image>

            <Modal.Description>
              <div style={{
                height: 600,
                width: 1000,
                padding: '40px',
                color: '#333',
                backgroundColor: '#419be0'
              }}>

              </div>

              <Header>{ this.state.currentPost.detail.title }</Header>
              <p>We found the following gravatar image associated with your e-mail address.</p>

            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={this.close}>
              Nope
            </Button>
            <Button positive icon='checkmark' labelPosition='right' content="Yep, that's me" onClick={this.close} />
          </Modal.Actions>
        </Modal>
      );
    }else{
      return(<div />);
    }

  }

  uStar(postId, operation){
    let body = {
      post: postId,
      operation
    }
    fetch(CONFIG.API_BASE_URL.concat('/stars/'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-auth': this.props.loginState.xAuth
      },
      body: JSON.stringify(body)
     })
      .then((response) => {
        if (response.status === 200) {

          response.json().then(json => {
                                //this.setState(Object.assign({}, this.state, json));
                                this.setState({'uStar': json.posts});
                              });
        } else {
          console.log(response.status);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleStarClick(e) {
    if(this.state.star){
      this.setState({ star: false });
      this.setState({ starClass: "fa fa-star-o"});
      this.setState({ starTip: "點星星設此篇聯合報之星"});
      /*
      {
      	"post": "596e04b113204b32af4358da",
      	"operation": "add"
      }
      */
      this.uStar(this.state.currentPost._id, 'delete');
    }else{
      this.setState({ star: true });
      this.setState({ starClass: "fa fa-star"});
      this.setState({ starTip: "點星星取消此篇聯合報之星"});
      this.uStar(this.state.currentPost._id, 'add');
    }

  }

  render(){
    if(this.state.detail){
      return(
        <div>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 10
        }}>
        <Popup
          trigger={
            <i className={this.state.starClass}
               style={{fontSize: 40, color: '#ff9900', margin: 0}}
               onClick={this.handleStarClick}
               ></i>
          }
          content={this.state.starTip}
          on='hover'
          position='bottom right'
        />
        {'標題: ' + this.state.currentPost.detail.title}

        <Popup
          trigger={
            <Button primary icon="remove" circular onClick={()=>
              {
                console.log('exit detail...2');
                this.setState({detail: false});
                console.log('exit detail...');
              }
            }>
            </Button>
          }
          content='點此離開評分頁面, 回到文章列表'
          on='hover'
          position='bottom right'
        />



        </div>
          <div>
          <ImageGallery
            items={this.state.currentPostImgs}
            slideInterval={2000}
            onImageLoad={this.handleImageLoad}/>
          </div>
        </div>
      );
    }else{
      return(
        <div style={{marginTop: 30}}>

          <Item.Group divided>
            {this.state.posts.map((post, index) => this.renderPost(post, index))}
          </Item.Group>

        </div>
      );
    }


  }

}

function mapStateToProps(state) {
  // Whever is returned will show up as props
  // inside of LoginForm
  return {
    loginState: state.loginState
  };
}

// Promote BoxList from a component to a container - it
// needs to know about this new dispatch method, selectedNumBox & answerNum.
// Make it available as a prop.
//export default connect(mapStateToProps, mapDispatchToProps)(UShowHeader);
export default connect(mapStateToProps)(SearchResults);
