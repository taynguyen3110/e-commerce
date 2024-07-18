import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const One = () => {
  const navigate = useNavigate();

  return (
    <div>One

      <a onClick={() => navigate('Oneone')}>Oneone</a>
      <a onClick={() => navigate('Onetwo')}>Onetwo</a>
    </div>
  )
}

export default One