
const music = new Audio('audio/arjit_audio/1.mp3');
const songs = [
    {
        id: 1,
        songName: `On My Way<br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "images/arjit_img/1.jpg"
    },
    {
        id: 2,
        songName: `Alan Walker-Fade<br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "images/arjit_img/2.jpg"
    },
    {
        id: 3,
        songName: `Cartoon-On&On<br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "images/arjit_img/3.jpg"
    },
    {
        id: 4,
        songName: `On My Way<br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "images/arjit_img/4.jpg"
    },
    {
        id: 5,
        songName: `On My Way<br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "images/arjit_img/5.jpg"
    },
    {
        id: 6,
        songName: `On My Way<br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "images/arjit_img/6.jpg"
    },
    {
        id: 7,
        songName: `On My Way<br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "images/arjit_img/7.jpg"
    },
    {
        id: 8,
        songName: `On My Way<br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "images/arjit_img/8.jpg"
    },
    {
        id: 9,
        songName: `On My Way<br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "images/arjit_img/9.jpg"
    },
    {
        id: 10,
        songName: `On My Way<br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "images/arjit_img/10.jpg"
    },
    {
        id: 11,
        songName: `On My Way<br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "images/arjit_img/11.jpg"
    },
    {
        id: 12,
        songName: `On My Way<br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "images/arjit_img/12.jpg"
    },
    {
        id: 13,
        songName: `On My Way<br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "images/arjit_img/13.jpg"
    },
    {
        id: 14,
        songName: `On My Way<br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "images/arjit_img/14.jpg"
    },
    {
        id: 15,
        songName: `On My Way<br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "images/arjit_img/15.jpg"
    }
];

//add posters&songNames to the Songs
Array.from(document.getElementsByClassName('songItem')).forEach((e, i) => {
    e.getElementsByTagName('img')[0].src = songs[i].poster;
    e.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
});



//play&pause masterPlay music
let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementById('wave');
masterPlay.addEventListener('click', () =>{
    if(music.paused || music.currentTime <= 0){
        music.play();
        wave.classList.add('active1');
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
    } else {
        music.pause();
        wave.classList.remove('active1');
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
    }
});

//classlist pause&play icons for songs
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('playListPlay')).forEach((el) => {
        el.classList.add('bi-play-circle-fill');
        el.classList.remove('bi-pause-circle-fill');
    });
};
//background selected for songs
const makeAllBackground = () => {
    Array.from(document.getElementsByClassName('songItem')).forEach((el) => {
        el.style.background = 'rgb(105, 105, 105, .0)';
    });
};

//link songs name&poster with master play
let index = 0;
let poster_master_play = document.getElementById('poster-master-play');
let download_music = document.getElementById('download_music');//download icon
let title = document.getElementById('title');
Array.from(document.getElementsByClassName('playListPlay')).forEach((e) => {
    e.addEventListener('click', (el) => {
        index = el.target.id;
        music.src = `audio/arjit_audio/${index}.mp3`;
        poster_master_play.src = `images/arjit_img/${index}.jpg`;
        music.play();
        wave.classList.add('active1');
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        download_music.href = `audio/arjit_audio/${index}.mp3`;//download icon
        let songTitles = songs.filter((els) => {
            return els.id == index;
        });

        songTitles.forEach(elss =>{
            let {songName} = elss;
            title.innerHTML = songName;
            download_music.setAttribute('download', songName);//download icon
        });
        //do background selected for songs
        makeAllBackground();
        Array.from(document.getElementsByClassName('songItem'))[index-1].style.background ="rgb(105, 105, 105, .1)";
        //do classlist pause&play icons for songs
        makeAllPlays();
        el.target.classList.remove('bi-play-circle-fill');
        el.target.classList.add('bi-pause-circle-fill');
    });
});



//=====get current and duration time progressBar===========
let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate', () => {
    let music_curr = music.currentTime;
    let music_dur = music.duration;
    //duration time of song 
    let min1 = Math.floor(music_dur / 60);
    let sec1 = Math.floor(music_dur % 60);
    if (sec1 < 10){
        sec1 = `0${sec1}`;
    }
    currentEnd.innerHTML = `${min1}:${sec1}`;
    //current time of song
    let min2 = Math.floor(music_curr / 60);
    let sec2 = Math.floor(music_curr % 60);
    if (sec2 < 10){
        sec2 = `0${sec2}`;
    }
    currentStart.innerHTML = `${min2}:${sec2}`;
    //progressBar
    let progressBar = parseInt((music_curr / music_dur) * 100);
    seek.value = progressBar;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
});
//change seek progressBar value
seek.addEventListener('change', () => {
    music.currentTime = seek.value * music.duration / 100;
});


//volume bar//
let vol_icon = document.getElementById('vol-icon');
let vol = document.getElementById('vol');
let vol_bar = document.getElementsByClassName('vol-bar')[0];
let vol_dot = document.getElementById('vol-dot');

vol.addEventListener('change', () => {
    if (vol.value == 0) {
        vol_icon.classList.remove('bi-volume-up-fill');
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.add('bi-volume-off-fill');
    }
    if (vol.value > 0) {
        vol_icon.classList.remove('bi-volume-up-fill');
        vol_icon.classList.add('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-off-fill');
    }
    if (vol.value > 50) {
        vol_icon.classList.add('bi-volume-up-fill');
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-off-fill');
    }
    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    music.volume = vol_a / 100;
});



//============next&back action=========================
let back = document.getElementById('back');
let next = document.getElementById('next');
//back action
back.addEventListener('click', () => {
    index -= 1;
    if (index < 1) {
        index = Array.from(document.getElementsByClassName('songItem')).length;
    };
    music.src = `audio/arjit_audio/${index}.mp3`;
    poster_master_play.src = `images/arjit_img/${index}.jpg`;
    music.play();
    wave.classList.add('active1');
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');
    
    let songTitles = songs.filter((els) => {
        return els.id == index;
    });

    songTitles.forEach(elss =>{
        let {songName} = elss;
        title.innerHTML = songName;
    });
    //do background selected for songs
    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index-1].style.background ="rgb(105, 105, 105, .1)";
    //do classlist pause&play icons for songs
    makeAllPlays();
    el.target.classList.remove('bi-play-circle-fill');
    el.target.classList.add('bi-pause-circle-fill');
});

//next action
next.addEventListener('click', () => {
    index ++;
    if (index > Array.from(document.getElementsByClassName('songItem')).length) {
        index = 1;
    };
    music.src = `audio/arjit_audio/${index}.mp3`;
    poster_master_play.src = `images/arjit_img/${index}.jpg`;
    music.play();
    wave.classList.add('active1');
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');
    
    let songTitles = songs.filter((els) => {
        return els.id == index;
    });

    songTitles.forEach(elss =>{
        let {songName} = elss;
        title.innerHTML = songName;
    });
    //do background selected for songs
    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index-1].style.background ="rgb(105, 105, 105, .1)";
    //do classlist pause&play icons for songs
    makeAllPlays();
    el.target.classList.remove('bi-play-circle-fill');
    el.target.classList.add('bi-pause-circle-fill');
});

//============scroll popular-songs============================
let pop_song_right = document.getElementById('pop_song_right');
let pop_song_left = document.getElementById('pop_song_left');
let pop_song = document.getElementsByClassName('pop-song')[0];
//scroll popular-songs right
pop_song_right.addEventListener('click' , () => {
    pop_song.scrollLeft += 300;
});
//scroll popular-songs left
pop_song_left.addEventListener('click' , () => {
    pop_song.scrollLeft -= 300;
});



//==========scroll popular-artists==========================
let pop_art_right = document.getElementById('pop_art_right');
let pop_art_left = document.getElementById('pop_art_left');
let item = document.getElementsByClassName('item')[0];
//scroll popular-artists right
pop_art_right.addEventListener('click' , () => {
    item.scrollLeft += 300;
});
//scroll popular-artists left
pop_art_left.addEventListener('click' , () => {
    item.scrollLeft -= 300;
});

//==========shuffle&repeat===============================//
let shuffle = document.getElementsByClassName('shuffle')[0];
shuffle.addEventListener('click', () => {
    let a = shuffle.innerHTML;

    switch (a) {
        case "next":
            shuffle.classList.add('bi-arrow-repeat');
            shuffle.classList.remove('bi-music-note-beamed');
            shuffle.classList.remove('bi-shuffle');
            shuffle.innerHTML = 'repeat';
            break;

        case "repeat":
            shuffle.classList.remove('bi-arrow-repeat');
            shuffle.classList.remove('bi-music-note-beamed');
            shuffle.classList.add('bi-shuffle');
            shuffle.innerHTML = 'random';
            break;

        case "random":
            shuffle.classList.remove('bi-arrow-repeat');
            shuffle.classList.add('bi-music-note-beamed');
            shuffle.classList.remove('bi-shuffle');
            shuffle.innerHTML = 'next';
            break;
    }
});

const next_music = () => {
    if (index == songs.length) {
        index = 1;
    } else {
        index ++;
    }
    music.src = `audio/arjit_audio/${index}.mp3`;
    poster_master_play.src = `images/arjit_img/${index}.jpg`;
    music.play();
    wave.classList.add('active1');
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');
    download_music.href = `audio/arjit_audio/${index}.mp3`;//download icon
    let songTitles = songs.filter((els) => {
        return els.id == index;
    });

    songTitles.forEach(elss =>{
        let {songName} = elss;
        title.innerHTML = songName;
        download_music.setAttribute('download', songName);//download icon
    });
    //do background selected for songs
    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index-1].style.background ="rgb(105, 105, 105, .1)";
    //do classlist pause&play icons for songs
    makeAllPlays();
    el.target.classList.remove('bi-play-circle-fill');
    el.target.classList.add('bi-pause-circle-fill');
};

const random_music = () => {
    if (index == songs.length) {
        index = 1;
    } else {
        index = Math.floor(Math.random() * (songs.length) + 1);
    }
    music.src = `audio/arjit_audio/${index}.mp3`;
    poster_master_play.src = `images/arjit_img/${index}.jpg`;
    music.play();
    wave.classList.add('active1');
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');
    download_music.href = `audio/arjit_audio/${index}.mp3`;//download icon
    let songTitles = songs.filter((els) => {
        return els.id == index;
    });

    songTitles.forEach(elss =>{
        let {songName} = elss;
        title.innerHTML = songName;
        download_music.setAttribute('download', songName);//download icon
    });
    //do background selected for songs
    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index-1].style.background ="rgb(105, 105, 105, .1)";
    //do classlist pause&play icons for songs
    makeAllPlays();
    el.target.classList.remove('bi-play-circle-fill');
    el.target.classList.add('bi-pause-circle-fill');
};

const repeat_music = () => {
    index;
    music.src = `audio/arjit_audio/${index}.mp3`;
    poster_master_play.src = `images/arjit_img/${index}.jpg`;
    music.play();
    wave.classList.add('active1');
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');
    download_music.href = `audio/arjit_audio/${index}.mp3`;//download icon
    let songTitles = songs.filter((els) => {
        return els.id == index;
    });

    songTitles.forEach(elss =>{
        let {songName} = elss;
        title.innerHTML = songName;
        download_music.setAttribute('download', songName);//download icon
    });
    //do background selected for songs
    makeAllBackground();
    Array.from(document.getElementsByClassName('songItem'))[index-1].style.background ="rgb(105, 105, 105, .1)";
    //do classlist pause&play icons for songs
    makeAllPlays();
    el.target.classList.remove('bi-play-circle-fill');
    el.target.classList.add('bi-pause-circle-fill');
};

music.addEventListener('ended', () => {
    let b = shuffle.innerHTML;
    switch (b) {

        case "repeat":
            repeat_music();
        break;
        case "next":
            next_music();
        break;
        case "random":
            random_music();
        break;
    }
});