import React, {Component} from 'react';
import Dinosaur from '../../Components/dinosaurs/Dinosaur.js';
import DinosaurDetails from '../../Components/dinosaurs/DinosaurDetails.js';

import Request from '../../helpers/request.js';

class DinosaurSingleContainer extends Component {
  constructor(props){
    super(props);
    this.state = {dinosaur: null}
    this.handleDelete = this.handleDelete.bind(this)
    this.handleEdit= this.handleEdit.bind(this)
  }

  componentDidMount(){
    let request = new Request()
    const url = '/dinosaurs/' + this.props.id + '?projection=embedPaddock';
    request.get(url).then((data) => {
      this.setState({dinosaur: data})
    })
  }

  handleDelete(id){
    const request = new Request();
    const url = '/dinosaurs/' + id;
    request.delete(url).then(() => {
      window.location = window.location.href
    })
  }

  handleEdit(id){
    window.location = '/dinosaurs/edit/' + id
  }

  handleFeed(dinosaur,id){
    const request = new Request();
    request.patch('/dinosaurs/' + id, dinosaur).then(() => {
      window.location = window.location.href
    })
  }


  render(){
    if(!this.state.dinosaur){
      return null;
    }

    return (
      <>
       <Dinosaur paddock = {this.state.dinosaur._embedded.paddock} dinosaur = {this.state.dinosaur} handleDelete = {this.handleDelete} handleEdit={this.handleEdit} handleFeed = {this.handleFeed}/>

       <DinosaurDetails dinosaur = {this.state.dinosaur} handleDelete = {this.handleDelete} handleEdit={this.handleEdit} paddocks = {this.state.dinosaur._embedded.paddock} handleFeed = {this.handleFeed}/>
     </>
    )

  }
}

export default DinosaurSingleContainer;
