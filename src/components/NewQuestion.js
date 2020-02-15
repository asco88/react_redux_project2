import React, { Component } from 'react';
import { connect } from 'react-redux'
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

        dispatch(handleAddQuestion({ optionOneText: textOne, optionTwoText: textTwo, author: authedUser, authedUser }));

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


                <form className="form-style-7" onSubmit={this.handleSubmit}>
                    <ul>
                        <li key="optionone">
                            <input onChange={this.handleChangeTextOne} type="text" value={textOne}/>
                            <span>Option One</span>
                        </li>
                        <li key="optiontwo"> 
                            <input onChange={this.handleChangeTextTwo} type="text" value={textTwo}/>
                            <span>Option Two</span>
                        </li>
                        <li key="submit">
                            <input disabled={textOne === '' || textTwo === ''} type="submit" value="Add Question!" />
                        </li>
                    </ul>
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
