import { Link } from 'react-router-dom'
import Loading from '../../components/Loading'
import SwitchBox from '../../components/Switch'
import { useGetAllNovel } from '../../services/chapters/chapters'
import Icon from '../../components/Icon'

function HomePage() {
  const { data: responseAllNovel, isLoading: allNovelLoading } =
    useGetAllNovel()

  return (
    <div className='bg-white text-slate-900 dark:bg-zinc-950 dark:text-white min-h-[100dvh]'>
      <div className='max-w-[1200px] m-auto pb-6 pt-4 sm:px-0 px-3'>
        <div className='flex justify-end gap-3 items-center'>
          <SwitchBox />
        </div>
        {allNovelLoading && (
          <div className='flex justify-center items-center h-[calc(100dvh-235px)]'>
            <Loading />
          </div>
        )}
        {!allNovelLoading && (
          <ul className='h-[100%] mt-12 space-y-4 sm:space-y-8'>
            {responseAllNovel?.data.map((item) => {
              return (
                <li className='bg-gray-100 dark:bg-gray-800 px-4 py-2 sm:px-12 sm:py-6 rounded flex justify-between items-center gap-3'>
                  <Link to={`/${item.id}`}>{item.name}</Link>
                  <Link to={`/${item.id}`}>
                    <Icon name='ArrowRight' />
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

export default HomePage
