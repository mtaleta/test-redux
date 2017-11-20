import React, { Component } from 'react'
import propType from 'prop-types'

class Comment extends Component {
  static propType = {
    comment: propType.object.isRequired,
    onDeleteComment: propType.func,
    index: propType.number
  }

  constructor () {
    super()
    this.state = { timeString: '' }

    this.handleDeleteComment = this.handleDeleteComment.bind(this)
    this._updateTimeString = this._updateTimeString.bind(this)
  }

  componentWillMount () {
    this._updateTimeString()
    this._timer = setInterval( // 更新時間
      this._updateTimeString,
      5000
    )
  }

  // 清除定時器
  componentWillUnmount() {
    clearInterval(this._timer)
  }

  handleDeleteComment () {
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(this.props.index)
    }
  }

  // 離發出後間隔多少時間
  _updateTimeString () {
    const comment = this.props.comment
    const duration = (+Date.now() - comment.createdTime) / 1000
    this.setState({
      timeString: duration > 60
      ? `${Math.round(duration / 60)} 分鐘前`
      : `${Math.round(Math.max(duration, 1))} 秒前`
    })
  }
  // 把 HTML 標籤進行轉義
  _getProcessedContent (content) {
    return content
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .replace(/`([\S\s]+?)`/g, '<code>$1</code>')
  }

  render () {
    const { comment } = this.props
    return (
      <div className='comment'>
        <div className='comment-user'>
          <span className='comment-username'>
            {comment.username}
          </span>：
        </div>
        <p dangerouslySetInnerHTML={{
          __html: this._getProcessedContent(comment.content)
        }} />
        <span className='comment-createdtime'>
          {this.state.timeString}
        </span>
        <span 
          className='comment-delete'
          onClick={this.handleDeleteComment} >
          刪除
        </span>
      </div>
    )
  }
}

export default Comment
