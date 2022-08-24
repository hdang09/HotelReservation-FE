import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'

const Input = forwardRef(
  (
    {
      label = 'Input',
      type = 'text',
      placeholder = 'Type here to search',
      children,
      noLabel = false,
      className: propClassName,
      selectRooms = false,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="p-2 ">
        {!noLabel && (
          <label className="block pb-2" htmlFor={label}>
            {label}
          </label>
        )}
        {selectRooms ? (
          <select
            id={label}
            className={`drop-shadow-md py-[0.6rem] px-4 rounded-lg min-w-[20rem] focus:outline-[orange] ${propClassName}`}
            ref={ref}
            {...props}
          >
            <option value="" disabled="">
              ======= 1st Floor =======
            </option>
            <option value="101">101</option>
            <option value="102">102</option>
            <option value="103">103</option>
            <option value="104">104</option>
            <option value="105">105</option>
            <option value="106">106</option>
            <option value="107">107</option>
            <option value="108">108</option>
            <option value="" disabled="">
              ======= 2nd Floor =======
            </option>
            <option value="201">201</option>
            <option value="202">202</option>
            <option value="203">203</option>
            <option value="204">204</option>
            <option value="205">205</option>
            <option value="206">206</option>
            <option value="207">207</option>
            <option value="208">208</option>
            <option value="" disabled="">
              ======= 3rd Floor =======
            </option>
            <option value="301">301</option>
            <option value="302">302</option>
            <option value="303">303</option>
            <option value="304">304</option>
            <option value="305">305</option>
            <option value="306">306</option>
            <option value="307">307</option>
            <option value="308">308</option>
            <option value="" disabled="">
              ======= 4th Floor =======
            </option>
            <option value="401">401</option>
            <option value="402">402</option>
            <option value="403">403</option>
            <option value="404">404</option>
            <option value="405">405</option>
            <option value="406">406</option>
            <option value="407">407</option>
            <option value="408">408</option>
            <option value="" disabled="">
              ======= 5th Floor =======
            </option>
            <option value="501">501</option>
            <option value="502">502</option>
            <option value="503">503</option>
            <option value="504">504</option>
            <option value="505">505</option>
            <option value="506">506</option>
            <option value="507">507</option>
            <option value="508">508</option>
          </select>
        ) : (
          <input
            id={label}
            className={`drop-shadow-md py-[0.6rem] px-4 rounded-lg min-w-[20rem] focus:outline-[orange] ${propClassName}`}
            type={type}
            placeholder={placeholder}
            ref={ref}
            {...props}
          />
        )}
      </div>
    )
  },
)

Input.propTypes = {}

export default Input
