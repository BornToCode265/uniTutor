CREATE DATABASE MZUNI_Tutoring_App;

USE MZUNI_Tutoring_App;

-- Programs Table
CREATE TABLE Programs (
    program_id INT AUTO_INCREMENT PRIMARY KEY,
    program_name VARCHAR(100) NOT NULL,
    description TEXT
);

-- Students Table
CREATE TABLE Students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    registration_number VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(20),
    program_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (program_id) REFERENCES Programs(program_id)
);

-- Tutors Table
CREATE TABLE Tutors (
    tutor_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Qualifications Table
CREATE TABLE Qualifications (
    qualification_id INT AUTO_INCREMENT PRIMARY KEY,
    qualification_name VARCHAR(100) NOT NULL,
    description TEXT
);

-- Tutor_Qualifications Table
CREATE TABLE Tutor_Qualifications (
    tutor_qualification_id INT AUTO_INCREMENT PRIMARY KEY,
    tutor_id INT,
    qualification_id INT,
    FOREIGN KEY (tutor_id) REFERENCES Tutors(tutor_id),
    FOREIGN KEY (qualification_id) REFERENCES Qualifications(qualification_id)
);

-- Expertise Table
CREATE TABLE Expertise (
    expertise_id INT AUTO_INCREMENT PRIMARY KEY,
    expertise_name VARCHAR(100) NOT NULL,
    description TEXT
);

-- Tutor_Expertise Table
CREATE TABLE Tutor_Expertise (
    tutor_expertise_id INT AUTO_INCREMENT PRIMARY KEY,
    tutor_id INT,
    expertise_id INT,
    FOREIGN KEY (tutor_id) REFERENCES Tutors(tutor_id),
    FOREIGN KEY (expertise_id) REFERENCES Expertise(expertise_id)
);

-- Availability Table
CREATE TABLE Availability (
    availability_id INT AUTO_INCREMENT PRIMARY KEY,
    tutor_id INT,
    available_date DATE NOT NULL,
    available_time TIME NOT NULL,
    status ENUM('Available', 'Booked', 'Unavailable') DEFAULT 'Available',
    FOREIGN KEY (tutor_id) REFERENCES Tutors(tutor_id)
);

-- Status_Lookup Table
CREATE TABLE Status_Lookup (
    status_id INT AUTO_INCREMENT PRIMARY KEY,
    status_name VARCHAR(50) NOT NULL,
    description TEXT
);

-- Sessions Table
CREATE TABLE Sessions (
    session_id INT AUTO_INCREMENT PRIMARY KEY,
    tutor_id INT,
    student_id INT,
    subject_id INT,
    session_date DATE NOT NULL,
    session_time TIME NOT NULL,
    status INT,
    feedback_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tutor_id) REFERENCES Tutors(tutor_id),
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    FOREIGN KEY (subject_id) REFERENCES Subjects(subject_id),
    FOREIGN KEY (feedback_id) REFERENCES Feedback(feedback_id),
    FOREIGN KEY (status) REFERENCES Status_Lookup(status_id)
);

-- Feedback Table
CREATE TABLE Feedback (
    feedback_id INT AUTO_INCREMENT PRIMARY KEY,
    session_id INT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comments TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES Sessions(session_id)
);

-- Admins Table
CREATE TABLE Admins (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subjects Table
CREATE TABLE Subjects (
    subject_id INT AUTO_INCREMENT PRIMARY KEY,
    subject_name VARCHAR(100) NOT NULL,
    description TEXT
);

-- Messages Table
CREATE TABLE Messages (
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT,
    receiver_id INT,
    message_content TEXT,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES Students(student_id),
    FOREIGN KEY (receiver_id) REFERENCES Tutors(tutor_id)
);

-- Session Bookings Table
CREATE TABLE Session_Bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    tutor_id INT,
    session_id INT,
    booked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    FOREIGN KEY (tutor_id) REFERENCES Tutors(tutor_id),
    FOREIGN KEY (session_id) REFERENCES Sessions(session_id)
);

-- Roles Table
CREATE TABLE Roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL
);

-- User_Roles Table
CREATE TABLE User_Roles (
    user_role_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    role_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Admins(admin_id),
    FOREIGN KEY (role_id) REFERENCES Roles(role_id)
);

-- Insert sample data
INSERT INTO Programs (program_name, description) VALUES
('Computer Science', 'Bachelor''s degree in Computer Science'),
('Mathematics', 'Bachelor''s degree in Mathematics');

INSERT INTO Students (registration_number, name, email, phone_number, program_id) VALUES
('CS001', 'John Doe', 'john.doe@mzuni.ac.mw', '0888888888', 1),
('MATH002', 'Jane Smith', 'jane.smith@mzuni.ac.mw', '0999999999', 2);

INSERT INTO Tutors (name, email, phone_number) VALUES
('Dr. John Taylor', 'jtaylor@mzuni.ac.mw', '0777777777'),
('Dr. Jane Wilson', 'jwilson@mzuni.ac.mw', '0666666666');

INSERT INTO Qualifications (qualification_name, description) VALUES
('Ph.D. in Computer Science', 'Doctoral degree in Computer Science'),
('Master''s in Mathematics', 'Postgraduate degree in Mathematics');

INSERT INTO Tutor_Qualifications (tutor_id, qualification_id) VALUES
(1, 1),
(2, 2);

INSERT INTO Expertise (expertise_name, description) VALUES
('Artificial Intelligence', 'Specialization in AI and Machine Learning'),
('Number Theory', 'Specialization in Number Theory');

INSERT INTO Tutor_Expertise (tutor_id, expertise_id) VALUES
(1, 1),
(2, 2);

INSERT INTO Availability (tutor_id, available_date, available_time, status) VALUES
(1, '2023-03-15', '09:00:00', 'Available'),
(2, '2023-03-16', '10:00:00', 'Available');

INSERT INTO Status_Lookup (status_name, description) VALUES
('Scheduled', 'Session scheduled'),
('Completed', 'Session completed'),
('Cancelled', 'Session cancelled');

INSERT INTO Subjects (subject_name, description) VALUES
('Data Structures', 'Course on data structures and algorithms'),
('Calculus', 'Course on differential calculus');

INSERT INTO Sessions (tutor_id, student_id, subject_id, session_date, session_time, status, feedback_id) VALUES
(1, 1, 1, '2023-03-17', '11:00:00', 1, NULL),
(2, 2, 2, '2023-03-18', '12:00:00', 1, NULL);

INSERT INTO Feedback (session_id, rating, comments) VALUES
(1, 5, 'Excellent session'),
(2, 4, 'Good session');

INSERT INTO Admins (name, email, password_hash) VALUES
('Admin User', 'admin@mzuni.ac.mw', 'hashed_password'),
('Super Admin', 'superadmin@mzuni.ac.mw', 'hashed_password');

INSERT INTO Messages (sender_id, receiver_id, message_content) VALUES
(1, 1, 'Hi Dr. Taylor, I have a question about the assignment.'),
(2, 2, 'Hi Dr. Wilson, could we schedule an extra session?');

INSERT INTO Session_Bookings (student_id, tutor_id, session_id) VALUES
(1, 1, 1),
(2, 2, 2);

INSERT INTO Roles (role_name) VALUES
('Student'),
('Tutor'),
('Admin');

INSERT INTO User_Roles (user_id, role_id) VALUES
(1, 1),
(2, 2),
(1, 3),
(2, 3);
