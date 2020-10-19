console.log("Hello!!");

const weatherForm=document.querySelector('form');
const search=document.querySelector('.input');
const message_first=document.querySelector('#message-a');
const message_second=document.querySelector('#message-b');
const message_third=document.querySelector('#message-c');
const message_fourth=document.querySelector('#message-d');
const message_fifth=document.querySelector('#message-e');
const message_sixth=document.querySelector('#message-f');
const message_seventh=document.querySelector('#message-g');
const message_eigth=document.querySelector('#message-h');
const bg=document.querySelector('.main-content-result');
const bg_box=document.querySelector('.main-content-box');

const clearContent=(contentID)=>{
    if(document.querySelector(contentID).textContent){
        document.querySelector(contentID).textContent="";
    }
}

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location=search.value;
    fetch('/weather?address='+encodeURIComponent(location)).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                console.log(data.error);
                message_first.textContent=data.error;
                clearContent('#message-b');
                clearContent('#message-c');
                clearContent('#message-d');
                clearContent('#message-e');
                clearContent('#message-f');
                clearContent('#message-g');
                clearContent('#message-h');
            }
            else{
                console.log(data);
                clearContent('#message-a');
                bg.style.backgroundImage="url('/img/weather-bg.jpg')";
                bg.style.backgroundRepeat="no-repeat";
                bg.style.backgroundSize="600px";
                bg_box.style.margin="0 auto";
                bg_box.style.padding="0 16px";
                message_second.textContent='Location: '+data.Location;
                message_third.textContent='Latitude: '+data.Latitude+'  '+'Longitude: '+data.Longitude;
                message_fourth.textContent='Temperature: '+data.Temperature;
                message_fifth.textContent='Pressure: '+data.Pressure;
                message_sixth.textContent='Humidity: '+data.Humidity;
                message_seventh.textContent='Wind: '+data.Wind;
                message_eigth.textContent='Cloud: '+data.Cloud;
            }
        });
    });
});