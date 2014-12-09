
// Very simple chat js system
var eChat = eChat || { Core:{}, state:{ entities:{}, fxns: {}}};

// TODO: with a promise
eChat.Core.sendMsg = function(msg, cbError){
	// We send a simple msg to the server and get called if we error
	///
};

eChat.Core.RValue = function(initialValue){
	debugger;
	var _initialValue = initialValue;

	return {
		set: function(_value){
			_initialValue = _value;
		}, 

		get: function(){

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


