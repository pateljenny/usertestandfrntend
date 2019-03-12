import React, { Component } from 'react';
import { Button, Modal, Form, FormGroup, Input, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import * as userActions from '../Action/user.action';
import { Users } from './user';

export class UserModal extends Component {
    state = {
        id: 0,
        name: '',
        email: '',
        gender: ''
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSubmit = () => {
        if (this.state.id === 0) {
           
            this.props.addUser({ ...this.state });
        }
        else {
            let user = this.props.user;
            user.name = this.state.name;
            user.email = this.state.email;
            user.gender = this.state.gender;
            this.props.editUser(user.id, user)
        }
        this.setState({ name: '', email: '', gender: '' })
        this.props.toggle();
    }
    componentWillReceiveProps = (props) => {
        if (props.user) {
            this.setState({ id: props.user.id, name: props.user.name, email: props.user.email, gender: props.user.gender })
        }
    }
    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
                <Form style={{ margin: '20px' }}>
                    <FormGroup>
                        <Input type='text' name='name' placeholder='Name' defaultValue={this.state.name} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Input type='email' name='email' placeholder='Email' defaultValue={this.state.email} onChange={this.handleChange} />
                    </FormGroup>
                    Gender:
                    <FormGroup check>
                        <Input type='radio' name='gender' value="Male" onChange={this.handleChange} defaultChecked={this.state.gender === "Male"} />
                        Male
                    </FormGroup>
                    <FormGroup check>
                        <Input type='radio' name='gender' value="Female" onChange={this.handleChange} defaultChecked={this.state.gender === "Female"} />
                        Female
                    </FormGroup>
                    <ModalFooter>
                        <Button className='submit' onClick={this.handleSubmit} style={{backgroundColor:"#006600"}}>{this.props.user ? "Update" : "Submit"}</Button>
                        <Button className='cancel' onClick={this.props.toggle} style={{backgroundColor:"#990000"}}>Cancel</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        )
    }
}

const mapDispatch = (dispatch) => {
    return {
        addUser: bindActionCreators(userActions.addUserAction, dispatch),
        editUser: bindActionCreators(userActions.editUserAction, dispatch)
    }
}

export default connect(null, mapDispatch)(UserModal);