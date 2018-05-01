import React, { Component } from 'react'
import { database } from '../../firebase'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  ListGroup,
  ListGroupItem,
} from 'reactstrap'
import Item from './item'

export default class Students extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      code: '',
      isCodeValid: false,
      email: '',
      isEmailValid: false,
    }
  }

  componentDidMount() {
    database.ref('codes').on('value', data => {
      var list = data.val()
      if (!list) return
      list = Object.entries(list).map(item => {
        return {
          code: item[0],
          email: item[1].email,
          registered: !item[1].valid,
        }
      })
      this.setState({ list })
    })
  }

  isValidInputs = (code, email) => {
    var codeValidation = /^\d{14}$/i.exec(code)
    var emailValidation = /^[\w-_\.\+]+@\w+\.[a-z]{2,}$/i.exec(email)

    this.setState({
      isCodeValid: codeValidation != null,
      isEmailValid: emailValidation != null,
    })
    return codeValidation && emailValidation
  }

  onAddStudent = e => {
    e.preventDefault()
    const { code, email, list } = this.state

    if (!this.isValidInputs(code, email)) return

    database
      .ref('codes')
      .child(code)
      .set({
        email: this.state.email,
        type: 'student',
        valid: true,
      })
    this.setState({
      code: '',
      email: '',
      isEmailValid: null,
      isCodeValid: null,
    })
  }

  removeStudent = code => {
    if (this.state.list.length === 1) this.setState({ list: [] })
    database
      .ref('codes')
      .child(code)
      .remove()
  }

  editStudent = (oldCode, newCode, newEmail) => {
    database
      .ref('codes')
      .child(oldCode)
      .update({
        code: newCode,
        email: newEmail,
      })
  }

  _renderInput = () => {
    const { email, code, isCodeValid, isEmailValid } = this.state
    return (
      <Form inline style={{ marginBottom: 10, marginTop: 10 }}>
        <FormGroup>
          <Label style={{ marginRight: 10 }} for="Email">
            Email
          </Label>
          <Input
            style={{ marginRight: 10 }}
            onChange={data => {
              this.isValidInputs(code, data.target.value)
              this.setState({ email: data.target.value })
            }}
            value={email}
            valid={isEmailValid}
            type="email"
            name="email"
            id="Email"
          />
        </FormGroup>
        <FormGroup>
          <Label style={{ marginRight: 10, marginLeft: 50 }} for="code">
            Code
          </Label>
          <Input
            style={{ marginRight: 10 }}
            onChange={data => {
              this.isValidInputs(data.target.value, email)
              this.setState({ code: data.target.value })
            }}
            value={code}
            valid={isCodeValid}
            type="number"
            name="code"
            id="code"
          />
        </FormGroup>
        <Button style={{ marginRight: 10 }} onClick={this.onAddStudent}>
          Add
        </Button>
      </Form>
    )
  }

  _renderList = () => {
    if (!this.state.list.length) return this._renderInput()
    const list = [{ isLabel: true }, ...this.state.list]
    return (
      <div>
        {this._renderInput()}
        <ListGroup>
          {list.map((item, index) => (
            <ListGroupItem key={index}>
              <Item
                {...item}
                onDelete={() => {
                  this.removeStudent(item.code)
                }}
                onEdit={(code, email) => {
                  this.editStudent(item.code, code, email)
                }}
              />
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    )
  }

  render() {
    return (
      <div>
        <h1>Students</h1>
        {this._renderList()}
      </div>
    )
  }
}
