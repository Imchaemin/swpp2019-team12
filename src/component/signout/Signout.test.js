import React from 'react';
import { shallow } from 'enzyme';
import Signout from './Signout';
import axios from 'axios';

describe('<Signout />', () => {
    it('should render without error', () => {
        const component = shallow(<Signout />);
        let wrapper = component.find('.Signout');
        expect(wrapper.length).toBe(1);
    });

    it('should handle signout, when logged in.', async () => {
        axios.get = jest.fn(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 200
                };
                resolve(result);
            });
        });

        const mockHistory = { push: jest.fn() };
        const mockEvent = { preventDefault: jest.fn() };
        const component = shallow(<Signout history={mockHistory} />);
        let wrapper = component.find('#logout-button');
        await wrapper.simulate('click', mockEvent);
        expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
        //expect(mockHistory.push).toHaveBeenCalledWith('/signin');
    });
});