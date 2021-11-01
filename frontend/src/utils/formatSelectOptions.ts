interface SelectOption {
  label: string;
  value: any;
}

const formatSelectOptions = (
  data: any[],
  labelField: string,
  valueField: string,
): SelectOption[] => data.map((item) => ({
  label: item[labelField],
  value: item[valueField],
}));

export default formatSelectOptions;
