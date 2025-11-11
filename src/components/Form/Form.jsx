import { useForm } from "react-hook-form";
import Input from "./Input";
import ButtonPrimary from "../Button/ButtonPrimary";
import ButtonConfirm from "../Button/ButtonConfirm";


const Form = ({ onSubmit, children, inputs, button, confirm = false }) => {
    const { register, handleSubmit, reset } = useForm();

    const handleFormSubmit = async (data) => {
        await onSubmit(data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
            {inputs.map((input) => (
                <Input key={input.label} {...input} register={register} />
            ))}
            {children}
            {confirm ?
                <ButtonConfirm>{button}</ButtonConfirm> :
                <ButtonPrimary>{button}</ButtonPrimary>
            }
        </form>
    );
};

export default Form;
