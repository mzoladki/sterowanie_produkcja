import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import Modal from 'react-modal';
import AddTask from './AddTask';


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class App extends Component {

  
  constructor(props){
    super(props)
    this.state = {
      data: [],
      task: null,
      modalIsOpen: false,
      deletingMode: false
    }
    
    axios.get('http://0.0.0.0:8000/api/tasks/').then(res => {
      console.log(res.data)
      if (res.data.length > 0){
        let numberOfDevices = res.data[res.data.length-1].device
        let table = []
        for(let i=0;i<numberOfDevices;i++){
          table.push([])
        }
        res.data.forEach(element => {
          table[element.device-1].push(element)
        });
  
        this.setState({data: table});
      }
    });
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  closeModal = () => {
    this.setState({
      modalIsOpen: false
    })
  
  }
  openModal = (element) => {
    this.setState({
      task: element.task,
      modalIsOpen: true,
    })

  }

  taskDeliveryTimeHandler = (e) => {
    let task = this.state.task
    task.delivery_time = e.target.value
    this.setState({task: task})
  }
  taskPerformTimeHandler = (e) => {
    let task = this.state.task
    task.perform_time = e.target.value
    this.setState({task: task})
  }


  submitHandler = (e) => {
    if (this.state.deletingMode == true){
      let url = 'http://0.0.0.0:8000/api/task-detail/?id=' + this.state.task.id
      axios.delete(url).then( (res) => {
        console.log(res)
      });
    }
    else{
      console.log(this.state.task)
      axios.put('http://0.0.0.0:8000/api/task-detail/', {
        id: this.state.task.id,
        device: 1,
        perform_time: this.state.task.perform_time,
        delivery_time: this.state.task.delivery_time
      }).then( (res) => {
        console.log(res)
      });
    }
  }
  activateDeleteMode = () => { this.setState({deletingMode: true}) }
  modalContent = () => {
    let task = this.state.task
    if (this.state.task != null){
      return(
        <div>
          <form onSubmit={this.submitHandler}>
            <h3>Details</h3>
            <p><input onChange={ this.taskPerformTimeHandler } type='text' value={task.perform_time} /></p>
            <p><input onChange={ this.taskDeliveryTimeHandler } type='text' value={task.delivery_time} /></p>
            <button className='btn btn-primary'> Change </button>
            <button onClick={ this.activateDeleteMode } className='btn btn-danger'> Delete </button>
          </form>
        </div>
      )
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> Task scheduling </h1>
          <AddTask props={customStyles} />
          <br>
          </br>
          <br>
          </br>
            {
              this.state.data.map((tasks, index) => {
                return <div className="row Tasks" key={index}> <button>Device: {index + 1}</button>{tasks.map((task, index)=> {
                  let divStyle = {
                    width: task.perform_time * 10,
                  }
                return (
                  <button key={task.id} id={task.id} onClick={() => this.openModal({task})} className="btn btn-success" key={task.id} style={divStyle}>{task.perform_time}</button>
                )
                })} 
                  </div>
              })
            }
          <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          >
            <div>Our modal!</div>
            <div>{this.modalContent()}</div>
            <button onClick={this.closeModal}>close</button>
          </Modal>
        </header>
      </div>
    );
  }
}

export default App;
