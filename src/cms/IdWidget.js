import React, { useCallback } from 'react';
import uniqid from 'uniqid';

export const IdWidget = props => {
  const { forID, value, onChange, classNameWrapper } = props;

  const handleChange = useCallback(event => {
    const target = event.target;
    const newValue = target.value.trim();
    onChange(newValue);
  }, []);

  return (
    <>
      <input
        type="hidden"
        id={forID}
        className={classNameWrapper}
        value={value || uniqid()}
        onChange={handleChange}
      />
      <div>{value || uniqid()}</div>
    </>
  );
};
