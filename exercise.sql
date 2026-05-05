
BEGIN TRANSACTION;

INSERT INTO Stores VALUES (1, 'New York', 1050, 50000);

INSERT INTO Employee VALUES (1050, 'John', 'Manager', 'Nashville');

INSERT INTO Contact_Info VALUES (1050, 'john@email.com', '555-1234', '123 Main St', '90210');

UPDATE Grocery
SET NEXT_EXPIRE_DATE = DATE()
WHERE PRODUCT_NAME IN ('Spinach', 'Avocado', 'Yogurt');

COMMIT;
