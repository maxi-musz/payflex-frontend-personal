'use client';

import { FieldError } from "react-hook-form";

type InputProps = {
  key?: number;
  classes?: string;
  valueArray?: string[];
  name?: string;
  label?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  error?: FieldError;
  defaultValue?: string;
  // register: any;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  onChange?: (e: React.ChangeEvent<HTMLOptionElement>) => void;
};

const InputSelectField: React.FC<InputProps> = ({
  // key = null,
  // classes = '',
  // valueArray = [''],
  name="",
  label="",
  // disabled = false,
  // autoFocus = false,
  // error,
  // defaultValue,
  // // register,
  // inputProps,
  // onChange = () => {},
}) => {

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-sm text-neutral-700">{label}</label>
      <div className="px-2 bg-white border border-customGray flex items-center justify-between rounded-radius-8 focus-within:ring-1 focus-within:ring-primary hover:ring-primary">
        {/* <select
          name={name}
          id={name}
          defaultValue={defaultValue}
          {...inputProps}
          // {...register(name)}
          className={`bg-transparent w-full py-[10px] pr-1 border-0 text-xs focus:outline-0 focus:ring-0 capitalize text-[#666666] ${classes}`}
        >
          {valueArray.map((item, index) => (
            <option disabled={disabled} autoFocus={autoFocus} onChange={onChange} key={key || index} value={item}>{item}</option>
          ))}
        </select> */}
      </div>
      
      {/* {error?.message && <p className='text-red-600 text-xs'>{error.message.toString()}</p>} */}
    </div>
  );
};

export default InputSelectField;
