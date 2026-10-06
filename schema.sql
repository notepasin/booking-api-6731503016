DROP TABLE IF EXISTS Bookings;
DROP TABLE IF EXISTS Equipment;

CREATE TABLE Equipment (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT NOT NULL
);

CREATE TABLE Bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    equipmentId TEXT NOT NULL,
    borrowerName TEXT NOT NULL,
    startAt TEXT NOT NULL,
    endAt TEXT NOT NULL,
    purpose TEXT,
    FOREIGN KEY (equipmentId) REFERENCES Equipment(id)
);

INSERT INTO Equipment (id, name, location) VALUES 
    ('eq-1', 'Projector A', 'Building 1'),
    ('eq-2', 'DSLR Camera', 'Building 2');