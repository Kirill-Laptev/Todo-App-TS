import React from 'react'

type ErrorMessagePropsType = {
    error: string
}

const errorStyles = {
    fontSize: '14px',
    color: 'red',
    position: 'absolute' as const,
    bottom: '-18px',
    left: '0'
}

const ViewError:React.FC<ErrorMessagePropsType> = ({error}) => {
    return (
        <div style={errorStyles}>
            {error}
        </div>
    )
}

export default ViewError
