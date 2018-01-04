const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then((localMediaStream) => {
            video.src = window.URL.createObjectURL(localMediaStream);
            video.play();
        })
        .catch((error) => {
            console.log('OH NO!', error);  
        });
}

function paintToCanvas() {
    const {
        videoWidth: width,
        videoHeight: height,
    } = video;

    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);

        const pixels = ctx.getImageData(0, 0, width, height);
    }, 16);
}

function takePhoto() {
    snap.currentTime = 0;
    snap.play();

    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    link.innerHTML = `<img src="${data}" />`;
    strip.insertBefore(link, strip.firstChild);
}

video.addEventListener('canplay', paintToCanvas);

getVideo();