function Testimonials() {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            What Our Members Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600 italic mb-4">"MyPlaceUrTrip has opened up a world of travel possibilities for me! I've met amazing people and stayed in incredible places."</p>
              <p className="text-gray-700 font-semibold">- Sarah J., San Francisco</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600 italic mb-4">"Hosting on MyPlaceUrTrip is a rewarding experience. I love sharing my home with travelers from around the globe."</p>
              <p className="text-gray-700 font-semibold">- David K., London</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  export default Testimonials;