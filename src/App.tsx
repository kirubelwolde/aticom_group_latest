import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import News from "./pages/News";
import NewsArticle from "./pages/NewsArticle";
import Team from "./pages/Team";
import CSR from "./pages/CSR";
import VisionMission from "./pages/VisionMission";
import Partners from "./pages/Partners";
import OpenPositions from "./pages/OpenPositions";
import OrganizationStructure from "./pages/OrganizationStructure";
import NotFound from "./pages/NotFound";

// Business sector pages
import RealEstate from "./pages/RealEstate";
import AvocadoFresh from "./pages/AvocadoFresh";
import AvocadoOil from "./pages/AvocadoOil";
import CerealCrops from "./pages/CerealCrops";
import Coffee from "./pages/Coffee";
import BathroomSolutions from "./pages/BathroomSolutions";
import CeramicTiles from "./pages/CeramicTiles";
import Manufacturing from "./pages/Manufacturing";
import Agriculture from "./pages/Agriculture";

// Admin pages
import AdminLogin from "./pages/admin/Login";
import AdminSignUp from "./pages/admin/SignUp";
import AdminDashboard from "./pages/admin/Dashboard";
import BusinessSectorsAdmin from "./pages/admin/BusinessSectorsAdmin";
import NewsAdmin from "./pages/admin/NewsAdmin";
import TeamAdmin from "./pages/admin/TeamAdmin";
import CSRAdmin from "./pages/admin/CSRAdmin";
import PartnersAdmin from "./pages/admin/PartnersAdmin";
import JobPositionsAdmin from "./pages/admin/JobPositionsAdmin";
import JobApplicationsAdmin from "./pages/admin/JobApplicationsAdmin";
import CompanyStatsAdmin from "./pages/admin/CompanyStatsAdmin";
import VisionMissionAdmin from "./pages/admin/VisionMissionAdmin";
import SiteSettingsAdmin from "./pages/admin/SiteSettingsAdmin";
import HeroSlides from "./pages/admin/HeroSlides";
import HeroCardsAdmin from "./pages/admin/HeroCardsAdmin";
import CoffeeAdmin from "./pages/admin/CoffeeAdmin";
import CerealCropsAdmin from "./pages/admin/CerealCropsAdmin";
import RealEstateAdmin from "./pages/admin/RealEstateAdmin";
import AvocadoFreshAdmin from "./pages/admin/AvocadoFreshAdmin";
import AvocadoOilAdmin from "./pages/admin/AvocadoOilAdmin";
import BathroomSolutionsAdmin from "./pages/admin/BathroomSolutionsAdmin";
import BathroomSolutionsFullAdmin from "./pages/admin/BathroomSolutionsFullAdmin";
import CeramicTilesAdmin from "./pages/admin/CeramicTilesAdmin";
import CeramicTilesFullAdmin from "./pages/admin/CeramicTilesFullAdmin";
import SeoAdmin from "./pages/admin/SeoAdmin";
import SeoHead from "./components/SeoHead";
import { AdminAuthProvider } from '@/components/admin/AdminAuth';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminLayout from '@/components/admin/AdminLayout';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <AdminAuthProvider>
          <Toaster />
          <BrowserRouter>
            <SeoHead />
            <Routes>
              <Route path="/" element={<Layout><Index /></Layout>} />
              <Route path="/about" element={<Layout><About /></Layout>} />
              <Route path="/contact" element={<Layout><Contact /></Layout>} />
              <Route path="/news" element={<Layout><News /></Layout>} />
              <Route path="/news/:id" element={<Layout><NewsArticle /></Layout>} />
              <Route path="/team" element={<Layout><Team /></Layout>} />
              <Route path="/csr" element={<Layout><CSR /></Layout>} />
              <Route path="/vision-mission" element={<Layout><VisionMission /></Layout>} />
              <Route path="/partners" element={<Layout><Partners /></Layout>} />
              <Route path="/open-positions" element={<Layout><OpenPositions /></Layout>} />
              <Route path="/organization-structure" element={<Layout><OrganizationStructure /></Layout>} />
              
              {/* Business Sectors */}
              <Route path="/real-estate" element={<RealEstate />} />
              <Route path="/avocado-fresh" element={<AvocadoFresh />} />
              <Route path="/avocado-oil" element={<AvocadoOil />} />
              <Route path="/cereal-crops" element={<CerealCrops />} />
              <Route path="/coffee" element={<Coffee />} />
              <Route path="/bathroom-solutions" element={<BathroomSolutions />} />
              <Route path="/ceramic-tiles" element={<CeramicTiles />} />
              <Route path="/manufacturing" element={<Layout><Manufacturing /></Layout>} />
              <Route path="/agriculture" element={<Layout><Agriculture /></Layout>} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/signup" element={<AdminSignUp />} />
              <Route path="/admin/*" element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route index element={<AdminDashboard />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="business-sectors" element={<BusinessSectorsAdmin />} />
                <Route path="news" element={<NewsAdmin />} />
                <Route path="team" element={<TeamAdmin />} />
                <Route path="csr" element={<CSRAdmin />} />
                <Route path="partners" element={<PartnersAdmin />} />
                <Route path="job-positions" element={<JobPositionsAdmin />} />
                <Route path="job-applications" element={<JobApplicationsAdmin />} />
                <Route path="company-stats" element={<CompanyStatsAdmin />} />
                <Route path="vision-mission" element={<VisionMissionAdmin />} />
                <Route path="site-settings" element={<SiteSettingsAdmin />} />
                <Route path="hero-slides" element={<HeroSlides />} />
                <Route path="hero-cards" element={<HeroCardsAdmin />} />
                <Route path="coffee" element={<CoffeeAdmin />} />
                <Route path="cereal-crops" element={<CerealCropsAdmin />} />
                <Route path="real-estate" element={<RealEstateAdmin />} />
                <Route path="avocado-fresh" element={<AvocadoFreshAdmin />} />
                <Route path="avocado-oil" element={<AvocadoOilAdmin />} />
                <Route path="bathroom-solutions" element={<BathroomSolutionsFullAdmin />} />
                <Route path="ceramic-tiles" element={<CeramicTilesFullAdmin />} />
                <Route path="seo" element={<SeoAdmin />} />
              </Route>
               
              <Route path="*" element={<Layout><NotFound /></Layout>} />
            </Routes>
          </BrowserRouter>
        </AdminAuthProvider>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
