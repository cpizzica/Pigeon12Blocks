var timeline = []
rw = 0	
ball_array = []
var ChoiceDirection = ''
var BallVisible = true
var Leadin = 1
var PointBonus = 1
var PointTotal = 0
var UpperChoiceThreshold = 200
var LowerChoiceThreshold = 400
var trial_time = 500
var direction = 38
var AbsoluteFrames = 200
var hmm = 0
var CDcolor = 'No Choice'
var timeleft = 10
var pre_trials = 'stop'
//var scale_factor = prompt('Scale Factor (recommended: 15-20)')		
//var mean_picker = prompt('0397,1218,2133,3277,5201')
var scale_factor = 15
var script_picker = Math.floor(Math.random() * 998) + 1
var ScreenWidth = window.innerWidth
var SpaceBarMessage = 'Press Spacebar to abort trial'
var SNR_Picker = 1
	var SNR_Array = ['AB','CD','EF','GH'];
	var shuffledSNRArray = jsPsych.randomization.shuffle(SNR_Array);
var SNR = 'fifteen'
var buttonappear = false
var instruction_picker = 1
var BottomBarMessage = 'No Response'
var chosenSNRArray = ''
var PayToPlay = -5
var Penalty = 0
var BlockNumber = 1
	
var pavlovia_init = {
	    type: "pavlovia",
	    command: "init"
	};
		
    function centered_message(message) {
 return '<div class="container" style="display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;font-weight:normal;font-family:Arial;font-size:40px">' + message + '<div>'
    }

	
    ABData = $ .get(`GeneratedStim/Mean05.csv`, function(){
 ABActual = Papa.parse(ABData.responseText, {
     dynamicTyping: true
 })
    }) 
	   CDData = $ .get(`GeneratedStim/Mean10.csv`, function(){
 CDActual = Papa.parse(CDData.responseText, {
     dynamicTyping: true
 })
    })
    EFData = $ .get(`GeneratedStim/Mean7half.csv`, function(){
 EFActual = Papa.parse(EFData.responseText, {
     dynamicTyping: true
 })
    })
    GHData = $ .get(`GeneratedStim/Mean15.csv`, function(){
 GHActual = Papa.parse(GHData.responseText, {
     dynamicTyping: true
 })
    })
	
    function myFunctionWiden(){
    	UpperChoiceThreshold += -20
		LowerChoiceThreshold += 20
    }
    function myFunctionNarrow(){
    	UpperChoiceThreshold += 20
		LowerChoiceThreshold += -20
    }
	var check_consent = function(elem) {
	    if ($('#consent_checkbox').is(':checked')) {
		return true;
	    }
	    else {
		alert("If you wish to participate, you must check the box next to the statement 'I agree to participate in this study.'");
		return false;
	    }
	    return false;
	};

    var consent = {
       type:'external-html', 
       url: "consent.html", 
       cont_btn: "start", 
       check_fn: check_consent
   }

   var Gender_options = ["Male", "Female", "Transgender", "Do Not Wish To Say"];
   var Ethnicity_options = ["American Indian or Alaskan Native","Asian","Black or African American","Native Hawaiian or Pacific Islander","White","Hispanic or Latino","Other","Do Not Wish to Respond"]
   var demographics = {
   	type: "survey-multi-choice",
   	questions: [{prompt:"Gender Orientation:", options: Gender_options, required:true,}, 
   	{prompt:"Ethnicity:", options: Ethnicity_options, required:true}],
   	   };
   var age = {
   type: "survey-text",
   questions: [{prompt: "How old are you?"}],
   post_trial_gap: 100
   	   };

   var ProlificID = {
   type: "survey-text",
   questions: [{prompt: "Please Enter your ProlificID"}],
   post_trial_gap: 100
   	   };


	
    var FirstInstructions = {
 type: 'image-keyboard-response',
 stimulus: '',
 choices: ['spacebar'],
 stimulus_height: 450,
 stimulus_width: 720,
		on_start: function(trial){
			 trial.stimulus = 'Slide' + instruction_picker + '.png'
			pre_trials = 'start'
			AbsoluteFrames = 100
			PointTotal = 0
		},
   	     on_finish: function(trial){
   	     instruction_picker = instruction_picker + 1
   	 }
    };	
	
	var Instructions = {
 type: 'image-keyboard-response',
 stimulus: '',
 choices: ['spacebar'],
 stimulus_height: 450,
 stimulus_width: 720,
		on_start: function(trial){
			 trial.stimulus = 'Slide' + instruction_picker + '.png'
		},
   	     on_finish: function(trial){
   	     instruction_picker = instruction_picker + 1
   	 }
	}
	
    var online_frame = {
 type: 'canvas-keyboard-response',
		trial_duration: [],
 stimulus: [],
 stimulus_height: 800,
 stimulus_width: 0,
 choices: ['uparrow', 'downarrow'],
 prompt: '',
 on_start: function(trial){
	 SpaceBarMessage = 'Use the up or down arrows on the keyboard to make a choice'
     trial.stimulus_width = window.innerWidth
	 switch(true) {
	 case (AbsoluteFrames > 0):
		 var lasttimelinedata = jsPsych.currentTrial();
		  trial.stimulus = rw
	      trial.trial_duration = trial_time
		 switch(SNR){
		 case 'fifteen': 
			TransformedDataS1 = GHActual.data[script_picker]
			 break;
		 case 'five':
			TransformedDataS1 = ABActual.data[script_picker]
			 break;
		 case 'mixed':	        
			 chosenSNRArray = shuffledSNRArray[SNR_Picker]
		 	switch(chosenSNRArray){
		 	 case 'AB': TransformedDataS1 = ABActual.data[script_picker]
			 break;
		 	 case 'CD': TransformedDataS1 = CDActual.data[script_picker]
			 break;
		 	 case 'EF': TransformedDataS1 = EFActual.data[script_picker]
			 break;
		 	 case 'GH': TransformedDataS1 = GHActual.data[script_picker]
			 break;
		 }
	 };
	 		switch(direction) {
	 		   case 38: TransformedDataS2 = TransformedDataS1.map(x=> 290 - x)
		 	   break;
	 		  case 40: TransformedDataS2 = TransformedDataS1.map(x=> 290 + x)
		 	  break;
	                          }	 
							  trial.data = TransformedDataS2	
							  break;
							  
						  case (AbsoluteFrames <= 0):
							  trial.data = 0 
 }
		},
 on_finish: function(trial){
	 var lasttimelinedata = jsPsych.currentTrial();
  ChoiceDirection = 'No Choice'
	 switch(true) {
     case (AbsoluteFrames >0):		 
  if(trial.key_press === 38) {
  	ChoiceDirection = 'Above'
	  BallVisible = false
	  trial_time = 0
	  CDcolor = 'red'
	  AbsoluteFrames += Penalty
	  jsPsych.endCurrentTimeline();
	  
	  
	  if(trial.key_press === 38 && direction === 38) {
		  PointTotal += PointBonus
		  CDcolor = 'green'
		  jsPsych.endCurrentTimeline();
		  
	  }
  }
  if(trial.key_press === 40) {
  	ChoiceDirection = 'Below'
	  BallVisible = false
	  trial_time = 0
	  CDcolor = 'red'
	  AbsoluteFrames += Penalty
	  jsPsych.endCurrentTimeline();
	  
	  
  if(trial.key_press === 40 && direction === 40) {
	  PointTotal += PointBonus
	  CDcolor = 'green'
	  jsPsych.endCurrentTimeline();
	  
  }

  }
  AbsoluteFrames += -1
  rw += 1
	  break;
  case (AbsoluteFrames <= 0):
	  jsPsych.endCurrentTimeline();
  }
  }

    }
	
    var Pre_frame = {
 type: 'canvas-keyboard-response',
		trial_duration: [],
 stimulus: [],
 stimulus_height: 800,
 stimulus_width: 0,
 choices: ['spacebar'],
 prompt: '',
 on_start: function(trial){
     trial.stimulus_width = window.innerWidth
	 switch(true) {
	 case (AbsoluteFrames > 0):
		 var lasttimelinedata = jsPsych.currentTrial();
		  trial.stimulus = rw
	        trial.trial_duration = trial_time
	
		 switch(SNR){
		 case 'fifteen': 
			TransformedDataS1 = GHActual.data[script_picker]
			 break;
		 case 'five':
			TransformedDataS1 = ABActual.data[script_picker]
			 break;
		 case 'mixed':	        
			 chosenSNRArray = shuffledSNRArray[SNR_Picker]
		 	switch(chosenSNRArray){
		 	 case 'AB': TransformedDataS1 = ABActual.data[script_picker]
			 break;
		 	 case 'CD': TransformedDataS1 = CDActual.data[script_picker]
			 break;
		 	 case 'EF': TransformedDataS1 = EFActual.data[script_picker]
			 break;
		 	 case 'GH': TransformedDataS1 = GHActual.data[script_picker]
			 break;
		 }
	 };
	 		switch(direction) {
	 		   case 38: TransformedDataS2 = TransformedDataS1.map(x=> 290 - x)
		 	   break;
	 		  case 40: TransformedDataS2 = TransformedDataS1.map(x=> 290 + x)
		 	  break;
	                          }	 
							  trial.data = TransformedDataS2	
							  break;
							  
						  case (AbsoluteFrames <= 0):
							  trial.data = 0 
 }
		},
 on_finish: function(trial){
	 var lasttimelinedata = jsPsych.currentTrial();
	 switch(true) {
     case (AbsoluteFrames >0):	
		 	 
  ChoiceDirection = 'No Choice'
	     if(trial.key_press === 32) {
	     	ChoiceDirection = ''
	   	  BallVisible = false
	   	  trial_time = 0
	   	  CDcolor = 'No Choice'
	   	  jsPsych.endCurrentTimeline();
	  }
		   
	  if (TransformedDataS2[rw] < UpperChoiceThreshold) {
	  	ChoiceDirection = 'Above'
		  BallVisible = false
		  trial_time = 0
		  CDcolor = 'red'
	      AbsoluteFrames += Penalty
		  jsPsych.endCurrentTimeline();
	  
	  if (TransformedDataS2[rw] < UpperChoiceThreshold && direction === 38) {
		  PointTotal += PointBonus
		  CDcolor = 'green'
		  jsPsych.endCurrentTimeline();
	  }} 
	  
	  if (TransformedDataS2[rw] > LowerChoiceThreshold) {
	  	ChoiceDirection = 'Below'
		  BallVisible = false
		  trial_time = 0
		  CDcolor = 'red'
	      AbsoluteFrames += Penalty
		  jsPsych.endCurrentTimeline();
	  
	  if (TransformedDataS2[rw] > LowerChoiceThreshold && direction === 40) {
		  PointTotal += PointBonus
		  CDcolor = 'green'
		  jsPsych.endCurrentTimeline();
		  }} 
 
	 
  
  
  AbsoluteFrames += -1
  rw += 1
	  break;
  case (AbsoluteFrames <= 0):
	  jsPsych.endCurrentTimeline();
  }
  }
}
 var test_frame_int = {
 type: 'canvas-keyboard-response',
 stimulus: [],
 stimulus_height: 800,
 stimulus_width: 0,
 choices: ['spacebar'],
 prompt: '',
	 response_ends_trial: true,
		on_start: function(trial){
		SpaceBarMessage = 'Press Spacebar to continue'
	 switch(CDcolor) {
		 case 'green': BottomBarMessage = '<em class = "correct">Correct Response!</em>'
		 break;
	     case 'red': BottomBarMessage = '<em class = "incorrect">Incorrect Response!</em>'
		 break;
	 case 'No Choice': BottomBarMessage = '<em>No Choice Made!</em>'
	 }
			
     trial.stimulus_width = window.innerWidth
			trial.data = 0
			if(AbsoluteFrames <=0){
				trial.trial_duration = 0
	  		  jsPsych.endCurrentTimeline();
			}
		},
		on_finish: function(trial){
     SpaceBarMessage = 'Use the up or down arrows on the keyboard to make a choice'
			
			rw = 0
			script_picker = Math.floor(Math.random() * 998) + 1
			BallVisible = true
			trial_time = 500
			var myArray = [38,40];
			var shuffledArray = jsPsych.randomization.shuffle(myArray);
			direction = shuffledArray[0]
			timeleft = 10
            SNR_Picker = Math.floor(Math.random() * 3)
			AbsoluteFrames += PayToPlay
			
			
		}
	}
	
    var test_frame_int_pre = {
    type: 'canvas-keyboard-response',
    stimulus: [],
    stimulus_height: 800,
    stimulus_width: 0,
    choices: ['spacebar'],
    prompt: '',

   		on_start: function(trial){
		SpaceBarMessage = 'Use buttons to adjust threshold then press Spacebar to continue'
		 buttonappear = true
	   	 switch(CDcolor) {
	   		 case 'green': BottomBarMessage = '<em class = "correct">Correct Response!</em>'
	   		 break;
	   	     case 'red': BottomBarMessage = '<em class = "incorrect">Incorrect Response!</em>'
	   		 break;
	   	 case 'No Choice': BottomBarMessage = '<em> No Response</em>'
	   	 }
			
	        trial.stimulus_width = window.innerWidth
	   			trial.data = 0
	   			if(AbsoluteFrames <=0){
	   				trial.trial_duration = 0
		  		  jsPsych.endCurrentTimeline();
					
	   			}
	   		},
	   		on_finish: function(trial){
			buttonappear = false
	        SpaceBarMessage = 'Press Spacebar to abort trial.'
			
	   			rw = 0
	   			script_picker = Math.floor(Math.random() * 998) + 1
	   			BallVisible = true
	   			trial_time = 500
	   			var myArray = [38,40];
	   			var shuffledArray = jsPsych.randomization.shuffle(myArray);
	   			direction = shuffledArray[0]
	   			timeleft = 10
	   			CDcolor = 'No Choice'
	            SNR_Picker = Math.floor(Math.random() * 3)
				AbsoluteFrames += PayToPlay
	   		}
   	}	
	
	
	var training_trial_start	= {
 type: 'image-keyboard-response',
 stimulus: '',
 choices: ['spacebar'],
 stimulus_height: 450,
 stimulus_width: 720,
		on_start: function(trial){
			trial.stimulus = 'StartTraining.png'
		},
		on_finish: function(trial){
			AbsoluteFrames = 50
		}
	}
	var training_trial_end	= {
 type: 'image-keyboard-response',
 stimulus: '',
 choices: ['spacebar'],
 stimulus_height: 450,
 stimulus_width: 720,
		on_start: function(trial){
						trial.stimulus = 'EndTraining.png'
		},
		on_finish: function(trial){
			switch (SNR){
				case 'fifteen': AbsoluteFrames = 100
				PointTotal = 0
				break;
			case 'mixed': AbsoluteFrames = 500
			PointTotal = 0
				break
			}
		}
	}
	
	var BlockBuilder_2	= {
 type: 'image-keyboard-response',
 stimulus: '',
 choices: ['spacebar'],
 stimulus_height: 450,
 stimulus_width: 720,
		on_start: function(trial){
			trial.stimulus = 'Block.png'
		},
		on_finish: function(trial){
			pre_trials = 'stop'
			AbsoluteFrames = 100
			PointTotal = 0
			Penalty = 0
			SNR = 'fifteen'
			BlockNumber = 2
		}
	}
	
	var BlockBuilder_3	= {
 type: 'image-keyboard-response',
 stimulus: '',
 choices: ['spacebar'],
 stimulus_height: 450,
 stimulus_width: 720,
		on_start: function(trial){
			trial.stimulus = 'Block.png'
		},
		on_finish: function(trial){
			pre_trials = 'start'
			AbsoluteFrames = 105
			PointTotal = 0
			Penalty = -1
			SNR = 'fifteen'
			BlockNumber = 3
		}
	}
	
	var BlockBuilder_4	= {
 type: 'image-keyboard-response',
 stimulus: '',
 choices: ['spacebar'],
 stimulus_height: 450,
 stimulus_width: 720,
		on_start: function(trial){
			trial.stimulus = 'Block.png'
		},
		on_finish: function(trial){
			pre_trials = 'stop'
			AbsoluteFrames = 100
			PointTotal = 0
			Penalty = -1
			SNR = 'fifteen'
			BlockNumber = 4
		}
	}
	
	var BlockBuilder_5	= {
 type: 'image-keyboard-response',
 stimulus: '',
 choices: ['spacebar'],
 stimulus_height: 450,
 stimulus_width: 720,
		on_start: function(trial){
			trial.stimulus = 'Block.png'
		},
		on_finish: function(trial){
			pre_trials = 'start'
			AbsoluteFrames = 105
			PointTotal = 0
			Penalty = 0
			SNR = 'fifteen'
			BlockNumber = 5
		}
	}
	
	var BlockBuilder_6	= {
 type: 'image-keyboard-response',
 stimulus: '',
 choices: ['spacebar'],
 stimulus_height: 450,
 stimulus_width: 720,
		on_start: function(trial){
			trial.stimulus = 'Block.png'
		},
		on_finish: function(trial){
			pre_trials = 'stop'
			AbsoluteFrames = 100
			PointTotal = 0
			Penalty = 0
			SNR = 'five'
			BlockNumber = 6
		}
	}
	
	var BlockBuilder_7	= {
 type: 'image-keyboard-response',
 stimulus: '',
 choices: ['spacebar'],
 stimulus_height: 450,
 stimulus_width: 720,
		on_start: function(trial){
			trial.stimulus = 'Block.png'
		},
		on_finish: function(trial){
			pre_trials = 'start'
			AbsoluteFrames = 105
			PointTotal = 0
			Penalty = -1
			SNR = 'five'
			BlockNumber = 7
		}
	}
	
	var BlockBuilder_8	= {
 type: 'image-keyboard-response',
 stimulus: '',
 choices: ['spacebar'],
 stimulus_height: 450,
 stimulus_width: 720,
		on_start: function(trial){
			trial.stimulus = 'Block.png'
		},
		on_finish: function(trial){
			pre_trials = 'stop'
			AbsoluteFrames = 100
			PointTotal = 0
			Penalty = -1
			SNR = 'five'
			BlockNumber = 8
		}
	}
	
	var BlockBuilder_9	= {
 type: 'image-keyboard-response',
 stimulus: '',
 choices: ['spacebar'],
 stimulus_height: 450,
 stimulus_width: 720,
		on_start: function(trial){
			trial.stimulus = 'Block.png'
		},
		on_finish: function(trial){
			pre_trials = 'start'
			AbsoluteFrames = 355
			PointTotal = 0
			Penalty = 0
			SNR = 'mixed'
			BlockNumber = 9
		}
	}
	
	var BlockBuilder_10	= {
 type: 'image-keyboard-response',
 stimulus: '',
 choices: ['spacebar'],
 stimulus_height: 450,
 stimulus_width: 720,
		on_start: function(trial){
			trial.stimulus = 'Block.png'
		},
		on_finish: function(trial){
			pre_trials = 'stop'
			AbsoluteFrames = 350
			PointTotal = 0
			Penalty = 0
			SNR = 'mixed'
			BlockNumber = 10
		}
	}
	
	var BlockBuilder_11	= {
 type: 'image-keyboard-response',
 stimulus: '',
 choices: ['spacebar'],
 stimulus_height: 450,
 stimulus_width: 720,
		on_start: function(trial){
			trial.stimulus = 'Block.png'
		},
		on_finish: function(trial){
			pre_trials = 'start'
			AbsoluteFrames = 350
			PointTotal = 0
			Penalty = -1
			SNR = 'mixed'
			BlockNumber = 11
		}
	}
	
	var BlockBuilder_12	= {
 type: 'image-keyboard-response',
 stimulus: '',
 choices: ['spacebar'],
 stimulus_height: 450,
 stimulus_width: 720,
		on_start: function(trial){
			trial.stimulus = 'Block.png'
		},
		on_finish: function(trial){
			pre_trials = 'stop'
			AbsoluteFrames = 350
			PointTotal = 0
			Penalty = -1
			SNR = 'mixed'
			BlockNumber = 12
		}
	}
	
	var test_block = {
		timeline: [online_frame],
		repetitions: 40
	}
	var test_block_pre = {
		timeline: [Pre_frame],
		repetitions: 40
	}
	
	var test_frame_int_block = {
		timeline: [test_frame_int_pre],
		repetitions: 1
	}	
	
	var full_block = {
		timeline: [test_block, test_frame_int],
		repetitions: 500
	}
	var full_block_pre = {
		timeline: [test_block_pre, test_frame_int_pre],
		repetitions: 500
	}
	var training_block = {
		timeline: [training_trial_start, full_block, training_trial_end],
		repetitions: 1
	}
	
	var training_block_pre = {
		timeline: [training_trial_start, full_block_pre, training_trial_end],
		repetitions: 1
	}
	
	var FirstInstructions_block = {
		timeline: [FirstInstructions],
		repetitions: 12
	}

	
	
	
		 var pavlovia_finish = {
	      type: "pavlovia",
	      command: "finish"
	  };

  var consentdemo_block = {
      timeline: [consent, demographics, age, ProlificID],
      repetitions: 0}
	
    jsPsych.init({
 timeline: [pavlovia_init,consentdemo_block, FirstInstructions_block, training_block_pre, test_frame_int_pre, full_block_pre, BlockBuilder_2, Instructions,Instructions, full_block, BlockBuilder_3,Instructions, test_frame_int_pre, full_block_pre, BlockBuilder_4, Instructions,full_block, BlockBuilder_5,Instructions, test_frame_int_pre, full_block_pre, BlockBuilder_6,Instructions, full_block, BlockBuilder_7,Instructions, test_frame_int_pre, full_block_pre,BlockBuilder_8,Instructions, full_block, BlockBuilder_9,Instructions,Instructions,Instructions,Instructions, test_frame_int_pre, full_block_pre,BlockBuilder_10,Instructions, full_block, BlockBuilder_11,Instructions, test_frame_int_pre, full_block_pre,BlockBuilder_12,Instructions, full_block, pavlovia_finish],
		
		on_data_update: function(data){
			jsPsych.data.get().addToLast({Direction: direction})
			jsPsych.data.get().addToLast({CorrectChoice: CDcolor})
			jsPsych.data.get().addToLast({UpperChoiceThreshold: UpperChoiceThreshold})
			jsPsych.data.get().addToLast({LowerChoiceThreshold: LowerChoiceThreshold})
			jsPsych.data.get().addToLast({ChosenSNRArray: chosenSNRArray})
			jsPsych.data.get().addToLast({BlockNumber: BlockNumber})
			
		},
 preload: [ABData,CDData,EFData,GHData],
		default_iti: 0,
		    	  on_finish: function() {	          document.body.innerHTML = '<p> Please wait. Data is being uploaded. Please do not close the browser window or your data may be lost. You will be redirected back to Prolific in 3 seconds.</p>'
	          setTimeout(function () { location.href = prolific_href }, 3000) } 
	})



