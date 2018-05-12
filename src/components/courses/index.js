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

export default class Courses extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      name: '',
      isNameValid: false,
      description: '',
      isDescriptionValid: false,
      imageUrl: '',
      year: '0',
      yearsData: {},
    }
  }

  componentDidMount() {
    database.ref('courses').on('value', data => {
      var list = data.val()
      if (!list) return
      this.getYears().then(data => {
        list = Object.entries(list).map(item => {
          return {
            id: item[0],
            name: item[1].name,
            description: item[1].description,
            imageUrl: item[1].imageUrl,
            year: this.state.yearsData[item[0]],
          }
        })
        this.setState({ list })
      })
    })
  }

  getYears = () => {
    return new Promise((resolve, reject) => {
      database.ref('years').on('value', data => {
        const yearsData = {}
        var list = data.val()
        if (!list) return
        Object.entries(list).map(item => {
          Object.entries(item[1].courses).map(
            course => (yearsData[course[0]] = item[0])
          )
        })
        this.setState({ yearsData })
        resolve(yearsData)
      })
    })
  }

  isValidInputs = (name, description) => {
    var validator = /^[\w -+,.]+$/i
    var nameValidation = validator.exec(name)
    var descriptionValidation = validator.exec(description)

    this.setState({
      isNameValid: !!nameValidation,
      isDescriptionValid: !!descriptionValidation,
    })
    return nameValidation && descriptionValidation
  }

  onAddCourse = e => {
    e.preventDefault()
    const { name, description, year } = this.state

    if (!this.isValidInputs(name, description)) return

    var pushRef = database.ref('courses').push()

    pushRef.set({
      name,
      description,
      id: pushRef.getKey(),
    })

    database
      .ref('years')
      .child(year)
      .child('courses')
      .child(pushRef.getKey())
      .set(true)
    const yearsData = this.state.yearsData
    yearsData[pushRef.getKey()] = year
    this.setState({
      name: '',
      description: '',
      isNameValid: false,
      isDescriptionValid: false,
      yearsData,
    })
  }

  removeCourse = id => {
    if (this.state.list.length === 1) this.setState({ list: [] })
    database
      .ref('courses')
      .child(id)
      .remove()
    Array(4)
      .fill(0)
      .map((item, index) =>
        database
          .ref('years')
          .child(index.toString())
          .child('courses')
          .child(id)
          .remove()
      )
  }

  editCourse = (index, id, name, year, description) => {
    database
      .ref('courses')
      .child(id)
      .update({ name, description })
    Array(4)
      .fill(0)
      .map((item, index) =>
        database
          .ref('years')
          .child(index.toString())
          .child('courses')
          .child(id)
          .remove()
      )
    const yearsData = this.state.yearsData
    yearsData[id] = year
    database
      .ref('years')
      .child(year)
      .child('courses')
      .child(id)
      .set(true)

    const list = this.state.list
    list[index - 1].year = year
    this.setState({ yearsData, list })
  }

  _renderInput = () => {
    const {
      description,
      name,
      isNameValid,
      isDescriptionValid,
      year,
    } = this.state
    return (
      <Form inline style={{ marginBottom: 10, marginTop: 10 }}>
        <FormGroup>
          <Label style={{ marginRight: 10, marginLeft: 50 }} for="Name">
            Name
          </Label>
          <Input
            style={{ marginRight: 10 }}
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
          <Label style={{ marginRight: 10 }} for="Description">
            Description
          </Label>
          <Input
            style={{ marginRight: 10 }}
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
          <Label style={{ marginRight: 10 }} for="year">
            Year
          </Label>
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
        <Button style={{ marginLeft: 10 }} onClick={this.onAddCourse}>
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
          {list.map((item, index) => {
            return (
              <ListGroupItem key={index}>
                <Item
                  {...item}
                  onDelete={() => {
                    this.removeCourse(item.id)
                  }}
                  onEdit={(name, year, description) => {
                    this.editCourse(index, item.id, name, year, description)
                  }}
                />
              </ListGroupItem>
            )
          })}
        </ListGroup>
      </div>
    )
  }

  render() {
    return (
      <div>
        <h1>Courses</h1>
        {this._renderList()}
      </div>
    )
  }
}
