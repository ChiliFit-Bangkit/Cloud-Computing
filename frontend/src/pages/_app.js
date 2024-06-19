import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import Navigation from '../components/Navbar';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navigation />
      <Component {...pageProps} />
    </>
  );
}
