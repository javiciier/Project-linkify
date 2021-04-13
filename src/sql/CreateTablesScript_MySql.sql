/* ELIMINACIÓN DE TABLAS, ÍNDICES Y RESTRICCIONES */
/* Recordar eliminar las tablas en el orden inverso en el que se crean */
DROP TABLE User;



/* CREACIÓN DE TABLAS */
CREATE TABLE User (
    id              BIGINT NOT NULL AUTO_INCREMENT,
    name            VARCHAR(50) NOT NULL,       /* Nombre */
    surname1        VARCHAR(50) NOT NULL,       /* Primer apellido */
    surname2        VARCHAR(50),                /* Segundo apellido */
    email           VARCHAR(60) NOT NULL,
    image           LONGBLOB,
    nickName        VARCHAR(60) NOT NULL,           /* Nombre de usuario */
    password        VARCHAR(60) NOT NULL,           /* Contraseña */

    CONSTRAINT User_PK PRIMARY KEY (id)
) ENGINE = InnoDB;



/* GENERACIÓN DE ÍNDICES */
CREATE INDEX User_id_INDEX ON User(id);
