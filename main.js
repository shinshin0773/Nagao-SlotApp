'use strict';

{
  class Panel {
    constructor() {
      const section = document.createElement('section');
      section.classList.add('panel');
      
      this.img = document.createElement('img');
      this.img.src = this.getRandomImage();
      
      this.timeoutId = undefined;
      
      this.stop = document.createElement('div');
      this.stop.textContent = 'STOP';
      this.stop.classList.add('stop','inactive');
      this.stop.addEventListener('click', () => {
        if(this.stop.classList.contains('inactive')){
          return;
        }
        this.stop.classList.add('inactive');
        clearTimeout(this.timeoutId);
        
        panelsLeft--;
        
        if (panelsLeft === 0) {
          spin.classList.remove('inactive');
          panelsLeft = 3;
          checkResult();
          checkText();
        }
      });
      
      section.appendChild(this.img);
      section.appendChild(this.stop);
      
      const main = document.querySelector('main');
      main.appendChild(section);
    }
    
    getRandomImage() {
      const images = [
        'img/長尾１.jpg',
        'img/長尾２.jpg',
        'img/長尾３.jpg',
      ];
      return images[Math.floor(Math.random() * images.length)];
    }
    
    spin() {
      this.img.src = this.getRandomImage();
      this.timeoutId = setTimeout(() => {
        this.spin();
      }, 50);
    }
    
    
    
    isUnmatched(p1,p2) {
      if(this.img.src !== p1.img.src && this.img.src !== p2.img.src) {
        return true;
      }
    }
    unmatch () {
      this.img.classList.add('unmatchede');
    }
    activate() {
      this.img.classList.remove('unmatchede');
      this.stop.classList.remove('inactive');
    }
  }
  
  
  function checkResult() {
    if (panels[0].isUnmatched(panels[1], panels[2])) {
      panels[0].unmatch();
    }
    if (panels[1].isUnmatched(panels[0], panels[2])) {
      panels[1].unmatch();
    }
    if (panels[2].isUnmatched(panels[0], panels[1])) {
      panels[2].unmatch();
    }
  }

  function checkText() {
    if(panels[0]===panels[1]===panels[2]){
      const text = document.getElementById("text");
      text.textContent = "長尾です！！！";
  }
}
  
  const panels = [
    new Panel(),
    new Panel(),
    new Panel(),
  ];
  
  let panelsLeft = 3;
  
  const spin = document.getElementById('spin');
  const text = document.getElementById('text');
  spin.addEventListener('click', () => {
    if(spin.classList.contains('inactive')){
      return;
    }
    spin.classList.add('inactive');
    panels.forEach(panel => {
      panel.activate();
      panel.spin();
    });
  });
}