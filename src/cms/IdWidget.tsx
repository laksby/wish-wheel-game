import React, { ChangeEvent, FC, useCallback } from 'react';
import uniqid from 'uniqid';

interface Props {
  classNameWrapper: string;
  forID: string;
  value: string;
  onChange(value: string): void;
}

export const IdWidget: FC<Props> = props => {
  const { forID, value, onChange, classNameWrapper } = props;

  const handleChange = useCallback((event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
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
