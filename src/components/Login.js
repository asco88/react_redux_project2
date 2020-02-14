import React, { Component } from 'react';
import { connect } from 'react-redux'
import {setAuthedUser, unsetAuthedUser} from '../actions/authedUser'

class Login extends Component {
    handleLogin(userId) {
        this.props.dispatch(setAuthedUser(userId));
    }

    handleLogout = () => {
        this.props.dispatch(unsetAuthedUser());
    }

    renderLogin() {
        const { authedUser, users } = this.props;

        if (authedUser) return null;

        return (<div>
            {users.map(user => (<button onClick={() => this.handleLogin(user.id)}>{user.name}</button>))}
        </div>
        )
    }

    renderLogout() {
        if (!this.props.authedUser) return null;

        return (
            <button onClick={this.handleLogout}>Logout</button>
        )
    }

    render() {
        const { authedUser } = this.props;

        return (
            <div className="pricing-plan">

                <h3 className='center'>{authedUser ? 'Logout' : 'Login'}</h3>
                {this.renderLogin()}
                {this.renderLogout()}
            </div>
        );
    }

}

function mapStateToProps({ authedUser, users, questions }) {
    const qList = Object.keys(questions).map(q => questions[q]);
    const usersList = Object.keys(users).map(q => users[q]);

    return {
        users: usersList,
        authedUser,
        user: users[authedUser],
        questions: qList
    }
}

export default connect(mapStateToProps)(Login)
