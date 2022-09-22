SELECT
favorite_books.book_name AS book_name,
book_prices.price AS price
FROM favorite_books
JOIN book_prices ON book_prices.id = favorite_books.book_price;