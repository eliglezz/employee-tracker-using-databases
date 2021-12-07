INSERT INTO
    department (name)
VALUES
    ("Head Office"),
    ("Development"),
    ("Marketing");

INSERT INTO 
    role (title, salary, department_id)
VALUES
    ("Executive", 250000, 3),  
    ("Manager", 150000, 2),
    ("Marketing", 140000, 1),
    ("Engineer", 130000, 2),
    ("Developer", 115000, 2);

INSERT INTO 
    employees (first_name, last_name, role_id, manager_id)
VALUES
    ("Rhiannon", "Thatcher", 5, null),
    ("Peyton", "Hobbes", 4, 4),
    ("Sherwood", "Emmett", 3, 4),
    ("Yvonne", "Christison", 2, 1),
    ("Robbie", "Wade", 1, 1);


