const mongoose = require('mongoose');//библиотека подкл.
const express = require("express");
const cors = require('cors');

mongoose.connect('mongodb://localhost/MyDataBase', { useNewUrlParser: true, useUnifiedTopology: true });
// mongodb://localhost/MyDataBase
const app = express();
app.use(express.json())
app.use(cors())
const port = 3000; // process.env.PORT



const UserSchema = new mongoose.Schema({//конструктор объекта !
    name: String,
    age: Number
});

const User = mongoose.model('Users', UserSchema); // создание 

(async () => {
    
    app.get('/test', async (req, res) => { //Получить пользователя по id
        res.status(200).send({ msg: "hello " });
    });


    app.get('/users', async (req, res) => { //Получить всех пользователей
        const users = await User.find({});
        if (users) {
            res.status(200).send(users);
        } else {
            res.status(404).send({ msg: "Not Found" });
        }
    });

    app.get('/users/:_id', async (req, res) => { //Получить пользователя по id
        const user = await User.findById(req.params._id);
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send({ msg: "Not Found" });
        }
    });
    
    app.put('/users/:_id',async (req, res) => {
        const user = await User.findById(req.params._id);
        console.log(req.body.name);
        user.name = req.body.name;
        user.age = req.body.age;
        await user.save();
        res.status(200).send({msg : "user has been updated"})
    })

    app.post('/users', async (req, res) => { //Создание пользователя
        const user = new User();
        user.name = req.body.name;
        user.age = req.body.age;
        await user.save();
        res.status(200).send({ msg: "user was create" });
    });

    app.delete('/users/:_id', async (req, res) => { //Удаление пользователя по id
        const user = await User.findById(req.params._id);
        if (user) {
            await user.delete();
            res.status(200).send({ msg: "User was remove" });
        } else {
            res.status(404).send({ msg: "Not Found" });
        }
    });
})();

// console.log(('b'+'a'+ +'a'+'a').toLowerCase());

app.listen(port, () => {
    console.log(`Сервер был запущен: http://localhost:${port}\n`);
});
