import fetch from 'cross-fetch';
export const GET_EMPLOYEES = 'GET_EMPLOYEES';
export const SET_EMPLOYEES = 'SET_EMPLOYEES';
export const GET_EMPLOYEE_OVERVIEW = 'GET_EMPLOYEE_OVERVIEW';
export const SET_EMPLOYEE_OVERVIEW = 'SET_EMPLOYEE_OVERVIEW';
export const ADD_DIRECT_SUBORDINATE_TO_EMPLOYEE_OVERVIEW = 'ADD_DIRECT_SUBORDINATE_TO_EMPLOYEE_OVERVIEW';
export const ADD_INDIRECT_SUBORDINATE_TO_EMPLOYEE_OVERVIEW = 'ADD_INDIRECT_SUBORDINATE_TO_EMPLOYEE_OVERVIEW';


function fetchEmployee(name) {
    return fetch(`http://api.additivasia.io/api/v1/assignment/employees/${encodeURI(name)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        return res.json();
    })
}

function addSubordinateToEmployeeOverview(name, subordinate, direct) {
    return {
        type: direct ? ADD_DIRECT_SUBORDINATE_TO_EMPLOYEE_OVERVIEW : ADD_INDIRECT_SUBORDINATE_TO_EMPLOYEE_OVERVIEW,
        subordinate,
        name
    }
}

export function getEmployeeByName(name) {
    return function(dispatch) {
        dispatch(getEmployeeOverview(name));

        fetchEmployee(name)
            .then(employee => {
                const populateSubordinates = (name, [,{'direct-subordinates': subordinates = []} = {}], direct = false) => {
                    subordinates.forEach(subordinate => {
                        dispatch(addSubordinateToEmployeeOverview(name, subordinate, direct));
                        fetchEmployee(subordinate)
                            .then(employee => populateSubordinates(name, employee));
                    }); 
                }

                populateSubordinates(name, employee, true);
            });
    }
}

export function findAllEmployees() {
    return dispatch => {
        dispatch(getEmployees(true));
        return fetch(`http://api.additivasia.io/api/v1/assignment/employees/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                dispatch(setEmployees(data));
            })
            .catch(e => getEmployees(false, e));
    }
}

export function getEmployees(isFetching, error) {
    return {
        type: GET_EMPLOYEES,
        isFetching,
        error
    }
}

export function getEmployeeOverview(name, error) {
    return {
        type: GET_EMPLOYEE_OVERVIEW,
        isFetching: true,
        employee: {
            name
        },
        error
    }
}

export function setEmployees(employees) {
    return {
        type: SET_EMPLOYEES,
        isFetching: false,
        employees
    }
}

export function setEmployeeOverview(name, [role, {'direct-subordinates': directSubordinates = []}]) {
    return {
        type: SET_EMPLOYEE_OVERVIEW,
        isFetching: false,
        employee: {
            name,
            role,
            directSubordinates
        }
    }
}