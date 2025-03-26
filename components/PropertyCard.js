import Image from 'next/image';
import Link from 'next/link'; // Import the Link component

function PropertyCard({ property }) {
  const { id, property_name, property_type, address, property_picture_medium } = property; // Assuming these fields are available

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Add Link to the property page */}
      <Link legacyBehavior href={`/property/${id}`} passHref>
        <a>
          <div className="relative h-48">
            {property_picture_medium ? (
              <Image
                src={property_picture_medium}
                alt={property_name}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-105" // Add hover effect
              />
            ) : (
              <div className="bg-gray-200 h-full w-full flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-500 transition-colors duration-200">
              {property_name}
            </h3>
            <p className="text-sm text-gray-600">{property_type}</p>
            <p className="text-sm text-gray-500 mt-1">
              {address} {/*  Just the city component of address*/}
            </p>
          </div>
        </a>
      </Link>
    </div>
  );
}

export default PropertyCard;