<?php   
error_reporting(0);

include "simple_html_dom.php";

/* Link Friendly */

function enc_url($url = "", $char = "/") {
	$result = "";

	if(!empty($url)) {
		if($char == "/") {
			$result = str_replace("/", "[slash]", $url);
		}
	}

	return $result;
}


function dec_url($url = "", $char = "/") {
	$result = "";

	if(!empty($url)) {
		if($char == "/") {
			$result = str_replace("[slash]", "/", $url);
		}
	}

	return $result;
}

/* GRAB CUSTOM */

function getGrab($url="") {  
	$result = "";
	    $data = curl_init();                            // inisialisasi CURL
	    curl_setopt($data, CURLOPT_RETURNTRANSFER, 1);  // setting CURL
	    curl_setopt($data, CURLOPT_URL, $url);     // menjalankan CURL untuk membaca isi file
	    $result = curl_exec($data);
	    curl_close($data);
	    return $result;
	}

/* GET LIST COMIC CATEGORY */

function getListComicCategory($link = '') {
	$html = file_get_html($link);
	$dataComix = array();
	foreach($html->find("ul.series_alpha") as $parent) {
		foreach($parent->children as $child) {
			$oChild = $child->children[0];
			$rel = isset($oChild->attr['rel']) ? $oChild->attr['rel'] : "-";
			$title = isset($oChild->attr['title']) ? $oChild->attr['title'] : "-";
			$href = isset($oChild->attr['href']) ? $oChild->attr['href'] : "-" ;

			$data = array(
				"rel" => $rel,
				"title" => $title,
				"href" => enc_url($href));
			$dataComix[] = $data;
		}
	}

	return $dataComix;
}

/* GET LIST ALL EPISODE */

function getMangaAllEpisode($url = "",$escape=0) {
	$html = file_get_html($url);
	$dataComix = array();
	$i = 0;

	if(!empty($url)) {
		foreach($html->find("td div a") as $parent) {
			if($escape > 0) {
				if($i < $escape) {
					$i++;
					continue;
				}
			}

			/* escape html */
			$filter_tags = strip_tags($parent->innertext);
			if(empty($filter_tags)) {
				continue;
				$i++;
			}

			$data = array(
				"innertext" => html_entity_decode(strip_tags($parent->innertext)),
				"href" => enc_url($parent->attr['href']));

			$dataComix[] = $data;
			$i++;
		}
	}

	return $dataComix;
}

/* GET EPISODE */

function getEpisode($url="") {
	$html = file_get_html($url);
	$dataComix = array();
	if(!empty($url)) {
		foreach($html->find("div.separator a") as $parent) {
			$data = array(
				"innertext" => $parent->innertext,
				"href" => $parent->attr['href'] );

			$dataComix[] = $data;
		}
	}

	return $dataComix;
}


/* semua situs */

function getAllSites() {
	$sites = array();
	$sites[] = array("title" => "Mangaku", "site" => enc_url("http://mangaku.web.id/daftar-komik-bahasa-indonesia/","/"), "id" => 1);

	return $sites;
}

/* situs populer */

function getPopularSites() {
	$sites = array();
	$sites[] = array("title" => "Mangaku", "site" => enc_url("http://mangaku.web.id/daftar-komik-bahasa-indonesia/","/"), "id" => 1);

	return $sites;
}

/* ACTION URL SERVICES */

$action = isset($_GET['action']) ? $_GET['action'] : "";
$enc_site   = isset($_GET['site']) ? $_GET['site'] : "";

if($action == "comicCategory") {
	header('Access-Control-Allow-Origin: *'); 
	header('Content-Type: application/json');

	$real_site = dec_url($enc_site);
	echo json_encode(getListComicCategory($real_site));
}

if($action == "getMangaAllEpisode") {
	header('Access-Control-Allow-Origin: *'); 
	header('Content-Type: application/json');

	$real_site = dec_url($enc_site);
	echo json_encode(getMangaAllEpisode($real_site,0));
}

if($action == "getEpisode") {
	header('Access-Control-Allow-Origin: *'); 
	header('Content-Type: application/json');

	$real_site = dec_url($enc_site);
	echo json_encode(getEpisode($real_site));
}

if($action == "getAllSites") {
	header('Access-Control-Allow-Origin: *');  
	header('Content-Type: application/json');
	echo json_encode(getAllSites());
}

if($action == "getPopularSites") {
	header('Access-Control-Allow-Origin: *');  
	header('Content-Type: application/json');
	echo json_encode(getPopularSites());
}

?>