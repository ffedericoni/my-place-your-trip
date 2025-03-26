import PropertyCard from '../components/PropertyCard';
import { useEffect, useState } from 'react';

function PropertiesPage() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Replace with your actual data fetching logic (from Supabase or elsewhere)
    const fetchProperties = async () => {
      try {
        // Example (using a dummy data array for now):
        const dummyData = [
          { id: '1', property_name: 'Cozy Apartment', property_type: 'Apartment', address: 'Paris', property_picture_medium: '/apartment.jpg' },
          { id: '2', property_name: 'Luxury Villa', property_type: 'Villa', address: 'Bali', property_picture_medium: '/villa.jpg' },
          { id: '3', property_name: 'Charming Cottage', property_type: 'Cottage', address: 'Cotswolds', property_picture_medium: '/cottage.jpg' },
          { id: '4', property_name: 'Modern Loft', property_type: 'Loft', address: 'New York', property_picture_medium: '/loft.jpg' },
          // Add more properties as needed
        ];
        setProperties(dummyData);

        // **Actual Supabase Data Fetching (Example)**
        // const { data, error } = await supabase
        //   .from('properties')
        //   .select('*')
        //   .limit(20);  // Fetch 20 properties for the listing

        // if (error) {
        //   console.error('Error fetching properties:', error);
        //   // Handle error (e.g., display an error message)
        // } else {
        //   setProperties(data);
        // }
      } catch (error) {
        console.error('Error fetching properties:', error);
        // Handle error
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Explore Our Properties</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}

export default PropertiesPage;