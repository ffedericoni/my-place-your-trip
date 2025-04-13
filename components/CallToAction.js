import Link from 'next/link';

function CallToAction() {
    return (
      <section className="py-16 bg-blue-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-lg text-blue-600 mb-8">
            Join MyPlaceUrTrip today and discover a new way to travel!
          </p>
          <Link href="/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full">
            Sign Up Now
          </Link>
        </div>
      </section>
    );
  }
  
  export default CallToAction;
