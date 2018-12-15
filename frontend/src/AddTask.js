import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import Modal from 'react-modal';


class AddTask extends Component {

    constructor(props){
        super(props)
        this.state = {
            isAddTaskModalOpened: false,
            device: '',
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


    performTimeHolder = (e) => {
    this.setState({performTime: e.target.value})

    }

    deliveryTimeHolder = (e) => {
    this.setState({deliveryTime: e.target.value})

    }

    submitHolder = (e) => {
        const task = {
          device: 1,
          perform_time: this.state.performTime,
          delivery_time: this.state.deliveryTime
        }
    
        axios.post('http://0.0.0.0:8000/api/tasks/', {task});
    
        this.setState({
          device: '',
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