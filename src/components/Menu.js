import React, { Component } from 'react';
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'


class Menu extends Component {

    componentWillMount() {
        this.props.dispatch(handleInitialData());
    }

    render() {
        const { user } = this.props;
        const profileImage = user ? `../../images/${this.props.user.avatarURL}` : null;

        const loginButton = user ?
            <NavLink to='/login' exact activeClassName='active'>
                Logout
                </NavLink> :
            <NavLink to='/login' exact activeClassName='active'>
                Login
                </NavLink>

        return (
            <div className="profile">
                <span className="pricing-price">{user ? user.name : ''}</span>
                <img src={profileImage} alt="" className="pricing-img" />
                <ul className="pricing-features">
                    <li key="home" className="pricing-features-item">
                        <NavLink to='/' exact activeClassName='active'>
                            Home
                        </NavLink>
                    </li>
                    <li key="add" className="pricing-features-item">
                        <NavLink to='/add' exact activeClassName='active'>
                            New Question
                        </NavLink>
                    </li>
                    <li key="leaderboard" className="pricing-features-item">
                        <NavLink to='/leaderboard' exact activeClassName='active'>
                            Leader Board
                        </NavLink>
                    </li>
                    <li>
                        {loginButton}
                    </li>
                </ul>
            </div>

        );
    }

}

function mapStateToProps({ authedUser, users }) {
    return {
        loading: authedUser === null,
        user: users[authedUser]
    }
}

export default connect(mapStateToProps)(Menu)
