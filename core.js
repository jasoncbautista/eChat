
// Very simple chat js system
var eChat = echat || { Core{}, state:{ entities:{}, fxns: {}}};

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

			debugger;
			return _initialValue;
		}
	};
};

eChat.Core.sendMsg()


var rr  = new  eChat.Core.RValue("wassa");

var callBackForHTMLValue = function(){
	console.log('rget' rr.get());
	return rr.get();
};




callBackForHTMLValue();



