import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

const renderComponent = (props = {}, state = null) => {
    const wrapper = shallow(<App {...props} />);
    if (state) {
        wrapper.setState(state)
    }
    return wrapper;
}

const getElement = (wrapper, id) => {
    return wrapper.find(`[data-test-id="${id}"]`)
}

describe('renders the component with all its elements', () => {
    test('renders the component', () => {
        const wrapper = renderComponent()
        const appCompoent = getElement(wrapper, 'app-component-id')
        expect(appCompoent.length).toBe(1)
    });

    test('renders counter display message', () => {
        const wrapper = renderComponent()
        const counterDisplay = getElement(wrapper, 'counter-display-element-id')
        expect(counterDisplay.length).toBe(1)
    });

    test('renders increment button', () => {
        const wrapper = renderComponent()
        const incrementButton = getElement(wrapper, 'increment-button-element-id')
        expect(incrementButton.length).toBe(1)
    });

    test('renders decrement button', () => {
        const wrapper = renderComponent()
        const decrementButton = getElement(wrapper, 'decrement-button-element-id')
        expect(decrementButton.length).toBe(1)
    });

    //test('renders error message only on click and not when counter is 0', () => {
    //    const counter = 0;
    //    const wrapper = renderComponent(null, { counter })
    //    const counterErrorDisplay = getElement(wrapper, 'counter-error-display-element-id')
    //    expect(counterErrorDisplay.length).toBe(0)
    //})
});

describe('test component state', () => {
    test('should render default counter state 0', () => {
        const wrapper = renderComponent();
        const counterState = wrapper.state('counter');
        expect(counterState).toBe(0);
    });
});

describe('test increment action', () => {
    test('clicking increment button increment the count', () => {
        const counter = 7
        const wrapper = renderComponent(null, { counter })
        const incrementButton = getElement(wrapper, 'increment-button-element-id')
        incrementButton.simulate('click');
        const counterDisplay = getElement(wrapper, 'counter-display-element-id')
        expect(counterDisplay.text()).toContain(counter + 1)
    });

    test('clicking decrement button decrements the counter', () => {
        const counter = 7
        const wrapper = renderComponent(null, { counter })
        const decrementButton = getElement(wrapper, 'decrement-button-element-id')
        decrementButton.simulate('click');
        const counterDisplay = getElement(wrapper, 'counter-display-element-id')
        expect(counterDisplay.text()).toContain(counter - 1)

    });

    test('click decrement button at counter 0 does not decrement the counter', () => {
        const counter = 0
        const wrapper = renderComponent(null, { counter })
        const decrementButton = getElement(wrapper, 'decrement-button-element-id')
        decrementButton.simulate('click');
        const counterDisplay = getElement(wrapper, 'counter-display-element-id')
        expect(counterDisplay.text()).toContain(counter)
    })

    test('click decrement button at counter 0 shows error message', () => {
        const counter = 0
        const wrapper = renderComponent(null, { counter })
        const decrementButton = getElement(wrapper, 'decrement-button-element-id')
        let counterErrorDisplay = getElement(wrapper, 'counter-error-display-element-id')
        expect(counterErrorDisplay.length).toBe(0) //before click

        decrementButton.simulate('click')
        counterErrorDisplay = getElement(wrapper, 'counter-error-display-element-id')
        expect(counterErrorDisplay.length).toBe(1)
    });

    test('click increment button at counter 0 does not show error message', () => {
        const counter = 0
        const wrapper = renderComponent(null, { counter })
        const incrementButton = getElement(wrapper, 'increment-button-element-id')
        incrementButton.simulate('click')
        const counterErrorDisplay = getElement(wrapper, 'counter-error-display-element-id')
        expect(counterErrorDisplay.length).toBe(0)
    });

});


