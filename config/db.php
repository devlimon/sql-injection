<?php
  session_start();

  $conn = mysqli_connect(
    'localhost', //DB host
    'softnurs_demo', //DB username
    'softnurs_demo', //DB password
    'softnurs_demo' //DB name
  ) or die(mysqli_error($mysqli));
?>
