<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize inputs
    $first_name = isset($_POST['first_name']) ? strip_tags(trim($_POST['first_name'])) : '';
    $last_name = isset($_POST['last_name']) ? strip_tags(trim($_POST['last_name'])) : '';
    $full_name = isset($_POST['full_name']) ? strip_tags(trim($_POST['full_name'])) : '';
    $phone = isset($_POST['phone']) ? strip_tags(trim($_POST['phone'])) : '';
    $treatment = isset($_POST['treatment']) ? strip_tags(trim($_POST['treatment'])) : '';
    $message = isset($_POST['message']) ? strip_tags(trim($_POST['message'])) : '';

    // Determine the sender's name
    $name = $full_name;
    if (empty($name) && (!empty($first_name) || !empty($last_name))) {
        $name = trim($first_name . ' ' . $last_name);
    }
    if (empty($name)) {
        $name = "Website Visitor";
    }

    // Recipients
    $to = "info@kulkiivfgroup.com, kulkiivfgroup@gmail.com, pawanharish2@gmail.com";

    // Subject
    $subject = "New Form Submission: " . $name;

    // Email Body
    $email_content = "<h2>New Form Submission from Kulki IVF Website</h2>";
    $email_content .= "<p><strong>Name:</strong> " . htmlspecialchars($name) . "</p>";
    $email_content .= "<p><strong>Phone:</strong> " . htmlspecialchars($phone) . "</p>";
    if (!empty($treatment)) {
        $email_content .= "<p><strong>Treatment Interest:</strong> " . htmlspecialchars($treatment) . "</p>";
    }
    if (!empty($message)) {
        $email_content .= "<p><strong>Message:</strong><br>" . nl2br(htmlspecialchars($message)) . "</p>";
    }

    // Headers
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";
    $headers .= "From: Kulki IVF Website <noreply@kulkiivfgroup.com>" . "\r\n";

    // Send email
    $mail_sent = mail($to, $subject, $email_content, $headers);

    // Check if it's an AJAX request
    $is_ajax = false;
    if (isset($_POST['is_ajax']) && $_POST['is_ajax'] == '1') {
        $is_ajax = true;
    } elseif (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
        $is_ajax = true;
    } elseif (isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false) {
        $is_ajax = true;
    }

    if ($is_ajax) {
        header('Content-Type: application/json');
        if ($mail_sent) {
            echo json_encode(['success' => true, 'message' => 'Email sent successfully.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Mailer failed to send email.']);
        }
        exit;
    } else {
        if ($mail_sent) {
            header("Location: thankyou.html");
        } else {
            header("Location: thankyou.html?status=error");
        }
        exit;
    }
} else {
    // If accessed directly, redirect to home page
    header("Location: index.html");
    exit;
}
?>
