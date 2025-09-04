
CREATE DATABASE la_simulacion;

USE la_simulacion;

CREATE TABLE user (
	user_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    lastname VARCHAR(100),
    email VARCHAR(100)  NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    phone_number VARCHAR(30),
    avatar VARCHAR(200),
    specialty VARCHAR(40),
    user_is_confirmed BOOLEAN NOT NULL DEFAULT 0,
    user_is_disabled BOOLEAN NOT NULL DEFAULT 0,
    user_is_deleted BOOLEAN NOT NULL DEFAULT 0,
    type TINYINT UNSIGNED NOT NULL DEFAULT 2
);


CREATE TABLE service (
	service_id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    -- agent VARCHAR(50) NOT NULL DEFAULT 'Cooperativa' -- cooperativa o asociación    
    service_name  VARCHAR(100) NOT NULL,
    image VARCHAR(200),
    service_description VARCHAR(1500) NOT NULL, 
    service_is_deleted BOOLEAN NOT NULL DEFAULT 0
);


CREATE TABLE room (
	room_id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	room_name VARCHAR(150) NOT NULL, -- "sala de grabacion de audio"
	room_description VARCHAR(2000),  -- sala de grabacion de audio con micros, auriculares
    who_can_use_it VARCHAR(2000),  -- ¿Quién puede solicitar el uso del espacio?
	pricing VARCHAR(500),  -- precios
	usage_policy VARCHAR(2000), --  politica de uso
    room_is_deleted BOOLEAN NOT NULL DEFAULT 0
);

CREATE TABLE room_image (
	room_id TINYINT UNSIGNED NOT NULL,
	room_image_id TINYINT UNSIGNED NOT NULL,
	PRIMARY KEY(room_id, room_image_id),
	file VARCHAR(200) NOT NULL,
	CONSTRAINT fk_room_1 FOREIGN KEY (room_id) 
	REFERENCES room(room_id) ON DELETE CASCADE ON UPDATE CASCADE 
);


CREATE TABLE reservation (
	reservation_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    room_id TINYINT UNSIGNED NOT NULL,
    phone_number VARCHAR(30) NOT NULL,
	date DATE NOT NULL,
    start_hour TIME NOT NULL,
    end_hour TIME NOT NULL,
    status TINYINT NOT NULL DEFAULT 1,
    proyect_description VARCHAR(350) NOT NULL,
    proyect_type VARCHAR(150) NOT NULL, -- "fotografia", "sesión de retratos", "grabacion de video" u texto libre
    socialmedia_link VARCHAR(200),
    ilumination_material BOOLEAN NOT NULL DEFAULT 0,
    number_of_attendees VARCHAR(100) NOT NULL, -- "entre 20 y 30"
    aditional_requirement VARCHAR(250),
    user_policy_confirmation BOOLEAN NOT NULL,
	CONSTRAINT fk_user_1 FOREIGN KEY (user_id) 
    REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,  
	CONSTRAINT fk_room_2 FOREIGN KEY (room_id) 
    REFERENCES room(room_id) ON DELETE CASCADE ON UPDATE CASCADE    
);
    

CREATE TABLE event (
	event_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    -- user_id BIGINT UNSIGNED NOT NULL, -- permitan que un usuario cree en la app toda la info de un taller, curso, concierto...
    event_title VARCHAR(100) NOT NULL, 
    event_description VARCHAR(600) NOT NULL,
    location VARCHAR(150),
    cover_image VARCHAR(200),
    duration VARCHAR(50), -- "30 minutos" o "2 horas"
    start_date DATE,
    end_date DATE,
    start_hour TIME,
    end_hour TIME, 
    number_of_attendees VARCHAR(50),
    price DECIMAL(6,2),  -- 9999.99  o  0  o  NULL
    ticket_link VARCHAR(200),
    event_is_deleted BOOLEAN NOT NULL DEFAULT 0,
    type_event TINYINT UNSIGNED NOT NULL
    -- CONSTRAINT fk_user_2 FOREIGN KEY (user_id) 
    -- REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE review (
	review_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    event_id INT UNSIGNED NOT NULL,
    rating TINYINT NOT NULL, -- de 1 a 5
    description VARCHAR(350), 
    review_name VARCHAR(25), 
	CONSTRAINT fk_event_1 FOREIGN KEY (event_id) 
    REFERENCES event(event_id) ON DELETE CASCADE ON UPDATE CASCADE    
);
    

CREATE TABLE section (
	event_id INT UNSIGNED NOT NULL,    
	section_id TINYINT UNSIGNED NOT NULL, -- let id = select max(section_id) where event_id = 5;  id++; insert into section section_id = `${id}`;
    PRIMARY KEY(event_id, section_id),
    section_title VARCHAR(100) NOT NULL,
    section_subtitle VARCHAR(350),
    section_description VARCHAR(600),
    section_duration VARCHAR(50), -- "30 minutos", "2 horas"
	CONSTRAINT fk_event_2 FOREIGN KEY (event_id) 
    REFERENCES event(event_id) ON DELETE CASCADE ON UPDATE CASCADE    
);


CREATE TABLE section_image (
	event_id INT UNSIGNED NOT NULL,
    section_id TINYINT UNSIGNED NOT NULL,
	section_image_id TINYINT UNSIGNED NOT NULL,
    primary key(event_id, section_id, section_image_id),
    file VARCHAR(200) NOT NULL,
    section_image_is_deleted BOOLEAN NOT NULL DEFAULT 0,
	CONSTRAINT fk_section_1 FOREIGN KEY (event_id, section_id)
    REFERENCES section(event_id, section_id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE section_key_point (
	event_id INT UNSIGNED NOT NULL,
    section_id TINYINT UNSIGNED NOT NULL,
	section_key_point_id TINYINT UNSIGNED NOT NULL,
    PRIMARY KEY(event_id, section_id, section_key_point_id),
    key_point_title VARCHAR(100) NOT NULL,
    key_point_description VARCHAR(500),
    CONSTRAINT fk_section_2 FOREIGN KEY (event_id, section_id)
    REFERENCES section(event_id, section_id) ON DELETE CASCADE ON UPDATE CASCADE  
);

    
SELECT * FROM user;   
SELECT * FROM room;
SELECT * FROM room_image;
SELECT * FROM service;
SELECT * FROM reservation;
SELECT * FROM event;
SELECT * FROM section;
SELECT * FROM section_image;
SELECT * FROM section_key_point;






