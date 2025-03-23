Database schema document for the MyPlaceUrTrip website, designed to be implemented using PostgreSQL within the Supabase environment.  It incorporates considerations for the reciprocity model and user-generated content.

**Database Schema Document: MyPlaceUrTrip (PostgreSQL/Supabase)**

**1. Introduction**

This document outlines the database schema for the MyPlaceUrTrip website. It describes the tables, columns, data types, relationships, and constraints used to store and manage the application's data. This document is intended to be a reference for developers, database administrators, and anyone working with the database.

**2. Naming Conventions**

*   **Tables:** Plural, lowercase (e.g., `users`, `properties`, `bookings`)
*   **Columns:** Singular, lowercase, using snake_case (e.g., `user_id`, `property_name`, `created_at`)
*   **Primary Keys:** `id` (integer, auto-incrementing)
*   **Foreign Keys:** `[related_table]_id` (e.g., `user_id` references the `users` table)
*   **Constraints:** Descriptive names (e.g., `users_email_unique`, `bookings_check_in_date_future`)

**3. Tables and Schemas**

**3.1. `public` Schema (Default)**

*   **3.1.1. `users`**

    *   Purpose: Stores user account information.
    *   Columns:

        | Column           | Data Type          | Constraints                                      | Description                                                                                                                                                                 |
        | ---------------- | ------------------ | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
        | `id`             | `uuid`             | PRIMARY KEY, DEFAULT `uuid_generate_v4()`        | Unique identifier for the user.  Supabase uses UUIDs by default.                                                                                                                  |
        | `email`          | `VARCHAR(255)`      | UNIQUE, NOT NULL                                 | User's email address. Used for login and communication.                                                                                                                                 |
        | `hashed_password`| `VARCHAR(255)`      |                                                  | Hashed password. Generated and managed by Supabase Auth                                                                                                   |
        | `full_name`      | `VARCHAR(255)`      |                                                  | User's full name.                                                                                                                                                             |
        | `profile_picture_small`  | `VARCHAR(255)`     |                                                | URL to the *Cloudinary*-optimized small profile picture.                                                                                                                          |
        | `profile_picture_medium` | `VARCHAR(255)`     |                                                | URL to the *Cloudinary*-optimized medium profile picture.                                                                                                                         |
        | `profile_picture_large`  | `VARCHAR(255)`     |                                                | URL to the *Cloudinary*-optimized large profile picture.                                                                                                                          |
        | `bio`            | `TEXT`             |                                                  | User's biography.                                                                                                                                                            |
        | `location`       | `VARCHAR(255)`      |                                                  | User's general location (e.g., city, country).                                                                                                                            |
        | `languages`      | `VARCHAR(255)[]`    |                                                  | Array of languages spoken by the user.                                                                                                                                     |
        | `interests`      | `VARCHAR(255)[]`    |                                                  | Array of user's interests (e.g., hiking, cooking, art).                                                                                                                 |
        | `hosting_preferences`| `JSONB`            |                                                  | JSON object storing user's hosting preferences (e.g., preferred guest types, pet-friendly).                                                                              |
        | `travel_preferences`| `JSONB`            |                                                  | JSON object storing user's travel preferences (e.g., preferred destinations, travel style).                                                                            |
        | `is_verified`    | `BOOLEAN`          | DEFAULT `FALSE`                                | Indicates if the user's profile has been verified (e.g., email, phone, ID).                                                                                               |
        | `created_at`     | `TIMESTAMP WITH TIME ZONE` | DEFAULT `NOW()`                              | Timestamp indicating when the user account was created.                                                                                                                             |
        | `updated_at`     | `TIMESTAMP WITH TIME ZONE` | DEFAULT `NOW()`                              | Timestamp indicating when the user account was last updated.                                                                                                                           |

    *   Constraints:
        *   `users_email_unique`: UNIQUE constraint on `email`.

*   **3.1.2. `properties`**

    *   Purpose: Stores information about properties offered for exchange.
    *   Columns:

        | Column                       | Data Type           | Constraints                       | Description                                                                                                                                                                       |
        | ---------------------------- | ------------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
        | `id`                         | `uuid`              | PRIMARY KEY, DEFAULT `uuid_generate_v4()`               | Unique identifier for the property.  Supabase uses UUIDs by default.                                                                                                                                |
        | `user_id`                    | `uuid`              | NOT NULL, FOREIGN KEY `users(id)` | The ID of the user who owns/manages the property.                                                                                                                               |
        | `property_name`              | `VARCHAR(255)`      |                                   | Name of the property (e.g., "Cozy Apartment in Paris").                                                                                                                          |
        | `property_type`              | `VARCHAR(255)`      |                                   | Type of property (e.g., "Apartment", "House", "Villa", "Room").                                                                                                                   |
        | `address`                    | `VARCHAR(255)`      | NOT NULL                            | The street address of the property. Note: Storing full address may require additional privacy considerations.                                                                     |
        | `latitude`                   | `DOUBLE PRECISION`  |                                   | Latitude coordinate of the property (for map display).                                                                                                                            |
        | `longitude`                  | `DOUBLE PRECISION`  |                                   | Longitude coordinate of the property (for map display).                                                                                                                           |
        | `description`                | `TEXT`              |                                   | Detailed description of the property.                                                                                                                                             |
        | `max_guests`                 | `INTEGER`           | NOT NULL, CHECK (`max_guests` > 0) | Maximum number of guests the property can accommodate.                                                                                                                           |
        | `bedrooms`                   | `INTEGER`           | NOT NULL, CHECK (`bedrooms` >= 0)   | Number of bedrooms in the property.                                                                                                                                             |
        | `bathrooms`                  | `DECIMAL(3,1)`      | NOT NULL, CHECK (`bathrooms` >= 0)  | Number of bathrooms in the property (e.g., 1.0, 1.5, 2.0).                                                                                                                      |
        | `amenities`                  | `VARCHAR(255)[]`    |                                   | Array of amenities available at the property (e.g., "Wi-Fi", "Kitchen", "Laundry", "Parking").                                                                                    |
        | `property_picture_small`   | `VARCHAR(255)`     |                                   | URL to the *Cloudinary*-optimized small property picture.                                                                                                                          |
        | `property_picture_medium`  | `VARCHAR(255)`     |                                   | URL to the *Cloudinary*-optimized medium property picture.                                                                                                                         |
        | `property_picture_large`   | `VARCHAR(255)`     |                                   | URL to the *Cloudinary*-optimized large property picture.                                                                                                                          |
        | `cancellation_policy`          | `JSONB`            |                       | JSON object defining the cancellation policy for the property.  Includes rules about refund percentages depending on the time before the checkin date. |
        | `created_at`                 | `TIMESTAMP WITH TIME ZONE` | DEFAULT `NOW()`                   | Timestamp indicating when the property was created.                                                                                                                            |
        | `updated_at`                 | `TIMESTAMP WITH TIME ZONE` | DEFAULT `NOW()`                   | Timestamp indicating when the property was last updated.                                                                                                                          |

    *   Constraints:
        *   `properties_user_id_fkey`: FOREIGN KEY constraint referencing `users(id)`.
        *   `properties_max_guests_positive`: CHECK constraint ensuring `max_guests` is positive.
        *   `properties_bedrooms_non_negative`: CHECK constraint ensuring `bedrooms` is non-negative.
        *   `properties_bathrooms_non_negative`: CHECK constraint ensuring `bathrooms` is non-negative.

*   **3.1.3. `property_pictures`**

    *   Purpose: Stores URLs to various images of a property. Enables multiple images per property.
    *   Columns:

        | Column            | Data Type   | Constraints                       | Description                                                                                                                                |
        | ----------------- | ----------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
        | `id`              | `uuid`      | PRIMARY KEY, DEFAULT `uuid_generate_v4()`               | Unique identifier for the picture.                                                                                                                                       |
        | `property_id`     | `uuid`      | NOT NULL, FOREIGN KEY `properties(id)` | Foreign key referencing the property.                                                                                                                                  |
        | `image_url_small`   | `VARCHAR(255)` |                                   | URL to the *Cloudinary*-optimized small picture.                                                                                                                       |
        | `image_url_medium`  | `VARCHAR(255)` |                                   | URL to the *Cloudinary*-optimized medium picture.                                                                                                                      |
        | `image_url_large`   | `VARCHAR(255)` |                                   | URL to the *Cloudinary*-optimized large picture.                                                                                                                       |
        | `description`     | `TEXT`      |                                   | Optional description of the image.                                                                                                                                          |
        | `created_at`      | `TIMESTAMP WITH TIME ZONE` | DEFAULT `NOW()`                   | Timestamp indicating when the image was added.                                                                                                                           |

    *   Constraints:
        *   `property_pictures_property_id_fkey`: FOREIGN KEY constraint referencing `properties(id)`.

*   **3.1.4. `bookings`**

    *   Purpose: Stores information about booking requests and confirmed bookings.
    *   Columns:

        | Column            | Data Type              | Constraints                       | Description                                                                                                                                                                       |
        | ----------------- | ---------------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
        | `id`              | `uuid`                 | PRIMARY KEY, DEFAULT `uuid_generate_v4()`               | Unique identifier for the booking.                                                                                                                                       |
        | `property_id`     | `uuid`                 | NOT NULL, FOREIGN KEY `properties(id)` | Foreign key referencing the property being booked.                                                                                                                                 |
        | `guest_id`        | `uuid`                 | NOT NULL, FOREIGN KEY `users(id)`      | Foreign key referencing the user making the booking (the guest).                                                                                                                    |
        | `host_id`        | `uuid`                 | NOT NULL, FOREIGN KEY `users(id)`      | Foreign key referencing the user hosting the property (the host). Denormalized for efficiency (can be derived from `properties.user_id`, but frequently needed).                 |
        | `check_in_date`   | `DATE`                 | NOT NULL                            | Check-in date for the booking.                                                                                                                                                   |
        | `check_out_date`  | `DATE`                 | NOT NULL                            | Check-out date for the booking.                                                                                                                                                  |
        | `number_of_guests`| `INTEGER`              | NOT NULL, CHECK (`number_of_guests` > 0) | Number of guests included in the booking.                                                                                                                                            |
        | `status`          | `VARCHAR(255)`         | DEFAULT 'pending'                    | Status of the booking (e.g., "pending", "accepted", "rejected", "cancelled", "completed").                                                                                                |
        | `message_to_host` | `TEXT`                 |                                   | Message from the guest to the host.                                                                                                                                                |
        | `created_at`      | `TIMESTAMP WITH TIME ZONE` | DEFAULT `NOW()`                   | Timestamp indicating when the booking request was created.                                                                                                                      |
        | `updated_at`      | `TIMESTAMP WITH TIME ZONE` | DEFAULT `NOW()`                   | Timestamp indicating when the booking was last updated.                                                                                                                           |

    *   Constraints:
        *   `bookings_property_id_fkey`: FOREIGN KEY constraint referencing `properties(id)`.
        *   `bookings_guest_id_fkey`: FOREIGN KEY constraint referencing `users(id)`.
        *   `bookings_host_id_fkey`: FOREIGN KEY constraint referencing `users(id)`.
        *   `bookings_number_of_guests_positive`: CHECK constraint ensuring `number_of_guests` is positive.
        *   `bookings_check_in_date_future`: CHECK constraint ensuring `check_in_date` is in the future.

*   **3.1.5. `reviews`**

    *   Purpose: Stores reviews and ratings for properties and hosts.
    *   Columns:

        | Column              | Data Type              | Constraints                                      | Description                                                                                                                                                                    |
        | ------------------- | ---------------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
        | `id`                | `uuid`                 | PRIMARY KEY, DEFAULT `uuid_generate_v4()`               | Unique identifier for the review.                                                                                                                                          |
        | `booking_id`        | `uuid`                 | NOT NULL, FOREIGN KEY `bookings(id)`             | Foreign key referencing the booking being reviewed.                                                                                                                               |
        | `reviewer_id`       | `uuid`                 | NOT NULL, FOREIGN KEY `users(id)`                  | Foreign key referencing the user writing the review.                                                                                                                            |
        | `reviewee_id`       | `uuid`                 | NOT NULL, FOREIGN KEY `users(id)`                  | Foreign key referencing the user being reviewed (the host in a guest review, or the guest in a host review).                                                                  |
        | `rating`            | `INTEGER`              | NOT NULL, CHECK (`rating` BETWEEN 1 AND 5)      | Rating given by the reviewer (1-5 stars).                                                                                                                                    |
        | `comment`           | `TEXT`                 |                                                  | Public comment included in the review.                                                                                                                                             |
        | `private_feedback`  | `TEXT`                 |                                                  | Private feedback that will be only read by the reviewed user.                                                                                                                   |
        | `created_at`        | `TIMESTAMP WITH TIME ZONE` | DEFAULT `NOW()`                              | Timestamp indicating when the review was created.                                                                                                                                |
        | `updated_at`        | `TIMESTAMP WITH TIME ZONE` | DEFAULT `NOW()`                              | Timestamp indicating when the review was last updated.                                                                                                                             |

    *   Constraints:
        *   `reviews_booking_id_fkey`: FOREIGN KEY constraint referencing `bookings(id)`.
        *   `reviews_reviewer_id_fkey`: FOREIGN KEY constraint referencing `users(id)`.
        *   `reviews_reviewee_id_fkey`: FOREIGN KEY constraint referencing `users(id)`.
        *   `reviews_rating_range`: CHECK constraint ensuring `rating` is between 1 and 5.

*   **3.1.6. `saved_properties`**

    *   Purpose: Stores user's saved properties.
    *   Columns:

        | Column        | Data Type              | Constraints                       | Description                                                                                                                                           |
        | ------------- | ---------------------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
        | `id`          | `uuid`                 | PRIMARY KEY, DEFAULT `uuid_generate_v4()`               | Unique identifier for the saved property record.                                                                                                                            |
        | `user_id`     | `uuid`                 | NOT NULL, FOREIGN KEY `users(id)`      | Foreign key referencing the user saving the property.                                                                                                                           |
        | `property_id` | `uuid`                 | NOT NULL, FOREIGN KEY `properties(id)` | Foreign key referencing the saved property.                                                                                                                                         |
        | `created_at`  | `TIMESTAMP WITH TIME ZONE` | DEFAULT `NOW()`                   | Timestamp indicating when the property was saved.                                                                                                                                       |

    *   Constraints:
        *   `saved_properties_user_id_fkey`: FOREIGN KEY constraint referencing `users(id)`.
        *   `saved_properties_property_id_fkey`: FOREIGN KEY constraint referencing `properties(id)`.
        *   `saved_properties_unique`: UNIQUE constraint on (`user_id`, `property_id`) to prevent duplicate saves.

*   **3.1.7. `services`**

    *   Purpose: Stores list of the services that a host can offer.
    *   Columns:

        | Column            | Data Type    | Constraints                       | Description                                                                                                                                        |
        | ----------------- | ------------ | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
        | `id`              | `uuid`       | PRIMARY KEY, DEFAULT `uuid_generate_v4()`               | Unique identifier for the service.                                                                                                                                       |
        | `user_id`         | `uuid`       | NOT NULL, FOREIGN KEY `users(id)`      | Foreign key referencing the user offering the service.                                                                                                                             |
        | `service_name`    | `VARCHAR(255)` | NOT NULL                            | Name of the service (e.g., "City Tour", "Cooking Class", "Language Exchange").                                                                                                            |
        | `description`     | `TEXT`       |                                   | Description of the service offered.                                                                                                                              |
        | `price`           | `DECIMAL(10,2)`|                                  | Price of the service (if applicable). NULL if the service is free.                                                                                           |
        | `created_at`      | `TIMESTAMP WITH TIME ZONE` | DEFAULT `NOW()`                   | Timestamp indicating when the service was added.                                                                                                                           |
        | `updated_at`      | `TIMESTAMP WITH TIME ZONE` | DEFAULT `NOW()`                   | Timestamp indicating when the service was last updated.

    *   Constraints:
        *   `services_user_id_fkey`: FOREIGN KEY constraint referencing `users(id)`.

**3.2. `reciprocity` Schema (For managing hospitality exchange)**

*   **3.2.1. `credits`**

    *   Purpose: Stores the track of credits that an user has available
    *   Columns:

        | Column              | Data Type   | Constraints                       | Description                                                                                                                                                  |
        | ------------------- | ----------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
        | `id`                | `uuid`      | PRIMARY KEY, DEFAULT `uuid_generate_v4()`               | Unique identifier for the entry.                                                                                                                                   |
        | `user_id`           | `uuid`      | NOT NULL, FOREIGN KEY `users(id)`      | Foreign key referencing the user that owns the credits.                                                                                                                          |
        | `credits`           | `INTEGER`   | NOT NULL, DEFAULT 0                      | Number of credits that user has. Can be negative, if the user has not yet offered a stay in exchange of hosting                                                                                                |
        | `created_at`          | `TIMESTAMP WITH TIME ZONE` | DEFAULT `NOW()`                   | Timestamp indicating when the credit was added.                                                                                                                          |
        | `updated_at`          | `TIMESTAMP WITH TIME ZONE` | DEFAULT `NOW()`                   | Timestamp indicating when the credit was last updated.                                                                                                                             |

    *   Constraints:
        *   `credits_user_id_fkey`: FOREIGN KEY constraint referencing `users(id)`.
        *   `credits_user_id_unique`: UNIQUE constraint on `user_id` to ensure one entry per user.

*   **3.2.2. `credit_transactions`**

    *   Purpose: Stores a log of all credit transactions.  Essential for auditing and dispute resolution.
    *   Columns:

        | Column             | Data Type              | Constraints                              | Description                                                                                                                                                                               |
        | ------------------ | ---------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
        | `id`               | `uuid`                 | PRIMARY KEY, DEFAULT `uuid_generate_v4()`               | Unique identifier for the transaction.                                                                                                                                       |
        | `user_id`          | `uuid`                 | NOT NULL, FOREIGN KEY `users(id)`       | Foreign key referencing the user involved in the transaction.                                                                                                                             |
        | `transaction_type` | `VARCHAR(255)`         | NOT NULL                                 | Type of transaction (e.g., "hosting", "stay", "adjustment", "transfer").                                                                                                                  |
        | `booking_id`        | `uuid`                 | FOREIGN KEY `bookings(id)`              | Foreign key referencing the booking associated with the transaction (if applicable).                                                                                                      |
        | `amount`           | `INTEGER`              | NOT NULL                                 | The amount of credits gained or lost (positive for credits gained, negative for credits spent).                                                                                                |
        | `description`        | `TEXT`                 |                                          | Optional description of the transaction (e.g., "Hosting John Smith for 3 nights").                                                                                                           |
        | `created_at`       | `TIMESTAMP WITH TIME ZONE` | DEFAULT `NOW()`                          | Timestamp indicating when the transaction occurred.                                                                                                                                      |

    *   Constraints:
        *   `credit_transactions_user_id_fkey`: FOREIGN KEY constraint referencing `users(id)`.
        *   `credit_transactions_booking_id_fkey`: FOREIGN KEY constraint referencing `bookings(id)`.

**4. Data Types**

*   `uuid`: Universally Unique Identifier. Used as primary keys for most tables. (Generated using `uuid_generate_v4()`). Supabase uses UUIDs by default.
*   `VARCHAR(n)`: Variable-length character string with a maximum length of `n` characters.
*   `TEXT`: Variable-length character string with no maximum length.
*   `INTEGER`: Integer number.
*   `DECIMAL(p,s)`: Decimal number with a precision of `p` digits and a scale of `s` digits.
*   `BOOLEAN`: Boolean value (TRUE or FALSE).
*   `TIMESTAMP WITH TIME ZONE`: Timestamp with time zone information.
*   `DATE`: Date value.
*   `JSONB`: Binary JSON data type (stores JSON data efficiently).
*   `VARCHAR(n)[]`: Array of variable-length character strings.

**5. Relationships**

*   **One-to-Many:**
    *   `users` ↔ `properties`: One user can have multiple properties.
    *   `properties` ↔ `property_pictures`: One property can have multiple pictures.
    *   `users` ↔ `bookings` (as guest): One user can make multiple bookings.
    *   `users` ↔ `bookings` (as host): One user can host multiple bookings.
    *   `bookings` ↔ `reviews`: One booking can have one review (or none).
    *   `users` ↔ `saved_properties`: One user can save multiple properties.
    *   `users` ↔ `services`: One user can offer multiple services.
    *   `users` ↔ `credits`: One user can have only one credits entry
    *   `users` ↔ `credit_transactions`: One user can have multiple credit transactions.

**6. Indexes**

Creating indexes on frequently queried columns can significantly improve database performance.  Consider adding indexes to these columns:

*   `properties.user_id`
*   `properties.latitude`, `properties.longitude` (consider a GIST index for geographical queries)
*   `bookings.property_id`
*   `bookings.guest_id`
*   `bookings.check_in_date`, `bookings.check_out_date`
*   `reviews.booking_id`
*   `reviews.reviewer_id`, `reviews.reviewee_id`
*   `saved_properties.user_id`, `saved_properties.property_id`
*   `services.user_id`
*   `credit_transactions.user_id`
*   `credit_transactions.booking_id`

**7. Supabase Considerations**

*   **Row-Level Security (RLS):**  Implement RLS policies on all tables to control data access and ensure that users can only access data that they are authorized to see. This is crucial for privacy and security. *Especially important for `users`, `properties`, `bookings`, `reviews`, `credit_transactions` tables.*
*   **Supabase Auth:** Use Supabase Auth to handle user authentication and authorization. Do *not* store passwords directly in the database.
*   **Supabase Functions (Edge Functions):**  Utilize Supabase Edge Functions to execute server-side logic, such as sending emails, processing payments, or performing complex calculations.
*   **Supabase Realtime:** Use Supabase Realtime for real-time updates, such as displaying new messages or booking requests.
*   **Database Migrations:** Use a database migration tool (e.g., Flyway, Liquibase) to manage database schema changes in a controlled and repeatable manner.

**8. Future Considerations**

*   **Denormalization:**  Consider denormalizing certain data (e.g., storing the property name in the `bookings` table) to improve query performance.  However, be mindful of the trade-offs between performance and data consistency.
*   **Auditing:**  Implement an auditing system to track changes to sensitive data.
*   **Geospatial Data:**  Explore the use of PostGIS for more advanced geospatial queries.
*   **Full-Text Search:**  Implement full-text search capabilities for searching properties and reviews.

**9. Diagram (Illustrative)**

While a text document is useful, consider creating a visual diagram of the database schema using a tool like draw.io, Lucidchart, or dbdiagram.io. This will help visualize the relationships between tables and make the schema easier to understand.

**Important Considerations:**

*   **Security:**  Review RLS policies regularly to ensure that they are up-to-date and effective.
*   **Performance:**  Monitor database performance and optimize queries as needed.
*   **Data Integrity:**  Enforce data integrity through constraints and validation rules.
*   **Scalability:**  Design the database schema to be scalable to handle a growing number of users and data.
*   **Privacy:**  Comply with all applicable privacy regulations.  Consider data anonymization and pseudonymization techniques where appropriate.

This comprehensive database schema document provides a strong foundation for building MyPlaceUrTrip. Remember to adapt and refine the schema as your application evolves and your requirements change. Good luck!
