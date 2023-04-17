
export const CUSTOM_STYLES = {

  option: (provided: any, state: any) => ({
    ...provided,
    color: state.isSelected ?? 'black',
    backgroundColor: state.isSelected ?? 'white',
    overflowX: 'hidden'
  }),

  dropdownIndicator: (provided: any, state: any) => ({
    ...provided,
    transform: state.selectProps.menuIsOpen && 'rotate(180deg)'
  }),

  indicatorSeparator: (provided: any) => ({
    ...provided,
    display: 'none'
  }),

  control: (provided: any, state: any) => ({
    border: state.selectProps.error
      ? '0.0625rem solid #f04438'
      : '0.0625rem solid #ccc',
    borderRadius: '0.5rem',
    padding: '  0.25rem',
    display: 'flex'
  }),

  valueContainer: (provided: any) => ({
    ...provided,
    maxHeight: 80,
    overflow: 'auto'
  })
};