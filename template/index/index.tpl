{%extends file="../layout.tpl"%} {%block name="body"%}
<p style="background:red;">来自于mock/data 数据：</p>
<p style="font-size: 24px;">{%$data.pageInfo.common.title%}</p>
<div id="app"></div>
{%/block%}
