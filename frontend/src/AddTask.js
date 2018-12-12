import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import Modal from 'react-modal';


class AddTask extends Component {

    constructor(props){
        super(props)
        console.log(props.props.content)
        this.state = {
            isAddTaskModalOpened: false,
            device: '',
            preparingTime: '',
            performTime: '',
            deliveryTime: '',
        }
        this.customStyles = props.props
    }

    openAddTaskModal = (e) => {
        this.setState({isAddTaskModalOpened: true})
    }
    
    closeAddTaskModel = (e) => {
        this.setState({isAddTaskModalOpened: false})
    }


    deviceHolder = (e) => {
        this.setState({device: e.target.value})
    }
    
    preparingTimeHolder = (e) => {
    this.setState({preparingTime: e.target.value})
    }

    performTimeHolder = (e) => {
    this.setState({performTime: e.target.value})

    }

    deliveryTimeHolder = (e) => {
    this.setState({deliveryTime: e.target.value})

    }

    submitHolder = (e) => {
        const task = {
          device: this.state.device,
          preparing_time: this.state.preparingTime,
          perform_time: this.state.performTime,
          delivery_time: this.state.deliveryTime
        }
    
        axios.post('http://0.0.0.0:8000/api/tasks/', {task})
          .then(res => {
            console.log(res);
            console.log(res.data)
          })
    
        this.setState({
          device: '',
          preparingTime: '',
          performTime: '',
          deliveryTime: ''
        })
    }
    render() {
        return (
          <div>
            <div className='row'>
              <button onClick={this.openAddTaskModal} >Add task</button>
            </div>
            <Modal
              isOpen={this.state.isAddTaskModalOpened}
              onRequestClose={this.closeModal}
              style={this.customStyles}
            >
              <form onSubmit={this.submitHolder}>
                <div className='row'>
                  <input type='text' onChange={this.deviceHolder} placeholder='device'/>
                </div>
                <div className='row'>
                  <input type='text' onChange={this.preparingTimeHolder} placeholder='preparing time'/>
                </div>
                <div className='row'>
                  <input type='text' onChange={this.performTimeHolder} placeholder='perform time'/>
                </div>
                <div className='row'>
                  <input type='text' onChange={this.deliveryTimeHolder} placeholder='delivery time'/>
                </div>
                <div className='row'>
                  <button>Add task</button>
                  <button onClick={this.closeAddTaskModel}>Close</button>            
                </div>       
              </form>  
            </Modal>
          </div>
        )
    }
}

export default AddTask