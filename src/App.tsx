import { Controller, useForm } from 'react-hook-form'
import Autocomplete, { SelectionItem } from './components/Autocomplete'
import { useGetAllChapter, useGetChapter } from './services/chapters/chapters'
import { useCallback, useEffect, useMemo, useState } from 'react'
import parse from 'html-react-parser'
import './App.css'
import SwitchBox from './components/Switch'
import { useSearchParams } from 'react-router-dom'
import Loading from './components/Loading'
import Icon from './components/Icon'

interface FormSearch {
  chapter: SelectionItem
}

function App() {
  const { control, watch, reset, setValue } = useForm<FormSearch>()
  const { data: responseAllChapter, isLoading: allChapterLoading } =
    useGetAllChapter()
  const [searchParams, setSearchParams] = useSearchParams()

  const selectChapter = watch('chapter')
  const { data: responseChapter, isLoading: chapterLoading } = useGetChapter({
    cp: (selectChapter?.value as string) || '',
  })

  const chapter = searchParams.get('chapter')

  const [fontSize, setFontSize] = useState(
    window.localStorage.getItem('font-size')
      ? Number(window.localStorage.getItem('font-size'))
      : 20
  )

  function topFunction() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  useEffect(() => {
    if (responseAllChapter) {
      const find = responseAllChapter.data.find((item) => {
        const match = item.label.match(/\d+/)
        if (match && Number(match[0]) === Number(chapter)) {
          return item
        }
      })

      reset({
        chapter: find ? find : responseAllChapter.data[0],
      })
    }
  }, [reset, responseAllChapter, chapter])

  useEffect(() => {
    if (fontSize) {
      window.localStorage.setItem('font-size', String(fontSize))
    }
  }, [fontSize])

  useEffect(() => {
    if (selectChapter) {
      const match = selectChapter.label.match(/\d+/)
      if (match) {
        setSearchParams({ chapter: match[0] })
        document.title = selectChapter.label
      }
    }
  }, [selectChapter, setSearchParams])

  const currentIndex = useMemo(() => {
    if (responseAllChapter?.data && selectChapter) {
      const index = responseAllChapter.data.findIndex(
        (item) => item.label === selectChapter.label
      )
      return index
    }
    return 0
  }, [responseAllChapter, selectChapter])

  const nextChapter = useCallback(() => {
    if (currentIndex && responseAllChapter?.data)
      setValue('chapter', responseAllChapter?.data[currentIndex - 1])
  }, [responseAllChapter, setValue, currentIndex])

  return (
    <div className='bg-white text-slate-900 dark:bg-zinc-950 dark:text-white min-h-[100dvh]'>
      <div className='max-w-[1200px] m-auto pb-6 pt-4 sm:px-0 px-3'>
        <div className='flex justify-end gap-3 items-center'>
          <button
            className='aspect-square w-8 bg-orange-300 dark:bg-gray-700 text-white text-[14px] rounded-full focus:outline-none flex justify-center items-center'
            onClick={() => setFontSize((pre) => (pre -= 2))}
          >
            <Icon name='Minus' size={14} />
          </button>
          <span>A</span>
          <button
            className='aspect-square w-8 bg-orange-300 dark:bg-gray-700 text-white text-[14px] rounded-full focus:outline-none flex justify-center items-center'
            onClick={() => setFontSize((pre) => (pre += 2))}
          >
            <Icon name='Plus' size={14} />
          </button>
          <SwitchBox />
        </div>
        <Controller
          control={control}
          name='chapter'
          render={({ field: { onBlur, onChange, value } }) => (
            <Autocomplete
              label='เลือกตอน'
              options={responseAllChapter?.data || []}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              disabled={allChapterLoading || chapterLoading}
            />
          )}
        />
        {(chapterLoading || allChapterLoading) && (
          <div className='flex justify-center items-center h-[calc(100dvh-235px)]'>
            <Loading />
          </div>
        )}
        {!chapterLoading && (
          <div className='mt-12' style={{ fontSize: `${fontSize}px` }}>
            {parse(responseChapter?.data || '')}
          </div>
        )}
        <div className='flex justify-between mt-[60px]'>
          <button
            disabled={
              (responseAllChapter?.data.length
                ? responseAllChapter?.data.length - 1 === currentIndex
                : true) ||
              allChapterLoading ||
              chapterLoading
            }
            className='dark:disabled:opacity-50 min-w-[110px] px-4 py-1 bg-orange-300 dark:bg-gray-700 text-white text-[14px] rounded-full focus:outline-none'
          >
            ตอนก่อนหน้า
          </button>
          <button
            disabled={currentIndex === 0 || allChapterLoading || chapterLoading}
            onClick={nextChapter}
            className='dark:disabled:opacity-50 min-w-[110px] px-4 py-1 bg-orange-300 dark:bg-gray-700 text-white text-[14px] rounded-full focus:outline-none'
          >
            ตอนถัดไป
          </button>
        </div>
      </div>
      <button
        className='fixed bottom-[70px] right-5 aspect-square w-10 bg-orange-300 dark:bg-gray-700 text-white text-[14px] rounded-full focus:outline-none'
        onClick={topFunction}
      >
        TOP
      </button>
    </div>
  )
}

export default App
