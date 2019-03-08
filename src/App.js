import React, { Component } from 'react';
import {Table,Button,Modal, ModalHeader, ModalBody,ModalFooter,FormGroup,Label,Input} from 'reactstrap';
import Axios from 'axios';

class App extends Component {

  state = {
    hashtags :[],
    newHashtagData : {
      hashtagName: ''

    },
    editHashtagData : {
      hashtagId: '',
      hashtagName: ''

    },
    newHashtagModal :false,
    editHashtagModal :false
  }

  componentDidMount(){
    Axios.get('https://localhost:44307/api/Hashtag').then((response) => {
    this.setState({
      hashtags: response.data 
    })
    });
  }

  toggleNewHashtagModal(){
    this.setState({
      newHashtagModal :! this.state.newHashtagModal
    })
  }
  toggleEditHashtagModal(){
    this.setState({
      editHashtagModal :! this.state.editHashtagModal
    })
  }


  addHashtag(){
    Axios.post('https://localhost:44307/api/hashtag',this.state.newHashtagData).then((response) => {
      let{hashtags} = this.state;

      hashtags.push(response.data);

      this.setState({hashtags, newHashtagModal:false, newHashtagData : {
        hashtagName: ''
  
      }});
      //console.log(response.data);
    });
  }

updateHashtag(){

  Axios.put('https://localhost:44307/api/hashtag',this.state.editHashtagData).then((response)=>{
    //console.log("güncelleme yapıldı.");

    this._refreshHashtags();

    this.setState({ editHashtagModal:false, editHashtagData : {
      hashtagId: '',
      hashtagName: ''
    }});

  });

}

 editHastag(hashtagId,hashtagName){
   this.setState({
     editHashtagData: {hashtagId,hashtagName},editHashtagModal: ! this.state.editHashtagModal
   });

 }
 _refreshHashtags(){

  Axios.get('https://localhost:44307/api/Hashtag').then((response) => {
    this.setState({
      hashtags: response.data 
    })
    });
 }
 deleteHashtag(hashtagId){

  
  Axios.delete('https://localhost:44307/api/Hashtag/' + hashtagId).then((response) => {
    this._refreshHashtags();
  });
 }




  render() {
    let hashtags = this.state.hashtags.map((hashtag) => {
      return (
        <tr key={hashtag.hashtagId}>
        <td>{hashtag.hashtagId}</td>
        <td>{hashtag.hashtagName}</td>
        <td>
          <Button color="success" size="sm" className="mr-2" onClick={this.editHastag.bind(this,hashtag.hashtagId,hashtag.hashtagName)}>Edit</Button>
          <Button color="danger" size="sm" onClick={this.deleteHashtag.bind(this,hashtag.hashtagId)}>Delete</Button>
        </td>            
      </tr>
      )
    });
    return (
      <div className="App container">
      <h1>Hashtags</h1>
      <Button className="my-3" color="primary" onClick={this.toggleNewHashtagModal.bind(this)}>Add Hashtag</Button>
        <Modal isOpen={this.state.newHashtagModal} toggle={this.toggleNewHashtagModal.bind(this)}>
          <ModalHeader toggle={this.toggleNewHashtagModal.bind(this)}>Add a New Hashtag</ModalHeader>
          <ModalBody>
            <FormGroup>
             <Label for="HashtagName">Hashtag Name</Label>
             <Input id="HashtagName" value={this.state.newHashtagData.hashtagName} onChange={(e)=> {
               let {newHashtagData} = this.state;
               newHashtagData.hashtagName = e.target.value;
               this.setState({newHashtagData})
             }}/>
           </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addHashtag.bind(this)}>Add</Button>{' '}
            <Button color="secondary" onClick={this.toggleNewHashtagModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.editHashtagModal} toggle={this.toggleEditHashtagModal.bind(this)}>
          <ModalHeader toggle={this.toggleEditHashtagModal.bind(this)}>Edit a Hashtag</ModalHeader>
          <ModalBody>
            <FormGroup>
             <Label for="HashtagName">Hashtag Name</Label>
             <Input id="HashtagName" value={this.state.editHashtagData.hashtagName} onChange={(e)=> {
               let {editHashtagData} = this.state;
               editHashtagData.hashtagName = e.target.value;
               this.setState({editHashtagData})
             }}/>
           </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateHashtag.bind(this)}>Update Hashtag</Button>
            <Button color="secondary" onClick={this.toggleEditHashtagModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Hashtag</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
         {hashtags}
        </tbody>

      </Table>
        
      </div>
    );
  }
}

export default App;
