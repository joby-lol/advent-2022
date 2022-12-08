#!php
<?php

$file = $argv[1];
$rows = array_map(
    function ($line) {
        return str_split($line);
    },
    explode("\n", file_get_contents($file))
);

$best = 0;

foreach ($rows as $r => $row) {
    foreach ($row as $c => $tree) {
        // get arrays of the trees in each direction
        $column = array_map(function ($row) use ($c) {
            return $row[$c];
        }, $rows);
        $views = [
            "left" => array_reverse(array_slice($row, 0, $c)),
            "right" => array_slice($row, $c + 1),
            "up" => array_reverse(array_slice($column, 0, $r)),
            "down" => array_slice($column, $r + 1)
        ];
        // compute score
        $score = 1;
        foreach ($views as $view) {
            $view_score = 0;
            foreach ($view as $t) {
                if ($t < $tree) $view_score++;
                else {
                    $view_score++;
                    break;
                }
            }
            $score *= $view_score;
        }
        // track highest score
        $best = max($best, $score);
    }
}

echo $best;
