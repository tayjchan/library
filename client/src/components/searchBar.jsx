import React from 'react';
import { Form, Label, Icon } from "semantic-ui-react";
import CircleButton from "./circleButton";

const SearchBar = () => {
    const [showForm, setShowForm] = React.useState(false);
    const [formFocused, setFormFocused] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');
    const [searchTag, setSearchTag] = React.useState('');

    const clear = () => {
        setSearchTag('');
        setSearchValue('');
    }

    const onChangeSearch = (e) => {
        setSearchValue(e.target.value)
    }

    const onSubmitSearch = (e) => {
        // TODO: Enter button to submit form not working
        e.preventDefault();
        setSearchTag(searchValue);
    }

    if ((showForm && !searchTag) || formFocused) {
        return <>
            <Form size={"mini"} style={{ marginLeft: 8 }}
                onMouseLeave={() => !searchValue && setShowForm(false)}>
                <Form.Input
                    placeholder='Click to search within this list.'
                    style={{ width: 300 }}
                    inline
                    value={searchValue}
                    onFocus={() => setFormFocused(true)}
                    onBlur={() => setFormFocused(false)}
                    onChange={onChangeSearch}
                    action={{
                        size: "mini",
                        color: "teal",
                        icon: "search",
                        onClick: onSubmitSearch,
                    }}
                />
            </Form>
        </>
    } else if (searchTag) {
        return <Label as='a' style={{ marginLeft: 8, marginTop: 4 }}
            onRemove={() => setShowForm(false)} circular color="teal">
            {searchValue}
            <Icon name='delete' onClick={clear} />
        </Label>
    } else {
        return <CircleButton
            style={{ marginLeft: 8, marginTop: 4 }}
            size='mini'
            compact
            color={null}
            icon='search'
            onMouseOver={() => setShowForm(true)}
        />
    }
}

export default SearchBar;