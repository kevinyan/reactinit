<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Demo</title>
        <meta name="screen-orientation" content="portrait" />
        <meta name="x5-orientation" content="portrait" />
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1.0 user-scalable=no"
        />
        <meta name="format-detection" content="telephone=no, email=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />

        {%* 同步CSS *%} 
        {%block name="__css_sync"%}{%/block%}
        
        {%* 同步JS *%}
        {%block name="__js_sync"%}{%/block%}

        {%* 异步CSS *%}
        {%block name="__css_async"%}{%/block%}

    </head>

    {%* 正文内容 *%} 
    {%block name="body"%}{%/block%}
    
 

    {%* 异步JS *%}
    {%block name="__js_async"%}{%/block%}
</html>
