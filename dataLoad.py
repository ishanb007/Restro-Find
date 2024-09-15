import json
import mysql.connector
import os

#connecting to db
def connect_to_db():
    try:
        connection = mysql.connector.connect(
            host="localhost", 
            user="root",
            password=<placeholder>,
            database="restaurantdb"
        )
        if connection.is_connected():
            print("Connected to MySQL database")
            return connection
    except mysql.connector.Error as e:
        print(f"Error: {e}")
        return None

# inserting data
def insert_restaurant(cursor, restaurant):
    insert_sql = """
        INSERT IGNORE INTO restaurants 
        (restaurant_id, name, latitude, longitude, address, city, locality, country_id, cuisines, image_url, rating_text, rating_color, aggregate_rating, average_cost_for_two, currency, has_table_booking, photo_url, menu_url, book_url)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    
    default_img = "https://res.cloudinary.com/dolrydrvd/image/upload/v1726392968/restaarant_f13loh.jpg"

    restaurant_id = restaurant["id"]
    name = restaurant["name"]
    latitude = float(restaurant["location"]["latitude"])
    longitude = float(restaurant["location"]["longitude"])
    address = restaurant["location"]["address"]
    city = restaurant["location"]["city"]
    locality = restaurant["location"]["locality"]
    country_id = int(restaurant["location"]["country_id"])
    cuisines = json.dumps(restaurant["cuisines"])  # json string
    image_url = restaurant.get("thumb", "")
    if not image_url:
        image_url = default_img
    rating_text = restaurant["user_rating"]["rating_text"]
    rating_color = restaurant["user_rating"]["rating_color"]
    aggregate_rating = float(restaurant["user_rating"]["aggregate_rating"])
    average_cost_for_two = int(restaurant["average_cost_for_two"])
    currency = restaurant["currency"]
    has_table_booking = bool(restaurant["has_table_booking"])
    photo_url = restaurant.get("photos_url", "")
    menu_url = restaurant.get("menu_url", "")
    book_url = restaurant.get("book_url", "")
    
    # Execute SQL
    cursor.execute(insert_sql, (
        restaurant_id, name, latitude, longitude, address, city, locality, country_id, cuisines, image_url, 
        rating_text, rating_color, aggregate_rating, average_cost_for_two, currency, has_table_booking, photo_url, menu_url, book_url
    ))

# Load and Parse JSON Files
def load_restaurants_from_json(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)  
        restaurants = []
        
        for item in data:
            if "restaurants" in item:
                for restaurant_item in item["restaurants"]:
                    if "restaurant" in restaurant_item:
                        restaurants.append(restaurant_item["restaurant"])  
                
        return restaurants
#accessing all files from parent directory
def process_all_files(directory_path):
    json_files = [f for f in os.listdir(directory_path) if f.endswith('.json')]
    
    # Connect to MySQL
    db_connection = connect_to_db()
    if db_connection is None:
        print("Failed to connect to the database.")
        return

    cursor = db_connection.cursor()

    for json_file in json_files:
        json_file_path = os.path.join(directory_path, json_file)
        print(f"Processing {json_file_path}...")
        restaurants = load_restaurants_from_json(json_file_path)

        # Insert each restaurant into the database
        for restaurant in restaurants:
            insert_restaurant(cursor, restaurant)

    # Commit the transaction
    db_connection.commit()

    # Close the database connection
    cursor.close()
    db_connection.close()

if __name__ == "__main__":
    directory_path = "./DataLoad" 
    process_all_files(directory_path)
