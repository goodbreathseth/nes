;(function(){
    let canvasHeight = 240
    let canvasWidth = 256
    const scaleCanvas = () => {
        let height = window.innerHeight
        let width = window.innerWidth
        let scaleFactor = Math.min((height / canvasHeight), (width / canvasWidth))
        document.getElementById('nes-canvas').style.transform = "scale(" + scaleFactor + ")";
    }
    // window.addEventListener('resize', scaleCanvas);
    // scaleCanvas()


    // Connect the tap events
    let BUT_LIST = document.getElementsByTagName('button');
    let player = 1;
    for (let i = 0; i < BUT_LIST.length; i++) {
        let action = BUT_LIST[i].getAttribute('role');
        BUT_LIST[i].addEventListener('touchstart', (action) => {
            nes.buttonDown(player,jsnes.Controller[action.target.getAttribute('role')]);
        }, false);
        BUT_LIST[i].addEventListener('touchend', (action) => {
            nes.buttonUp(player,jsnes.Controller[action.target.getAttribute('role')])
        }, false);
        if (action = 'START' && audio_ctx){
            if (audio_ctx.state !== 'running') {
                audio_ctx.resume(); 
            }
        }
    }

    // Create region for gestures
    var zt = new ZingTouch.Region(document.getElementsByClassName('main')[0]);

    // Connect the arrow buttons
    let BUTTON_ARROWS = document.getElementsByClassName('arrow-buttons')[0]
    zt.bind(BUTTON_ARROWS, 'pan', e => {
        //Actions here
        console.log(e)
        const direction = e.detail.data[0].currentDirection
        if ((direction >= 0 && direction <= 45) || (direction >= 315 && direction <= 360)) {
            nes.buttonDown(player,jsnes.Controller['BUTTON_RIGHT'])
        }
    }, false);

    

    
    var url = "./roms/Super Mario Bros.nes";
    nes_load_url("nes-canvas",url);
})()