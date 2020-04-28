import React from 'react';
import commentBox from 'commentbox.io';

class CommentBox extends React.Component {

    componentDidMount() {

        this.removeCommentBox = commentBox('5654469383553024-proj');
    }

    componentWillUnmount() {

        this.removeCommentBox();
    }

    render() {
        console.log(this.props.data.id)
        return (
            <div className="commentbox" id={this.props.data.id}/>
        );
    }
}

export default CommentBox


