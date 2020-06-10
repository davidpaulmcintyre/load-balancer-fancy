const express = require('express');
const router = express.Router();
const app = express();
const PORT_DEFAULT = 3000;

router.get('/', (req,res) => {
    const str = 'abcdefghij'
    return res.status(200).send(req.socket.localPort.toString() + str.repeat(1000))
});

app.use('/', router);

app.listen(process.env.PORT || PORT_DEFAULT, () => {
    console.log(`App is listening at ${process.env.PORT || PORT_DEFAULT}`);
});