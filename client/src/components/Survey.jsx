import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Flex, Button } from 'rebass'
import {
    Label,
    Input,
    Select,
    Textarea,
    Radio,
    Checkbox,
} from '@rebass/forms'

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
            <Box
                as='form'
                onSubmit={e => e.preventDefault()}
                py={3}>
                <Flex mx={-2} mb={3}>
                    <Box width={1/2} px={2}>
                        <Label htmlFor='name'>Name</Label>
                        <Input
                            id='name'
                            name='name'
                            defaultValue='Jane Doe'
                        />
                    </Box>
                    <Box width={1/2} px={2}>
                        <Label htmlFor='location'>Location</Label>
                        <Select
                            id='location'
                            name='location'
                            defaultValue='NYC'>
                            <option>NYC</option>
                            <option>DC</option>
                            <option>ATX</option>
                            <option>SF</option>
                            <option>LA</option>
                        </Select>
                    </Box>
                </Flex>
                <Flex mx={-2} flexWrap='wrap'>
                    <Label width={[ 1/2, 1/4 ]} p={2}>
                        <Radio
                            id='beep'
                            name='beep'
                            value='beep'
                            defaultChecked
                        />
                        Beep
                    </Label>
                    <Label width={[ 1/2, 1/4 ]} p={2}>
                        <Radio
                            id='boop'
                            name='beep'
                            value='boop'
                        />
                        Boop
                    </Label>
                    <Label width={[1/2, 1/4]} p={2}>
                        <Checkbox
                            id='remember'
                            name='remember'
                        />
                        Remember Me
                    </Label>
                    <Box px={2} ml='auto'>
                        <Button>
                        Beep
                        </Button>
                    </Box>
                </Flex>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input label="First Name" register={register} required />
                <Select label="Age" ref={register} />
                <input type="submit" />
            </form>
        </>
    );
}
