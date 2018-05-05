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

export default class Item extends Component {
  constructor(props) {
    super(props)
    this.state = {
      confirmationShown: false,
      editShown: false,
      name: props.name,
      description: props.description,
      isEmailValid: false,
      isCodeValid: false,
      year: props.year,
    }
  }

  toggleDelete = () => {
    this.setState({
      confirmationShown: !this.state.confirmationShown,
    })
  }

  confirmDeletion = () => {
    return (
      <Modal isOpen={this.state.confirmationShown} toggle={this.toggleDelete}>
        <ModalHeader toggle={this.toggleDelete}>Confirm deletion</ModalHeader>
        <ModalBody>Do you want to delete {this.props.name} ?</ModalBody>
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

  toggleEdit = () => {
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
      description,
      name,
      isNameValid,
      isDescriptionValid,
      editShown,
      year,
    } = this.state
    return (
      <Modal isOpen={editShown} toggle={this.toggleEdit}>
        <ModalHeader toggle={this.toggleEdit}>Edit Student Data</ModalHeader>
        <ModalBody>
          <Form style={{ marginBottom: 10, marginTop: 10 }}>
            <FormGroup>
              <Label for="Name">Name</Label>
              <Input
                onChange={data => {
                  this.isValidInputs(data.target.value, description)
                  this.setState({ name: data.target.value })
                }}
                value={name}
                valid={isNameValid}
                type="text"
                name="name"
                id="Name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="Description">Description</Label>
              <Input
                onChange={data => {
                  this.isValidInputs(name, data.target.value)
                  this.setState({ description: data.target.value })
                }}
                value={description}
                valid={isDescriptionValid}
                type="text"
                name="description"
                id="Description"
              />
            </FormGroup>
            <FormGroup>
              <Label for="year">Year</Label>
              <Input
                type="select"
                name="year"
                id="year"
                onChange={data => {
                  this.setState({ year: data.target.value })
                }}
                value={year}
              >
                <option value="0">Year 1</option>
                <option value="1">Year 2</option>
                <option value="2">Year 3</option>
                <option value="3">Year 4</option>
              </Input>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              this.toggleEdit()
              this.props.onEdit(name, year, description)
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
    const { name, description, year, isLabel } = this.props
    return (
      <div className={'itemContainer'}>
        <div style={{ flex: 1 }} className={'itemComponent'}>
          <span style={{ textAlign: 'left' }}>
            {isLabel ? 'Course Name' : name}
          </span>
        </div>
        <div style={{ flex: 1 }} className={'itemComponent'}>
          <span style={{ textAlign: 'left' }}>
            {isLabel ? 'Course description' : description}
          </span>
        </div>
        <div style={{ flex: 1 }} className={'itemComponent'}>
          <span style={{ textAlign: 'center' }}>
            {isLabel ? 'Course Year' : `Year ${eval(year) + 1}`}
          </span>
        </div>
        <div
          onClick={this.toggleEdit}
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
          onClick={this.toggleDelete}
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
