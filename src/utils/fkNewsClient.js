export async function loadFortknoxNews() {
  // 1) JSON API (preferred)
  const api = import.meta.env.VITE_FK_NEWS_API;
  if (api) {
    const res = await fetch(api, { headers: { 'Accept': 'application/json' } });
    if (!res.ok) throw new Error(`FK JSON API error: ${res.status}`);
    const data = await res.json();
    // Expected shape: array of { id, slug, title, date, tags, excerpt, content }
    return normalizePosts(data);
  }

  // 2) RSS feed via rss2json proxy
  const rss = import.meta.env.VITE_FK_NEWS_RSS;
  if (rss) {
    const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rss)}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!data || !data.items) throw new Error('FK RSS parse failed');
    const posts = data.items.map((it, idx) => ({
      id: it.guid || it.link || idx,
      slug: (it.link || it.guid || `post-${idx}`).toString().split('/').filter(Boolean).pop(),
      title: it.title,
      date: it.pubDate || it.published || new Date().toISOString(),
      tags: Array.isArray(it.categories) ? it.categories : [],
      excerpt: stripHtml(it.description || it.content || '').slice(0, 200) + '…',
      content: it.content || it.description || '',
    }));
    return normalizePosts(posts);
  }

  // 3) fallback handled in NewsPage by local newsPosts
  return [];
}

function stripHtml(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html || '';
  return tmp.textContent || tmp.innerText || '';
}

function normalizePosts(arr) {
  return arr
    .filter(Boolean)
    .map((p, i) => ({
      id: p.id ?? i,
      slug: p.slug || (p.title ? p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : `post-${i}`),
      title: p.title || 'Untitled',
      date: p.date || new Date().toISOString(),
      tags: Array.isArray(p.tags) ? p.tags : (p.tags ? String(p.tags).split(',').map(t => t.trim()) : []),
      excerpt: p.excerpt || (p.content ? stripHtml(p.content).slice(0, 200) + '…' : ''),
      content: p.content || '',
    }));
}
