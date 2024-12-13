import './index.css';
import { Header } from './components/Header';
import { Heading } from './components/Headings';
import { WeDifferent } from './components/WeDifferent';
import { Testimonials } from './components/Testimonials';
import { PhotoGallery } from './components/PhotoGallery';
import { Blog } from './components/Blog';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="app-container">
      <Header />
      <Heading />
      <WeDifferent />
      <Testimonials />
      <PhotoGallery />
      <Blog />
      <Footer />
    </div>
  );
}

export default App;
