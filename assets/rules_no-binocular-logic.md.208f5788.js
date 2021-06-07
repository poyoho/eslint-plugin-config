import{o as n,c as s,a}from"./app.02fbfc42.js";const e='{"title":"禁止三目运算符参与逻辑处理 (no-binocular-logic)","description":"","frontmatter":{},"headers":[{"level":2,"title":"禁止三目运算符参与逻辑处理 (no-binocular-logic)","slug":"禁止三目运算符参与逻辑处理-no-binocular-logic"},{"level":2,"title":"事例","slug":"事例"}],"relativePath":"rules/no-binocular-logic.md","lastUpdated":1623073829111}',p={},o=a('<h2 id="禁止三目运算符参与逻辑处理-no-binocular-logic"><a class="header-anchor" href="#禁止三目运算符参与逻辑处理-no-binocular-logic" aria-hidden="true">#</a> 禁止三目运算符参与逻辑处理 (no-binocular-logic)</h2><p>确保三目运算符不参与复杂逻辑。</p><h2 id="事例"><a class="header-anchor" href="#事例" aria-hidden="true">#</a> 事例</h2><p>此规则的<strong>错误</strong>代码示例：</p><div class="language-js line-numbers-mode"><pre><code>isActive\n  <span class="token operator">?</span> banner<span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token operator">:</span> banner<span class="token punctuation">.</span><span class="token function">hide</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>此规则的<strong>正确</strong>代码示例：</p><div class="language-js line-numbers-mode"><pre><code><span class="token keyword">if</span> <span class="token punctuation">(</span>isActive<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  banner<span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n  banner<span class="token punctuation">.</span><span class="token function">hide</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div>',7);p.render=function(a,e,p,t,c,l){return n(),s("div",null,[o])};export default p;export{e as __pageData};
