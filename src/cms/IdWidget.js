import React, { useCallback, useEffect, useMemo } from 'react';
import uniqid from 'uniqid';

export const IdWidget = props => {
  const { forID, onChange, classNameWrapper } = props;
  const uuidValue = useMemo(() => uniqid(), []);

  const handleChange = useCallback(event => {
    const target = event.target;
    const newValue = target.value.trim();
    onChange(newValue);
  }, []);

  useEffect(() => {
    onChange(uuidValue);
  }, []);

  return (
    <>
      <input
        id={forID}
        className={classNameWrapper}
        value={uuidValue}
        onChange={handleChange}
        readOnly
        disabled
      />
    </>
  );
};
