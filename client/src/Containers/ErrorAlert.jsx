import { Alert, Stack } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

const ErrorAlert = ({ errors , setErrors}) => 

    // const handleSubmit = (alertID) => {
    //     setErrors( errors.filter( (val) => alertID !== val.id));
    //     // console.log('ealert lngth : ' , errors.length);
    //     // console.log('ealert : ' , errors);
    // };

    // let alertComponent = errors.length && 
    //     errors.map( error => (
    //         <Alert onClose={() => {handleSubmit()}}>{error}</Alert>
    //     ));

    // useEffect(() => {
    //     // alertComponent = errors.length && 
    //     //     errors.map( error => (
    //     //         <Alert onClose={() => {handleSubmit()}}>{error}</Alert>
    //     //     ))

    //     console.log('rnng');
    
    //     return () => {
    //         alertComponent = null;
    //     };
    // }, [JSON.stringify(errors)]);
    

    // if(errors.length === 0) return null;

    // return (errors.length === 0) ? 
    //         null :
         (

                <div
                    style={{
                        width : '50%',
                        position: 'absolute',
                        zIndex: '3',
                        top: '3%',
                        left: '25%'
                    }}
                >
                    {/* { console.log('ealert 1: ' , errors) } */}
                    <Stack spacing={1}>
                        {
                            errors.length && 
                            errors.map( error => (
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
            )
        
;

ErrorAlert.propTypes = {
    errors: PropTypes.arrayOf(PropTypes.object).isRequired,
    setErrors: PropTypes.func.isRequired
};


export default ErrorAlert
