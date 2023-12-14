/*eslint-disable*/
import styled, {css} from "styled-components";
import React, { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';


const StyledDatePicker = styled(DatePicker)`
  margin: 10px 0;
  padding: 10px;
  width: 100%;
  border: 1px solid #000000;
  border-radius: 4px;
  &:hover{
    cursor: pointer;
  }
`


function DatePickerUI(props){
  const { selected, onChange } = props;
  return (
    <StyledDatePicker
      selected={selected}
      onChange={onChange}
      dateFormat="yyyy.MM.dd"
      locale={ko}
      minDate={new Date('1900-01-01')}
      maxDate={new Date()}
      shouldCloseOnSelect
      showYearDropdown
      showMonthDropdown
      dropdownMode="select"
    />
  )
  
}

export default DatePickerUI;