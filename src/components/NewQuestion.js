import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { handleAddQuestion } from '../actions/questions'

class NewQuestion extends Component {
    state = {
        textOne: '',
        textTwo: '',
        toHome: false,
    }

    handleChangeTextOne = (e) => {
        const textOne = e.target.value

        this.setState(() => ({
            textOne
        }))
    }

    handleChangeTextTwo = (e) => {
        const textTwo = e.target.value

        this.setState(() => ({
            textTwo
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { textOne, textTwo } = this.state
        const { dispatch, authedUser } = this.props

        dispatch(handleAddQuestion({optionOneText: textOne, optionTwoText: textTwo, author: authedUser, authedUser}));

        this.setState(() => ({
            textOne: '',
            textTwo: '',
        }))
    }

    render() {
        const { textOne, textTwo } = this.state;
        return (
            <div className="pricing-plan">

                <h3 className='center'>new question</h3>
                <form className='new-tweet' onSubmit={this.handleSubmit}>
                    <div>
                        Option one
                        <input type="text"
                            value={textOne}
                            onChange={this.handleChangeTextOne}
                            maxLength={280}
                        />
                    </div>
                    <div>
                        Option two
                        <input type="text"
                            value={textTwo}
                            onChange={this.handleChangeTextTwo}
                            maxLength={280}
                        />
                    </div>
                    <button
                        className='btn'
                        type='submit'
                        disabled={textOne === '' || textTwo === ''}>
                        Submit
              </button>
                </form>
            </div>
        );
    }

}

function mapStateToProps({ authedUser, users }) {
    return {
        loading: authedUser === null,
        authedUser,
        user: users[authedUser]
    }
}

export default connect(mapStateToProps)(NewQuestion)
