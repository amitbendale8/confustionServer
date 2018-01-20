const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req,res,next) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    next();
})
.get((req,res,next)=>{
    res.end('Will send all dishes to you!');
})
.post((req,res,next)=>{
    res.end('WIll add the dish: '+req.body.name+
    ' with detail: '+req.body.description);
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete((req,res,next)=>{
    res.end('Deleting all the endpoints');
});

dishRouter.route('/:dishId')
.get((req,res,next)=>{
    res.end('Will send details of dish : '+req.params.dishId
    +' to you');
})
.post((req,res,next)=>{
    res.statusCode = 403;
    res.end('POS operation not supported on /dishes/:'+req.params.dishId);
})
.put((req,res,next)=>{
    res.write('Updating the dish .'+req.params.dishId+' \n');
    res.end('will update the dish '+req.body.name+' with details '+req.body.description)
})
.delete((req,res,next)=>{
    res.end('deleting dish: '+req.params.dishId);
});


module.exports = dishRouter;
