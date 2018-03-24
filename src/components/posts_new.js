import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { error } from "util";
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import {createPost} from "../actions"

class PostsNew extends Component {
  renderField(field) {
    const { meta: { touched,error}} = field // desconstructor from field.meta.touched / field.meta.error
    const className = `form-group ${touched && error ? 'has-danger' : ''}`
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        {touched ? error : ''} 
      </div>
      //field.meta.error it will check if exist error under field.label
    );
  }

  onSubmit(values){
    this.props.createPost(values, () => {
      this.props.history.push('/');
    })
  }

  render() {
    const {handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field label="Title for Post" name="title" component={this.renderField} />
        <Field label="Categories" name="categories" component={this.renderField} />
        <Field label="Post Content" name="content" component={this.renderField} />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate (values){
  const errors={};
  //Validate inputs
  if(!values.title){
    errors.title = "Enter title"
  }
  if (!values.categories) {
    errors.categories = "Enter some categories"
  }
  if (!values.content) {
    errors.content = "Enter some content"
  }
  //If erros = {} it will submit correctly the form
  return errors  
}
export default reduxForm({
  validate:validate,
  form: "PostsNewForm"
})(
  connect(null,{createPost})(PostsNew)
);
