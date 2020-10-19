const request=require('request');

const forecast=(latitude,longitude,callback)=>{
    const url='https://api.openweathermap.org/data/2.5/weather?lat='+encodeURIComponent(latitude)+'&lon='+encodeURIComponent(longitude)+'&appid=f4ad0ffda1011cd2f390ae90480fe481&units=metric';

    request({url,json:true},(error,{body})=>{
        if(error){
            callback("Unable to connect network!",undefined);
        }
        else if(body.message){
            callback("Unable to find the location!",undefined);
        }
        else{
            callback(undefined,{
                temperature:body.main.temp,
                pressure:body.main.pressure,
                humidity:body.main.humidity,
                wind:body.wind.speed,
                cloud:body.clouds.all
            });
        }
    });
};

module.exports=forecast;