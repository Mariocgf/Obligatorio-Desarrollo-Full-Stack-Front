import { useId } from "react";

const Input = ({ label, required, type, options, name, register, error, placeholder  }) => {
    const id = useId();
    
    return (
        <div className="flex flex-col">
            {label && <label className="mb-2 font-semibold" htmlFor={id}>{label}</label>}
            {type === 'select' ?
                <select 
                    id={id} 
                    className="border border-gray-300 rounded p-2" 
                    {...register(name, { required })}
                >
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
                    placeholder={placeholder}
                    {...register(name)}
                />
            }
            {error && (
                <span className="text-red-500 px-4 py-2 bg-red-300 w-full rounded-md mt-2">
                    {error.message}
                </span>
            )}
        </div>
    );
};

export default Input;

