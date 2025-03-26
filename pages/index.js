import Head from 'next/head';
import Header from '../components/Header';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import PropertiesPage from '../components/properties';
import "./globals.css";

export default function Home() {
  return (
    <div className="bg-gray-50">
      <Head>
        <title>MyPlaceUrTrip - Reciprocal Hospitality Exchange</title>
        <meta name="description" content="Experience authentic travel with MyPlaceUrTrip. Share your home, travel for free!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="font-sans antialiased text-gray-800">
        <Header />
        <PropertiesPage />
        <Features />
        <Testimonials />
        <CallToAction />
        <Footer />
      </main>
    </div>
  );
}