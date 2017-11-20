import React, { Component } from 'react'
import Comment from './Comment'
import propTypes from 'prop-types'

class CommentList extends Component {
  static propType = {
    comments: propTypes.array,
    onDeleteComment: propTypes.func
  }

  static defaultProps = {
    comments: []
  }

  render () {
    return (
      <div>
        {this.props.comments.map((comment, i) =>
          <Comment
            comment={comment}
            key={i}
            index={i}
            onDeleteComment={this.handleDeleteComment.bind(this)} />
        )}
      </div>
    )
  }
  
  handleDeleteComment (index) {
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(index)
    }
  }
}

export default CommentList
