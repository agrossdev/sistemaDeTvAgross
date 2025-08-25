<?php
$iterator = new FilesystemIterator("../imagens/seisnumeros", FilesystemIterator::SKIP_DOTS);

echo iterator_count($iterator);
?>