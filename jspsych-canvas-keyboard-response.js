jsPsych.plugins["canvas-keyboard-response"] = (function() {

  var plugin = {};

  jsPsych.pluginAPI.registerPreload('canvas-keyboard-response', 'stimulus', 'image');

  plugin.info = {
    name: 'canvas-keyboard-response',
    description: '',
    parameters: {
      stimulus: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'Stimulus',
        default: undefined,
        description: 'The image to be displayed'
      },
      stimulus_height: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Image height',
        default: null,
        description: 'Set the image height in pixels'
      },
      stimulus_width: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Image width',
        default: null,
        description: 'Set the image width in pixels'
      },
      maintain_aspect_ratio: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Maintain aspect ratio',
        default: true,
        description: 'Maintain the aspect ratio after setting width or height'
      },
      choices: {
        type: jsPsych.plugins.parameterType.KEYCODE,
        array: true,
        pretty_name: 'Choices',
        default: jsPsych.ALL_KEYS,
        description: 'The keys the subject is allowed to press to respond to the stimulus.'
      },
      prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null,
        description: 'Any content here will be displayed below the stimulus.'
      },
      stimulus_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus duration',
        default: null,
        description: 'How long to hide the stimulus.'
      },
      trial_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Trial duration',
        default: null,
        description: 'How long to show trial before it ends.'
      },
      response_ends_trial: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Response ends trial',
        default: true,
        description: 'If true, trial will end when subject makes a response.'
      },
    }
  }
var ScreenWidth = window.innerWidth
console.log(ScreenWidth)

  plugin.trial = function(display_element, trial) {
    // display stimulus
	  var html = centered_message(`${SpaceBarMessage}`)
	  switch(buttonappear){
        case true: 
	  	html += '<button class="button button1" id="animate">Narrow</button>'
        html += '<button class="button button2" id="animate2">Widen</button>'
		  break;
	    case false: 
		html += '<button class="button button3">Narrow</button>'
        html += '<button class="button button3">Widen</button>'
		  break;
	  }
	  
	  html += '<canvas id="jspsych-canvas-keyboard-response-stimulus">' + trial.stimulus + '</canvas>';
      html += `Steps Remaining: ${AbsoluteFrames} | Response: ${BottomBarMessage} | Seeds: ${PointTotal} | Penalty: ${Penalty}`

	  
	  switch(pre_trials){
	  case 'start':
      html += ''
		  break;
	  }
	  	  

    // add prompt
    if (trial.prompt !== null){
      html += trial.prompt;
    }

    // render
    display_element.innerHTML = html;

      
      
      
    // store response
    var response = {
      rt: null,
      key: null
    };
//var myCanvas = new fabric.Canvas('myCanvas', { width: 900, height: 600 });


var ctx = document.getElementById('jspsych-canvas-keyboard-response-stimulus')
var canvas = new fabric.StaticCanvas('jspsych-canvas-keyboard-response-stimulus', { objectCaching: false, width: trial.stimulus_width, height: 600});
 
      
mid_line = new fabric.Line([0,300,trial.stimulus_width,300],{
    strokeWidth: 2,
    fill: 'black',
    stroke: 'black',
    originX : 'center',
    originY : 'center'
  });

  
  UpperChoiceBox = new fabric.Rect({objectCaching: false, width: trial.stimulus_width, height: 2, fill: 'blue', top: UpperChoiceThreshold, left: 0 });
  LowerChoiceBox = new fabric.Rect({objectCaching: false, width: trial.stimulus_width, height: 2, fill: 'red', top: LowerChoiceThreshold, left: 0 });
  
  
var ball_size = 8
  
width_con = trial.stimulus_width * .75 / 20
  
Circle1 = new fabric.Circle({objectCaching: false, radius: ball_size, fill: '#f55', opacity: 0.1,top: trial.data[rw - 19], left: width_con * 1 })
Circle2 = new fabric.Circle({objectCaching: false, radius: ball_size, fill: '#f55', opacity: 0.1,top: trial.data[rw - 18], left: width_con * 2 })
Circle3 = new fabric.Circle({objectCaching: false, radius: ball_size, fill: '#f55', opacity: 0.2,top: trial.data[rw - 17], left: width_con * 3 })
Circle4 = new fabric.Circle({objectCaching: false, radius: ball_size, fill: '#f55', opacity: 0.2,top: trial.data[rw - 16], left: width_con * 4 })
Circle5 = new fabric.Circle({objectCaching: false, radius: ball_size, fill: '#f55', opacity: 0.3,top: trial.data[rw - 15], left: width_con * 5 })
Circle6 = new fabric.Circle({objectCaching: false, radius: ball_size, fill: '#f55', opacity: 0.3,top: trial.data[rw - 14], left: width_con * 6 })
Circle7 = new fabric.Circle({objectCaching: false, radius: ball_size, fill: '#f55', opacity: 0.4,top: trial.data[rw - 13], left: width_con * 7 })
Circle8 = new fabric.Circle({objectCaching: false, radius: ball_size, fill: '#f55', opacity: 0.4,top: trial.data[rw - 12], left: width_con * 8 })
Circle9 = new fabric.Circle({objectCaching: false, radius: ball_size, fill: '#f55', opacity:  0.5,top: trial.data[rw - 11], left: width_con * 9 })
Circle10 = new fabric.Circle({objectCaching: false, radius: ball_size, fill: '#f55', opacity: 0.5,top: trial.data[rw - 10], left: width_con * 10 })
Circle11 = new fabric.Circle({objectCaching: false, radius: ball_size, fill: '#f55', opacity: 0.6,top: trial.data[rw - 9], left: width_con * 11 })
Circle12 = new fabric.Circle({objectCaching: false, radius: ball_size, fill: '#f55', opacity: 0.6,top: trial.data[rw - 8], left: width_con * 12 })
Circle13 = new fabric.Circle({objectCaching: false, radius: ball_size, fill: '#f55', opacity: 0.7,top: trial.data[rw - 7], left: width_con * 13 })
Circle14 = new fabric.Circle({objectCaching: false, radius: ball_size, fill: '#f55', opacity: 0.7,top: trial.data[rw - 6], left: width_con * 14 })
Circle15 = new fabric.Circle({objectCaching: false, radius: ball_size, fill: '#f55', opacity: 0.8,top: trial.data[rw - 5], left: width_con * 15 })
Circle16 = new fabric.Circle({objectCaching: false, radius: ball_size, fill: '#f55', opacity: 0.8,top: trial.data[rw - 4], left: width_con * 16 })
Circle17 = new fabric.Circle({objectCaching: false, radius: ball_size, fill: '#f55', opacity: 0.9,top: trial.data[rw - 3], left: width_con * 17 })
Circle18 = new fabric.Circle({objectCaching: false, radius: ball_size, fill: '#f55', opacity: 0.9, top: trial.data[rw - 2], left: width_con * 18 })
Circle19 = new fabric.Circle({objectCaching: false, radius: ball_size, fill: '#f55', opacity: 1.0, top: trial.data[rw - 1], left: width_con * 19 })
Circle20 = new fabric.Circle({objectCaching: false, radius: ball_size, fill: '#f55', opacity: 1.0, strokeWidth: 2, stroke: "green", top: trial.data[ rw ], left: width_con * 20 })
  

canvas.add(Circle1)	  
canvas.add(Circle2)
canvas.add(Circle3)
canvas.add(Circle4)
canvas.add(Circle5)
canvas.add(Circle6)
canvas.add(Circle7)
canvas.add(Circle8)
canvas.add(Circle9)
canvas.add(Circle10)
canvas.add(Circle11)	  
canvas.add(Circle12)
canvas.add(Circle13)
canvas.add(Circle14)
canvas.add(Circle15)
canvas.add(Circle16)
canvas.add(Circle17)
canvas.add(Circle18)
canvas.add(Circle19)
canvas.add(Circle20)
  



  canvas.add(mid_line)
//canvas.add(mid_line)
  switch(pre_trials) {
	  case 'start': canvas.add(UpperChoiceBox);
  					canvas.add(LowerChoiceBox);
					break;
				}
  

if (BallVisible == false){
canvas.clear

  } 
 /*    
  var after_response = function(info){
  	switch(info.key){
  		case 38: UpperChoiceBox.animate('top', UpperChoiceBox.top += -1, {
          duration: 0,
          onChange: canvas.renderAll.bind(canvas),
          onComplete: function() {

          },
        });
        LowerChoiceBox.animate('top', LowerChoiceBox.top += 1, {
          duration: 0,
          onChange: canvas.renderAll.bind(canvas),
          onComplete: function() {

			console.log(UpperChoiceThreshold + "thresthold")
			  console.log(UpperChoiceBox.top + "choicebox")
          },
        });
  		break;
		
  		case 40: UpperChoiceBox.animate('top', UpperChoiceBox.top += 1, {
          duration: 0,
          onChange: canvas.renderAll.bind(canvas),
          onComplete: function() {

          },
        });
        LowerChoiceBox.animate('top', LowerChoiceBox.top += -1, {
          duration: 0,
          onChange: canvas.renderAll.bind(canvas),
          onComplete: function() {

          },
        });
  		break;
  	}
  }  
    
  var listener_id = jsPsych.pluginAPI.getKeyboardResponse({
    callback_function: after_response,
    valid_responses: ['uparrow','downarrow'],
    rt_method: 'performance',
	  persist: true,
	  allow_held_key: false
  });	
	
*/
	console.log(UpperChoiceThreshold)
  
    var animateBtn = document.getElementById('animate');

      animateBtn.onclick = function() {
      UpperChoiceBox.animate('top', UpperChoiceBox.top += 10, {
        duration: 0.5,
        onChange: canvas.renderAll.bind(canvas),
        onComplete: function() {
			if(UpperChoiceThreshold >= 260){
				animateBtn.disabled = true
			}

  		  if(LowerChoiceThreshold <= 580){
  			animateBtn2.disabled = false
  		}
				  UpperChoiceThreshold += 10
		   },
      });
      LowerChoiceBox.animate('top', LowerChoiceBox.top += -10, {
        duration: 0.5,
        onChange: canvas.renderAll.bind(canvas),
        onComplete: function() {
		  LowerChoiceThreshold += -10
        },
      });
      }
  


    var animateBtn2 = document.getElementById('animate2');
      animateBtn2.onclick = function() {
      UpperChoiceBox.animate('top', UpperChoiceBox.top += -10, {
        duration: .5,
        onChange: canvas.renderAll.bind(canvas),
        onComplete: function() {

		  if(UpperChoiceThreshold <= 260){
			animateBtn.disabled = false
		}
				  UpperChoiceThreshold += -10
        },
      });
      LowerChoiceBox.animate('top', LowerChoiceBox.top += 10, {
        duration: 0.5,
        onChange: canvas.renderAll.bind(canvas),
        onComplete: function() {

			if(LowerChoiceThreshold >= 580){
				animateBtn2.disabled = true
			}
		  			LowerChoiceThreshold += 10

        },
      });
    };
  
    
    // function to end trial when it is time
    var end_trial = function() {

      // kill any remaining setTimeout handlers
      jsPsych.pluginAPI.clearAllTimeouts();

      // kill keyboard listeners
      if (typeof keyboardListener !== 'undefined') {
        jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
      }

      // gather the data to store for the trial
      var trial_data = {
        "rt": response.rt,
        "stimulus": trial.stimulus,
        "key_press": response.key,
      };
	  
      // clear the display
      display_element.innerHTML = '';

      // move on to the next trial
      jsPsych.finishTrial(trial_data);
    };

    // function to handle responses by the subject
    var after_response = function(info) {

      // after a valid response, the stimulus will have the CSS class 'responded'
      // which can be used to provide visual feedback that a response was recorded
      display_element.querySelector('#jspsych-canvas-keyboard-response-stimulus').className += ' responded';

      // only record the first response
      if (response.key == null) {
        response = info;
      }

      if (trial.response_ends_trial) {
        end_trial();
      }
    };

    // start the response listener
    if (trial.choices != jsPsych.NO_KEYS) {
      var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: trial.choices,
        rt_method: 'performance',
        persist: false,
        allow_held_key: false
      });
    }
	


    // hide stimulus if stimulus_duration is set
    if (trial.stimulus_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        display_element.querySelector('#jspsych-canvas-keyboard-response-stimulus').style.visibility = 'hidden';
      }, trial.stimulus_duration);
    }

    // end trial if trial_duration is set
    if (trial.trial_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, trial.trial_duration);
    }

  };

  return plugin;
})();
