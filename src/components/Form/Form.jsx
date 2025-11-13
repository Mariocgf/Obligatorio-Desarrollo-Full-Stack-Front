import { useForm } from "react-hook-form";
import Input from "./Input";
import ButtonPrimary from "../Button/ButtonPrimary";
import ButtonConfirm from "../Button/ButtonConfirm";

const Form = ({ onSubmit, children, inputs, button, confirm = false, resolver }) => {
    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({
        resolver: resolver,
        mode: 'onChange'
    });

    const handleFormSubmit = async (data) => {
        await onSubmit(data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
            {inputs.map((input) => (
                <Input 
                    key={input.label} 
                    {...input} 
                    register={register}
                    error={errors[input.name]}
                />
            ))}
            {children}
            {confirm ?
                <ButtonConfirm disabled={!isValid}>{button}</ButtonConfirm> :
                <ButtonPrimary disabled={!isValid}>{button}</ButtonPrimary>
            }
        </form>
    );
};

export default Form;
