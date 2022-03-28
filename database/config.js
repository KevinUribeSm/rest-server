const mongoose = require('mongoose');

const connection = async () => {

    await mongoose.connect('mongodb+srv://admin:admin@cluster0.ur5st.mongodb.net/test', { serverSelectionTimeoutMS: 5000 }, (err, res) => {

        if (err) throw err;
        console.log('Base de Datos ONLINE');
    });

}

module.exports = {
    connection
}