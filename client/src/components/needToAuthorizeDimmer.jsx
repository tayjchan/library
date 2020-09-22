import React from 'react';
import { Dimmer } from 'semantic-ui-react';
import { connect } from "react-redux";
import { toggleNeedToAuthorize } from '../actions';

const NeedToAuthorizeDimmer = ({ children, isActive, toggleNeedToAuthorize }) => {
    return (
        <Dimmer.Dimmable blurring dimmed={isActive}>
            <Dimmer active={isActive} inverted onClick={() => toggleNeedToAuthorize()} />
            {children}
        </Dimmer.Dimmable>
    );
}

const mapDispatchToProps = (dispatch) => ({
    toggleNeedToAuthorize: () => dispatch(toggleNeedToAuthorize())
});

const mapStateToProps = (state) => ({
    isActive: state.needToAuthorize,
});

export default connect(mapStateToProps, mapDispatchToProps)(NeedToAuthorizeDimmer);