import React, { Component } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap'
import { withAlert } from 'react-alert'

class Item extends Component {
  constructor(props) {
    super(props)
    this.state = {
      confirmationShown: false,
      editShown: false,
      newEmail: props.email,
      newCode: props.code,
      isEmailValid: false,
      isCodeValid: false,
    }
  }

  toggleDelete = registered => {
    if (registered) {
      this.props.alert.error("Can't delete a Registered User")
      return
    }
    this.setState({
      confirmationShown: !this.state.confirmationShown,
    })
  }

  confirmDeletion = () => {
    return (
      <Modal isOpen={this.state.confirmationShown} toggle={this.toggleDelete}>
        <ModalHeader toggle={this.toggleDelete}>Confirm deletion</ModalHeader>
        <ModalBody>Do you want to delete {this.props.email} ?</ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              this.toggleDelete()
              this.props.onDelete()
            }}
          >
            Yes
          </Button>
          <Button color="secondary" onClick={this.toggleDelete}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    )
  }

  toggleEdit = registered => {
    if (registered) {
      this.props.alert.error("Can't Edit a Registered User's data")
      return
    }
    this.setState({
      editShown: !this.state.editShown,
    })
  }

  isValidInputs = (code, email) => {
    var codeValidation = /^\d{14}$/i.exec(code)
    var emailValidation = /^[\w-_.+]+@\w+\.[a-z]{2,}$/i.exec(email)

    this.setState({
      isCodeValid: codeValidation != null,
      isEmailValid: emailValidation != null,
    })
    return codeValidation && emailValidation
  }

  confirmEdit = () => {
    const {
      editShown,
      newCode,
      newEmail,
      isEmailValid,
      isCodeValid,
    } = this.state
    return (
      <Modal isOpen={editShown} toggle={this.toggleEdit}>
        <ModalHeader toggle={this.toggleEdit}>Edit Doctor Data</ModalHeader>
        <ModalBody>
          <Form style={{ marginBottom: 10, marginTop: 10 }}>
            <FormGroup>
              <Label for="Email">Email</Label>
              <Input
                onChange={data => {
                  this.isValidInputs(newCode, data.target.value)
                  this.setState({ newEmail: data.target.value })
                }}
                value={newEmail}
                valid={isEmailValid}
                type="email"
                name="email"
                id="Email"
              />
            </FormGroup>
            <FormGroup>
              <Label for="code">Code</Label>
              <Input
                onChange={data => {
                  this.isValidInputs(data.target.value, newEmail)
                  this.setState({ newCode: data.target.value })
                }}
                value={newCode}
                valid={isCodeValid}
                type="number"
                name="code"
                id="code"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              this.toggleEdit()
              this.props.onEdit(newCode, newEmail)
            }}
          >
            Update
          </Button>
          <Button color="secondary" onClick={this.toggleEdit}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    )
  }

  render() {
    const { code, email, registered, isLabel } = this.props
    const rightIcon = require('../../img/right.png')
    const wrongIcon = require('../../img/wrong.png')
    return (
      <div className={'itemContainer'}>
        <div style={{ flex: 1 }} className={'itemComponent'}>
          <span style={{ textAlign: 'left' }}>
            {isLabel ? 'Doctor Code' : code}
          </span>
        </div>
        <div style={{ flex: 1 }} className={'itemComponent'}>
          <span style={{ textAlign: 'left' }}>
            {isLabel ? 'Doctor Email' : email}
          </span>
        </div>
        <div style={{ flex: 1 }} className={'itemComponent'}>
          {isLabel ? (
            <span style={{ textAlign: 'center' }}>Registered Doctor</span>
          ) : (
            <img className={'icon'} src={registered ? rightIcon : wrongIcon} />
          )}
        </div>
        <div
          onClick={() => this.toggleEdit(registered)}
          style={{ flex: 1 }}
          className={'itemComponent'}
        >
          {isLabel ? (
            <span style={{ textAlign: 'center' }}>Edit</span>
          ) : (
            <img className={'icon'} src={require('../../img/edit.png')} />
          )}
        </div>
        <div
          onClick={() => this.toggleDelete(registered)}
          style={{ flex: 1 }}
          className={'itemComponent'}
        >
          {isLabel ? (
            <span style={{ textAlign: 'center' }}>Delete</span>
          ) : (
            <img className={'icon'} src={require('../../img/delete.png')} />
          )}
        </div>
        {this.confirmDeletion()}
        {this.confirmEdit()}
      </div>
    )
  }
}

export default withAlert(Item)
