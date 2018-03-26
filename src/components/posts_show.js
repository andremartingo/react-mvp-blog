import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPost, deletePost } from "../actions/index";

class PostsShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }
  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push("/");
    });
  }
  render() {
    const { post } = this.props;
    if (!post) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <div className="jumbotron">
          <button
            className="btn btn-danger pull-xs-right"
            onClick={this.onDeleteClick.bind(this)}
          >
            Delete Post
          </button>
          <Link to={`/`}>
            <button className="btn btn-primary pull-xs-left">
              Back to index Refactor
            </button>
          </Link>
          <div className="content">
            <h3>
              <span className="fa fa-align-justify" /> Post
            </h3>
            <h3>{post.title}</h3>
            <h6>Categories:{post.categories}</h6>
            <hr className="my-4" />
            <p>Content: {post.content}</p>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
