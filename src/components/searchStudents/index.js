import React, { Component } from 'react'
import { database } from '../../firebase'
import { Input, ListGroup, ListGroupItem } from 'reactstrap'

export default class searchStudents extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      search: '',
      visibleList: [],
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
      this.setState({
        list,
        visibleList: list.filter(
          innerItem =>
            innerItem.code.includes(this.state.search) ||
            innerItem.email.includes(this.state.search)
        ),
      })
    })
  }

  _renderInput = () => {
    return (
      <Input
        onChange={data => {
          this.setState({
            search: data.target.value,
            visibleList: this.state.list.filter(
              innerItem =>
                data.target.value === '' ||
                innerItem.code.includes(this.state.search) ||
                innerItem.email.includes(this.state.search)
            ),
          })
        }}
        placeholder="Search Students ..."
      />
    )
  }

  _renderList = () => {
    if (!this.state.list.length) return this._renderInput()
    const list = [{ isLabel: true }, ...this.state.visibleList]
    return (
      <div>
        {this._renderInput()}
        <ListGroup>
          {list.map((item, index) => {
            const { code, email, registered, isLabel } = item
            const rightIcon = require('../../img/right.png')
            const wrongIcon = require('../../img/wrong.png')
            return (
              <ListGroupItem
                tag="a"
                href={`/manageCourses/${code}`}
                action
                key={index}
              >
                <div className={'itemContainer'}>
                  <div style={{ flex: 1 }} className={'itemComponent'}>
                    <span style={{ textAlign: 'left' }}>
                      {isLabel ? 'Student Code' : code}
                    </span>
                  </div>
                  <div style={{ flex: 1 }} className={'itemComponent'}>
                    <span style={{ textAlign: 'left' }}>
                      {isLabel ? 'Student Email' : email}
                    </span>
                  </div>
                  <div style={{ flex: 1 }} className={'itemComponent'}>
                    {isLabel ? (
                      <span style={{ textAlign: 'center' }}>
                        Registered Student
                      </span>
                    ) : (
                      <img
                        className={'icon'}
                        src={registered ? rightIcon : wrongIcon}
                      />
                    )}
                  </div>
                </div>
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
        <h1 className="labels">Search Students</h1>
        {this._renderList()}
      </div>
    )
  }
}
