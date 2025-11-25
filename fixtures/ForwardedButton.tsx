import React from 'react';

/** Props for the Button component */
type ButtonProps = {
    /** Text to show inside the button */
    label: string;
    /** Optional click handler */
    onClick?: () => void;
    children?: React.ReactNode;
};

// TypeError: Cannot read properties of undefined (reading 'length')
export const ForwardedButton = React.forwardRef((props: ButtonProps, ref: any) => (
    <button ref={ref} className="ForwardedButton">
        {props.children}
    </button>
));

/** A simple button component */
const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
    // You can now get a ref directly to the DOM button:
    const ref = React.createRef();

    return <ForwardedButton ref={ref} label={label}>{label}</ForwardedButton>;;
};
