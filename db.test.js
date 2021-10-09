const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');

path = require('path')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'db.sqlite')
});

const Message = sequelize.define('Message', {
    pseudo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    titre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    // Other model options go here
});

(async () => {
    // await sequelize.sync({ force: true });
    await sequelize.sync();

    // Code here
    pseudo = "François"
    titre = "un coup de gueule"
    corps = "il faut permettre aux étudiants de de faire plus d'informatique !"

    message = await Message.create({
        pseudo: pseudo,
        titre: titre,
        message: corps
    })
    console.log(message.id)

    console.log(await Message.findAll({}));
    console.log(await Message.findByPk(1));

    message = await Message.findByPk(1);
    message.titre = "un pavé dans la marre"

    message.save()

    console.log(await Message.findByPk(1));

    messages = await Message.findAll({
        where: {
            pseudo: "François"
        }
    })
    console.log(messages)

    console.log("------")
    console.log(messages)

})();