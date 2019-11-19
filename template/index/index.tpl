{%* 继承模板 *%}
{%extends file="../layout.tpl"%} 

{%* 正文内容 *%}
{%block name="body"%}
    <p style="background:yellow;">本地Mock数据：</p>
    <p style="font-size: 24vm;">{%$data.username%}</p>
    <div id="app"></div>
{%/block%}


{%* 同步CSS *%}
{%block name="__css_sync"%}
    <css-sync></css-sync>
{%/block%}

{%* 异步CSS *%}
{%block name="__css_async"%}
    <css-async></css-async>
{%/block%}


{%* 同步JS *%}
{%block name="__js_sync"%}
    <script>
        console.log("doSth..");
    </script>
{%/block%}

{%* 异步JS *%}
{%block name="__js_async"%}
    <js-async></js-async>
{%/block%}