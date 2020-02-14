import React, { useEffect } from 'react';
import { Heading, HeadingLevel } from 'baseui/heading';
import { ListItem, ListItemLabel } from 'baseui/list';
import { connect } from 'react-redux';
import qs from 'query-string';
import { getEmployeeByName } from '../actions';

const EmployeeOverview = ({name, subordinates, getEmployee}) => {
    
    useEffect(() => {
        getEmployee(name);
    }, [])
    
    return (
        <HeadingLevel>
            <Heading>Employee Overview</Heading>

            <HeadingLevel>
                <Heading>Subordinates of {name}:</Heading>
            </HeadingLevel>

            <ul>
                { 
                    subordinates
                        .map(subordinate => (
                                <ListItem key={subordinate}>
                                    <ListItemLabel>{subordinate}</ListItemLabel>
                                </ListItem>
                            )
                        ) 
                }
            </ul>

        </HeadingLevel>

    )
}

const mapStateToProps = ({employeeOverview: { directSubordinates = [], indirectSubordinates = [] } = {}}, ownProps) => {
    return {
        name: qs.parse(ownProps.location.search).name,
        subordinates: [].concat(directSubordinates, indirectSubordinates) 
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getEmployee(name) {dispatch(getEmployeeByName(name))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeOverview);