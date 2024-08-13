import React, { ReactElement } from 'react'

interface ListItemProps {
    children: React.ReactNode
}

export const ListItem = ({ children }: ListItemProps) => {
    return (
        <li className='hover:bg-bghighlight hover:text-highlight cursor-pointer py-1 pl-2 rounded font-light'>{children}</li>
    )
}
