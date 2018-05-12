import React, { Component } from 'react'
import { database } from '../../firebase'
import { Input, ListGroup, ListGroupItem } from 'reactstrap'

export default class manageCourses extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      inList: [],
      inSearch: '',
      inVisibleList: [],
      outList: [],
      outSearch: '',
      outVisibleList: [],
    }
  }

  componentDidMount() {
    const code = this.props.match.params.studentId
    database
      .ref('codes')
      .child(code)
      .child('email')
      .once('value', data => {
        this.setState({ email: data.val() })
      })
    database
      .ref('codes')
      .child(code)
      .child('courses')
      .on('value', data => {
        var inList = data.val()
        if (!inList) return
        inList = Object.entries(inList).map(item => item[0])
        this.setState({
          inList,
          inVisibleList: inList.filter(item =>
            item.includes(this.state.inSearch)
          ),
        })
      })
    database.ref('courses').on('value', data => {
      var outList = data.val()
      if (!outList) return
      outList = Object.entries(outList).map(item => ({
        id: item[0],
        name: item[1].name,
      }))
      this.setState({
        outList,
        outVisibleList: outList.filter(
          item =>
            item.name.includes(this.state.outSearch) &&
            this.state.inList.indexOf(item.id) === -1
        ),
      })
    })
  }

  _renderInList = () => {
    return (
      <div style={{ flex: 1 }}>
        <Input
          onChange={data => {
            this.setState({
              inSearch: data.target.value,
              inVisibleList: this.state.inList.filter(item => {
                const mapping = this.state.outList.find(o => o.id === item)
                const courseName = mapping ? mapping.name : ''
                return courseName.includes(data.target.value)
              }),
            })
          }}
          placeholder="Search Taken Courses..."
        />
        <ListGroup>
          {this.state.inVisibleList.map((item, index) => {
            const mapping = this.state.outList.find(o => o.id === item)
            const courseName = mapping ? mapping.name : ''
            return (
              <ListGroupItem
                tag="a"
                href={`#`}
                onClick={e => {
                  e.preventDefault()
                  const code = this.props.match.params.studentId
                  database
                    .ref('codes')
                    .child(code)
                    .child('courses')
                    .child(item)
                    .remove()
                  this.setState({
                    inVisibleList: this.state.inList.filter(innerItem => {
                      const name = this.state.outList.find(
                        o => o.id === innerItem
                      ).name
                      return (
                        name.includes(this.state.inSearch) && innerItem !== item
                      )
                    }),
                    outVisibleList: this.state.outList.filter(
                      innerItem =>
                        (innerItem.name.includes(this.state.outSearch) &&
                          this.state.inList.indexOf(innerItem.id) === -1) ||
                        innerItem.id === item
                    ),
                  })
                }}
                action
                key={index}
              >
                <div className={'itemContainer'}>
                  <div style={{ flex: 1 }} className={'itemComponent'}>
                    {courseName}
                  </div>
                </div>
              </ListGroupItem>
            )
          })}
        </ListGroup>
      </div>
    )
  }

  _renderOutList = () => {
    return (
      <div style={{ flex: 1 }}>
        <Input
          onChange={data => {
            this.setState({
              outSearch: data.target.value,
              outVisibleList: this.state.outList.filter(
                item =>
                  item.name.includes(data.target.value) &&
                  this.state.inList.indexOf(item.id) === -1
              ),
            })
          }}
          placeholder="Search Available Courses..."
        />
        <ListGroup>
          {this.state.outVisibleList.map((item, index) => {
            return (
              <ListGroupItem
                tag="a"
                href={`#`}
                onClick={e => {
                  e.preventDefault()
                  const code = this.props.match.params.studentId
                  database
                    .ref('codes')
                    .child(code)
                    .child('courses')
                    .child(item.id)
                    .set(true)
                  this.setState({
                    outVisibleList: this.state.outList.filter(
                      innerItem =>
                        innerItem.name.includes(this.state.outSearch) &&
                        this.state.inList.indexOf(innerItem.id) === -1 &&
                        innerItem.id !== item.id
                    ),
                  })
                }}
                action
                key={index}
              >
                <div className={'itemContainer'}>
                  <div style={{ flex: 1 }} className={'itemComponent'}>
                    {item.name}
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
        {this.state.email && <h1>{`${this.state.email}'s Courses`}</h1>}
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {this._renderInList()}
          {this._renderOutList()}
        </div>
      </div>
    )
  }
}
