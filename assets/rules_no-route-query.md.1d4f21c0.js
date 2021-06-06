import{o as n,c as s,a}from"./app.a01fa5fa.js";const p='{"title":"禁止使用 this.$route.query (no-route-query)","description":"","frontmatter":{},"headers":[{"level":2,"title":"禁止使用 this.$route.query (no-route-query)","slug":"禁止使用-this-route-query-no-route-query"},{"level":2,"title":"事例","slug":"事例"}],"relativePath":"rules/no-route-query.md","lastUpdated":1622911080579}',t={},e=a('<h2 id="禁止使用-this-route-query-no-route-query"><a class="header-anchor" href="#禁止使用-this-route-query-no-route-query" aria-hidden="true">#</a> 禁止使用 <code>this.$route.query</code> (no-route-query)</h2><p>禁止使用<code>this.$route.query</code></p><p>使用<code>this.$route.query</code>后维护页面的时候都不知道这个页面还可以接受参数</p><p>应该使用组件的props传route.query，因为修改涉及多个页面，需要手动修改，所以只发出建议。</p><h2 id="事例"><a class="header-anchor" href="#事例" aria-hidden="true">#</a> 事例</h2><p>此规则的<strong>错误</strong>代码示例：</p><div class="language-js line-numbers-mode"><pre><code><span class="token punctuation">{</span>\n  methods<span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token function">clickSubmit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">const</span> <span class="token punctuation">{</span> world <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$route<span class="token punctuation">.</span>query\n      <span class="token function">fetchSubmit</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n        hello<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$route<span class="token punctuation">.</span>query<span class="token punctuation">.</span>hello<span class="token punctuation">,</span>\n        world<span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>此规则的<strong>正确</strong>代码示例：</p><ol><li>组件声明props</li></ol><div class="language-js line-numbers-mode"><pre><code><span class="token punctuation">{</span>\n  props<span class="token operator">:</span> <span class="token punctuation">{</span>\n    hello<span class="token operator">:</span> <span class="token punctuation">{</span>\n      type<span class="token operator">:</span> String<span class="token punctuation">,</span>\n      defalut<span class="token operator">:</span> <span class="token string">&quot;&quot;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    world<span class="token operator">:</span> <span class="token punctuation">{</span>\n      type<span class="token operator">:</span> String<span class="token punctuation">,</span>\n      defalut<span class="token operator">:</span> <span class="token string">&quot;&quot;</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  methods<span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token function">clickSubmit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token function">fetchSubmit</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n        hello<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>hello<span class="token punctuation">,</span>\n        world<span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><ol start="2"><li>路由上调用组件时传参</li></ol><div class="language-js line-numbers-mode"><pre><code><span class="token punctuation">{</span>\n  <span class="token function-variable function">props</span><span class="token operator">:</span> <span class="token parameter">route</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>\n    hello<span class="token operator">:</span> route<span class="token punctuation">.</span>query<span class="token punctuation">.</span>hello<span class="token punctuation">,</span>\n    world<span class="token operator">:</span> route<span class="token punctuation">.</span>query<span class="token punctuation">.</span>world<span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div>',12);t.render=function(a,p,t,o,u,l){return n(),s("div",null,[e])};export default t;export{p as __pageData};