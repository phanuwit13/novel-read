import { Suspense } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import routeConfig, { RouteConfig } from './routes'

const RenderRoutes = ({ routes }: { routes: RouteConfig[] }) => {
  return (
    <Routes>
      {routes.map(({ ...route }, index) => {
        //get layout
        const element = route.element

        //create route
        return <Route key={index} {...route} element={element} />
      })}
    </Routes>
  )
}

function App() {
  return (
    <>
      <Router basename="/">
        <Suspense fallback={<div>Loading...</div>}>
          <RenderRoutes routes={routeConfig} />
        </Suspense>
      </Router>
    </>
  )
}

export default App
