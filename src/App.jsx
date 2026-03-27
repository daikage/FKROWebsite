import './App.css'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import NotFound from './pages/NotFound.jsx'
import GlobalRippleEffect from './components/GlobalRippleEffect.jsx'
import TrustMark from './pages/TrustMark.jsx'
import NewsPage from './pages/NewsPage.jsx'
import NewsDetail from './pages/NewsDetail.jsx'

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:slug" element={<NewsDetail />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
       <GlobalRippleEffect />
    </>
  )
}

export default App
