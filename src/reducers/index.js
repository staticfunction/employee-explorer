import { 
    GET_EMPLOYEES, 
    GET_EMPLOYEE_OVERVIEW, 
    SET_EMPLOYEES, 
    SET_EMPLOYEE_OVERVIEW,
    ADD_DIRECT_SUBORDINATE_TO_EMPLOYEE_OVERVIEW,
    ADD_INDIRECT_SUBORDINATE_TO_EMPLOYEE_OVERVIEW
} from '../actions'

const initialState = {
    isFetching: false,
    employees: []
}

function concatUniqueSubordinates(subordinates, subordinate) {
    if(!subordinates.includes(subordinate)) {
        return subordinates.concat(subordinate);
    }
    else {
        return subordinates.slice();
    }
}

function employees(state = initialState, action) {
    switch (action.type) {
        case GET_EMPLOYEES:
            return Object.assign({}, state, { isFetching: action.isFetching, error: action.error });
        case SET_EMPLOYEES:
            return Object.assign({}, state, { employees: action.employees, isFetching: action.isFetching });
        case GET_EMPLOYEE_OVERVIEW:
            return Object.assign({}, state, { employeeOverview: action.employee, isFetching: action.isFetching, error: action.error });
        case SET_EMPLOYEE_OVERVIEW:
            return Object.assign({}, state, { employeeOverview: action.employee, isFetching: action.isFetching, error: action.error });
        case ADD_INDIRECT_SUBORDINATE_TO_EMPLOYEE_OVERVIEW:
            const { employeeOverview: { indirectSubordinates = [] } } = state;
            
            return Object.assign({}, state, {
                employeeOverview: Object.assign({}, state.employeeOverview, {
                    indirectSubordinates: concatUniqueSubordinates(indirectSubordinates, action.subordinate)
                })
            });

        case ADD_DIRECT_SUBORDINATE_TO_EMPLOYEE_OVERVIEW: 
            const { employeeOverview: { directSubordinates = [] } } = state;
                
            return Object.assign({}, state, {
                employeeOverview: Object.assign({}, state.employeeOverview, {
                    directSubordinates: concatUniqueSubordinates(directSubordinates, action.subordinate)
                })
            });

        default:
            return state;
    }
}

export default employees;