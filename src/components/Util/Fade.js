import React from 'react';
import { Transition } from 'react-transition-group';

const duration = 800;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 1 },
  entered:  { opacity: 1 },
  exiting:  { opacity: 0 },
  exited:  { opacity: 0 },
};

export default function Fade(props) {
    let { in: inProp } = props;
    let { component } = props

    return (
        <Transition in={inProp} timeout={duration}>
        {state => (
        <div style={{
            ...defaultStyle,
            ...transitionStyles[state]
        }}>
            {component}
        </div>
        )}
    </Transition>
    );
}