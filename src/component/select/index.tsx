/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from 'react';
import Select, { ActionMeta, MultiValue, SingleValue } from 'react-select';
import { ISelectOptions, ISelectProps } from './select.types';

const CustomSelect: React.FC<Partial<ISelectProps>> = ({ isMulti = false, dropdownOptions, selectedOptions, disabled = false, isAutoFocus, isSearchable = true, handleChangeSelect, name, menuPlacement = "top", hideSelectedOptions = false, activityFieldCount = 0, dayCount = 0 }) => {

  const getOptionValue = useCallback(
    (option: ISelectOptions | ISelectOptions[]) => {
      return !Array.isArray(option) ? (option.id ? option.id.toString() : '') : '';
    },
    [dropdownOptions]
  );

  const onChange = (newValue: MultiValue<ISelectOptions> | SingleValue<ISelectOptions>, actionMeta: ActionMeta<ISelectOptions>) => {
    handleChangeSelect && handleChangeSelect(newValue, actionMeta, activityFieldCount, dayCount);
  }

  return (
    <div>
      <Select
        name={name}
        isMulti={isMulti}
        options={dropdownOptions}
        value={selectedOptions}
        hideSelectedOptions={false}
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
      />
    </div>
  )
}

export default CustomSelect