import React, { useEffect, useMemo } from 'react';
import uniqid from 'uniqid';

export const IdWidget = props => {
  const { forID, value, onChange, classNameWrapper } = props;
  const uuidValue = useMemo(() => value || uniqid(), [value]);

  useEffect(() => {
    if (!value) {
      onChange(uuidValue);
    }
  }, [value]);

  return (
    <>
      <input
        type="text"
        id={forID}
        className={classNameWrapper}
        defaultValue={uuidValue}
        readOnly
        disabled
      />
    </>
  );
};
