const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req,res,next) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    next();
})
.get((req,res,next)=>{
    res.end('Will send all leaderes to you!');
})
.post((req,res,next)=>{
    res.end('WIll add the leader: '+req.body.name+
    ' with detail: '+req.body.description);
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
.delete((req,res,next)=>{
    res.end('Deleting all the endpoints');
});

leaderRouter.route('/:leaderId')
.get((req,res,next)=>{
    res.end('Will send details of leader : '+req.params.leaderId
    +' to you');
})
.post((req,res,next)=>{
    res.statusCode = 403;
    res.end('POS operation not supported on /leaders/:'+req.params.leaderId);
})
.put((req,res,next)=>{
    res.write('Updating the leader .'+req.params.leaderId+' \n');
    res.end('will update the leader '+req.body.name+' with details '+req.body.description)
})
.delete((req,res,next)=>{
    res.end('deleting leader: '+req.params.leaderId);
});


module.exports = leaderRouter;
