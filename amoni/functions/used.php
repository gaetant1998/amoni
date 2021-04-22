<?php

function isAjax($nameAjax = 'ajax', $type = 'get', $val = null) {
    if ($type == 'get')
        if ($val == null)
            return  isset($_GET[$nameAjax]);
        else
            return (isset($_GET[$nameAjax]) && $_GET[$nameAjax] == $val);
    elseif ($type == 'post') 
        if ($val == null)
            return  isset($_POST[$nameAjax]);
        else
            return  (isset($_POST[$nameAjax]) && $_POST[$nameAjax] == $val);
    elseif ($type == 'sever')
        if ($val == null)
            return  isset($_SERVER[$nameAjax]);
        else
            return  (isset($_SERVER[$nameAjax]) && $_SERVER[$nameAjax] == $val);
}

function getURL($url) {
    return DOMAINE.$url;
}

function redirect($url, $code = 303) {

    if (isset($_SESSION['redirect']) and $_SESSION['redirect'] != null) {
        $url = $_SESSION['redirect'];
        unset($_SESSION['redirect']);
    }

    http_response_code($code);
    header("location: ".getURL($url));
}

function getIpUser() {
    return $_SERVER['REMOTE_ADDR'];
}

function debug($var, $type = 'pr') {
    
    echo '<pre>';
    
    switch (strtolower($type)) {
        case 'pr':
            print_r($var);
            break;
        case 'vd':
            var_dump($var);
            break;
        default:
            var_dump($var);
            break;
    }
    
    echo '</pre>';
}


function xrange(int $start, int $end, int $step = 1) {
    for ($i=$start; $i <= $end ; $i++) { 
        yield $i;
    }
}

function windowPrint() {
    echo "

    <script>
        window.onload = ()=>{
            window.print()
        }
    </script>

    ";
}

function _mime_types($ext = '')
{
    $mimes = [
        'xl' => 'application/excel',
        'js' => 'application/javascript',
        'hqx' => 'application/mac-binhex40',
        'cpt' => 'application/mac-compactpro',
        'bin' => 'application/macbinary',
        'doc' => 'application/msword',
        'word' => 'application/msword',
        'xlsx' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'xltx' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
        'potx' => 'application/vnd.openxmlformats-officedocument.presentationml.template',
        'ppsx' => 'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
        'pptx' => 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'sldx' => 'application/vnd.openxmlformats-officedocument.presentationml.slide',
        'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'dotx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
        'xlam' => 'application/vnd.ms-excel.addin.macroEnabled.12',
        'xlsb' => 'application/vnd.ms-excel.sheet.binary.macroEnabled.12',
        'class' => 'application/octet-stream',
        'dll' => 'application/octet-stream',
        'dms' => 'application/octet-stream',
        'exe' => 'application/octet-stream',
        'lha' => 'application/octet-stream',
        'lzh' => 'application/octet-stream',
        'psd' => 'application/octet-stream',
        'sea' => 'application/octet-stream',
        'so' => 'application/octet-stream',
        'oda' => 'application/oda',
        'pdf' => 'application/pdf',
        'ai' => 'application/postscript',
        'eps' => 'application/postscript',
        'ps' => 'application/postscript',
        'smi' => 'application/smil',
        'smil' => 'application/smil',
        'mif' => 'application/vnd.mif',
        'xls' => 'application/vnd.ms-excel',
        'ppt' => 'application/vnd.ms-powerpoint',
        'wbxml' => 'application/vnd.wap.wbxml',
        'wmlc' => 'application/vnd.wap.wmlc',
        'dcr' => 'application/x-director',
        'dir' => 'application/x-director',
        'dxr' => 'application/x-director',
        'dvi' => 'application/x-dvi',
        'gtar' => 'application/x-gtar',
        'php3' => 'application/x-httpd-php',
        'php4' => 'application/x-httpd-php',
        'php' => 'application/x-httpd-php',
        'phtml' => 'application/x-httpd-php',
        'phps' => 'application/x-httpd-php-source',
        'swf' => 'application/x-shockwave-flash',
        'sit' => 'application/x-stuffit',
        'tar' => 'application/x-tar',
        'tgz' => 'application/x-tar',
        'xht' => 'application/xhtml+xml',
        'xhtml' => 'application/xhtml+xml',
        'zip' => 'application/zip',
        'mid' => 'audio/midi',
        'midi' => 'audio/midi',
        'mp2' => 'audio/mpeg',
        'mp3' => 'audio/mpeg',
        'm4a' => 'audio/mp4',
        'mpga' => 'audio/mpeg',
        'aif' => 'audio/x-aiff',
        'aifc' => 'audio/x-aiff',
        'aiff' => 'audio/x-aiff',
        'ram' => 'audio/x-pn-realaudio',
        'rm' => 'audio/x-pn-realaudio',
        'rpm' => 'audio/x-pn-realaudio-plugin',
        'ra' => 'audio/x-realaudio',
        'wav' => 'audio/x-wav',
        'mka' => 'audio/x-matroska',
        'bmp' => 'image/bmp',
        'gif' => 'image/gif',
        'jpeg' => 'image/jpeg',
        'jpe' => 'image/jpeg',
        'jpg' => 'image/jpeg',
        'png' => 'image/png',
        'tiff' => 'image/tiff',
        'tif' => 'image/tiff',
        'webp' => 'image/webp',
        'avif' => 'image/avif',
        'heif' => 'image/heif',
        'heifs' => 'image/heif-sequence',
        'heic' => 'image/heic',
        'heics' => 'image/heic-sequence',
        'eml' => 'message/rfc822',
        'css' => 'text/css',
        'html' => 'text/html',
        'htm' => 'text/html',
        'shtml' => 'text/html',
        'log' => 'text/plain',
        'text' => 'text/plain',
        'txt' => 'text/plain',
        'rtx' => 'text/richtext',
        'rtf' => 'text/rtf',
        'vcf' => 'text/vcard',
        'vcard' => 'text/vcard',
        'ics' => 'text/calendar',
        'xml' => 'text/xml',
        'xsl' => 'text/xml',
        'wmv' => 'video/x-ms-wmv',
        'mpeg' => 'video/mpeg',
        'mpe' => 'video/mpeg',
        'mpg' => 'video/mpeg',
        'mp4' => 'video/mp4',
        'm4v' => 'video/mp4',
        'mov' => 'video/quicktime',
        'qt' => 'video/quicktime',
        'rv' => 'video/vnd.rn-realvideo',
        'avi' => 'video/x-msvideo',
        'movie' => 'video/x-sgi-movie',
        'webm' => 'video/webm',
        'mkv' => 'video/x-matroska',
    ];
    $ext = strtolower($ext);
    if (array_key_exists($ext, $mimes)) {
        return $mimes[$ext];
    }

    return 'application/octet-stream';
}

function getDate_format(string $date, $format = ' D, d M Y H:i:s') {
    $date = date_create($date);

    return date_format($date, $format);
}

function default_array(array &$data, array $default_data) {
    $final_data = $default_data;

    foreach ($data as $key => $value) {
        $final_data[$key] = $value;
    }

    return $final_data;
}

function bar_pagination(array $params = [], int $nbre_page = 2, int $current_page = 1) { 
    $params = default_array($params, [
        'btn_next' => 'next',
        'btn_prev' => 'prev',
        'url' => null,
        'name_var_get' => 'page',
        'class_ul' => 'pagination justify-content-left mt-5',
        'class_li' => 'page-item',
        'class_link' => 'page-link'
    ]);

    if ($nbre_page < 2) {
        return false;
    }
    
    $p_next = (($current_page + 1) < $nbre_page )? $current_page + 1 : $nbre_page;
    $p_prev = (($current_page - 1) > 1 )? $current_page - 1 : 1;

    $url_next = $params['url'].$params['name_var_get'].'='.$p_next;
    $url_prev = $params['url'].$params['name_var_get'].'='.$p_prev;
    $url = $params['url'].$params['name_var_get'].'=';

    ?>
    <nav aria-label="Page navigation" style="width:100%; overflow:auto">
        <ul class="<?=$params['class_ul']?>">
            
            <?php if ($p_prev != $current_page) : ?>
                <li class="<?=$params['class_li']?>">
                    <a href="<?=$url_prev?>" class="<?=$params['class_link']?>">
                        <?=$params['btn_prev']?>
                    </a>
                </li>
            <?php endif; ?>

            <?php for ($i=1; $i <= $nbre_page; $i++) :
            
                if ($i == $current_page) { ?>
                    <li class="<?=$params['class_li']?> active"><a href="<?=$url.$i?>" class="<?=$params['class_link']?>"><?=$i?></a></li>
                <?php } else { ?> 
                    <li class="<?=$params['class_li']?>"><a href="<?=$url.$i?>" class="<?=$params['class_link']?>"><?=$i?></a></li>
                <?php } ?>
            <?php endfor; ?>

            <?php if ($p_next != $current_page) : ?>
                <li class="<?=$params['class_li']?>">
                    <a href="<?=$url_next?>" class="<?=$params['class_link']?>">
                        <?=$params['btn_next']?>
                    </a>
                </li>
            <?php endif; ?>
        </ul>
    </nav>
    <?php
}

function round2($val, $type = 'round') {
    switch ($type) {
        case 'center':
            return round($val);
            break;
        case 'left':
            return floor($val);
            break;
        case 'right':
            $res = floor($val);
            return ($res == $val)? $res : $res + 1;
            break;
        default:
            return round($val);
            break;
    }
}

function tab($i = 4) {
    $tab = "&nbsp;";
    
    for ($j=1; $j < $i; $j++) { 
        $tab .= "&nbsp;";
    }

    return $tab;
}