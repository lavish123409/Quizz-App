import { Alert, Stack } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

const ErrorAlert = ({ errors , setErrors}) => (
    <div
        style={{
            width : '50%',
            position: 'absolute',
            zIndex: '3',
            top: '3%',
            left: '25%'
        }}
    >
        {/** Stack to hold multiple error alerts */}
        <Stack spacing={1}>
            {
                errors.length && 
                errors.map( error => (
                    /** The Error Alert */
                    <Alert 
                        onClose={() => setErrors( errors.filter( (val) => error.id !== val.id))}
                        key={error.id}
                        severity="error"
                        variant="filled"
                    >
                        {error.msg}
                    </Alert>
                ))
            }
        </Stack>
    </div>
);

ErrorAlert.propTypes = {
    errors: PropTypes.arrayOf(PropTypes.object).isRequired,
    setErrors: PropTypes.func.isRequired
};


export default ErrorAlert
