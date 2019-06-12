// OK
import React from "react";
import { BaseTextField } from "components/BaseComponents";
import LoadingIndicator from "components/LoadingIndicator";
import { MenuItem } from "@material-ui/core";
import DirectorListQuery from "pages/Directors/DirectorListQuery";

function DirectorSelect({ name, label, required, fullWidth, margin }) {
  return (
    <DirectorListQuery>
      {({ directors, loading }) => (
        <BaseTextField
          select
          name={name}
          label={label}
          fullWidth={fullWidth}
          required={required}
          margin={margin}
        >
          <MenuItem value="">
            {loading ? <LoadingIndicator /> : <em>None</em>}
          </MenuItem>
          {directors
            ? directors.map(director => (
                <MenuItem key={director.id} value={director.id}>
                  {director.name}
                </MenuItem>
              ))
            : null}
        </BaseTextField>
      )}
    </DirectorListQuery>
  );
}

export default DirectorSelect;
