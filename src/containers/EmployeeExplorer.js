import React from 'react';
import { connect } from 'react-redux';
import { Heading, HeadingLevel } from 'baseui/heading';
import { EmployeeSearchInput } from '../components';
import { findAllEmployees } from '../actions';

const EmployeeExplorer = ({onInputChange, options, isFetching}) => {
    return (
        <HeadingLevel>
            <Heading>Employee Overview</Heading>
            <EmployeeSearchInput 
                onInputChange={onInputChange} 
                isFetching={isFetching}
                options={options} />
        </HeadingLevel>
    );
}

const mapStateProps = state => {
    const { employees, isFetching} = state;

    return {
        options: employees.map((val, index) => { return {
            label: val,
            name: val,
            id: index
        }}),
        isLoading: isFetching
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInputChange: () => dispatch(findAllEmployees())
    }
}

export default connect(mapStateProps, mapDispatchToProps)(EmployeeExplorer);