#!php
<?php

$file = $argv[1];
$rows = array_map(
    function ($line) {
        return str_split($line);
    },
    explode("\n", file_get_contents($file))
);

$visible = 0;

foreach ($rows as $r => $row) {
    foreach ($row as $c => $tree) {
        // check if hidden along row
        if (tree_visible($tree, array_slice($row, 0, $c))) {
            $visible++;
            continue;
        }
        if (tree_visible($tree, array_slice($row, $c + 1))) {
            $visible++;
            continue;
        }
        // check if hidden along column
        $column = array_map(function ($row) use ($c) {
            return $row[$c];
        }, $rows);
        if (tree_visible($tree, array_slice($column, 0, $r))) {
            $visible++;
            continue;
        }
        if (tree_visible($tree, array_slice($column, $r + 1))) {
            $visible++;
            continue;
        }
    }
}

echo $visible;

function tree_visible(int $tree, array $others): bool
{
    $blocking = array_filter(
        $others,
        function ($e) use ($tree) {
            return $e >= $tree;
        }
    );
    return !$blocking;
}
