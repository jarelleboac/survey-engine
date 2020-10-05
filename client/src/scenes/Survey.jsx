import React from 'react';
import { useForm } from 'react-hook-form';
import {
    Label,
    Input,
    Select,
    Textarea,
    // Radio,
    Checkbox,
    // Slider,
    // Box,
    Flex,
    Button,
    Container,
    Text
} from 'theme-ui'

import { commonQuestions } from '../../../common/schema.js'

const MappedOptions = ({options}) => options.map(option => <>  
    <Label mb={3} key={option}>
        <Checkbox />
        {option}
    </Label>
</>)

const CustomCheckbox = ({ question }) => {
    return (
        <>  
            <Text
                sx={{
                    fontSize: 4,
                    fontWeight: 'bold',
                }}>
                {question.question}
            </Text>
            <MappedOptions options={question.options} />
        </>)
}

const CustomRadio = ({question}) => {

    return (<>
        <Flex mb={1}>
            {/* {question.options.map(option => <Label>
                <Radio name={question.id} />{option}
            </Label>)} */}

        </Flex>
    </>)
}

consquestionToComponent = (question) => {
    if (question.component === "Checkbox") {
        return (<CustomCheckbox question={question} />)
    } else if (question.component === "Radio") {
        return (<CustomRadio question={question} />)
    }
    return (<></>)
}

/**
 * Progress bar that shows how far we are in the survey
 */

/**
 *
 */

// // The following component is an example of your existing Input Component
// const CustomInput = ({ label, register, required }) => (
//     <>
//         <label>{label}</label>
//         <input name={label} ref={register({ required })} />
//     </>
// );

// // you can use React.forwardRef to pass the ref too
// const CustomSelect = React.forwardRef(({ label, register }, ref) => (
//     <>
//         <label>{label}</label>
//         <select name={label} ref={ref}>
//             <option value="20">20</option>
//             <option value="30">30</option>
//         </select>
//     </>
// ));

export function Survey() {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data) => console.log(data);

    return (
        <>
            <Container
                as='form'
                onSubmit={handleSubmit(onSubmit)}
                sx={{width: '80%', height: '80%', top: '50%'}}
                className="survey">
                <Label htmlFor='firstName'>First name</Label>
                <Input
                    name='firstName'
                    id='firstName'
                    mb={3}
                    ref={register({required: true})}
                />
                {errors.firstName && <p>This field is required</p>}
                <Label htmlFor='lastName'>Last name</Label>
                <Input
                    type='lastName'
                    name='lastName'
                    id='lastName'
                    mb={3}
                    ref={register({required: true})}
                />
                {errors.lastName && <p>This field is required</p>}

                {/* <Box>
                    <Label mb={3}>
                        <Checkbox />
      Remember me
                    </Label>
                </Box> */}
                <Label htmlFor='major'>Major</Label>
                <Select name='major' id='major' mb={3} ref={register}>
                    <option>CS</option>
                    <option>Math</option>
                    <option>Physics</option>
                </Select>
                <Label htmlFor='comment'>Comment</Label>
                <Textarea
                    name='comment'
                    id='comment'
                    rows='6'
                    mb={3}
                    ref={register}
                />
                {/* <Flex mb={3}>
                        <Label>
                            <Radio name='letter' /> Alpha
                        </Label>
                        <Label>
                            <Radio name='letter' /> Bravo
                        </Label>
                        <Label>
                            <Radio name='letter' /> Charlie
                        </Label>
                    </Flex> */}
                {commonQuestions.map(question => { return(questionToComponent(question))})}
                <Button>Submit</Button>
                
            </Container>

            {/* <form onSubmit={handleSubmit(onSubmit)}>
                <CustomInput label="First Name" register={register} required />
                <CustomSelect label="Age" ref={register} />
                <input type="submit" />
            </form> */}
        </>
    );
}
