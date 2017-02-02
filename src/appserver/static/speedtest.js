require(['jquery','underscore','splunkjs/mvc', 'splunkjs/mvc/tokenutils', 'bootstrap.tab', 'splunkjs/mvc/simplexml/ready!'],
		function($, _, mvc, TokenUtils){
	
	var speedtest_executed = false;
	
	// Handle a click event from the execute button and force the search command to execute.
	$( "#execute_speedtest_input" ).click(function() {
		speedtest_executed = true;
		
		// This will contain the parameters
		var params = {
				'runs' : '',
				'server' : ''
		};
		
		// Get the number of runs
		var runs_input = mvc.Components.getInstance("runs_input");
		
		if(runs_input && runs_input.val()){
			params['runs'] = 'runs=' + runs_input.val();
		}
		
		// Get the server to use (if provided)
		var server_input = mvc.Components.getInstance("server_input");
		
		if(server_input && server_input.val()){
			params['server'] = 'server=' + server_input.val();
		}
		
		// Kick off the search
		var tokens = mvc.Components.getInstance("submitted");
		tokens.set('speedtest_search', null);
		tokens.set('speedtest_search', TokenUtils.replaceTokenNames('| speedtest $runs$ $server$', params ));
	});
	
	// By default, show the most recent speedtest result. To do this, we will set the speedtest search token to be a historical search.
	var tokens = mvc.Components.getInstance("submitted");
	tokens.set('speedtest_search', '| search sourcetype=speedtest | head 1 | table ping upload download upload_readable download_readable');
	
});