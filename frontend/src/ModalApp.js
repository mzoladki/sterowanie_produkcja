import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import Modal from 'react-modal';

const ModalApp = ({props}) => {

    openAddTaskModal = (e) => {
        this.setState({isAddTaskModalOpened: true})
    }
    
    closeAddTaskModel = (e) => {
        this.setState({isAddTaskModalOpened: false})
    }

    

     (
        <div>
            asdasd{props.perform_time}
            <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            // style={customStyles}
            contentLabel="Example Modal"
            >

            <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
            <button onClick={this.closeModal}>close</button>
            <div>I am a modal</div>
            <form>
                <input />
                <button>tab navigation</button>
                <button>stays</button>
                <button>inside</button>
                <button>the modal</button>
            </form>
            </Modal>
        </div>
    )
}

export default ModalApp;