import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import MainLayout from '@/layouts/MainLayout'
import HomePage from '@/pages/HomePage'
import StoryPage from '@/pages/StoryPage'
import FeaturesPage from '@/pages/FeaturesPage'
import BaseFeaturePage from '@/pages/BaseFeaturePage'
import HeroesFeaturePage from '@/pages/HeroesFeaturePage'
import DinosFeaturePage from '@/pages/DinosFeaturePage'
import CampaignFeaturePage from '@/pages/CampaignFeaturePage'
import PlayPage from '@/pages/PlayPage'
import BestiaryPage from '@/pages/BestiaryPage'
import DownloadPage from '@/pages/DownloadPage'

/**
 * Premium multi-page site.
 * Kept: Account system + Home, Story, Features
 * Rest: curated high-impact pages only
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="story" element={<StoryPage />} />
          <Route path="features" element={<FeaturesPage />} />
          <Route path="features/base" element={<BaseFeaturePage />} />
          <Route path="features/heroes" element={<HeroesFeaturePage />} />
          <Route path="features/dinos" element={<DinosFeaturePage />} />
          <Route path="features/campaign" element={<CampaignFeaturePage />} />
          <Route path="play" element={<PlayPage />} />
          <Route path="bestiary" element={<BestiaryPage />} />
          <Route path="download" element={<DownloadPage />} />
          {/* Legacy redirects */}
          <Route path="daily" element={<Navigate to="/play" replace />} />
          <Route path="roulette" element={<Navigate to="/play" replace />} />
          <Route path="dinos" element={<Navigate to="/features/dinos" replace />} />
          <Route path="heroes" element={<Navigate to="/features/heroes" replace />} />
          <Route path="apk" element={<Navigate to="/download" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
