import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import MainLayout from '@/layouts/MainLayout'
import HomePage from '@/pages/HomePage'
import FeaturesPage from '@/pages/FeaturesPage'
import HeroesPage from '@/pages/HeroesPage'
import DinosPage from '@/pages/DinosPage'
import WorldPage from '@/pages/WorldPage'
import DailyPage from '@/pages/DailyPage'
import RoulettePage from '@/pages/RoulettePage'
import DownloadPage from '@/pages/DownloadPage'

export default function App() {
  return (
    <BrowserRouter basename="/app">
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="features" element={<FeaturesPage />} />
          <Route path="heroes" element={<HeroesPage />} />
          <Route path="dinos" element={<DinosPage />} />
          <Route path="world" element={<WorldPage />} />
          <Route path="daily" element={<DailyPage />} />
          <Route path="roulette" element={<RoulettePage />} />
          <Route path="download" element={<DownloadPage />} />
          <Route path="apk" element={<Navigate to="/download" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
