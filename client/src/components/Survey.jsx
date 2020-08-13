import React from 'react';
import { useForm } from 'react-hook-form';


/**
 * Frame that sets the logo
 */

/**
 * Progress bar that shows how far we are in the survey
 */

/**
 *
 */

// The following component is an example of your existing Input Component
const CustomInput = ({ label, register, required }) => (
    <>
        <label>{label}</label>
        <input name={label} ref={register({ required })} />
    </>
);

// you can use React.forwardRef to pass the ref too
const CustomSelect = React.forwardRef(({ label, register }, ref) => (
    <>
        <label>{label}</label>
        <select name={label} ref={ref}>
            <option value="20">20</option>
            <option value="30">30</option>
        </select>
    </>
));

export function Survey() {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => console.log(data);

    return (
        <>
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <CustomInput label="First Name" register={register} required />
                <CustomSelect label="Age" ref={register} />
                <input type="submit" />
            </form>
        </>
    );
}
