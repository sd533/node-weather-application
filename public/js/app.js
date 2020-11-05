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
const loader = document.querySelector('.loader-div');
loader.style.display = 'none';

const clearContent=(contentID)=>{
    if(document.querySelector(contentID).textContent){
        document.querySelector(contentID).textContent="";
    }
}

weatherForm.addEventListener('submit',(e)=>{
    loader.style.display = 'block';
    e.preventDefault();
    const location=search.value;
    fetch('/weather?address='+encodeURIComponent(location)).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                loader.style.display = 'none';
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
                loader.style.display = 'none';
                console.log(data);
                clearContent('#message-a');
                // bg.style.backgroundImage="url('/img/weather-bg.jpg')";
                bg.style.backgroundColor= '#ccc';
                bg.style.padding= '0 16px';
                bg.style.boxShadow = '2px 4px 4px rgba(255,255,255,0.3)';
        
                bg.style.backgroundRepeat="no-repeat";
                bg.style.backgroundSize="600px";
                bg_box.style.margin="32px auto";
                bg_box.style.padding="0 16px";
                message_second.innerHTML = `<span class="sp"><i class="fas fa-map-marker-alt"></i></span><span class='result-bar1'>&nbsp;${data.Location}</span>`;
                message_third.innerHTML=`<span class="sp"><i class="fas fa-temperature-low"></i></span><span class='result-bar1'>&nbsp;${data.Temperature}℃</span>`;
                message_fourth.innerHTML=`<span class="sp"><i class="fas fa-compress-arrows-alt"></i></span><span class='result-bar1'>&nbsp;${data.Pressure} hpa</span>`;
                message_fifth.innerHTML=`<span class="sp"><img src="img/humidity1.png"/></span><span class='result-bar1'>&nbsp;${data.Humidity} %</span>`;
                message_sixth.innerHTML=`<span class="sp"><i class="fas fa-wind"></i></span><span class='result-bar1'>&nbsp;${data.Wind} m/s</span>`;
                message_seventh.innerHTML=`<span class="sp"><i class="fas fa-cloud"></i></span><span class='result-bar1'>&nbsp;${data.Cloud} %</span>`;
            }
        });
    });
});