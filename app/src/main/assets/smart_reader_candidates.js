(function () {
    var semantic = 'header, nav, main, article, aside, footer, section, [role="main"], [role="navigation"], [role="complementary"]';
    var nodes = Array.prototype.slice.call(document.querySelectorAll(semantic));
    nodes = nodes.concat(Array.prototype.slice.call(document.querySelectorAll('div[class], div[id]')));
    nodes = nodes.filter(function (node, index) { return nodes.indexOf(node) === index; });
    var candidates = [];
    nodes.forEach(function (node) {
        if (candidates.length >= 24 || node === document.body) return;
        // Treat a semantic article as one indivisible content candidate. Classifying
        // its nested sections separately can delete the actual story on news sites.
        if (node.closest('article, [role="article"]') && !node.matches('article, [role="article"]')) return;
        var text = (node.innerText || '').replace(/\s+/g, ' ').trim();
        if (text.length < 40 || text.length > 12000) return;
        if (node.getClientRects().length === 0) return;
        var links = Array.prototype.slice.call(node.querySelectorAll('a'));
        var linkLength = links.reduce(function (sum, link) { return sum + (link.innerText || '').length; }, 0);
        var id = String(candidates.length);
        node.setAttribute('data-eb-smart-reader', id);
        candidates.push({
            id: id,
            tag: node.tagName.toLowerCase(),
            role: node.getAttribute('role') || '',
            className: String(node.className || '').slice(0, 120),
            elementId: node.id.slice(0, 80),
            text: text.slice(0, 600),
            textLength: text.length,
            linkRatio: Math.round(linkLength / Math.max(1, text.length) * 100) / 100
        });
    });
    return JSON.stringify({title: document.title, candidates: candidates});
})()
