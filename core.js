
// Very simple chat js system
var eChat = eChat || { Core:{}, State:{rValues: {}, entities:{} }};

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


			// Eventually can be a "renderFXn" intead of templateMethod 
			if(callerParent == null ){
				break;
				return // throw error
			}

			if(callerParent.__type__ === "templateMethod"){

				// yay, we can register our selves to rerender this fxn:

				// Maybe here we should use calleOrigin (first step)... since this is what we will call again:
				eChat.State.rValues[ourId].fxns[callerParent.__unique_id__] = callerParent;  


				// we shoudla saved the args too?
			
			}
		}


	};

	var notifyListeners = function(){
		for(var listenerName in eChat.State.rValues.fxn){

				var listener = eChat.State.rValues.fxn[listenerName];
				listener();
		}
	};


	return {
		set: function(_value){
			// TODO: XXX: only throw an event if the new value is diff 
			// than the last =-)

			// don't check the object to be exactly the same though... 
			// just equal per values

			_initialValue = _value;

			// TODO: throe event here:
			notifyListeners();
		}, 

		get: function(){
			// Make sure to do this only once?.. check the inner most caller?


			registerCallers({args: arguments});
			// arguments.callee.caller
			debugger;
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

	for(var templateName in eChat.Templates){
		// We need to turn them into nice little tempaltes:

		var template = eChat.Templates[templateName];		
		
		// We make the template be recognized as a template:
		template.__type__ = "template";

		// Check if helpers defined:
		if( !(template.helpers == null) ) {

			for(var helperName in template.helpers){
					
					var helperCB = template.helpers[helperName];

					// No we can wrap this in a master call:

					var callWrapper = function(/*args*/){
							// This .apply // call
							helperCB(arguments);

					};

					// We do this so we can tell if we should stop going up the caller chain					
					callWrapper.__type__ = "templateMethod"
					callWrapper.__unique_id__  = "" + Math.random() ;
					// TODO: change these __ __ values to be prefaced with eChat

					template.helpers[helperName] = callWrapper;


			}
		}

	}

};



eChat.Templates.ChatItem = {
	helpers: {
		"getSomeValue": callBackForHTMLValue
	}	

};





eChat.Core.Templitizer();





eChat.Templates.ChatItem.helpers.getSomeValue({});


/// TODO: latency compensation