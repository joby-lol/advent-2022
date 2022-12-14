#!php
<?php

$file = $argv[1];
$rows = array_map(
    function ($line) {
        return str_split($line);
    },
    explode("\n", file_get_contents($file))
);

solve($rows);

function solve(array $rows)
{
    $nodes = [];
    $start = null;
    // prepare all nodes
    foreach ($rows as $y => $row) {
        foreach ($row as $x => $value) {
            if ($value == 'S') $height = 0;
            elseif ($value == 'E') $height = 25;
            else $height = strpos('abcdefghijklmnopqrstuvwxyz', $value);
            if ($height === false) throw new Exception("Unknown height: $x,$y: $value");
            $nodes[] = $node = new Node($x, $y, $height);
            // set start/end nodes
            if ($value == 'E') $start = $node;
        }
    }
    // prepare lists of neighbors
    foreach ($nodes as $node) {
        $node->neighbors = array_filter($nodes, function (Node $neighbor) use ($node) {
            $distance = abs($neighbor->x - $node->x) + abs($neighbor->y - $node->y) == 1;
            $height = $neighbor->height - $node->height;
            return $distance == 1 && $height >= -1;
        });
        // var_dump(sprintf(
        //     '%s,%s: neighbors: %s',
        //     $node->x,
        //     $node->y,
        //     implode('; ', array_map(function (Node $node) {
        //         return sprintf('%s,%s', $node->x, $node->y);
        //     }, $node->neighbors))
        // ));
    }
    // unvisited nodes are all but start
    $start->distance = 0;
    findPath($start);
    $solutions = array_map(
        function (Node $node) {
            return $node->distance;
        },
        array_filter(
            $nodes,
            function (Node $node) {
                return $node->height == 0;
            }
        )
        );
        sort($solutions);
    var_dump($solutions);
}

function findPath(Node $start)
{
    $tentative_distance = $start->distance + 1;
    foreach ($start->neighbors as $neighbor) {
        if ($neighbor->distance > $tentative_distance) {
            $neighbor->distance = $tentative_distance;
            $neighbor->toStart = $start;
            findPath($neighbor);
        }
    }
}

class Node
{
    public $visited = false;
    /** @var float|int */
    public $distance = INF;
    /** @var Node|null */
    public $toStart = null;
    /** @var Node[] */
    public $neighbors = [];
    /** @var int */
    public $x, $y, $height;

    public function __construct(int $x, int $y, int $height)
    {
        $this->x = $x;
        $this->y = $y;
        $this->height = $height;
    }
}
