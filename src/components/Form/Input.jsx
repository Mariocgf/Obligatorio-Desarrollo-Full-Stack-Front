import { useId } from "react";

const Input = ({ label, required, type, options, name, register }) => {
    const id = useId();    
    return (
        <div className="flex flex-col">
            <label className="mb-2 font-semibold" htmlFor={id}>{label}</label>
            {type === 'select' ?
                <select id={id} className="border border-gray-300 rounded p-2" {...register(name, { required })}>
                    <option value="">Seleccione una opción</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                :
                <input
                    type={type}
                    className="border border-gray-300 rounded p-2"
                    id={id}
                    name={name}
                    {...register(name)}
                />
            }
        </div>
    );
};

export default Input;

