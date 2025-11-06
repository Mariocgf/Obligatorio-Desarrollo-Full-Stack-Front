import { useId } from "react";

const Input = ({ type, text }) => {
    const id = useId();
    return (
        <div className="flex flex-col">
            <label htmlFor={id}>{text}</label>
            <input type={type} id={id} />
        </div>

    );
}

export default Input;