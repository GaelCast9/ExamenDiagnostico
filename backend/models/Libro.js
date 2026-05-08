const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Libro = sequelize.define('Libro', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  autor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: false
  },
  anio_publicacion: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  url_portada: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'libros', // Sequelize por defecto pluraliza (books), pero es bueno asegurarlo
  timestamps: false   // Desactiva los campos createdAt y updatedAt que Sequelize agrega por defecto
});

module.exports = Libro;
