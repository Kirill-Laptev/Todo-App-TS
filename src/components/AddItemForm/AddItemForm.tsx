import { IconButton, TextField } from '@material-ui/core'
import { AddBox } from '@material-ui/icons'
import React from 'react'
import { StatusType } from '../../state/app-reducer'

export type AddItemPropsType = {
    addItem: (inputValue: string) => void
    disabled?: boolean
}

export const AddItemForm: React.FC<AddItemPropsType> = (props) => {

    console.log('AddItem render')

    const [error, setError] = React.useState<string | null>(null)
    const [value, setValue] = React.useState<string>('')  
    
    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setValue(event.currentTarget.value)
    }

    const onPressKeyHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.charCode === 13){
            onAddItemHandler()
        }
    }

    const onAddItemHandler = () => {
        if(value.trim()){    
            props.addItem(value.trim())
            setValue('')
        } else{
            setError('Field is required')
        }
    }

  return (
    <>
      <div>
        <TextField
          disabled={props.disabled}
          variant='outlined'
          type='text'
          label='Title'
          helperText={error}
          error={!!error}
          onChange={onChangeHandler}
          onKeyPress={onPressKeyHandler}
          value={value}/>
        <IconButton color='primary' disabled={props.disabled} onClick={onAddItemHandler}>
          <AddBox />
        </IconButton>
      </div>
    </>
  )
}

export default React.memo(AddItemForm)