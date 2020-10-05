import React from 'react';
import { useForm } from 'react-hook-form';
import {
    Label,
    Input,
    // Select,
    Textarea,
    Radio,
    Checkbox,
    // Slider,
    // Box,
    // Flex,
    Button,
    Container,
    Text
} from 'theme-ui'

import { commonQuestions } from '../../../common/schema.js'

// keyword for user input question in checkbox/radio
const specify_question_keyword = "please specify"; 

// an array of keywords of the identifiers in custom input form for checkbox/radio (such that we can remove it later )
const specify_keyword_arrays = [];

const MappedOptions = ({question, register, watch}) => question.options.map(option => {
    // choose check boc based on if we need user to specify
    if(option.includes(specify_question_keyword)) { 
        let identifier = question.id+' '+specify_question_keyword
        specify_keyword_arrays.push(identifier)
        return (
            <>  
                <Label mb={2} key={option} >
                    <Checkbox ref={register({required: true})} value={watch(identifier)} name={question.id}/>
                    {option}
                    <Input name={identifier} ref={register}/>
                </Label>
            </>
        )
    } else {
        return (
            <>  
                <Label mb={2} key={option} >
                    <Checkbox ref={register({required: true})} value={option} name={question.id}/>
                    {option}
                </Label>
            </>
        )
    }
}) 


const CustomRadio = ({question, register, watch, errors}) => {
    // get radio contents based on if we need custom input
    const radioContents = question.options.map(option => {
        if(option.includes(specify_question_keyword)) {
            let identifier = question.id+' '+specify_question_keyword
            specify_keyword_arrays.push(identifier)
            return (
                <Label mb={2}>
                    <Radio value={option} ref={register({required: true})} value={watch(identifier)} name={question.id}/>{option} 
                    <Input name={identifier} ref={register}/>
                </Label>
            )
        } else {
            return (
                <Label mb={2}>
                    <Radio value={option} ref={register({required: true})} name={question.id}/>{option} 
                </Label>
            )
        }
    })

    return (<>
        <Text
            sx={{
                fontSize: 4,
                fontWeight: 'bold',
                marginTop: '3rem',
            }}>
            {question.question}
        </Text>
        {radioContents}
        {errors[question.id] && <p>This field is required</p>}
    </>)
}

const CustomMultiCheckbox = ({ question, register, watch, errors}) => {
    return (
        <>  
            <Text
                sx={{
                    fontSize: 4,
                    fontWeight: 'bold',
                    marginTop: '3rem',
                }}>
                {question.question}
            </Text>
            <MappedOptions question={question} register={register} watch={watch}/>
            {errors[question.id] && <p>This field is required</p>}
        </>)
}

const questionToComponent = (question, register, watch, errors) => {
    if (question.component === "MultiCheckbox") {
        return (<CustomMultiCheckbox question={question} register={register} watch={watch} errors={errors}/>)
    } else if (question.component === "Radio") {
        return (<CustomRadio question={question}  register={register} watch={watch} errors={errors}/>)
    } 
    return (<></>)
}

/**
 * Progress bar that shows how far we are in the survey
 */

export function Survey() {

    const { register, handleSubmit, errors, watch } = useForm();

    const onSubmit = (data) => {
        // remove the keywords for custom input form
        specify_keyword_arrays.forEach(name => {
            delete data[name]
        });
        // log the data for now will connect to backend here
        console.log(data)
    };

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

                <Label htmlFor='comment'>Comment</Label>
                <Textarea
                    name='comment'
                    id='comment'
                    rows='6'
                    mb={3}
                    ref={register}
                />

                {commonQuestions.map(question => { return(questionToComponent(question, register, watch, errors))})}
                
                <Button sx={{mt: '3rem'}}>Submit</Button>
                
            </Container>

        </>
    );
    // TODO styling wise line height styling of checkboxes (white space in front)
}
console.log(commonQuestions)