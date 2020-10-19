const path=require('path');
const express=require('express');
const hbs=require('hbs');
const geocode=require('./utils/geocode');
const forecast=require('./utils/forecast');

const app=express();
const port=process.env.PORT||3000;

const publicDirPath=path.join(__dirname,'../public');
const viewsPath=path.join(__dirname,'../templates/views');
const partialsPath=path.join(__dirname,'../templates/partials');

app.set('view engine','hbs');
app.set('views',viewsPath);
app.use(express.static(publicDirPath));
hbs.registerPartials(partialsPath);

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        foot:'created by sd533'
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        foot:'created by sd533'
    });
});

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'HELP',
        paragraph:'This a helpful section',
        foot:'created by sd533'
    });
});

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Error!! no location address is given..'
        });
    }
    geocode(req.query.address,(error,{location,latitude,longitude}={})=>{
        if(error==undefined){
            forecast(latitude,longitude,(error,{temperature,pressure,humidity,wind,cloud})=>{
                if(error==undefined){
                    res.send({
                        Location:location,
                        Latitude:latitude,
                        Longitude:longitude,
                        Temperature:temperature,
                        Pressure:pressure,
                        Humidity:humidity,
                        Wind:wind,
                        Cloud:cloud
                    });
                }
                else{
                    res.send({
                        error:"Error!! "+error
                    });
                }
            });
        }
        else{
            res.send({
                error:"Error!! "+error
            });
        }
    });
});

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'Error!! Help article not found.. :(',
        foot:'created by sd533'
    });
});

app.get('/about/*',(req,res)=>{
    res.render('error',{
        title:'Error!! Help article not found.. :(',
        foot:'created by sd533'
    });
});

app.get('*',(req,res)=>{
    res.render('error',{
        title:'Error!! Page not found.. :(',
        foot:'created by sd533'
    });
});


app.listen(port,()=>{
    console.log("server is running on port:"+port);
});