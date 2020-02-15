import React, { Component } from 'react';
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'


class ProfileName extends Component {

    componentWillMount() {
        this.props.dispatch(handleInitialData());
    }

    render() {
        const { user } = this.props;

        const profileImage = user ? this.props.user.avatarURL : null;
        return (
            <div className="pricing-plan">
                <h2 className="pricing-header">{this.props.user.name}</h2>
                <img src={profileImage} alt="" className="pricing-img" />
            </div>

        );
    }

}

function mapStateToProps({ authedUser, users }) {
    const user = users[authedUser];
    return {
        loading: authedUser === null,
        user: user,
    }
}

export default connect(mapStateToProps)(ProfileName)
