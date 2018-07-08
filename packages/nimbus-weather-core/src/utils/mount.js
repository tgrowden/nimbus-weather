import React from 'react'
import { MemoryRouter as Router } from 'react-router-dom'
import { mount } from 'enzyme'

export default node => mount(<Router>{node}</Router>)
