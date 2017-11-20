import React, { Component } from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
// import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
// import thunkMiddleware from 'redux-thunk'
// // import loggerMiddleware from 'redux-logger';
// import {connect} from 'react-redux'
// import {Provider} from 'react-redux'

class CommentApp extends Component {
  constructor () {
    super()
    this.state = {
      comments: []
    }
    this.handleSubmitComment = this.handleSubmitComment.bind(this)
    this.handleDeleteComment = this.handleDeleteComment.bind(this)
  }

  componentWillMount () {
    // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    // this.store = createStore(combineReducers({
    //     // CommentApp,
    //     // CommentInput,
    //     // CommentList,
    //     // comment
    // }), composeEnhancers(applyMiddleware(thunkMiddleware)))
    this._loadComments()
  }

  render () {
    return (
      <div className='wrapper'>
        <CommentInput
          onSubmit={this.handleSubmitComment}
        />
        <CommentList
          comments={this.state.comments}
          onDeleteComment={this.handleDeleteComment}
          />
      </div>
    )
  }

  handleDeleteComment (index) {
    const comments = this.state.comments
    comments.splice(index, 1)
    this.setState({ comments })
    this._saveComments(comments)
    console.log(index)
  }

  // 開啟時從localStorage取出評論
  _loadComments () {
    let comments = localStorage.getItem('comments')
    if (comments) {
      comments = JSON.parse(comments)
      this.setState({ comments })
    }
  }

  // 評論存入localStorage
  _saveComments (comments) {
    localStorage.setItem('comments', JSON.stringify(comments))
  }

  handleSubmitComment (comment) {
    if (!comment) return
    if (!comment.username) return alert('請輸入名稱')
    if (!comment.content) return alert('請輸入內容')
    const comments = this.state.comments
    comments.push(comment)
    this.setState({ comments })
    this._saveComments(comments)
    console.log(comment)
  }
}

export default CommentApp
