BEGIN TRANSACTION;

INSERT INTO Stores
VALUES (1, 'New York', 1050, 50000);

INSERT INTO Employee
VALUES (1050, 'John', 'Smith', 60000, 'Nashville', DATE(), 'College');

INSERT INTO Contact_Info
VALUES (1050, 'john@email.com', 5551234, '123 Main St', 90210, 'Jane Smith');

UPDATE Grocery
SET NEXT_EXPIRE_DATE = DATE()
WHERE PRODUCT_NAME IN ('Spinach', 'Avocado', 'Yogurt');

COMMIT;
