/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from 'react';
import Select, { ActionMeta, MultiValue, SingleValue } from 'react-select';
import { ISelectProps } from './select.types';
import { ISelectOptionsProps } from "../../interface";
import { CUSTOM_STYLES } from '../../utils/constants/style';

const CustomSelect: React.FC<Partial<ISelectProps>> = React.forwardRef(({ isMulti = false, dropdownOptions, selectedOptions, disabled = false, isAutoFocus, isSearchable = true, handleChangeSelect, name, menuPlacement = "top", placeholder, activityFieldCount = 0, dayCount = 0, hideSelectedOptions = true, index = 0 }, ref) => {

  const getOptionValue = useCallback(
    (option: ISelectOptionsProps | ISelectOptionsProps[]) => {
      return !Array.isArray(option) ? (option.id ? option.id.toString() : '') : '';
    },
    [dropdownOptions]
  );

  const onChange = (newValue: MultiValue<ISelectOptionsProps> | SingleValue<ISelectOptionsProps>, actionMeta: ActionMeta<ISelectOptionsProps>,) => {
    handleChangeSelect && handleChangeSelect(newValue, actionMeta, activityFieldCount, dayCount, index);
  };

  return (
    <div>
      <Select
        styles={{ ...CUSTOM_STYLES }}
        name={name}
        isMulti={isMulti}
        options={dropdownOptions}
        value={selectedOptions}
        hideSelectedOptions={hideSelectedOptions}
        closeMenuOnSelect={true}
        menuShouldScrollIntoView={true}
        isDisabled={disabled}
        menuPlacement={menuPlacement}
        maxMenuHeight={200}
        autoFocus={isAutoFocus}
        onChange={onChange}
        isClearable={false}
        getOptionValue={getOptionValue}
        isSearchable={isSearchable}
        backspaceRemovesValue={false}
        placeholder={placeholder}
      />
    </div>
  )
})

export default CustomSelect
