import React from 'react';
import { useForm } from 'react-hook-form';
import {
    Label,
    Input,
    Select,
    Textarea,
    Radio,
    Checkbox,
    Slider,
    Box,
    Flex,
    Button,
    Container
} from 'theme-ui'

import {commonQuestions} from '../../../common/schema.js'

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
            <Container
                as='form'
                onSubmit={e => e.preventDefault()}
                sx={{width: '80%', height: '80%', top: '50%'}}>
                <Label htmlFor='username'>Username</Label>
                <Input
                    name='username'
                    id='username'
                    mb={3}
                />
                <Label htmlFor='password'>Password</Label>
                <Input
                    type='password'
                    name='password'
                    id='password'
                    mb={3}
                />
                <Box>
                    <Label mb={3}>
                        <Checkbox />
      Remember me
                    </Label>
                </Box>
                <Label htmlFor='sound'>Sound</Label>
                <Select name='sound' id='sound' mb={3}>
                    <option>Beep</option>
                    <option>Boop</option>
                    <option>Blip</option>
                </Select>
                <Label htmlFor='comment'>Comment</Label>
                <Textarea
                    name='comment'
                    id='comment'
                    rows='6'
                    mb={3}
                />
                <Flex mb={3}>
                    <Label>
                        <Radio name='letter' /> Alpha
                    </Label>
                    <Label>
                        <Radio name='letter' /> Bravo
                    </Label>
                    <Label>
                        <Radio name='letter' /> Charlie
                    </Label>
                </Flex>

                <Button>
    Submit
                </Button>
            </Container>

            {/* <form onSubmit={handleSubmit(onSubmit)}>
                <CustomInput label="First Name" register={register} required />
                <CustomSelect label="Age" ref={register} />
                <input type="submit" />
            </form> */}

        </>
    );
}
