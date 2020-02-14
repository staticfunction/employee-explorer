import React from 'react';
import { Button } from 'baseui/button';
import { Select, TYPE } from 'baseui/select';
import { useStyletron } from 'baseui';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const EmployeeSearchInput = ({options, isLoading, onInputChange}) => {
    const [css] = useStyletron();
    const[value, setValue] = React.useState();
    const history = useHistory();
    return (
        <div className={css({display: 'flex'})}>
            <Select 
                type={TYPE.search} 
                options={options} 
                placeholder="e.g. John Doe"
                labelKey="label"
                value={value}
                onChange={params => setValue(params.option)}
                onInputChange={onInputChange}
                isLoading={isLoading}
                />
            <Button onClick={() => {history.push(`/overview?name=${value.label}`)}}>Search</Button>
        </div>
    )
}

EmployeeSearchInput.propTypes = {
    options: PropTypes.array.isRequired,
    isLoading: PropTypes.bool,
    onInputChange: PropTypes.func
}

export default EmployeeSearchInput;