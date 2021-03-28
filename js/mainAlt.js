;(function(){
    var BUT_LIST = document.getElementsByTagName('button');
    var player = 1;
    for(var i=0;i<BUT_LIST.length;i++){
        (function(i){
            var action = BUT_LIST[i].getAttribute('role');
            BUT_LIST[i].addEventListener('touchstart',function(action){
                nes.buttonDown(player,jsnes.Controller[action.target.getAttribute('role')]);
            },false);
            BUT_LIST[i].addEventListener('touchend',function(action){
                nes.buttonUp(player,jsnes.Controller[action.target.getAttribute('role')])
            },false);
            if(action='START' && audio_ctx){
                if(audio_ctx.state !== 'running') {
                    audio_ctx.resume(); 
                }
            }
        })(i)
    }

    var url = "./roms/Super Mario Bros.nes";
    nes_load_url("nes-canvas",url);
})()