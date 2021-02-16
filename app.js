const $board = document.getElementById('board');
const $language = document.getElementById('language');
const numbers = [ 0,1,2,3,4,5,6,7,8,9];
const $audioTag = document.getElementById('audio');
const soundsUrls = {

    wrong: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/wronganswer.mp3',
    correct: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/rightanswer.mp3',
   
    He:{
    where: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_where.mp3',
    0: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_0.mp3',
    1: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_1.mp3',
    2: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_2.mp3',
    3: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_3.mp3',
    4: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_4.mp3',
    5: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_5.mp3',
    6: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_6.mp3',
    7: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_7.mp3',
    8: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_8.mp3',
    9: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_9.mp3'
 },
    En:{
    where: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_where.en.mp3',
        0: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_0.en.mp3',
        1: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_1.en.mp3',
        2: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_2.en.mp3',
        3: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_3.en.mp3',
        4: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_4.en.mp3',
        5: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_5.en.mp3',
        6: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_6.en.mp3',
        7: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_7.en.mp3',
        8: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_8.en.mp3',
        9: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/number_9.en.mp3'
}
}

const playSound = (language, sound) => {
    $audioTag.src = soundsUrls[language][sound];
    $audioTag.play();
};
const playSounds = (number) => {
    playSound($language.value, 'where');
    
    setTimeout(() => {
    playSound($language.value, number);
    }, 1500)
}



const shuffle = (numberArry) => {
    let counter = numberArry.length;
     while(counter > 0) {
         let index = Math.floor(Math.random() * counter);
         counter--;
         let temp = numberArry[counter];
         numberArry[counter] = numberArry[index];
         numberArry[index] = temp;
     }
return numberArry;
}

const selectedAnswer = ($event)=>{
    const isLiElement = $event.target.nodeName ==="LI";
    if (!isLiElement) {return false; }


   const usersAnswer = $event.target.dataset.id; 
   const currentLanguage = $language.value;
   const rightAnswer = $board.dataset.answer;
   const isPlayButton = $event.target.id === 'start-sound';
   if (isPlayButton) {return playSounds(rightAnswer); }

    // const usersAnswer = $event.target.dataset.id; 
    // const currentLanguage = $language.value;

    if(usersAnswer === rightAnswer) { 
        $board.classList.add('correct');
    $audioTag.src = soundsUrls.correct;
    $audioTag.play(); 
    setTimeout( ()=> {playSound(currentLanguage, usersAnswer);},1000);

    
       
        setTimeout( () => {
            $board.classList.remove('correct');
            CreatLevel();
        }, 1300);
        
    } 
    else {
        $board.classList.add('wrong');
        $audioTag.src = soundsUrls.wrong;
        $audioTag.play(); 



        setTimeout( ()=> {
            $board.classList.remove('wrong');
            CreatLevel();
        }, 1300);
        
    }
   
   
}
const CreatLevel = ()=>{
    $board.innerHTML = '';  
    const random = Math.floor(Math.random() * 10);
    $board.dataset.answer = numbers[random];
      
    const currentAnswer = shuffle(numbers);
    currentAnswer.forEach((number) => {
     const liElement = document.createElement("li");  
     liElement.innerText = number;
     liElement.dataset.id = number; 
     $board.appendChild(liElement);
      });
   
    const playButton = document.createElement('li');
    playButton.classList.add('start-over');
    playButton.dataset.id = 'start-sound';
    $board.appendChild(playButton);
   }
CreatLevel();
$board.addEventListener('click',  selectedAnswer);


