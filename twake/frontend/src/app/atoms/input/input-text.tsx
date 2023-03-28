/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import React from 'react';

interface InputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    'size'
  > {
  theme?: 'plain' | 'outline';
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  feedback?: string;
  hasError?: boolean;
  multiline?: boolean;
  inputComponent?: React.ReactNode;
  inputClassName?: string;
  className?: string;
  inputRef?: React.Ref<HTMLInputElement | HTMLTextAreaElement>;
}

const baseInputClassName =
  'tw-input block w-full rounded-md focus:ring-1 focus:ring-blue-500 z-0 focus:z-10 dark:text-white text-black text-base ';

export const defaultInputClassName = (theme: 'plain' | 'outline' = 'plain') => {
  return (
    baseInputClassName +
    (theme === 'plain'
      ? 'bg-zinc-100 border-zinc-100 dark:bg-zinc-800 dark:border-zinc-800'
      : 'bg-zinc-50 border-zinc-300 dark:bg-zinc-800 dark:border-zinc-700')
  );
};

export const errorInputClassName = (theme: 'plain' | 'outline' = 'plain') => {
  return (
    baseInputClassName +
    (theme === 'plain'
      ? 'bg-rose-200 border-rose-200 dark:bg-rose-800 dark:border-rose-800'
      : 'bg-rose-50 border-rose-300 dark:bg-rose-900 dark:border-rose-800')
  );
};

export const Input = (props: InputProps) => {
  let inputClassName = props.hasError
    ? errorInputClassName(props.theme)
    : defaultInputClassName(props.theme);
  inputClassName = inputClassName + (props.disabled ? ' opacity-75' : '');

  if (!props.multiline) {
    if (props.size === 'lg') inputClassName = inputClassName + ' h-10 pl-10';
    else if (props.size === 'sm') inputClassName = inputClassName + ' h-7';
    else inputClassName = inputClassName + ' h-9';
  }

  return (
    <>
      {props.inputComponent ||
        (props.multiline ? (
          <textarea
            ref={props.inputRef as React.Ref<HTMLTextAreaElement>}
            className={inputClassName + ' ' + props.inputClassName + ' ' + props.className}
            {..._.omit(props as any, 'label', 'inputClassName', 'className', 'value', 'size')}
          >
            {props.value}
          </textarea>
        ) : (
          <input
            ref={props.inputRef as React.Ref<HTMLInputElement>}
            type="text"
            className={inputClassName + ' ' + props.inputClassName + ' ' + props.className}
            {..._.omit(props, 'label', 'inputClassName', 'className', 'size')}
          />
        ))}
    </>
  );
};
