import React from 'react'
import PropTypes from 'prop-types'

const Toggle = (props) => {
  const [clicked, setClicked] = React.useState(false)

  return (
    <div
      onClick={() => setClicked(!clicked)}
      className={`cursor-pointer h-6 w-10 rounded-full p-1 ring-1 ring-inset transition duration-200 ease-in-out inline-block ml-2 ${
        clicked ? 'bg-indigo-600 ring-black/20 ' : 'bg-slate-900/10 ring-slate-900/5'
      }`}
    >
      <div
        className={`h-4 w-4 rounded-full bg-white shadow-sm ring-1 ring-slate-700/10 transition duration-200 ease-in-out ${
          clicked && 'translate-x-4'
        }`}
      ></div>
    </div>
  )
}

Toggle.propTypes = {}

export default Toggle
