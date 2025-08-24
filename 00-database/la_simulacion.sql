
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
	usage_policy VARCHAR(2000) --  politica de uso
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
	date DATE NOT NULL,
    start_hour TIME NOT NULL,
    end_hour TIME NOT NULL,
    status TINYINT NOT NULL DEFAULT 1,
    proyect_description VARCHAR(350),
    proyect_type VARCHAR(150), -- "fotografia", "sesión de retratos", "grabacion de video" u texto libre
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
    event_description VARCHAR(350) NOT NULL,
    location VARCHAR(150) NOT NULL, -- --quitar not null
    cover_image VARCHAR(200),
    duration VARCHAR(50) NOT NULL, -- "30 minutos" o "2 horas", que sea opcional (quitar not null)
    start_date DATE,
    end_date DATE,
    start_hour TIME,
    end_hour TIME, 
    number_of_attendees MEDIUMINT UNSIGNED,
    price DECIMAL(6,2),  -- 9999.99  o  0  o  NULL
    ticket_link VARCHAR(200),
    event_is_deleted BOOLEAN NOT NULL DEFAULT 0
    -- CONSTRAINT fk_user_2 FOREIGN KEY (user_id) 
    -- REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE review (
	review_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    event_id INT UNSIGNED NOT NULL,
    rating TINYINT NOT NULL, -- de 1 a 5
    description VARCHAR(350), 
	CONSTRAINT fk_event_1 FOREIGN KEY (event_id) 
    REFERENCES event(event_id) ON DELETE CASCADE ON UPDATE CASCADE    
);
    

CREATE TABLE section (
	event_id INT UNSIGNED NOT NULL,    
	section_id TINYINT UNSIGNED NOT NULL, -- let id = select max(section_id) where event_id = 5;  id++; insert into section section_id = `${id}`;
    PRIMARY KEY(event_id, section_id),
    section_title VARCHAR(100) NOT NULL,
    section_subtitle VARCHAR(350),
    section_description VARCHAR(350),
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

INSERT INTO room (
    room_name,
    room_description,
    who_can_use_it,
    pricing,
    usage_policy
) VALUES (
    'Sala de grabación de audio',
    'Es un espacio creativo en el corazón de la ciudad, diseñado para músicos, productores y artistas. Ofrecemos un entorno acústicamente optimizado con equipos de alta gama, perfectos para la grabación, mezcla y masterización. Nuestro estudio cuenta con una sala de control espaciosa, una cabina de grabación insonorizada y una selección de micrófonos e instrumentos de calidad profesional. Un lugar ideal para dar vida a tu música, con flexibilidad y todo el soporte que necesitas.',
    'Este servicio está destinado a artistas emergentes, entendiendo por ello: Músicos: con menos de 10.000 reproducciones por canción o 5.000 oyentes mensuales en Spotify/YouTube. Ilustradores/as y artistas visuales: en etapa inicial, sin exposiciones individuales de gran alcance o contratos comerciales establecidos. Modelos y performers: en proceso de creación de portafolio y sin representación por agencias consolidadas. Proyectos audiovisuales: que no cuenten con financiación comercial ni presupuestos elevados de producción.',
    'Alquiler del espacio: (Portafondos blanco 3m): 25€/hora (15€/hora para socias). El alquiler del material adicional (foco grande Godox SL300IIBI + softbox y focos pequeños de colores) tiene un coste de 50€ por jornada (35€ socias).',
    'El alquiler del espacio es de 25€/hora. (15€/hora socias) El alquiler del material adicional (foco grande Godox SL300IIBI + softbox y focos pequeños de colores) tiene un coste de 50€ por jornada (35€ socias). Se requiere puntualidad en los horarios indicados. El pago debe realizarse antes de la sesión. El espacio debe ser entregado limpio y en las mismas condiciones en las que se recibió. Cualquier daño al material o al espacio será responsabilidad del usuario y deberá ser asumido económicamente. Desde la asociación La Simulación, queremos facilitar el acceso a herramientas profesionales para artistas emergentes de Castelló. Por eso, ofrecemos nuestro espacio y material a un coste reducido. Los ingresos generados se destinan a dos fines, en primer lugar como donativo a la asociación, contribuyendo al desarrollo de nuestros proyectos y objetivos en apoyo a la comunidad artística de la ciudad. En segundo lugar como aportación para cubrir gastos de mantenimiento, como el consumo eléctrico del espacio. Normas básicas de uso: -Puntualidad en los horarios indicados. -El pago debe realizarse antes de la sesión. -El espacio debe entregarse limpio y en las mismas condiciones en las que se recibió. -Los usuarios son responsables de cualquier daño al material o al espacio, debiendo asumir los costes de reparación o reemplazo...'
);

