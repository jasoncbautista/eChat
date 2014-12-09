
// Very simple chat js system
var eChat = eChat || { Core:{}, State:{rValues: {}, entities:{} }};
eChat.debugMode = true;

eChat.debug = function(val, val2){

	// if arguments length
	console.log(val);
	console.log(val2);
}


// TODO: with a promise
eChat.Core.sendMsg = function(msg, cbError){
	// We send a simple msg to the server and get called if we error
	///
};

// Very simple Reactive Values:
eChat.Core.RValue = function(initialValue){

	var _initialValue = initialValue;

	// Tracking id to update listener on this RValue:
	var ourId = "" +  Math.random();


	//TODO: call a registerFXN instead

	eChat.State.rValues[ourId] = {fxns: {} };

	// Make privates:
	var registerCallers = function(options){
		var _calleeOrigin = options.args.callee;
		var prevCallerParent = _calleeOrigin;
		
		// We are doing to find out who is sepending on us:
		while(true){
			var callerParent = prevCallerParent.caller;

		
			if(callerParent == null){
				eChat.debug("wtf callerParent null");
				break;
			}

			// Eventually can be a "renderFXn" intead of templateMethod 
			if(callerParent == null ){
				break;
				return // throw error
			}

			if(callerParent.__type__ === "templateMethod"){

				// yay, we can register our selves to rerender this fxn:

				// Maybe here we should use calleOrigin (first step)... since this is what we will call again:
				eChat.State.rValues[ourId].fxns[callerParent.__unique_id__] = callerParent;  
				break;

				return;

				// we shoudla saved the args too?
			
			}

			// Walk the pointer:
			prevCallerParent = callerParent;
		}

	};

	var notifyListeners = function(){

		// TODO: make sure we still exist..

		// TODO: cleanup????? 
		for(var listenerName in eChat.State.rValues[ourId].fxns){

				var listener = eChat.State.rValues[ourId].fxns[listenerName];
				listener();
		}
	};


	return {
		set: function(_value){
			// TODO: XXX: only throw an event if the new value is diff 
			// than the last =-)

			// don't check the object to be exactly the same though... 
			// just equal per values


			if(_initialValue === _value) {
				return;
			}

			_initialValue = _value;

			// TODO: throe event here:
			notifyListeners();
		}, 

		get: function(){
			// Make sure to do this only once?.. check the inner most caller?


			registerCallers({args: arguments});
			// arguments.callee.caller
			return _initialValue;
		}
	};
};

eChat.Core.sendMsg()


var rr  = new  eChat.Core.RValue("wassa");

var callBackForHTMLValue = function(){
	console.log('rget', rr.get());
	return rr.get();
};


eChat.Templates = {};


eChat.Core.Templitizer  = function(){

	var templitize = function(template){
			// We need to turn them into nice little tempaltes:
		
		// We make the template be recognized as a template:
		template.__type__ = "template";

		// Check if helpers defined:
		if( !(template.helpers == null) ) {

			for(var helperName in template.helpers){
					
					var helperCB = template.helpers[helperName];

					// No we can wrap this in a master call:

					var callWrapper = function(/*args*/){
							// This .apply // call
							var result = helperCB(arguments);
							
							/// for now we assume that there is only one value per template
							// depencency / relationship

					};

					// We do this so we can tell if we should stop going up the caller chain					
					callWrapper.__type__ = "templateMethod"
					callWrapper.__unique_id__  = "" + Math.random() ;
					// TODO: change these __ __ values to be prefaced with eChat

					template.helpers[helperName] = callWrapper;


			}
		}
	};

	for(var templateName in eChat.Templates){
			templitize(eChat.Templates[templateName]);

	}

};



eChat.Templates.ChatItem = {
	helpers: {
		"getSomeValue": callBackForHTMLValue
	}	

};





eChat.Core.Templitizer();





eChat.Templates.ChatItem.helpers.getSomeValue({});
rr.set("yo yo yeee")

rr.set("yo yo yeedfdse")

/// TODO: latency compensation