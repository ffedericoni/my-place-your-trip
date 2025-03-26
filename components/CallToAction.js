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
          <a
            href="/register" // Replace with your actual register page route
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full"
          >
            Sign Up Now
          </a>
        </div>
      </section>
    );
  }
  
  export default CallToAction;