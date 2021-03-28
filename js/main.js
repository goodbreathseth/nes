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
    // for (let i = 0; i < BUT_LIST.length; i++) {
    //     let action = BUT_LIST[i].getAttribute('role');
    //     BUT_LIST[i].addEventListener('touchstart', (action) => {
    //         nes.buttonDown(player,jsnes.Controller[action.target.getAttribute('role')]);
    //     }, false);
    //     BUT_LIST[i].addEventListener('touchend', (action) => {
    //         nes.buttonUp(player,jsnes.Controller[action.target.getAttribute('role')])
    //     }, false);
    //     if (action = 'START' && audio_ctx){
    //         if (audio_ctx.state !== 'running') {
    //             audio_ctx.resume(); 
    //         }
    //     }
    // }

    // Utility function
    const buttonUp = (btns) => {
        btns.forEach(btn => nes.buttonUp(player,jsnes.Controller[btn]))
    }

    // Create region for gestures
    // console.log('ZingTouch:', ZingTouch)
    // var zt = ZingTouch.default.Region(document.getElementsByClassName('main')[0]);
    // console.log('zt Before:', zt)
    // let pan = ZingTouch.default.Pan.onStart
    
    // Connect the arrow buttons
    // let BUTTON_ARROWS = document.getElementsByClassName('arrow-buttons')[0]
    // BUTTON_ARROWS.addEventListener('touchend', (action) => {
    //     buttonUp(['BUTTON_UP', 'BUTTON_DOWN', 'BUTTON_LEFT', 'BUTTON_RIGHT'])
    // }, false);
    // zt.bind(BUTTON_ARROWS, 'swipe', e => {
        // console.log('swipe:', e)
    // })
    // zt.bind(BUTTON_ARROWS, 'pan', e => {
        //Actions here
        // console.log(e.detail.data[0].change)
        // console.log(e.detail.data[0])

        // const change = e.detail.data[0].change
        // if (change.x < 0) {
        //     // buttonUp(['BUTTON_UP', 'BUTTON_DOWN', 'BUTTON_RIGHT'])
        //     nes.buttonDown(player,jsnes.Controller['BUTTON_LEFT'])
        // }
        // else if (change.x > 0) {
        //     // buttonUp(['BUTTON_UP', 'BUTTON_DOWN', 'BUTTON_LEFT'])
        //     nes.buttonDown(player,jsnes.Controller['BUTTON_RIGHT'])
        // }

            /*
            const direction = e.detail.data[0].currentDegree
            switch (direction) {
                // Right
                case 0:
                    buttonUp(['BUTTON_UP', 'BUTTON_DOWN', 'BUTTON_LEFT'])
                    nes.buttonDown(player,jsnes.Controller['BUTTON_RIGHT'])
                    break;
                // Left
                case 180:
                    buttonUp(['BUTTON_UP', 'BUTTON_DOWN', 'BUTTON_RIGHT'])
                    nes.buttonDown(player,jsnes.Controller['BUTTON_LEFT'])
                    break;
                // Up
                case -90:
                    buttonUp(['BUTTON_LEFT', 'BUTTON_DOWN', 'BUTTON_RIGHT'])
                    nes.buttonDown(player,jsnes.Controller['BUTTON_UP'])
                    break;
                // Down
                case 90:
                    buttonUp(['BUTTON_LEFT', 'BUTTON_UP', 'BUTTON_RIGHT'])
                    nes.buttonDown(player,jsnes.Controller['BUTTON_DOWN'])
                    break;
                // Catch odd angles
                default:
                    if (direction > 0 && direction < 90) {
                        buttonUp(['BUTTON_LEFT', 'BUTTON_UP'])
                        nes.buttonDown(player,jsnes.Controller['BUTTON_DOWN'])
                        nes.buttonDown(player,jsnes.Controller['BUTTON_RIGHT'])
                    }
                    else if (direction > 90 && direction < 180) {
                        buttonUp(['BUTTON_RIGHT', 'BUTTON_UP'])
                        nes.buttonDown(player,jsnes.Controller['BUTTON_DOWN'])
                        nes.buttonDown(player,jsnes.Controller['BUTTON_LEFT'])
                    }
                    else if (direction > -90 && direction < 0) {
                        buttonUp(['BUTTON_DOWN', 'BUTTON_LEFT'])
                        nes.buttonDown(player,jsnes.Controller['BUTTON_RIGHT'])
                        nes.buttonDown(player,jsnes.Controller['BUTTON_UP'])
                    }
                    else {
                        buttonUp(['BUTTON_DOWN', 'BUTTON_RIGHT'])
                        nes.buttonDown(player,jsnes.Controller['BUTTON_LEFT'])
                        nes.buttonDown(player,jsnes.Controller['BUTTON_UP'])
                    }
            }

                    */
    // }, false);
    
    new AlloyFinger(document.getElementById('BUTTON_START'), {
        touchStart: () => {
            nes.buttonDown(player,jsnes.Controller['BUTTON_START'])
        },
        touchEnd: () => {
            nes.buttonUp(player,jsnes.Controller['BUTTON_START'])
        }
    })
    new AlloyFinger(document.getElementById('BUTTON_A'), {
        touchStart: () => {
            nes.buttonDown(player,jsnes.Controller['BUTTON_A'])
        },
        touchEnd: () => {
            nes.buttonUp(player,jsnes.Controller['BUTTON_A'])
        }
    })




    let ARROW_BUTTONS = new AlloyFinger(document.getElementsByClassName('arrow-buttons')[0], {
        // touchMove registers multiple touches in the event object
        touchMove: (e) => {
            let move = e.deltaX
            console.log(e.touches)
            if (e.touches.length > 1) {
                disable()
                
                alert(e.touches.length)
                // alert(`${e.touches[0].clientX}, ${e.touches[1].clientX}`)
                // e.touches.forEach(t => {
                //     if (t.clientX < min) {
                //         min = t.clientX
                //     }
                // })
                // alert(min)

                move = e.touches.find(t => t.clientX === min)
                alert(move.clientX)
                
                // alert(e.touches.find(touch => touch.clientX < 300))
            }
            // if (e.changedTouches[0].clientX > 300) {
            //     alert(e.changedTouches[0].clientX)
            //     return
            // }
            if (move < -1) {
                buttonUp(['BUTTON_UP', 'BUTTON_DOWN', 'BUTTON_RIGHT', 'BUTTON_LEFT'])
                nes.buttonDown(player,jsnes.Controller['BUTTON_LEFT'])
            }
            else if (move > 1) {
                buttonUp(['BUTTON_UP', 'BUTTON_DOWN', 'BUTTON_LEFT', 'BUTTON_RIGHT'])
                nes.buttonDown(player,jsnes.Controller['BUTTON_RIGHT'])
            }
        },
        touchEnd: (e) => {
            buttonUp(['BUTTON_UP', 'BUTTON_DOWN', 'BUTTON_LEFT', 'BUTTON_RIGHT'])
        },
        // pressMove: (e) => {
        //     const move = e.deltaX
        //     // if (e.touches.length > 1) {
        //     //     alert(e.touches.length)
        //     //     // alert(e.touches.find(touch => touch.clientX < 300))
        //     // }
        //     console.log(e)
        //     console.log(e.targetTouches[0].clientX)
        //     if (e.touches[0].clientX > 300) {
        //         alert('greater')
        //     }
        //     if (move < -1) {
        //         buttonUp(['BUTTON_UP', 'BUTTON_DOWN', 'BUTTON_RIGHT', 'BUTTON_LEFT'])
        //         nes.buttonDown(player,jsnes.Controller['BUTTON_LEFT'])
        //     }
        //     else if (move > 1) {
        //         buttonUp(['BUTTON_UP', 'BUTTON_DOWN', 'BUTTON_LEFT', 'BUTTON_RIGHT'])
        //         nes.buttonDown(player,jsnes.Controller['BUTTON_RIGHT'])
        //     }
        // }
    })

    
    var url = "./roms/Super Mario Bros.nes";
    nes_load_url("nes-canvas",url);
})()