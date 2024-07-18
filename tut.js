const player= document.getElementsByClassName('play')[0];
const audio= document.getElementById('aud');
const track= document.getElementById('tracker1');
const volume= document.getElementById('track');
const currenttime=document.getElementById('current-time');
const duration=document.getElementById('duration');
const mainarea=document.getElementById('mainarea');
const songsearch=document.getElementById('songsearch');
const lastbox=document.getElementById('lastbox');
var search;
songsearch.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from submitting and reloading the page
    const searchText = document.getElementById('s').value.trim(); // Get the value from the input field
    if (searchText !== '') {
        search = searchText; // Assign the search query to the 'search' variable
        fetchData(); // Fetch data based on the search query
    } else {
        console.log('Search text is empty');
    }
});
var flag=0;
var audioplay;
const songs={
    song1:{
        name:"On top",
        src:"songs/On Top 2 - Karan Aujla.mp3",
        img:"images/ontop.jpg"
    },
    song2:{
        name:"",
        src:"",
        img:""
    },
    song3:{
        name:"",
        src:"",
        img:""
    },
    song4:{
        name:"",
        src:"",
        img:""
    },
    song5:{
        name:"",
        src:"",
        img:""
    }
}
function audiosetting(s){
      // Pause the current audio if it's playing
      if (!audio.paused) {
        audio.pause();
        flag==1;
    }
    if(flag==0){
        player.src ="images/icons8-play-30.png";
        audio.pause();
        audioplay=true;
        flag=1
    }
    else{
        player.src="images/icons8-pause-50.png";
        audio.play();
        audioplay=false;
        flag=0;
    }
    
    // Set the src attribute of the audio element
    audio.src = s;
    
    // Play the new audio
    audio.play();
}
function changeimg(){
    if(flag==0){
    player.src ="images/icons8-play-30.png";
    audio.pause();
    audioplay=true;
    flag=1
}
else{
    player.src="images/icons8-pause-50.png";
    audio.play();
    audioplay=false;
    flag=0;
}
}
function volumeupdown(){
    audio.volume=volume.value;
    volume.style.background=`linear-gradient(to right, white ${volume.value*100}%, #696969 ${volume.value*100}%)`
}
function progress() {
        track.value = (audio.currentTime / audio.duration) * 100;
        track.style.background = `linear-gradient(to right, white ${track.value}%, #696969 ${track.value}%)`;
        track.style.transition = 'background 0.3s ease-in-out';
}
function seek() {
    if (!isNaN(audio.duration) && isFinite(audio.duration)) { // Check if audio duration is a valid finite number
        const seekTime = audio.duration * (progress.value / 100);
        console.log("Seeking to:", seekTime);
        audio.currentTime = seekTime;
    }
}
audio.addEventListener('timeupdate', function() {
   if(audio.duration){
    const value = (audio.currentTime / audio.duration) * 100;
    progress.value = value;
    currenttime.textContent=songtimes(audio.currentTime);
}});
function songtimes(seconds){
    const minutes=Math.floor(seconds/60);
    const sec=Math.floor(seconds%60);
    return(`${minutes}:${sec<10?'0' : ''}${sec}`);
}
audio.addEventListener('loadedmetadata',function(){
    duration.textContent=songtimes(audio.duration);
})
setInterval(volumeupdown,100)
setInterval(progress,500);
changeimg();
progress();
seek();
volumeupdown();
function fetchData(){
const clientid=//your key
const clientsecret=//your secret;
const result =fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded', 
            'Authorization' : 'Basic ' + btoa(clientid + ':' + clientsecret)
        },
        body: 'grant_type=client_credentials'
    });
result.then(response=>{
    return response.json();
}).then(data => {
    const accessToken = data.access_token;
    return fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(search)}&type=track`, {
        headers: {
            'Authorization': 'Bearer ' + accessToken,
        }
    });
}).then(data2 =>{
    return data2.json();
}).then(data3=>{
    const tracks=data3.tracks.items;
    
    tracks.forEach(track =>{
        const songs=document.createElement('div');
        if(track.album.images && track.album.images.length > 0){
            const songimg=document.createElement('img');
            songimg.className='songimg'
            songimg.src=track.album.images[0].url;
            songs.appendChild(songimg)
        }
        const songname=document.createElement('span')
        songname.textContent=track.name;
        songname.className='songname';
        var secsong=songs;
        songs.appendChild(songname);
        songs.addEventListener('click',function(){
            audiosetting(track.preview_url);
            lastbox.textContent='';
            lastbox.appendChild(secsong);
        })
        mainarea.appendChild(songs);
    })
})
}




