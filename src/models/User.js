// Loguear usuario
// Editar información de usuario


const fs = require ("fs");
const path = require('path');


const User = {
    fileName : path.join(__dirname, '../data/usersDataBase.json'),
    
    getData: function () {
        return JSON.parse(fs.readFileSync(this.fileName, "utf-8"));
    },

    // Generar Id
    generateId : function () {
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if (lastUser) {
            return lastUser. id+ 1;
        } 
        return 1;
     },

    findAll: function () {
        return this.getData();
    },
    

    // Buscar usuario por ID
    findByPk: function (id) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id === id);
        return userFound;
    },

    // Buscar usuario por email
    findByField: function (field, text) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] == text);
        return userFound;
    },

    // Guardar usuario en DB
    create: function (userData) {
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userData 
        }
        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, " "));
        return newUser;
    },

    // Eliminar usuario
    delete: function (id) {
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, " "));
        return true;
    }


}



module.exports = User;