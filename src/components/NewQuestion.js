import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'

class NewQuestion extends Component {
    state = {
        textOne: '',
        textTwo: '',
        toHome: false,
    }

    handleChangedText = (e) => {
        e.preventDefault()
        let textOne, textTwo;

        if (e.target.name === 'optionA') {
            textOne = e.target.value;

            this.setState(() => ({
                textOne
            }))
        } else if (e.target.name === 'optionB') {
            textTwo = e.target.value;

            this.setState(() => ({
                textTwo
            }))
        }
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

        this.props.history.push('/')
    }

    render() {
        const { textOne, textTwo } = this.state;
        return (
            <div className="pricing-plan">

                <h3 className='center'>new question</h3>


                <form className="form-style-7" onSubmit={this.handleSubmit}>
                    <ul>
                        <li key="optionone">
                            <input onChange={(e) => this.handleChangedText(e)} name="optionA" type="text" value={textOne} />
                            <span>Option One</span>
                        </li>
                        <li key="optiontwo">
                            <input onChange={(e) => this.handleChangedText(e)} name="optionB" type="text" value={textTwo} />
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
