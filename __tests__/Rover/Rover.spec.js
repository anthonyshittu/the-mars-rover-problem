import * as React from 'react'
import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'
import Rover from '../../src/Rover'
jest.setTimeout(30000)

describe('Rover', () => {
  describe('Empty Plateau', () => {
    const props = {
      xGrid: '',
      yGrid: '',
      xAxis: '',
      yAxis: '',
      direction: '',
      moves: '',
      replay: 0
    }
    const wrapper = mount(<Rover {...props} />)
    it('should render empty component', () => {
      expect(wrapper.find('.wrapper__box').length).toBe(0)
    })
  })
  describe('25 Grid Plateau', () => {
    const props = {
      xGrid: '5',
      yGrid: '5',
      xAxis: '1',
      yAxis: '2',
      direction: 'N',
      moves: 'LMLMLMLMM',
      replay: 1
    }
    const wrapper = mount(<Rover {...props} />)
    it('should render 25 boxes', () => {
      expect(wrapper.find('.wrapper__box').length).toBe(25)
    })
    it('should render 3 path with .prev class', async () => {
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 10000))
      })
      wrapper.setProps({ replay: 2 });
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 10000))
      })
      expect(wrapper.find('.wrapper__box.prev').length).toBe(3)
      expect(wrapper.find('.wrapper__box.invalid').length).toBe(0)
    })
  })
  describe('should render a invalid box', () => {
    const props = {
      xGrid: '5',
      yGrid: '5',
      xAxis: '1',
      yAxis: '2',
      direction: 'N',
      moves: 'LMLMLMLMMMMMMM',
      replay: 1
    }
    const wrapper = mount(<Rover {...props} />)
    it('should render a invalid box', async () => {
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 10000))
      })
      wrapper.setProps({ replay: 2 });
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 10000))
      })
      expect(wrapper.find('.wrapper__box.invalid').length).toBe(1)
    })
  })
})