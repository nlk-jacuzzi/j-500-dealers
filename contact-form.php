<?php
require_once 'phpmailer/PHPMailerAutoload.php';

$corporateEmail = 'Destini.Protich@jacuzzi.com';

$data = null;

if (isset($_POST['firstName']) && isset($_POST['lastName']) && isset($_POST['email']) && isset($_POST['zipCode'])) {

    //check if any of the inputs are empty
    if (empty($_POST['firstName']) || empty($_POST['lastName']) || empty($_POST['email']) || empty($_POST['zipCode'])) {
        $data = array('success' => false, 'message' => 'Please fill out the form completely.');
        echo json_encode($data);
        exit;
    }

    //create an instance of PHPMailer for Corporate
    $mailToCorporate = new PHPMailer();

    $mailToCorporate->From = $_POST['email'];
    $mailToCorporate->FromName = $_POST['firstName'] . ' ' . $_POST['lastName'];
    $mailToCorporate->AddAddress( $corporateEmail );
    $mailToCorporate->Subject = 'J-500(tm) Purchase Request';
    $mailToCorporate->Body = "Name: " . $mailToCorporate->FromName 
//        . "\r\n\r\nStore: " . stripslashes($_POST['storeName'])
        . "\r\n\r\nPhone: " . stripslashes( isset($_POST['phone']) ? $_POST['phone'] : '' )
        . "\r\n\r\nZip Code: " . stripslashes($_POST['zipCode'])
//        . "\r\n\r\nTub Model: " . stripslashes($_POST['tubName'])
        . "\r\n\r\nShell Color: " . stripslashes( isset($_POST['shellColor']['name']) ? $_POST['shellColor']['name'] : '' )
        . "\r\n\r\nSkirt Color: " . stripslashes( isset($_POST['skirtColor']['name']) ? $_POST['skirtColor']['name'] : '' );

    if (isset($_POST['ref'])) {
        $mailToCorporate->Body .= "\r\n\r\nRef: " . $_POST['ref'];
    }

    if(!$mailToCorporate->send()) {
        $data .= array('success' => false, 'message' => 'Message could not be sent. Mailer Error: ' . $mailToCorporate->ErrorInfo);
        echo json_encode($data);
        exit;
    }

    //create an instance of PHPMailer for Dealer
    $mailToDealer = new PHPMailer();

    $mailToDealer->From = $corporateEmail;
    $mailToDealer->FromName = 'Jacuzzi';
    $mailToDealer->AddAddress( $_POST['email'] );
    $mailToDealer->Subject = 'The Jacuzzi J-500(tm) Collection: Revolutionary Design, Legendary Performance';
    $mailToDealer->Body = 'Thank you for your interest in the Jacuzzi J-500(tm) Collection. Stay tuned for the announcement of the official product launch, as well as updates on how you can be the first to see the J-500(tm) for yourself, and be the first to own this limited availability revolutionary hot tub collection.';

    if (isset($_POST['ref'])) {
        $mailToDealer->Body .= "\r\n\r\nRef: " . $_POST['ref'];
    }

    if(!$mailToDealer->send()) {
        $data .= array('success' => false, 'message' => 'Message could not be sent. Mailer Error: ' . $mailToDealer->ErrorInfo);
        echo json_encode($data);
        exit;
    }

    $data = array('success' => true, 'message' => 'Thanks! We have received your message.');
    echo json_encode($data);

} else {

    $data = array('success' => false, 'message' => 'Please fill out the form completely.');
    echo json_encode($data);

}