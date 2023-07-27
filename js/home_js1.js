// import * as res from './requests.js';

// 비디오 넣을 태그 자리 불러옴
const videoContainer=document.querySelector(".body-container");

let videoList = [];
let videoUrls = [];

function renderVideoList(videoList) {
  videoContainer.innerHTML = ''; // 기존 비디오 목록 초기화
  videoList.forEach((video, index) => {
    
    let videoElement = document.createElement('video');
    let videoInfoIndex = getVideo(index);


    // videoElement.src = videoInfoIndex.video_link;
    // 동영상 링크 넣기 실패

    videoElement.controls = true;
  
    // videoElement.poster = videoInfoIndex.image_link;
    // 

    let titleElement = document.createElement('h2');
    // titleElement.textContent = videoInfoIndex.video_title;

    let descriptionElement = document.createElement('p');
    // descriptionElement.textContent = videoInfoIndex.video_title;

    
    videoContainer.appendChild(titleElement);
    videoContainer.appendChild(videoElement);
    videoContainer.appendChild(descriptionElement);

  });
}

// function getVideo(id){
//     let url = `http://oreumi.appspot.com/video/getVideoInfo?video_id=${id}`;
//     return fetch(url).then(res=> res.json());
// }

// function getVideo(index){
//   const plz = new XMLHttpRequest();
//   plz.open('GET' , `http://oreumi.appspot.com/video/getVideoInfo?video_id=${index}` ,true);

//   plz.onreadystatechange = function() {
//     if(plz.status === 200 && plz.readyState === 4) {
      
//       return JSON.parse(plz.responseText);
//     }else{
//       console.error('Error:', plz.status);
//     }
//   };
//   plz.send(index);
// }

// function makeurlList(videoList){
//   videoList.forEach((video, index) => {
//     videoUrls[index]=(getVideo(index));
//   });
// }


// function getVideoList() {
//   const temp = new XMLHttpRequest();
//   temp.open('GET', 'http://oreumi.appspot.com/video/getVideoList', true);
  
//   temp.onreadystatechange = function() {
//     if (temp.status === 200 && temp.readyState === 4) {
//       // 값을 잘 받아왔을 때
//       videoList = JSON.parse(temp.responseText);
//       return renderVideoList(videoList);
//     } else {
//       // 요청이 실패한 경우
//       console.error('Error:', temp.status);
//     }
//   };

//   temp.send();
// }



async function getChannel(param=undefined){
  Url = 'http://oreumi.appspot.com/channel/getChannelVideo?video_channel=oreumi'
  const response = await fetch(Url,{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      }
  });
  return response.json();
}

function getVideo(id){
  let url = `http://oreumi.appspot.com/video/getVideoInfo?video_id=${id}`;
  return fetch(url).then(res=> res.json());
}

async function getVideo2(id){
  url = `http://oreumi.appspot.com/video/getVideoInfo?video_id=${id}`;
  const response = await fetch(url);
  return response.json();
}

async function getVideoList(){
  url = 'http://oreumi.appspot.com/video/getVideoList';
  const response = await fetch(url);
  return response.json();
}

async function getVideoInfoList(res){

  const prom = Object.keys(res).map(async key => {
      return await getVideo2(res[key].video_id);
  })
  const result = await Promise.all(prom);

  return result;
}
let channel = getChannel();
let videoInfo = getVideoInfoList(channel);


window.onload = function(){ // (window == 브라우저) 기본적인 html이 다 로드되면 안에있는 함수를 실행하겠다는 뜻
  // videoUrls = getVideoInfoList(getChannel())
  // getVideoList();
  
  // getVideoUrl(0); 
}

