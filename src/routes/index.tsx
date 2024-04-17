
import { LayoutRouteProps, PathRouteProps } from 'react-router-dom'
import ChapterPage from '../pages/chapters'
import HomePage from '../pages/home'

export type RouteConfig = (PathRouteProps | LayoutRouteProps)

const routeConfig: RouteConfig[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/:id',
    element: <ChapterPage />,
  },
]

export default routeConfig