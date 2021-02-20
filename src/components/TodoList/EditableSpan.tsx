import { TextField } from '@material-ui/core'
import React from 'react'

type EditableSpanPropsType = {
    title: string
    editTaskTitle: (value: string) => void
}

const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {

    const [editMode, setEditMode] = React.useState<boolean>(false)
    const [value, setValue] = React.useState<string>('')

    const onInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value)
    }

    const onSpanClickHandler = () => {
        setEditMode(true)
        setValue(props.title)
    }
    const onBlurHandler = () => {
        props.editTaskTitle(value)
        setEditMode(false)
    }

    return (
        <>
        {editMode 
            ? <TextField
            type='text' 
            autoFocus={true} 
            onChange={onInputChangeHandler} 
            onBlur={onBlurHandler}
            value={value}   
            />
            : <span onDoubleClick={onSpanClickHandler}>{props.title}</span> 
        }
        </>
    )
}

export default EditableSpan
