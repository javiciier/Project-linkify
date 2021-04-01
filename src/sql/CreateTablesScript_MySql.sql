/* ELIMINACIÓN DE TABLAS, ÍNDICES Y RESTRICCIONES */
/* Recordar eliminar las tablas en el orden inverso en el que se crean */
DROP TABLE UserAccount;
DROP TABLE User;



/* CREACIÓN DE TABLAS */
CREATE TABLE User (
    id              BIGINT NOT NULL AUTO_INCREMENT,
    name            VARCHAR(50) NOT NULL,       /* Nombre */
    surname1        VARCHAR(50) NOT NULL,       /* Primer apellido */
    surname2        VARCHAR(50),                /* Segundo apellido */
    email           VARCHAR(60) NOT NULL,
    image           LONGBLOB,

    CONSTRAINT User_PK PRIMARY KEY (id)
) ENGINE = InnoDB;


CREATE TABLE UserAccount (
    accountId       BIGINT NOT NULL AUTO_INCREMENT,
    nickName        VARCHAR(60) NOT NULL,           /* Nombre de usuario */
    password        VARCHAR(60) NOT NULL,           /* Contraseña */
    user            BIGINT NOT NULL,                /* Usuario al que pertenece la cuenta*/

    CONSTRAINT UserAccount_PK PRIMARY KEY (accountId),
    CONSTRAINT UserAccount_TO_User_FK FOREIGN KEY (user) REFERENCES User(id) ON DELETE CASCADE
) ENGINE = InnoDB;



/* GENERACIÓN DE ÍNDICES */
/*
CREATE INDEX User_id_INDEX ON User(id);
CREATE INDEX UserAccount_nickName_INDEX ON UserAccount(nickName);
*/
