import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import SmoothScroll from './components/SmoothScroll'
import { TransitionProvider } from './components/PageTransition'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'

const About = lazy(() => import('./pages/About'))
const Projects = lazy(() => import('./pages/Projects'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <BrowserRouter>
      <TransitionProvider>
        <SmoothScroll />
        <Suspense fallback={null}>
          <Routes>
            <Route element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="projects" element={<Projects />} />
              <Route path="projects/:slug" element={<ProjectDetail />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </TransitionProvider>
    </BrowserRouter>
  )
}