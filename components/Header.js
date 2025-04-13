import Image from 'next/image';
import Link from 'next/link'; // Import Link from Next.js

function Header() {
  return (
    <section className="relative py-24 overflow-hidden"> {/*  Added overflow-hidden */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-500 to-blue-600 opacity-50"></div>  {/*  Subtle gradient overlay */}
    <div className="container mx-auto px-4 relative z-10"> {/*  Keep content above the overlay */}
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl font-extrabold text-white leading-tight mb-6">
            Unlock Authentic Travel Through Reciprocal Hospitality
          </h1>
          <p className="text-xl text-gray-50 mb-8 leading-relaxed">
            Share your home, connect with a global community, and explore the world without breaking the bank.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/register" className="inline-block bg-yellow-400 hover:bg-yellow-500 text-blue-800 font-bold py-3 px-6 rounded-full transition-colors duration-300">
            Join MyPlaceUrTrip
          </Link>
            <a
              href="/properties"
              className="inline-block bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-800 font-bold py-3 px-6 rounded-full transition-colors duration-300"
            >
              Explore Destinations
            </a>
          </div>
        </div>
        <div className="md:w-1/2">
          <Image
            src="/hero-image.jpg"  // Replace with a compelling hero image
            alt="MyPlaceUrTrip Hero Image"
            width={800}
            height={533}
            className="rounded-xl shadow-2xl object-cover"
          />
        </div>
      </div>
    </div>
  </section>
  );
}

export default Header;
