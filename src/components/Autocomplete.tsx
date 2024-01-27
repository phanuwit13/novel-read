import { Combobox, Transition } from '@headlessui/react'
import cn from 'classnames'
import { Fragment, useMemo, useState } from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'
import Icons from './Icon'
import { FixedSizeList as List, ListChildComponentProps } from 'react-window'

export interface SelectionItem {
  value: string | number
  label: string
}

export default function Autocomplete({
  value = null,
  onChange,
  onBlur,
  label,
  options,
  error,
  id,
  require,
  disabled,
}: {
  value?: SelectionItem | null
  onChange: (e:unknown)=>void
  onBlur: React.FocusEventHandler<HTMLInputElement> | undefined
  label: string
  options: SelectionItem[]
  error?:
  | Merge<
    FieldError,
    FieldErrorsImpl<{
      value: string
      label: string
    }>
  >
  | undefined
  id?: string
  require?: boolean
  disabled?: boolean
}) {
  const [query, setQuery] = useState('')

  const filteredPeople = useMemo(() => {
    return query === ''
      ? options
      : options.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
      )
  }, [query,options])


  const handleChangeValue = (e: unknown) => {
    onChange?.(e)
  }

  const Row = ({ index, style }: ListChildComponentProps) => {
    const v = filteredPeople[index]
    return (
      <Combobox.Option
        key={`selection-${index}`}
        className={`relative cursor-default select-none py-2 pl-10 pr-4 hover:bg-[#f0f8e2] dark:hover:bg-gray-800 hover:text-[#8DA861ff] ${value?.value === v.value
          ? 'bg-[#f0f8e2] text-[#8DA861ff]'
          : 'text-gray-900 dark:text-white'
          }`}
        value={v}
        style={style}
      >
        <span
          className={`block truncate ${value?.value === v.value
            ? 'font-medium'
            : 'font-normal'
            }`}
        >
          {v.label}
        </span>
        {value?.value === v.value && (
          <span
            className={`absolute inset-y-0 left-0 flex items-center pl-3 text-[#8DA861ff]`}
          >
            <Icons name='Check' />
          </span>
        )}
      </Combobox.Option>
    )
  }

  return (
    <div>
      <div>
        {label && (
          <label htmlFor={id} className='font-[500] text-[16px] text-slate-900 dark:text-white'>
            {label} {require && <span className='text-red-500'>*</span>}
          </label>
        )}
        <Combobox disabled={disabled} value={value} onChange={handleChangeValue}>
          <div className='relative mt-1'>
            <div className='relative w-full cursor-default rounded-lg bg-white dark:bg-gray-700 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-[#8DA861ff]'>
              <Combobox.Button className='w-full '>
                <Combobox.Input
                  id={id}
                  className={cn(
                    'block w-full py-2.5 dark:text-white text-gray-700 placeholder-gray-400/70 bg-white dark:bg-gray-700 disabled:bg-gray-100  border border-gray-200 rounded-lg pl-5 pr-8 focus:border-[#8DA861ff] focus:ring-green-800 focus:outline-none focus:ring focus:ring-opacity-40',
                    {
                      'border-red-500': error,
                    }
                  )}
                  displayValue={(item: SelectionItem | null) =>
                    item?.label || ''
                  }
                  onChange={(event) => setQuery(event.target.value)}
                  onBlur={onBlur}
                />
                <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                  <Icons className='text-gray-400' name='ChevronsUpDown' />
                </div>
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
              afterLeave={() => setQuery('')}
            >
              <Combobox.Options className='z-[1] border border-gray-100 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-700 py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                {filteredPeople.length === 0 && query !== '' ? (
                  <div className='relative cursor-default select-none py-2 px-4 dark:text-white text-gray-700'>
                    Nothing found.
                  </div>
                ) : (
                  <List
                    height={229}
                    itemCount={filteredPeople.length}
                    itemSize={40}
                    width='100%'
                  >
                    {Row}
                  </List>
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>
      {Boolean(error) && (
        <div className='text-red-500 text-[12px] mt-1 ml-1'>
          {error?.message}
        </div>
      )}
    </div>
  )
}
