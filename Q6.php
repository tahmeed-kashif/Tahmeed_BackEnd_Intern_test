<?php

/*
Original code had a problem because user ID 5
does not exist in the array.

function getUser($id){
    $users = [1=>'Ali', 2=>'Ahmed', 3=>'Usman'];
    return $users[$id];
}

echo getUser(5);
*/

// Corrected code
function getUser($id) {
    $users = [
        1 => 'Ali',
        2 => 'Ahmed',
        3 => 'Usman'
    ];

    return $users[$id] ?? 'User not found';
}

echo getUser(5);

?>


//The problem is that user ID 5 does not exist in the array. Accessing $users[$id] directly can cause an undefined array key warning. I used the null coalescing operator ?? to safely return "User not found" when the ID does not exist.