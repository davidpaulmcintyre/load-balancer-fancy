const express = require('express');
const router = express.Router();
const app = express();
const PORT_DEFAULT = 3000;

router.get('/', (req,res) => {
    return res.status(200).send('Hello from ' + req.socket.localPort.toString())
});

app.use('/', router);

app.listen(process.env.PORT || PORT_DEFAULT, () => {
    console.log(`App is listening at ${process.env.PORT || PORT_DEFAULT}`);
});