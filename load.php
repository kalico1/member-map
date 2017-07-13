<?php

// necessary for the cross-domain communication
header('Content-Type: text/javascript; charset=UTF-8');

/////////////////////////////////////////////////////////////////////
// access wordpress /////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

	ini_set('display_errors','off');
	global $wpdb;
	if(!isset($wpdb)) {
	  require_once('../../wp-config.php');
	  require_once('../wp-load.php');
	  require_once('../wp-includes/wp-db.php');
	}

	$arg = array(
                'numberposts'     => -1,
                'post_type'             => 'member',
                'meta_query'    => array(
                                        array(
                                        'key' => 'afterburner_member_state',
                                        'value' => $_GET['state'],
                                        'orderby' => 'title',
                                        'order' => 'ASC'
                                        )
                                )
);

	
	
	$members = get_posts($arg);
	
	$json = '{"members":[';
	
	if(count($members)<=0) {
	
		$json .= '{';
		$json .= '"ID":"0",';
		$json .= '"title":"No members found.",';
		$json .= '"state":"No members found.",';
		$json .= '"edready":"",';
		$json .= '"hippo":"",';
		$json .= '"website":"",';
		// $json .= '"advisor":""';
		$json .= '}';
	
	} else {
	
	  foreach($members as $mem) {
	
		$json .= '{';
		$json .= '"ID":"'.$mem->ID.'",';
		$json .= '"title":"'.addslashes($mem->post_title).'",'; 
		$json .= '"state":"'.get_post_meta($mem->ID, 'afterburner_member_state', true).'",';
		$json .= '"edready":"'.get_post_meta($mem->ID, 'afterburner_member_edready', true).'",';
		$json .= '"hippo":"'.get_post_meta($mem->ID, 'afterburner_member_hippo', true).'",';
		$json .= '"website":"'.get_post_meta($mem->ID, 'afterburner_member_website', true).'",';
		// $json .= '"advisor":"'.get_post_meta($mem->ID, 'afterburner_member_advisor', true).'"';
		$json .= '},';
		
	  } $json = rtrim($json,',');
	  
	} $json .= ']}';
	
echo $_GET['callback']."('".$json."')";
	
?>
