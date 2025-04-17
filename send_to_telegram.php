<?php
session_start();
if (isset($_SESSION['last_submit']) && (time() - $_SESSION['last_submit'] < 60)) {
  echo json_encode(['success' => false, 'message' => 'Подождите 1 минуту перед повторной отправкой']);
  exit;
}
$_SESSION['last_submit'] = time();

header('Content-Type: application/json; charset=utf-8');


if (!isset($_POST['consent'])) {
  echo json_encode(['success' => false, 'message' => 'Не получено согласие на обработку данных']);
  exit;
}


$name = $_POST['name'] ?? 'Не указано';
$tel = $_POST['tel'] ?? 'Не указан';
$email = $_POST['email'] ?? 'Не указан';
$comment = $_POST['comment'] ?? 'Без комментария';


$botToken = ''; 
$chatId = ''; 


$text = "📢 *Новая заявка с сайта*\n\n";
$text .= "👤 *Имя:* $name\n";
$text .= "📞 *Телефон:* $tel\n";
$text .= "📧 *Email:* $email\n";
$text .= "✏️ *Комментарий:*\n$comment";


$url = "https://api.telegram.org/bot$botToken/sendMessage";
$data = [
  'chat_id' => $chatId,
  'text' => $text,
  'parse_mode' => 'Markdown'
];

$options = [
  'http' => [
    'header' => "Content-type: application/x-www-form-urlencoded\r\n",
    'method' => 'POST',
    'content' => http_build_query($data)
  ]
];

$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);


if ($result === false) {
  echo json_encode(['success' => false, 'message' => 'Ошибка подключения к Telegram']);
} else {
  $response = json_decode($result, true);
  if ($response['ok']) {
    echo json_encode(['success' => true]);
  } else {
    echo json_encode(['success' => false, 'message' => 'Ошибка Telegram API: ' . $response['description']]);
  }
}
?>