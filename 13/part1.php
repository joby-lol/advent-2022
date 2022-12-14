#!php
<?php

$pairs = parse($argv[1]);

$correct = 0;
foreach ($pairs as $i => list($l, $r)) {
    // var_dump("pair " . ($i + 1) . " running");
    if (check($l, $r)) {
        var_dump("pair " . ($i + 1) . " correct");
        $correct += ($i + 1);
    }
}
var_dump($correct);

// return true if they are in the "right" order, left < right
function check($left, $right)
{
    if ($left !== null && $right === null) {
        return false;
    } elseif ($left === null && $right !== null) {
        return true;
    } elseif (is_array($left) && is_array($right)) {
        $count = max(count($left), count($right));
        for ($i = 0; $i < $count; $i++) {
            $l = @$left[$i];
            $r = @$right[$i];
            if ($l === $r) continue;
            else return check($l,$r);
        }
        return true;
    } elseif (is_array($left)) {
        return check($left, [$right]);
    } elseif (is_array($right)) {
        return check([$left], $right);
    } else {
        return $left <= $right;
    }
}

function parse($file): array
{
    $pairs = [];
    $lines = explode("\n", file_get_contents($file));
    for ($i = 0; $i < count($lines); $i += 3) {
        $pairs[] = [
            json_decode($lines[$i], true),
            json_decode($lines[$i + 1], true),
        ];
    }
    return $pairs;
}
