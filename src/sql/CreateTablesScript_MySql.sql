/* ELIMINACIÓN DE TABLAS */
DROP TABLE User;
DROP TABLE UserAccount;


/* CREACIÓN DE TABLAS */
CREATE TABLE User (
    id              BIGINT NOT NULL AUTOINCREMENT,
    name            VARCHAR(50) NOT NULL,       /* Nombre */
    surname1        VARCHAR(50),                /* Primer apellido */
    surname2        VARCHAR(50),                /* Segundo apellido */
    email           VARCHAR(60),
    image           LONGBLOB,

    CONSTRAINT User_PK PRIMARY KEY (id),
) ENGINE = InnoDB;


CREATE TABLE UserAccount (
    accountId       BIGINT NOT NULL AUTOINCREMENT,
    nickName        VARCHAR(60) NOT NULL,           /* Nombre de usuario */
    password        VARCHAR(60) NOT NULL,           /* Contraseña */
    user            BIGINT NOT NULL,                /* Usuario al que pertenece la cuenta*/

    CONSTRAINT UserAccount_PK PRIMARY KEY (accountId),
) ENGINE = InnoDB;


/* CLAVES FORÁNEAS */
ALTER TABLE UserAccount ADD CONSTRAINT UserAccount_User_FK FOREIGN KEY (user) REFERENCES User(id);


/* GENERACIÓN DE ÍNDICES */
CREATE INDEX User_id_INDEX ON User(id);
CREATE INDEX UserAccount_nickName_INDEX ON UserAccount(nickName);
