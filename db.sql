CREATE TABLE containers (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
);
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    role user_role NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
);
CREATE TYPE user_role AS ENUM ('restaurant', 'customer');

INSERT INTO users (name, role, email, password) VALUES ('Goiko', 'restaurant','goiko@gmail.com', '$2a$10$gPV3LVgWLBT2i3r.6Umqj.beFIAcbTRM/Fek57zSEKQMwHqvtvkgq');
INSERT INTO users (name, role, email, password) VALUES ('Javier', 'customer', 'javier@gmail.com', '$2a$10$gPV3LVgWLBT2i3r.6Umqj.beFIAcbTRM/Fek57zSEKQMwHqvtvkgq');
INSERT INTO users (name, role, email, password) VALUES ('Burger King', 'restaurant', 'bbk@gmail.com', '$2a$10$gPV3LVgWLBT2i3r.6Umqj.beFIAcbTRM/Fek57zSEKQMwHqvtvkgq');
INSERT INTO users (name, role, email, password) VALUES ('Marc', 'customer', 'marc@boomerang.com', '$2a$10$gPV3LVgWLBT2i3r.6Umqj.beFIAcbTRM/Fek57zSEKQMwHqvtvkgq');
INSERT INTO users (name, role, email, password) VALUES ('McDonalds', 'restaurant', 'mdonalds@gmail.com', '$2a$10$gPV3LVgWLBT2i3r.6Umqj.beFIAcbTRM/Fek57zSEKQMwHqvtvkgq');
INSERT INTO users (name, role, email, password) VALUES ('Oriol', 'customer', 'oriol@boomerang.com', '$2a$10$gPV3LVgWLBT2i3r.6Umqj.beFIAcbTRM/Fek57zSEKQMwHqvtvkgq');
INSERT INTO users (name, role, email, password) VALUES ('Sushi Roll', 'restaurant', 'sushiroll@gmail.com', '$2a$10$gPV3LVgWLBT2i3r.6Umqj.beFIAcbTRM/Fek57zSEKQMwHqvtvkgq');
INSERT INTO users (name, role, email, password) VALUES ('Alejandro', 'customer', 'ale@gmail.com', '$2a$10$gPV3LVgWLBT2i3r.6Umqj.beFIAcbTRM/Fek57zSEKQMwHqvtvkgq');
INSERT INTO users (name, role, email, password) VALUES ('Telepizza', 'restaurant', 'tpizza@gmail.com', '$2a$10$gPV3LVgWLBT2i3r.6Umqj.beFIAcbTRM/Fek57zSEKQMwHqvtvkgq');
INSERT INTO users (name, role, email, password) VALUES ('Anabel', 'customer', 'ana@gmail.com', '$2a$10$gPV3LVgWLBT2i3r.6Umqj.beFIAcbTRM/Fek57zSEKQMwHqvtvkgq');

INSERT INTO containers (name, user_id) VALUES ('Container 1', 1);
INSERT INTO containers (name, user_id) VALUES ('Container 2', 1);
INSERT INTO containers (name, user_id) VALUES ('Container 3', 2);
INSERT INTO containers (name, user_id) VALUES ('Container 4', 2);
INSERT INTO containers (name, user_id) VALUES ('Container 5', 3);
INSERT INTO containers (name, user_id) VALUES ('Container 6', 3);
INSERT INTO containers (name, user_id) VALUES ('Container 7', 4);
INSERT INTO containers (name, user_id) VALUES ('Container 8', 4);
INSERT INTO containers (name, user_id) VALUES ('Container 9', 5);
INSERT INTO containers (name, user_id) VALUES ('Container 10', 5);