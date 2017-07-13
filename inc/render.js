var remoteServer = 'nrocnetwork.org';
var data = 'nothing';
var states = {
	AL: "Alabama", 
	AK: "Alaska", 
	AZ: "Arizona", 
	AR: "Arkansas", 
	CA: "California", 
	CO: "Colorado", 
	CT: "Connecticut", 
	DE: "Delaware", 
	DC: "District Of Columbia", 
	FL: "Florida", 
	GA: "Georgia", 
	HI: "Hawaii", 
	ID: "Idaho", 
	IL: "Illinois", 
	IN: "Indiana", 
	IA: "Iowa", 
	KS: "Kansas", 
	KY: "Kentucky", 
	LA: "Louisiana", 
	ME: "Maine", 
	MD: "Maryland", 
	MA: "Massachusetts", 
	MI: "Michigan", 
	MN: "Minnesota", 
	MS: "Mississippi", 
	MO: "Missouri", 
	MT: "Montana",
	NE: "Nebraska",
	NV: "Nevada",
	NH: "New Hampshire",
	NJ: "New Jersey",
	NM: "New Mexico",
	NY: "New York",
	NC: "North Carolina",
	ND: "North Dakota",
	OH: "Ohio", 
	OK: "Oklahoma", 
	OR: "Oregon", 
	PA: "Pennsylvania", 
	RI: "Rhode Island", 
	SC: "South Carolina", 
	SD: "South Dakota",
	TN: "Tennessee", 
	TX: "Texas", 
	UT: "Utah", 
	VT: "Vermont", 
	VA: "Virginia", 
	WA: "Washington", 
	WV: "West Virginia", 
	WI: "Wisconsin", 
	WY: "Wyoming", 
	XX: "International"
};


jQuery(document).ready(function($){

	// map the escape key
	$(document).keyup(function(e) {
	  if (e.keyCode == 27) { $("#lightbox_map, #lightbox_content").fadeOut(300); }   // esc
	});

	$('<div id="lightbox_map"></div><div id="lightbox_content"><a id="lightbox_closer">&times;</a><div id="member_container"></div><p class="sweeper footnote">*&nbsp;indicates institution is a member affiliate</p></div>').appendTo('body');

	$('#member-map').html(mapHTML);
	
	$('#member-map').find('#imgmap').find('area').hover(function() {
	  var target = $(this).attr('alt');
	  $('#map_'+target).removeClass('ghost');
	},function() {
	  var target = $(this).attr('alt');
	  $('#map_'+target).addClass('ghost');
	});

	$('#member-map').find('#imgmap').find('area').hover(function() {
	  var target = $(this).attr('alt');
	  $('#map_'+target).removeClass('ghost');
	},function() {
	  var target = $(this).attr('alt');
	  $('#map_'+target).addClass('ghost');
	});

	$('#member-map-chooser').find('option').hover(function() {
	  var target = $(this).val();
	  $('#map_'+target).removeClass('ghost');
	},function() {
	  var target = $(this).val();
	  $('#map_'+target).addClass('ghost');
	});
	
	$('#member-map').find('#imgmap').find('area').click(function() {
		loadState($(this).attr('alt'));
	});
	
	$('#member-map-chooser').change(function() {
		if($(this).val()) loadState($(this).val());
		$(this).val('');
	});
	
	$('#view-all-members').click(function() {
		loadState("ALL");
	});
	
	function loadState(target) {
	
	  $('#member_container').html('');	
	  $("#lightbox_map").fadeIn(150);
	  
		var targets = new Array();
	  
		if(target!='ALL') targets[target] = states[target];
		else targets = states;
		
		for (var key in targets) {
		
			// abbr = key
			// fullname = targets[key];		
			
				$('#member_container').append('<h1 style="clear:both">'+targets[key]+'</h1><div id="members_from_'+key+'">loading...</div>');
			
			  function getResults(current_state) {
			  
				  $.getJSON("http://"+remoteServer+"/member-map/load.php?state="+key+"",
				  function(json) { 
				  
					var last_state = 'none';
				  
					json = $.parseJSON(json);
					var floated = false;
					
					var memberList = '<ul id="first_" class="member-map-list left">';
					$.each(json.members, function(i,member) {
					  memberList += '<li>';
					  if(member.website) memberList += '<a class="member-website" href="'+member.website+'" target="_blank" title="visit this member\'s website">';
					  if(member.state=='XX') memberList += '<span class="flair globe"><img class="" src="http://'+remoteServer+'/member-map/globe.png" width="12" height="12" alt="International" /></span>';
					  if(member.advisor==1) memberList += '<span class="flair">*</span>';
					  memberList += '<span class="text">'+ member.title + '</span>';
					  if(member.website) memberList += '<span class="flair arrow">&#8599;</span>';
					  if(member.website) memberList += '</a>';
					  if(member.hippo) memberList += '<a class="member-hippo" href="'+member.hippo+'" target="_blank" title="view this member\'s HippoCampus">Your HippoCampus</a>';
					  if(member.edready) memberList += '<a class="member-edready" href="'+member.edready+'" target="_blank" title="view this member\'s EdReady">Your EdReady</a>';
					  memberList += '</li>';
					  if(!floated&&i+1>=json.members.length/2) { memberList += '</ul><ul class="member-map-list right">'; floated = true; }
					  last_state = member.state;
					});
				
					memberList += '</ul>';
					
					$('#member_container > #members_from_'+current_state).html(memberList);

				  }).success(function() {
				  
					//alert(key);
				  
				  }).error(function() {
				  
					$('#member_container > #members_from_'+current_state).html('No members.');
					
				  });
			  
			  } getResults(key);
			  
			  $('#lightbox_closer').click(function() { $("#lightbox_map").fadeOut(150); $("#lightbox_content").fadeOut(300); }); // set the closer so it actually works
			  $("#lightbox_content").fadeIn(300);
			  
		
		}

	};
	
});

/////////////////////////////////////////////////////////////////////////////
// massive map html string //////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
		
	var mapHTML = "\
	<select id=\"member-map-chooser\">\
		<option value=\"\">State/Country</option>\
		<option value=\"AL\">Alabama</option>\
		<option value=\"AK\">Alaska</option>\
		<option value=\"AZ\">Arizona</option>\
		<option value=\"AR\">Arkansas</option>\
		<option value=\"CA\">California</option>\
		<option value=\"CO\">Colorado</option>\
		<option value=\"CT\">Connecticut</option>\
		<option value=\"DE\">Delaware</option>\
		<option value=\"FL\">Florida</option>\
		<option value=\"GA\">Georgia</option>\
		<option value=\"HI\">Hawaii</option>\
		<option value=\"ID\">Idaho</option>\
		<option value=\"IL\">Illinois</option>\
		<option value=\"IN\">Indiana</option>\
		<option value=\"IA\">Iowa</option>\
		<option value=\"KS\">Kansas</option>\
		<option value=\"KY\">Kentucky</option>\
		<option value=\"LA\">Louisiana</option>\
		<option value=\"ME\">Maine</option>\
		<option value=\"MD\">Maryland</option>\
		<option value=\"MA\">Massachusetts</option>\
		<option value=\"MI\">Michigan</option>\
		<option value=\"MN\">Minnesota</option>\
		<option value=\"MS\">Mississippi</option>\
		<option value=\"MO\">Missouri</option>\
		<option value=\"MT\">Montana</option>\
		<option value=\"NE\">Nebraska</option>\
		<option value=\"NV\">Nevada</option>\
		<option value=\"NH\">New Hampshire</option>\
		<option value=\"NJ\">New Jersey</option>\
		<option value=\"NM\">New Mexico</option>\
		<option value=\"NY\">New York</option>\
		<option value=\"NC\">North Carolina</option>\
		<option value=\"ND\">North Dakota</option>\
		<option value=\"OH\">Ohio</option>\
		<option value=\"OK\">Oklahoma</option>\
		<option value=\"OR\">Oregon</option>\
		<option value=\"PA\">Pennsylvania</option>\
		<option value=\"RI\">Rhode Island</option>\
		<option value=\"SC\">South Carolina</option>\
		<option value=\"SD\">South Dakota</option>\
		<option value=\"TN\">Tennessee</option>\
		<option value=\"TX\">Texas</option>\
		<option value=\"UT\">Utah</option>\
		<option value=\"VT\">Vermont</option>\
		<option value=\"VA\">Virginia</option>\
		<option value=\"WA\">Washington</option>\
		<option value=\"WV\">West Virginia</option>\
		<option value=\"WI\">Wisconsin</option>\
		<option value=\"WY\">Wyoming</option>\
		<option value=\"XX\">* International</option>\
	</select><a id=\"view-all-members\">View All Members</a>\
\
	<img id=\"map_trans\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-trans.png\" width=\"578\" height=\"361\" alt=\"NROC Members Transparent Overlay\" usemap=\"#imgmap\" />\
	<img id=\"map_off\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-large.png\" width=\"578\" height=\"361\" alt=\"NROC Members Map\" />\
	<img class=\"map_overlay ghost\" id=\"map_AL\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-AL.png\" width=\"578\" height=\"361\" alt=\"Alabama highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_AK\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-AK.png\" width=\"578\" height=\"361\" alt=\"Alaska highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_AZ\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-AZ.png\" width=\"578\" height=\"361\" alt=\"Arizona highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_AR\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-AR.png\" width=\"578\" height=\"361\" alt=\"Arkansas highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_CA\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-CA.png\" width=\"578\" height=\"361\" alt=\"California highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_CO\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-CO.png\" width=\"578\" height=\"361\" alt=\"Colorado highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_CT\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-CT.png\" width=\"578\" height=\"361\" alt=\"Connecticut highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_DE\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-DE.png\" width=\"578\" height=\"361\" alt=\"Delaware highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_FL\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-FL.png\" width=\"578\" height=\"361\" alt=\"Florida highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_GA\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-GA.png\" width=\"578\" height=\"361\" alt=\"Georgia highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_HI\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-HI.png\" width=\"578\" height=\"361\" alt=\"Hawaii highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_ID\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-ID.png\" width=\"578\" height=\"361\" alt=\"Idaho highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_IL\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-IL.png\" width=\"578\" height=\"361\" alt=\"Illinois highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_IN\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-IN.png\" width=\"578\" height=\"361\" alt=\"Indiana highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_IA\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-IA.png\" width=\"578\" height=\"361\" alt=\"Iowa highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_KS\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-KS.png\" width=\"578\" height=\"361\" alt=\"Kansas highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_KY\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-KY.png\" width=\"578\" height=\"361\" alt=\"Kentucky highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_LA\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-LA.png\" width=\"578\" height=\"361\" alt=\"Louisiana highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_ME\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-ME.png\" width=\"578\" height=\"361\" alt=\"Maine highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_MD\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-MD.png\" width=\"578\" height=\"361\" alt=\"Maryland highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_MA\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-MA.png\" width=\"578\" height=\"361\" alt=\"Massachusetts highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_MI\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-MI.png\" width=\"578\" height=\"361\" alt=\"Michigan highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_MN\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-MN.png\" width=\"578\" height=\"361\" alt=\"Minnesota highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_MS\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-MS.png\" width=\"578\" height=\"361\" alt=\"Mississippi highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_MO\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-MO.png\" width=\"578\" height=\"361\" alt=\"Missouri highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_MT\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-MT.png\" width=\"578\" height=\"361\" alt=\"Montana highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_NE\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-NE.png\" width=\"578\" height=\"361\" alt=\"Nebraska highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_NV\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-NV.png\" width=\"578\" height=\"361\" alt=\"Nevada highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_NH\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-NH.png\" width=\"578\" height=\"361\" alt=\"New Hampshire highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_NJ\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-NJ.png\" width=\"578\" height=\"361\" alt=\"New Jersey highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_NM\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-NM.png\" width=\"578\" height=\"361\" alt=\"New Mexico highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_NY\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-NY.png\" width=\"578\" height=\"361\" alt=\"New York highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_NC\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-NC.png\" width=\"578\" height=\"361\" alt=\"North Carolina highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_ND\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-ND.png\" width=\"578\" height=\"361\" alt=\"North Dakota highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_OH\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-OH.png\" width=\"578\" height=\"361\" alt=\"Ohio highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_OK\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-OK.png\" width=\"578\" height=\"361\" alt=\"Oklahoma highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_OR\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-OR.png\" width=\"578\" height=\"361\" alt=\"Oregon highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_PA\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-PA.png\" width=\"578\" height=\"361\" alt=\"Pennsylvania highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_RI\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-RI.png\" width=\"578\" height=\"361\" alt=\"Rhode Island highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_SC\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-SC.png\" width=\"578\" height=\"361\" alt=\"South Carolina highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_SD\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-SD.png\" width=\"578\" height=\"361\" alt=\"South Dakota highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_TN\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-TN.png\" width=\"578\" height=\"361\" alt=\"Tennessee highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_TX\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-TX.png\" width=\"578\" height=\"361\" alt=\"Texas highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_UT\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-UT.png\" width=\"578\" height=\"361\" alt=\"Utah highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_VT\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-VT.png\" width=\"578\" height=\"361\" alt=\"Vermont highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_VA\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-VA.png\" width=\"578\" height=\"361\" alt=\"Virginia highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_WA\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-WA.png\" width=\"578\" height=\"361\" alt=\"Washington highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_WV\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-WV.png\" width=\"578\" height=\"361\" alt=\"West Virginia highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_WI\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-WI.png\" width=\"578\" height=\"361\" alt=\"Wisconsin highlighted\" />\
	<img class=\"map_overlay ghost\" id=\"map_WY\" src=\"http://"+remoteServer+"/member-map/NROCMembers-map-WY.png\" width=\"578\" height=\"361\" alt=\"Wyoming highlighted\" />\
\
	<!-- the massive image map //-->\
	<map name=\"imgmap\" id=\"imgmap\" class=\"ghost\">\
		<area alt=\"OR\" shape=\"poly\" coords=\"36,32,16,89,86,109,101,54,44,47,45,37\" />\
		<area alt=\"CA\" shape=\"poly\" coords=\"84,241,55,233,25,194,7,124,17,90,56,100,45,145,91,212,84,240\" />\
		<area alt=\"NV\" shape=\"poly\" coords=\"115,116,54,100,43,145,92,211,113,114\" />\
		<area alt=\"WA\" shape=\"poly\" coords=\"100,53,107,16,58,1,37,4,36,32,43,37,43,47,101,52\" />\
		<area alt=\"ID\" shape=\"poly\" coords=\"115,18,106,17,87,111,115,115,144,124,150,87,129,83,123,58,115,14\" />\
		<area alt=\"MT\" shape=\"poly\" coords=\"116,16,131,83,149,87,152,79,218,90,221,33\" />\
		<area alt=\"UT\" shape=\"poly\" coords=\"158,196,100,185,114,113,144,124,145,134,167,140,156,195\" />\
		<area alt=\"WY\" shape=\"poly\" coords=\"220,90,213,145,167,142,144,133,150,79\" />\
		<area alt=\"TX\" shape=\"poly\" coords=\"219,210,252,212,252,241,320,254,323,308,284,327,279,356,258,348,233,303,218,303,208,314,175,270,218,269\" />\
		<area alt=\"OK\" shape=\"poly\" coords=\"312,205,218,201,218,210,252,212,250,241,318,254\" />\
		<area alt=\"KS\" shape=\"poly\" coords=\"231,160,303,165,310,179,310,203,230,202,229,199\" />\
		<area alt=\"NE\" shape=\"poly\" coords=\"218,119,292,125,302,164,232,160,233,147,214,145,217,118\" />\
		<area alt=\"SD\" shape=\"poly\" coords=\"219,76,291,81,292,123,215,118\" />\
		<area alt=\"ND\" shape=\"poly\" coords=\"220,32,218,77,292,79,284,37\" />\
		<area alt=\"MN\" shape=\"poly\" coords=\"283,36,292,81,291,114,344,112,327,94,327,80,348,49,304,37\" />\
		<area alt=\"IA\" shape=\"poly\" coords=\"342,155,356,134,342,112,289,113,299,154\" />\
		<area alt=\"MO\" shape=\"poly\" coords=\"365,211,310,207,308,179,299,154,340,155,365,198,365,198,366,209\" />\
		<area alt=\"AR\" shape=\"poly\" coords=\"353,259,320,258,313,206,371,212\" />\
		<area alt=\"CO\" shape=\"poly\" coords=\"233,147,164,139,154,197,230,202\" />\
		<area alt=\"NM\" shape=\"poly\" coords=\"147,271,216,270,219,201,155,197\" />\
		<area alt=\"AZ\" shape=\"poly\" coords=\"100,184,81,250,147,276,155,197\" />\
		<area alt=\"LA\" shape=\"poly\" coords=\"319,256,351,259,351,286,369,288,374,311,323,308\" />\
		<area alt=\"IL\" shape=\"poly\" coords=\"377,125,382,140,383,181,371,207,340,155,359,125\" />\
		<area alt=\"WI\" shape=\"poly\" coords=\"338,66,373,76,381,96,378,125,348,126,327,92\" />\
		<area alt=\"TN\" shape=\"poly\" coords=\"426,224,454,196,371,208,362,231,425,224\" />\
		<area alt=\"KY\" shape=\"poly\" coords=\"415,169,380,188,373,206,439,198,447,188,432,173,414,170\" />\
		<area alt=\"MI\" shape=\"poly\" coords=\"425,131,381,134,380,95,372,72,354,68,365,55,407,67,407,79,424,98,425,117,420,132\" />\
		<area alt=\"IN\" shape=\"poly\" coords=\"409,133,412,171,382,189,382,135\" />\
		<area alt=\"NC\" shape=\"poly\" coords=\"452,197,510,187,506,213,492,230,470,215,427,223\" />\
		<area alt=\"SC\" shape=\"poly\" coords=\"493,230,468,259,430,223,472,215\" />\
		<area alt=\"AL\" shape=\"poly\" coords=\"381,229,411,225,422,283,386,292\" />\
		<area alt=\"MS\" shape=\"poly\" coords=\"363,231,382,231,386,295,370,298,350,283,353,259\" />\
		<area alt=\"FL\" shape=\"poly\" coords=\"395,288,449,306,479,354,492,354,492,335,466,281,420,284\" />\
		<area alt=\"GA\" shape=\"poly\" coords=\"467,281,423,285,410,224,429,223,468,259\" />\
		<area alt=\"VA\" shape=\"poly\" coords=\"509,187,483,151,478,156,452,196\" />\
		<area alt=\"NY\" shape=\"poly\" coords=\"455,117,507,66,520,117,500,112,449,118\" />\
		<area alt=\"OH\" shape=\"poly\" coords=\"450,123,453,157,436,177,412,168,410,131\" />\
		<area alt=\"NH\" shape=\"poly\" coords=\"526,92,542,86,527,58,524,94\" />\
		<area alt=\"VT\" shape=\"poly\" coords=\"527,64,523,94,514,94,505,64,524,61\" />\
		<area alt=\"ME\" shape=\"poly\" coords=\"545,89,525,56,542,17,565,47,539,83\" />\
		<area alt=\"RI\" shape=\"poly\" coords=\"542,102,535,102,535,109,562,133,576,133,574,119,542,103\" />\
		<area alt=\"MA\" shape=\"poly\" coords=\"544,75,567,80,566,88,540,103,524,103,518,109,518,95,536,82\" />\
		<area alt=\"CT\" shape=\"poly\" coords=\"522,113,522,107,535,104,549,124,548,131,530,131\" />\
		<area alt=\"PA\" shape=\"poly\" coords=\"452,120,500,111,510,134,501,145,451,154\" />\
		<area alt=\"NJ\" shape=\"poly\" coords=\"498,110,520,117,533,133,557,138,563,152,537,150,508,144,505,139,506,130,499,112\" />\
		<area alt=\"DE\" shape=\"poly\" coords=\"504,144,506,159,551,171,563,171,563,151,536,149,508,145\" />\
		<area alt=\"MD\" shape=\"poly\" coords=\"482,149,502,145,505,160,556,183,557,193,529,192,494,165,481,148\" />\
		<area alt=\"WV\" shape=\"poly\" coords=\"478,150,477,157,454,193,435,178,457,151\" />\
		<area alt=\"HI\" shape=\"poly\" coords=\"121,294,167,307,174,333,160,336,133,333,125,303\" />\
		<area alt=\"AK\" shape=\"poly\" coords=\"46,264,84,273,117,347,24,347,18,312,26,279\" />\
	</map>\
	<!-- end massive image map //-->\
	";
