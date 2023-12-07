<?php
// Check for empty fields
$errors = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get POST data
    $fname = isset($_POST['firstName']) ? strip_tags(trim($_POST['firstName'])) : '';
    $lname = isset($_POST['lastName']) ? strip_tags(trim($_POST['lastName'])) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $message = isset($_POST['message']) ? strip_tags(trim($_POST['message'])) : '';

    // Validate form fields
    if (empty($lname) && empty($f)) {
        $errors[] = 'Name is empty';
    }

    if (empty($email)) {
        $errors[] = 'Email is empty';
    } else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Email is invalid';
    }

    if (empty($message)) {
        $errors[] = 'Message is empty';
    }

    // If no errors, send email
    if (empty($errors)) {
        // Recipient email address (replace with your own)
        // $recipient = "samragland012@gmail.com";

        // Additional headers
        $headers = "From: $fname $lname <$email>";

        // Send email
        if (mail(samragland012@gmail.com, $message, $headers)) {
            echo "Email sent successfully!";
        } else {
            echo "Failed to send email. Please try again later.";
        }
    } else {
        // Display errors
        echo "The form contains the following errors:<br>";
        foreach ($errors as $error) {
            echo "- $error<br>";
        }
    }
} else {
    // Not a POST request, display a 403 forbidden error
    header("HTTP/1.1 403 Forbidden");
    echo "You are not allowed to access this page.";
}
?>