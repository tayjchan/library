import React from 'react';
import { Popup } from "semantic-ui-react";
import CircleButton from "./circleButton";
import { connect } from "react-redux";

const AuthorizePopup = ({ needToAuthorize }) => {
    const signIn = async () => {
        window.open(
            "https://server-library.herokuapp.com/goodreads/authorize",
            "_self"
        );
    };

    if (!needToAuthorize) {
        return (
            <Popup
                position='bottom right'
                content='Authorize with Goodreads.'
                trigger={
                    <CircleButton icon='sign-in' onClick={() => signIn()} />
                }
            />
        );
    }
    return (
        <Popup
            position='bottom right'
            open={needToAuthorize}
            trigger={<CircleButton icon='sign-in' onClick={() => signIn()} />}
        >
            <Popup.Header>
                Error: Authorization needed.
            </Popup.Header>
            <Popup.Content>
                Please click this button and authorize before continuing. <br />
                When you return to this site, you'll have to re-enter any information and resubmit.
            </Popup.Content>
        </Popup>
    )
}

const mapStateToProps = (state) => ({
    needToAuthorize: state.needToAuthorize,
});

export default connect(mapStateToProps)(AuthorizePopup);