import React from "react";
import { MenuItem } from "@material-ui/core";
import { BaseTextField } from "./BaseComponents";

const MAX_YEAR_OFFSET = 10;

function generateYears(minYear, maxYear) {
  const length = maxYear - minYear + 1;
  return Array.from(Array.from(Array(length).keys(), n => n + minYear));
}

function YearSelect({ name, label, required, fullWidth, margin }) {
  const maxYear = new Date().getFullYear() + MAX_YEAR_OFFSET;
  const years = generateYears(1888, maxYear);
  return (
    <BaseTextField
      select
      name={name}
      label={label}
      fullWidth={fullWidth}
      required={required}
      margin={margin}
    >
      {years.reverse().map(year => (
        <MenuItem key={year} value={year}>
          {year}
        </MenuItem>
      ))}
    </BaseTextField>
  );
}

export default YearSelect;
