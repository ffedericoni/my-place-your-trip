function Features() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-blue-800 mb-4 tracking-tight">
            Unlock a World of Travel Opportunities
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Discover the unique benefits of MyPlaceUrTrip and experience travel in a whole new way.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="p-6">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-500 mb-4">
                {/* Replace with your actual icon/SVG */}
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 4.75 7.5 4.75a4.5 4.5 0 00-4.5 4.5c0 1.278.57 2.411 1.506 3.211a7.504 7.504 0 009.797 2.13A7.504 7.504 0 0019.5 10.75c0-1.278-.57-2.411-1.506-3.211a4.5 4.5 0 00-4.5-4.5z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Affordable Travel</h3>
              <p className="text-gray-600 leading-relaxed">
                Reduce your accommodation costs by exchanging hospitality. Enjoy longer trips for less.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="p-6">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-500 mb-4">
                {/* Replace with your actual icon/SVG */}
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h18M5 8h14m-9 3h5m-5 3h5M7 21h10a2 2 0 002-2V9.458a1.992 1.992 0 00-1-1.732l-6.554-3.277a2 2 0 00-1.908 0L6 7.726a1.992 1.992 0 00-1 1.732V19a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Authentic Experiences</h3>
              <p className="text-gray-600 leading-relaxed">
                Immerse yourself in local culture and connect with passionate hosts who share their insights.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="p-6">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-500 mb-4">
                {/* Replace with your actual icon/SVG */}
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-2m-2-5v5m2-5H9m-9 5h9"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Reciprocal Hospitality</h3>
              <p className="text-gray-600 leading-relaxed">
                Share your home, earn credits, and unlock amazing travel opportunities worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;

