hostel-website/
│
├── app.js
├── passport-config.js
├── package.json
├── node_modules/
│   └── (installed npm packages)
│
├── public/
│   └── styles.css   // Example CSS file (optional)
│
├── views/
│   ├── index.ejs   // Example index view displaying hostels
│   ├── login.ejs   // Login form
│   └── signup.ejs  // Signup form
│
└── sql/
    └── schema.sql  // SQL schema for database tables (optional)







    Enter password: ****
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 114
Server version: 8.0.37 MySQL Community Server - GPL

Copyright (c) 2000, 2024, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| hostel_booking     |
| information_schema |
| mysql              |
| online             |
| performance_schema |
| sys                |
+--------------------+
6 rows in set (0.01 sec)

mysql> drop database hostel_booking;
Query OK, 4 rows affected (0.09 sec)

mysql> CREATE DATABASE hostel_db;
Query OK, 1 row affected (0.01 sec)

mysql> USE hostel_db;
Database changed
mysql> CREATE TABLE hostels (
    ->     hostel_id INT AUTO_INCREMENT PRIMARY KEY,
    ->     name VARCHAR(100) NOT NULL,
    ->     description TEXT,
    ->     location VARCHAR(255),
    ->     price DECIMAL(10, 2) NOT NULL,
    ->     facilities TEXT,
    ->     rating FLOAT,
    ->     image VARCHAR(255),
    ->     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ->     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    -> );
Query OK, 0 rows affected (0.03 sec)

mysql> INSERT INTO hostels (name, description, location, price, facilities, rating, image)
    -> VALUES
    ->     ('Hostel 1', 'Description of Hostel 1', 'Location of Hostel 1', 50.00, 'WiFi, Breakfast', 4.5, 'https://up.yimg.com/ib/th?id=OIP.8q7JEkdS_mpz7-SJUy5pAAHaE8&pid=Api&rs=1&c=1&qlt=95&w=153&h=102'),
    ->     ('Hostel 2', 'Description of Hostel 2', 'Location of Hostel 2', 60.00, 'WiFi, Pool', 4.2, 'https://up.yimg.com/ib/th?id=OIP.8q7JEkdS_mpz7-SJUy5pAAHaE8&pid=Api&rs=1&c=1&qlt=95&w=153&h=102'),
    ->     ('Hostel 3', 'Description of Hostel 3', 'Location of Hostel 3', 45.00, 'WiFi, Parking', 4.0, 'https://up.yimg.com/ib/th?id=OIP.8q7JEkdS_mpz7-SJUy5pAAHaE8&pid=Api&rs=1&c=1&qlt=95&w=153&h=102'),
    ->     ('Hostel 4', 'Description of Hostel 4', 'Location of Hostel 4', 55.00, 'WiFi, Bar', 4.8, 'https://up.yimg.com/ib/th?id=OIP.8q7JEkdS_mpz7-SJUy5pAAHaE8&pid=Api&rs=1&c=1&qlt=95&w=153&h=102'),
    ->     ('Hostel 5', 'Description of Hostel 5', 'Location of Hostel 5', 65.00, 'WiFi, Gym', 4.6, 'https://up.yimg.com/ib/th?id=OIP.8q7JEkdS_mpz7-SJUy5pAAHaE8&pid=Api&rs=1&c=1&qlt=95&w=153&h=102'),
    ->     ('Hostel 6', 'Description of Hostel 6', 'Location of Hostel 6', 40.00, 'WiFi, Kitchen', 4.3, 'https://up.yimg.com/ib/th?id=OIP.8q7JEkdS_mpz7-SJUy5pAAHaE8&pid=Api&rs=1&c=1&qlt=95&w=153&h=102'),
    ->     ('Hostel 7', 'Description of Hostel 7', 'Location of Hostel 7', 70.00, 'WiFi, Spa', 4.9, 'https://up.yimg.com/ib/th?id=OIP.8q7JEkdS_mpz7-SJUy5pAAHaE8&pid=Api&rs=1&c=1&qlt=95&w=153&h=102'),
    ->     ('Hostel 8', 'Description of Hostel 8', 'Location of Hostel 8', 52.00, 'WiFi, Lounge', 4.7, 'https://up.yimg.com/ib/th?id=OIP.8q7JEkdS_mpz7-SJUy5pAAHaE8&pid=Api&rs=1&c=1&qlt=95&w=153&h=102'),
    ->     ('Hostel 9', 'Description of Hostel 9', 'Location of Hostel 9', 48.00, 'WiFi, Laundry', 4.4, 'https://up.yimg.com/ib/th?id=OIP.8q7JEkdS_mpz7-SJUy5pAAHaE8&pid=Api&rs=1&c=1&qlt=95&w=153&h=102'),
    ->     ('Hostel 10', 'Description of Hostel 10', 'Location of Hostel 10', 58.00, 'WiFi, BBQ Area', 4.5, 'https://up.yimg.com/ib/th?id=OIP.8q7JEkdS_mpz7-SJUy5pAAHaE8&pid=Api&rs=1&c=1&qlt=95&w=153&h=102');
Query OK, 10 rows affected (0.01 sec)
Records: 10  Duplicates: 0  Warnings: 0

