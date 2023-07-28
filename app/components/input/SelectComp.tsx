'use client';
import { useEffect, useState } from 'react';
import Select from 'react-select';

interface SelectCompProps {
  placeholder: string;
  options: any[];
  onChange: (value: string) => void;
  small?: boolean;
  isSearchable?: boolean;
  isClearable?: boolean;
  defaultValue?: string | null;
  name?: string;
  disabled?: boolean;
}

const SelectComp: React.FC<SelectCompProps> = ({
  onChange,
  placeholder,
  name,
  options,
  small,
  isSearchable = false,
  isClearable = false,
  defaultValue,
  disabled,
}) => {
  const [initValue, setInitValue] = useState<string | null>(null);

  useEffect(() => {
    defaultValue && setInitValue(defaultValue);
  }, [defaultValue]);

  return (
    <div className='w-full sm:w-auto'>
      <Select
        placeholder={placeholder}
        options={options}
        name={name}
        value={options.find((option) => option.value === initValue)}
        isSearchable={isSearchable}
        isClearable={isClearable}
        onChange={(value) => onChange(value?.value as string)}
        isDisabled={disabled}
        classNames={{
          control: () =>
            `${small ? 'p-1 text-[14px] sm:text-sm' : 'p-3 text-sm'} border-2`,
          input: () =>
            `overflow-hidden ${small ? 'text-[14px] sm:text-sm' : 'text-lg'}`,
          option: () =>
            `${
              small ? 'text-[14px] sm:text-sm' : 'text-lg'
            } hover:bg-orange-200`,
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: '#EC662A',
            primary25: '#FF#4#6',
          },
        })}
      />
    </div>
  );
};
export default SelectComp;
