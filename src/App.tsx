import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import MainLayout from '@/layouts/MainLayout'
import HomePage from '@/pages/HomePage'
import FeaturesPage from '@/pages/FeaturesPage'
import GameplayPage from '@/pages/GameplayPage'
import HeroesPage from '@/pages/HeroesPage'
import ArmyPage from '@/pages/ArmyPage'
import DinosPage from '@/pages/DinosPage'
import WorldPage from '@/pages/WorldPage'
import RealmsPage from '@/pages/RealmsPage'
import GalleryPage from '@/pages/GalleryPage'
import DailyPage from '@/pages/DailyPage'
import RoulettePage from '@/pages/RoulettePage'
import DownloadPage from '@/pages/DownloadPage'
import ManifestoPage from '@/pages/ManifestoPage'

export default function App() {
  return (
    <BrowserRouter basename="/app">
      <Routes>
        <Route element={<MainLayout />}>
          {/* One route = one screen / one section */}
          <Route index element={<HomePage />} />
          <Route path="story" element={<ManifestoPage />} />
          <Route path="features" element={<FeaturesPage />} />
          <Route path="gameplay" element={<GameplayPage />} />
          <Route path="heroes" element={<HeroesPage />} />
          <Route path="army" element={<ArmyPage />} />
          <Route path="dinos" element={<DinosPage />} />
          <Route path="world" element={<WorldPage />} />
          <Route path="realms" element={<RealmsPage />} />
          <Route path="gallery" element={<GalleryPage />} />
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
