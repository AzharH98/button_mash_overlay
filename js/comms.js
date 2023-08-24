window.onload = init;
const transitionTime = 300;

function init() {

  let xhr = new XMLHttpRequest();
  let streamJSON = '../sc/streamcontrol.json';
  let scObj;
  let cBust = 0;
  let startup = true;
  let animated = false;
  let comm1Wrap = $('#comm1Wrapper');
  let comm2Wrap = $('#comm2Wrapper');

  xhr.overrideMimeType('application/json');

  pollJSON();

  setInterval(function() {
    pollJSON();
  }, 500);

  xhr.onreadystatechange = parseJSON;

  setTimeout(comms, transitionTime);


  //============FUNCTIONS============

  function parseJSON() {
    if (xhr.readyState == 4) {
      scObj = null;
      scObj = JSON.parse(xhr.responseText);
      if (animated == true) {
        comms();
      }
    }
  }

  function pollJSON() {
    xhr.open('GET', streamJSON + '?v=' + cBust, true);
    xhr.send();
    cBust++;
  }

  function comms() {
    if (startup == true) {
        getData();
        startup = false;
        animated = true;
      } else {
        getData();
    }
  }

  function getData() {
    let comm1Name = scObj['comm1Name'],
    comm1Handle = scObj['comm1Handle'],
    comm2Name = scObj['comm2Name'],
    comm2Handle = scObj['comm2Handle'];

    if (startup == true) {

      TweenMax.set('#comm1Wrapper',{css:{x: comm1Move}}); //sets name/round wrappers to starting positions for them to animate from
      TweenMax.set('#comm2Wrapper',{css:{x: comm2Move}});
      TweenMax.set('#comm1Handle',{css:{x: comm1HandleMove}}); //sets name/round wrappers to starting positions for them to animate from
      TweenMax.set('#comm2Handle',{css:{x: comm2HandleMove}});

      $('#comm1Name').html(comm1Name);
      $('#comm2Name').html(comm2Name);
      $('#comm1Handle').html(comm1Handle);
      $('#comm2Handle').html(comm2Handle);

      comm1Wrap.each(function(i, comm1Wrap) {
        // while (comm1Wrap.scrollWidth > comm1Wrap.offsetWidth || comm1Wrap.scrollHeight > comm1Wrap.offsetHeight) {
        //   let newFontSize = (parseFloat($(comm1Wrap).css('font-size').slice(0, -2)) * 0.95) + "px";
        //   $(comm1Wrap).css('font-size', newFontSize);
        // }
      });

      comm2Wrap.each(function(i, comm2Wrap) {
        // while (comm2Wrap.scrollWidth > comm2Wrap.offsetWidth || comm2Wrap.scrollHeight > comm2Wrap.offsetHeight) {
        //   var newFontSize = (parseFloat($(comm2Wrap).css('font-size').slice(0, -2)) * .95) + 'px';
        //   $(comm2Wrap).css('font-size', newFontSize);
        // }
      });

      TweenMax.to('#comm1Wrapper',nameTime,{css:{x: '+0px', opacity: 1},ease:Quad.easeOut,delay:nameDelay}); //animates wrappers traveling back to default css positions while
      TweenMax.to('#comm2Wrapper',nameTime,{css:{x: '+0px', opacity: 1},ease:Quad.easeOut,delay:nameDelay}); //fading them in, timing/delay based on variables set in scoreboard.html
      TweenMax.to('#comm1Handle',nameTime,{css:{x: '+0px', opacity: 1},ease:Quad.easeOut,delay:nameDelay});
      TweenMax.to('#comm2Handle',nameTime,{css:{x: '+0px', opacity: 1},ease:Quad.easeOut,delay:nameDelay});
    }
   else {
     if($('#comm1Name').text() != comm1Name){ //no postioning changes just fade out, update text, fade back in
       TweenMax.to('#comm1Name',.3,{css:{opacity: 0},ease:Quad.easeOut,delay:0,onComplete:function(){
         $('#comm1Wrapper').css('font-size',nameSize)
         $('#comm1Name').html(comm1Name);

         comm1Wrap.each(function(i, comm1Wrap) {
        //    while (comm1Wrap.scrollWidth > comm1Wrap.offsetWidth || comm1Wrap.scrollHeight > comm1Wrap.offsetHeight) {
        //      let newFontSize = (parseFloat($(comm1Wrap).css('font-size').slice(0, -2)) * 0.95) + "px";
        //      $(comm1Wrap).css('font-size', newFontSize);
        //    }
         });

         TweenMax.to('#comm1Name',.3,{css:{opacity: 1},ease:Quad.easeOut,delay:.2});
       }});
     }

     if($('#comm2Name').text() != comm2Name){
       TweenMax.to('#comm2Name',.3,{css:{opacity: 0},ease:Quad.easeOut,delay:0,onComplete:function(){
         $('#comm2Wrapper').css('font-size',nameSize)
         $('#comm2Name').html(comm2Name);

         comm2Wrap.each(function(i, comm2Wrap) {
        //    while (comm2Wrap.scrollWidth > comm2Wrap.offsetWidth || comm2Wrap.scrollHeight > comm2Wrap.offsetHeight) {
        //      let newFontSize = (parseFloat($(comm2Wrap).css('font-size').slice(0, -2)) * .95) + 'px';
        //      $(comm2Wrap).css('font-size', newFontSize);
        //    }
         });

         TweenMax.to('#comm2Name',.3,{css:{opacity: 1},ease:Quad.easeOut,delay:.2});
       }});
     }

     if($('#comm1Handle').text() != comm1Handle){
       TweenMax.to('#comm1Handle',.3,{css:{opacity: 0},ease:Quad.easeOut,delay:0,onComplete:function(){
         $('#comm1Handle').css('font-size',handleSize)
         $('#comm1Handle').html(comm1Handle);

         TweenMax.to('#comm1Handle',.3,{css:{opacity: 1},ease:Quad.easeOut,delay:.2});
       }});
     }

     if($('#comm2Handle').text() != comm2Handle){ //no postioning changes just fade out, update text, fade back in
       TweenMax.to('#comm2Handle',.3,{css:{opacity: 0},ease:Quad.easeOut,delay:0,onComplete:function(){
         $('#comm2Handle').css('font-size',handleSize)
         $('#comm2Handle').html(comm2Handle);

         TweenMax.to('#comm2Handle',.3,{css:{opacity: 1},ease:Quad.easeOut,delay:.2});
       }});
     }

  }
 }
}
