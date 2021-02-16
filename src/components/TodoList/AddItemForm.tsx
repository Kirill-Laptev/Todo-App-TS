import React from 'react'

type AddItemPropsType = {
    addItem: (inputValue: string) => void
}

const AddItemForm: React.FC<AddItemPropsType> = (props) => {

    const [error, setError] = React.useState<string | null>(null)
    const [value, setValue] = React.useState<string>('')  // Тип ???
    
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
        <input
          type='text'
          className={error ? "error" : ""}
          onChange={onChangeHandler}
          onKeyPress={onPressKeyHandler}
          value={value}/>
        <button onClick={onAddItemHandler}>+</button>
      </div>
      {error && <div className='error__message'>{error}</div>}
    </>
  )
}

export default AddItemForm
