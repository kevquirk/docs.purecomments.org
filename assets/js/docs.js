/* ── Dark mode ─────────────────────────────────────────────────────────── */
(function () {
    const stored = localStorage.getItem('theme');
    if (stored) document.documentElement.setAttribute('data-theme', stored);
})();

document.addEventListener('DOMContentLoaded', function () {

    /* ── Theme toggle ─────────────────────────────────────────────────── */
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', function () {
            const html = document.documentElement;
            const current = html.getAttribute('data-theme');
            const cycle = { auto: 'dark', dark: 'light', light: 'auto' };
            const next = cycle[current] || 'auto';
            html.setAttribute('data-theme', next);
            if (next === 'auto') {
                localStorage.removeItem('theme');
            } else {
                localStorage.setItem('theme', next);
            }
        });
    }

    /* ── Sidebar toggle (mobile) ──────────────────────────────────────── */
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function () {
            const open = sidebar.classList.toggle('open');
            sidebarToggle.setAttribute('aria-expanded', open);
        });

        document.addEventListener('click', function (e) {
            if (sidebar.classList.contains('open') &&
                !sidebar.contains(e.target) &&
                e.target !== sidebarToggle) {
                sidebar.classList.remove('open');
                sidebarToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /* ── Code copy buttons ────────────────────────────────────────────── */
    document.querySelectorAll('.article-body pre').forEach(function (pre) {
        const wrapper = document.createElement('div');
        wrapper.className = 'code-wrapper';
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);

        const btn = document.createElement('button');
        btn.className = 'copy-btn';
        btn.textContent = 'Copy';
        btn.setAttribute('aria-label', 'Copy code');
        wrapper.appendChild(btn);

        btn.addEventListener('click', function () {
            const code = pre.querySelector('code');
            navigator.clipboard.writeText(code ? code.innerText : pre.innerText).then(function () {
                btn.textContent = 'Copied!';
                btn.classList.add('copied');
                setTimeout(function () {
                    btn.textContent = 'Copy';
                    btn.classList.remove('copied');
                }, 2000);
            });
        });
    });

    /* ── TOC generation ───────────────────────────────────────────────── */
    const tocNav = document.getElementById('toc-nav');
    const articleBody = document.querySelector('.article-body');
    if (tocNav && articleBody) {
        const headings = articleBody.querySelectorAll('h2, h3');
        if (headings.length > 0) {
            headings.forEach(function (h) {
                const a = document.createElement('a');
                a.href = '#' + h.id;
                a.textContent = h.textContent.replace('#', '').trim();
                if (h.tagName === 'H3') a.classList.add('toc-h3');
                tocNav.appendChild(a);
            });

            /* Highlight active TOC item on scroll */
            const tocLinks = tocNav.querySelectorAll('a');
            const observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        tocLinks.forEach(function (l) { l.classList.remove('toc-active'); });
                        const active = tocNav.querySelector('a[href="#' + entry.target.id + '"]');
                        if (active) active.classList.add('toc-active');
                    }
                });
            }, { rootMargin: '-20% 0% -70% 0%' });

            headings.forEach(function (h) { observer.observe(h); });
        }
    }

    /* ── Search ───────────────────────────────────────────────────────── */
    const modal = document.getElementById('search-modal');
    const backdrop = document.getElementById('search-backdrop');
    const searchBtn = document.getElementById('search-btn');
    const closeBtn = document.getElementById('search-close');
    const input = document.getElementById('search-input');
    const results = document.getElementById('search-results');
    const emptyMsg = document.getElementById('search-empty');

    let index = null;

    function openSearch() {
        modal.hidden = false;
        input.focus();
        if (!index) loadIndex();
    }

    function closeSearch() {
        modal.hidden = true;
        input.value = '';
        results.innerHTML = '';
        emptyMsg.hidden = true;
    }

    function loadIndex() {
        fetch('/search-index.json').then(function (r) { return r.json(); }).then(function (data) {
            index = data;
        });
    }

    if (searchBtn) searchBtn.addEventListener('click', openSearch);
    if (closeBtn) closeBtn.addEventListener('click', closeSearch);
    if (backdrop) backdrop.addEventListener('click', closeSearch);

    document.addEventListener('keydown', function (e) {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            modal.hidden ? openSearch() : closeSearch();
        }
        if (e.key === 'Escape' && !modal.hidden) closeSearch();
    });

    if (input) {
        input.addEventListener('input', function () {
            const q = input.value.trim().toLowerCase();
            results.innerHTML = '';
            emptyMsg.hidden = true;

            if (!q || !index) return;

            const matches = index.filter(function (item) {
                return item.title.toLowerCase().includes(q) ||
                    (item.description && item.description.toLowerCase().includes(q));
            }).slice(0, 8);

            if (matches.length === 0) {
                emptyMsg.hidden = false;
                return;
            }

            matches.forEach(function (item) {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = item.url;
                a.innerHTML =
                    '<div class="search-result-title">' + escHtml(item.title) + '</div>' +
                    (item.description ? '<div class="search-result-desc">' + escHtml(item.description) + '</div>' : '');
                a.addEventListener('click', closeSearch);
                li.appendChild(a);
                results.appendChild(li);
            });
        });
    }

    function escHtml(s) {
        return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

});
