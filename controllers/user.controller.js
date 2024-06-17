const { Router } = require('express');
const UserService = require('../services/user.service');
const config = require('../config/config');


const router = Router();


//של הסיסמא -לא לגעת
router.post("/getMyUser", async (req, res) => {
    try {
        console.log('getuser');
        console.log(req.body)
        const { Name, Password } = req.body;
        console.log('user: ', Name);
        console.log('user: ', Password);
        console.log('userConfig: ', config.adminPassword);
        console.log('userPassword: ', config.adminUsername);
        if (Name === config.adminUsername && Password === config.adminPassword) {

            res.sendStatus(200);
            // const users = await UserService.getUserByUsername(userName, password);
            // res.send(users);
        }
        else {
            console.log("user not found")
            res.sendStatus(400);
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});


router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await UserService.getUser(id);
        res.send(user);
    } catch (error) {
        console.error(`error in fetch user ${error.message}`);
        res.status(500).send('error in fetch user');
    }

})


router.post('/signin', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserService.getUserByUsername(username, password);
        console.log('after signin');
        res.send(user);
    } catch (error) {
        console.log(`error in sign in ${error.message}`);
        res.status(500).send('error in sign in');
    }

});


// כדי להוסיף לקוח למערך הלקוחות


router.post("/AddCustomer", async (req, res) => {
    try {
        const customer = req.body;
        if (!customer) {
            console.error("error in add customer, no customer provided");
            return res.status(400).send("error in add customer, no customer provided");
        }
        const newCustomer = await UserService.AddCustomer(customer);
        res.send(newCustomer);
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});





router.post('/', async (req, res) => {
    try {
        const user = req.body;
        if (!user) {
            console.error('error in post user, no user provided');
            return res.status(400).send('error in post user, no user provided');
        }
        const newUser = await UserService.AddCustemer(user);
        res.send(newUser);
        console.log('succseful!')
    } catch (error) {
        console.error(error.message)
        res.status(500).send(error.message);
    }

});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { user } = req.body;
        if (!id || !user) {
            return res.status(500).send('no user id or no user data provided');
        }
        const updatedUser = await UserService.updateUser(id, user);
        res.send(updatedUser);
    } catch (error) {
        console.log(`error in update user ${error.message}`);
        res.status(500).send('error in update user');
    }

})

module.exports = router;
