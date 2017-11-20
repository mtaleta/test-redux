import React, { Component } from 'react'
import propTypes from 'prop-types'

class CommentInput extends Component {
  static propTypes = {
    onSubmit: propTypes.func
  }

  constructor () {
    super()
    this.state = {
      username: '',
      content: ''
    }
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handleUsernameBlur = this.handleUsernameBlur.bind(this)
    this.handleContentChange = this.handleContentChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    this.textarea.focus()
  }

  
  componentWillMount () {
    this._loadUsername()
  }

  // 從localStorage取username
  _loadUsername () {
    const username = localStorage.getItem('username')
    if (username) {
      this.setState({ username })
    }
  }

  _saveUsername (username) {
    localStorage.setItem('username', username)
  }

  // 名稱傳入localStorage
  handleUsernameBlur (event) {
    this._saveUsername(event.target.value)
  }

  handleUsernameChange (event) {
    this.setState({
      username: event.target.value
    })
  }

  handleContentChange (event) {
    this.setState({
      content: event.target.value
    })
  }

  handleSubmit () {
    if (this.props.onSubmit) {
      this.props.onSubmit({
        username: this.state.username,
        content: this.state.content,
        createdTime: +new Date() //發布時間
      })
      // const { username, content } = this.state
      // this.props.onSubmit({username, content})
    }
    this.setState({ content: '' })
  }

  render () {
    return (
      <div className='comment-input'>
        <div className='comment-field'>
          <span className='comment-field-name'>名稱</span>
          <div className='comment-field-input'>
            <input
              value={this.state.username}
              onChange={this.handleUsernameChange}
              onBlur={this.handleUsernameBlur} // onblur 事件會在對象失去焦點時發生
              />
          </div>
        </div>
        <div className='comment-field'>
          <span className='comment-field-name'>內容</span>
          <div className='comment-field-input'>
            <textarea
              ref={(textarea) => this.textarea = textarea} // 進入時焦點
              value={this.state.content}
              onChange={this.handleContentChange}
            />
          </div>
        </div>
        <div className='comment-field-button'>
          <button
            onClick={this.handleSubmit}
          >送出</button>
        </div>
      </div>
    )
  }
}

export default CommentInput
