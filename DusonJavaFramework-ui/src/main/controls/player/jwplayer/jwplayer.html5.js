(function(a) {
    a.html5 = {};
    a.html5.version = "6.8."
})(jwplayer);
(function(a) {
    var b = document;
    a.parseDimension = function(c) {
        if (typeof c == "string") {
            if (c === "") {
                return 0
            } else {
                if (c.lastIndexOf("%") > -1) {
                    return c
                }
            }
            return parseInt(c.replace("px", ""), 10)
        }
        return c
    };
    a.timeFormat = function(e) {
        if (e > 0) {
            var d = Math.floor(e / 3600),
                f = Math.floor((e - d * 3600) / 60),
                c = Math.floor(e % 60);
            return (d ? d + ":" : "") + (f < 10 ? "0" : "") + f + ":" + (c < 10 ? "0" : "") + c
        } else {
            return "00:00"
        }
    };
    a.bounds = function(d) {
        var g = {
            left: 0,
            right: 0,
            width: 0,
            height: 0,
            top: 0,
            bottom: 0
        };
        if (!d || !b.body.contains(d)) {
            return g
        }
        if (d.getBoundingClientRect) {
            var f = d.getBoundingClientRect(d),
                c = window.pageYOffset,
                e = window.pageXOffset;
            if (!f.width && !f.height && !f.left && !f.top) {
                return g
            }
            g.left = f.left + e;
            g.right = f.right + e;
            g.top = f.top + c;
            g.bottom = f.bottom + c;
            g.width = f.right - f.left;
            g.height = f.bottom - f.top
        } else {
            g.width = d.offsetWidth | 0;
            g.height = d.offsetHeight | 0;
            do {
                g.left += d.offsetLeft | 0;
                g.top += d.offsetTop | 0
            } while (d = d.offsetParent);
            g.right = g.left + g.width;
            g.bottom = g.top + g.height
        }
        return g
    };
    a.empty = function(c) {
        if (!c) {
            return
        }
        while (c.childElementCount > 0) {
            c.removeChild(c.children[0])
        }
    }
})(jwplayer.utils);
(function(j) {
    var p = j.utils,
        c = {},
        s, a = {},
        i = null,
        n = {},
        d = false,
        b = ".jwplayer ";

    function q(u) {
        var v = document.createElement("style");
        if (u) {
            v.innerText = u
        }
        v.type = "text/css";
        document.getElementsByTagName("head")[0].appendChild(v);
        return v
    }
    var k = p.css = function(u, w, v) {
        v = v || false;
        if (!a[u]) {
            a[u] = {}
        }
        if (!e(a[u], w, v)) {
            return
        }
        if (d) {
            if (c[u]) {
                c[u].parentNode.removeChild(c[u])
            }
            c[u] = q(r(u));
            return
        }
        if (!c[u]) {
            if (!s || s.sheet.cssRules.length > 50000) {
                s = q()
            }
            c[u] = s
        }
        if (i !== null) {
            i.styleSheets[u] = a[u];
            return
        }
        g(u)
    };
    k.style = function(x, w, u) {
        if (x === undefined || x === null) {
            return
        }
        if (x.length === undefined) {
            x = [x]
        }
        var v = {};
        t(v, w);
        if (i !== null && !u) {
            x.__cssRules = f(x.__cssRules, v);
            if (i.elements.indexOf(x) < 0) {
                i.elements.push(x)
            }
            return
        }
        m(x, v)
    };
    k.block = function(u) {
        if (i === null) {
            i = {
                id: u,
                styleSheets: {},
                elements: []
            }
        }
    };
    k.unblock = function(x) {
        if (i && (!x || i.id === x)) {
            for (var u in i.styleSheets) {
                g(u)
            }
            for (var v = 0; v < i.elements.length; v++) {
                var w = i.elements[v];
                m(w, w.__cssRules)
            }
            i = null
        }
    };

    function f(v, u) {
        v = v || {};
        for (var w in u) {
            v[w] = u[w]
        }
        return v
    }

    function e(v, y, u) {
        var x = false,
            w, z;
        for (w in y) {
            z = h(w, y[w], u);
            if (z !== "") {
                if (z !== v[w]) {
                    v[w] = z;
                    x = true
                }
            } else {
                if (v[w] !== undefined) {
                    delete v[w];
                    x = true
                }
            }
        }
        return x
    }

    function t(u, w) {
        for (var v in w) {
            u[v] = h(v, w[v])
        }
    }

    function l(u) {
        u = u.split("-");
        for (var v = 1; v < u.length; v++) {
            u[v] = u[v].charAt(0).toUpperCase() + u[v].slice(1)
        }
        return u.join("")
    }

    function h(w, x, u) {
        if (!p.exists(x)) {
            return ""
        }
        var v = u ? " !important" : "";
        if (isNaN(x)) {
            if (!!x.match(/png|gif|jpe?g/i) && x.indexOf("url") < 0) {
                return "url(" + x + ")"
            }
            return x + v
        }
        if (x === 0 || w === "z-index" || w === "opacity") {
            return "" + x + v
        }
        if ((/color/i).test(w)) {
            return "#" + p.pad(x.toString(16).replace(/^0x/i, ""), 6) + v
        }
        return Math.ceil(x) + "px" + v
    }

    function m(z, u) {
        for (var x = 0; x < z.length; x++) {
            var w = z[x],
                y, v;
            for (y in u) {
                v = l(y);
                if (w.style[v] !== u[y]) {
                    w.style[v] = u[y]
                }
            }
        }
    }

    function g(u) {
        var x = c[u].sheet,
            w, y, v;
        if (x) {
            w = x.cssRules;
            y = n[u];
            v = r(u);
            if (y !== undefined && y < w.length && w[y].selectorText === u) {
                if (v === w[y].cssText) {
                    return
                }
                x.deleteRule(y)
            } else {
                y = w.length;
                n[u] = y
            }
            x.insertRule(v, y)
        }
    }

    function r(u) {
        var w = a[u];
        u += " { ";
        for (var v in w) {
            u += v + ": " + w[v] + "; "
        }
        return u + "}"
    }
    p.clearCss = function(v) {
        for (var w in a) {
            if (w.indexOf(v) >= 0) {
                delete a[w]
            }
        }
        for (var u in c) {
            if (u.indexOf(v) >= 0) {
                g(u)
            }
        }
    };
    p.transform = function(v, x) {
        var u = "transform",
            w = {};
        x = x || "";
        w[u] = x;
        w["-webkit-" + u] = x;
        w["-ms-" + u] = x;
        w["-moz-" + u] = x;
        w["-o-" + u] = x;
        if (typeof v === "string") {
            k(v, w)
        } else {
            k.style(v, w)
        }
    };
    p.dragStyle = function(u, v) {
        k(u, {
            "-webkit-user-select": v,
            "-moz-user-select": v,
            "-ms-user-select": v,
            "-webkit-user-drag": v,
            "user-select": v,
            "user-drag": v
        })
    };
    p.transitionStyle = function(u, v) {
        if (navigator.userAgent.match(/5\.\d(\.\d)? safari/i)) {
            return
        }
        k(u, {
            "-webkit-transition": v,
            "-moz-transition": v,
            "-o-transition": v,
            transition: v
        })
    };
    p.rotate = function(u, v) {
        p.transform(u, "rotate(" + v + "deg)")
    };
    p.rgbHex = function(u) {
        var v = String(u).replace("#", "");
        if (v.length === 3) {
            v = v[0] + v[0] + v[1] + v[1] + v[2] + v[2]
        }
        return "#" + v.substr(-6)
    };
    p.hexToRgba = function(w, v) {
        var x = "rgb";
        var u = [parseInt(w.substr(1, 2), 16), parseInt(w.substr(3, 2), 16), parseInt(w.substr(5, 2), 16)];
        if (v !== undefined && v !== 100) {
            x += "a";
            u.push(v / 100)
        }
        return x + "(" + u.join(",") + ")"
    };
    (function o() {
        k(b.slice(0, -1) + ["", "div", "span", "a", "img", "ul", "li", "video"].join(", " + b) + ", .jwclick", {
            margin: 0,
            padding: 0,
            border: 0,
            color: "#000000",
            "font-size": "100%",
            font: "inherit",
            "vertical-align": "baseline",
            "background-color": "transparent",
            "text-align": "left",
            direction: "ltr",
            "-webkit-tap-highlight-color": "rgba(255, 255, 255, 0)"
        });
        k(b + "ul", {
            "list-style": "none"
        })
    })()
})(jwplayer);
(function(a) {
    var b = a.stretching = {
        NONE: "none",
        FILL: "fill",
        UNIFORM: "uniform",
        EXACTFIT: "exactfit"
    };
    a.scale = function(e, d, c, g, h) {
        var f = "";
        d = d || 1;
        c = c || 1;
        g = g | 0;
        h = h | 0;
        if (d !== 1 || c !== 1) {
            f = "scale(" + d + ", " + c + ")"
        }
        if (g || h) {
            if (f) {
                f += " "
            }
            f = "translate(" + g + "px, " + h + "px)"
        }
        a.transform(e, f)
    };
    a.stretch = function(j, n, m, h, l, i) {
        if (!n) {
            return false
        }
        if (!m || !h || !l || !i) {
            return false
        }
        j = j || b.UNIFORM;
        var d = Math.ceil(m / 2) * 2 / l,
            g = Math.ceil(h / 2) * 2 / i,
            e = (n.tagName.toLowerCase() === "video"),
            f = false,
            k = "jw" + j.toLowerCase();
        switch (j.toLowerCase()) {
            case b.FILL:
                if (d > g) {
                    g = d
                } else {
                    d = g
                }
                f = true;
                break;
            case b.NONE:
                d = g = 1;
            case b.EXACTFIT:
                f = true;
                break;
            case b.UNIFORM:
            default:
                if (d > g) {
                    if (l * g / m > 0.95) {
                        f = true;
                        k = "jwexactfit"
                    } else {
                        l = l * g;
                        i = i * g
                    }
                } else {
                    if (i * d / h > 0.95) {
                        f = true;
                        k = "jwexactfit"
                    } else {
                        l = l * d;
                        i = i * d
                    }
                }
                if (f) {
                    d = Math.ceil(m / 2) * 2 / l;
                    g = Math.ceil(h / 2) * 2 / i
                }
        }
        if (e) {
            var c = {
                left: "",
                right: "",
                width: "",
                height: ""
            };
            if (f) {
                if (m < l) {
                    c.left = c.right = Math.ceil((m - l) / 2)
                }
                if (h < i) {
                    c.top = c.bottom = Math.ceil((h - i) / 2)
                }
                c.width = l;
                c.height = i;
                a.scale(n, d, g, 0, 0)
            } else {
                f = false;
                a.transform(n)
            }
            a.css.style(n, c)
        } else {
            n.className = n.className.replace(/\s*jw(none|exactfit|uniform|fill)/g, "") + " " + k
        }
        return f
    }
})(jwplayer.utils);
(function(a) {
    a.dfxp = function() {
        var c = jwplayer.utils.seconds;
        this.parse = function(h) {
            var e = [{
                begin: 0,
                text: ""
            }];
            h = h.replace(/^\s+/, "").replace(/\s+$/, "");
            var g = h.split("</p>");
            var k = h.split("</tt:p>");
            var j = [];
            for (var d = 0; d < g.length; d++) {
                if (g[d].indexOf("<p") >= 0) {
                    g[d] = g[d].substr(g[d].indexOf("<p") + 2).replace(/^\s+/, "").replace(/\s+$/, "");
                    j.push(g[d])
                }
            }
            for (var d = 0; d < k.length; d++) {
                if (k[d].indexOf("<tt:p") >= 0) {
                    k[d] = k[d].substr(k[d].indexOf("<tt:p") + 5).replace(/^\s+/, "").replace(/\s+$/, "");
                    j.push(k[d])
                }
            }
            g = j;
            for (d = 0; d < g.length; d++) {
                var f = b(g[d]);
                if (f.text) {
                    e.push(f);
                    if (f.end) {
                        e.push({
                            begin: f.end,
                            text: ""
                        });
                        delete f.end
                    }
                }
            }
            if (e.length > 1) {
                return e
            } else {
                throw {
                    message: "Invalid DFXP file:"
                }
            }
        };

        function b(g) {
            var f = {};
            try {
                var d = g.indexOf('begin="');
                g = g.substr(d + 7);
                d = g.indexOf('" end="');
                f.begin = c(g.substr(0, d));
                g = g.substr(d + 7);
                d = g.indexOf('"');
                f.end = c(g.substr(0, d));
                d = g.indexOf('">');
                g = g.substr(d + 2);
                f.text = g
            } catch (e) {}
            return f
        }
    }
})(jwplayer.parsers);
(function(a) {
    a.srt = function() {
        var c = jwplayer.utils,
            d = c.seconds;
        this.parse = function(j, k) {
            var f = k ? [] : [{
                begin: 0,
                text: ""
            }];
            j = c.trim(j);
            var h = j.split("\r\n\r\n");
            if (h.length == 1) {
                h = j.split("\n\n")
            }
            for (var e = 0; e < h.length; e++) {
                if (h[e] == "WEBVTT") {
                    continue
                }
                var g = b(h[e]);
                if (g.text) {
                    f.push(g);
                    if (g.end && !k) {
                        f.push({
                            begin: g.end,
                            text: ""
                        });
                        delete g.end
                    }
                }
            }
            if (f.length > 1) {
                return f
            } else {
                throw {
                    message: "Invalid SRT file"
                }
            }
        };

        function b(k) {
            var j = {};
            var l = k.split("\r\n");
            if (l.length == 1) {
                l = k.split("\n")
            }
            try {
                var e = 1;
                if (l[0].indexOf(" --> ") > 0) {
                    e = 0
                }
                var g = l[e].indexOf(" --> ");
                if (g > 0) {
                    j.begin = d(l[e].substr(0, g));
                    j.end = d(l[e].substr(g + 5))
                }
                if (l[e + 1]) {
                    j.text = l[e + 1];
                    for (var h = e + 2; h < l.length; h++) {
                        j.text += "<br/>" + l[h]
                    }
                }
            } catch (f) {}
            return j
        }
    }
})(jwplayer.parsers);
(function(c) {
    var n = c.utils,
        j = n.css,
        b = true,
        h = false,
        d = c.events,
        e = "jwskip",
        g = "jwskipimage",
        i = "jwskipover",
        f = "jwskipout",
        m = 80,
        k = 30,
        l = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAICAYAAAArzdW1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ODkzMWI3Ny04YjE5LTQzYzMtOGM2Ni0wYzdkODNmZTllNDYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDI0OTcxRkE0OEM2MTFFM0I4MTREM0ZBQTFCNDE3NTgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDI0OTcxRjk0OEM2MTFFM0I4MTREM0ZBQTFCNDE3NTgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDA5ZGQxNDktNzdkMi00M2E3LWJjYWYtOTRjZmM2MWNkZDI0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQ4OTMxYjc3LThiMTktNDNjMy04YzY2LTBjN2Q4M2ZlOWU0NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqAZXX0AAABYSURBVHjafI2BCcAwCAQ/kr3ScRwjW+g2SSezCi0kYHpwKLy8JCLDbWaGTM+MAFzuVNXhNiTQsh+PS9QhZ7o9JuFMeUVNwjsamDma4K+3oy1cqX/hxyPAAAQwNKV27g9PAAAAAElFTkSuQmCC",
        a = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAICAYAAAArzdW1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ODkzMWI3Ny04YjE5LTQzYzMtOGM2Ni0wYzdkODNmZTllNDYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDI0OTcxRkU0OEM2MTFFM0I4MTREM0ZBQTFCNDE3NTgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDI0OTcxRkQ0OEM2MTFFM0I4MTREM0ZBQTFCNDE3NTgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDA5ZGQxNDktNzdkMi00M2E3LWJjYWYtOTRjZmM2MWNkZDI0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQ4OTMxYjc3LThiMTktNDNjMy04YzY2LTBjN2Q4M2ZlOWU0NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvgIj/QAAABYSURBVHjadI6BCcAgDAS/0jmyih2tm2lHSRZJX6hQQ3w4FP49LKraSHV3ZLDzAuAi3cwaqUhSfvft+EweznHneUdTzPGRmp5hEJFhAo3LaCnjn7blzCvAAH9YOSCL5RZKAAAAAElFTkSuQmCC";
    c.html5.adskipbutton = function(A, E, q, I) {
        var o, t, r = new d.eventdispatcher(),
            F = -1,
            J = h,
            D, B = this,
            u = 0,
            s, x;
        n.extend(B, r);

        function v() {
            s = new Image();
            s.src = l;
            s.className = g + " " + f;
            x = new Image();
            x.src = a;
            x.className = g + " " + i;
            o = G("div", e);
            o.id = A.id + "_skipcontainer";
            t = G("canvas");
            o.appendChild(t);
            B.width = t.width = m;
            B.height = t.height = k;
            o.appendChild(x);
            o.appendChild(s);
            j.style(o, {
                visibility: "hidden",
                bottom: E
            })
        }

        function H(M) {
            if (F < 0) {
                return
            }
            var L = t.getContext("2d");
            L.clearRect(0, 0, m, k);
            w(L, 0, 0, m, k, 5, b, h, h);
            w(L, 0, 0, m, k, 5, h, b, h);
            L.fillStyle = "#979797";
            L.globalAlpha = 1;
            var K = t.width / 2;
            var N = t.height / 2;
            L.textAlign = "center";
            L.font = "Bold 11px Sans-Serif";
            L.fillText(q.replace(/xx/gi, Math.ceil(F - M)), K, N + 4)
        }

        function p(M, L) {
            if (n.typeOf(u) == "number") {
                F = u
            } else {
                if (u.slice(-1) == "%") {
                    var K = parseFloat(u.slice(0, -1));
                    if (L && !isNaN(K)) {
                        F = L * K / 100
                    }
                } else {
                    if (n.typeOf(u) == "string") {
                        F = n.seconds(u)
                    } else {
                        if (!isNaN(u)) {
                            F = u
                        }
                    }
                }
            }
        }
        B.updateSkipTime = function(O, N) {
            var L = t.getContext("2d");
            p(O, N);
            if (F >= 0) {
                j.style(o, {
                    visibility: D ? "visible" : "hidden"
                });
                if (F - O > 0) {
                    H(O)
                } else {
                    if (!J) {
                        J = b;
                        L.clearRect(0, 0, m, k);
                        w(L, 0, 0, m, k, 5, b, h, h);
                        w(L, 0, 0, m, k, 5, h, b);
                        L.fillStyle = "#979797";
                        L.globalAlpha = 1;
                        var P = t.height / 2;
                        var K = t.width / 2;
                        L.textAlign = "center";
                        L.font = "Bold 12px Sans-Serif";
                        L.fillText(I + "     ", K, P + 4);
                        L.drawImage(s, t.width - ((t.width - L.measureText(I).width) / 2) - 4, (k - s.height) / 2);
                        if (n.isMobile()) {
                            var M = new n.touch(o);
                            M.addEventListener(n.touchEvents.TAP, C)
                        } else {
                            o.addEventListener("click", C);
                            o.addEventListener("mouseover", z);
                            o.addEventListener("mouseout", y)
                        }
                        o.style.cursor = "pointer"
                    }
                }
            }
        };

        function C() {
            if (J) {
                r.sendEvent(d.JWPLAYER_AD_SKIPPED)
            }
        }
        this.reset = function(K) {
            J = false;
            u = K;
            p(0, 0);
            H(0)
        };

        function z() {
            if (J) {
                var L = t.getContext("2d");
                L.clearRect(0, 0, m, k);
                w(L, 0, 0, m, k, 5, b, h, b);
                w(L, 0, 0, m, k, 5, h, b, b);
                L.fillStyle = "#FFFFFF";
                L.globalAlpha = 1;
                var M = t.height / 2;
                var K = t.width / 2;
                L.textAlign = "center";
                L.font = "Bold 12px Sans-Serif";
                L.fillText(I + "     ", K, M + 4);
                L.drawImage(x, t.width - ((t.width - L.measureText(I).width) / 2) - 4, (k - s.height) / 2)
            }
        }

        function y() {
            if (J) {
                var L = t.getContext("2d");
                L.clearRect(0, 0, m, k);
                w(L, 0, 0, m, k, 5, b, h, h);
                w(L, 0, 0, m, k, 5, h, b, h);
                L.fillStyle = "#979797";
                L.globalAlpha = 1;
                var M = t.height / 2;
                var K = t.width / 2;
                L.textAlign = "center";
                L.font = "Bold 12px Sans-Serif";
                L.fillText(I + "     ", K, M + 4);
                L.drawImage(s, t.width - ((t.width - L.measureText(I).width) / 2) - 4, (k - s.height) / 2)
            }
        }

        function w(S, O, N, K, P, L, Q, R, M) {
            if (typeof R == "undefined") {
                R = b
            }
            if (typeof L === "undefined") {
                L = 5
            }
            S.beginPath();
            S.moveTo(O + L, N);
            S.lineTo(O + K - L, N);
            S.quadraticCurveTo(O + K, N, O + K, N + L);
            S.lineTo(O + K, N + P - L);
            S.quadraticCurveTo(O + K, N + P, O + K - L, N + P);
            S.lineTo(O + L, N + P);
            S.quadraticCurveTo(O, N + P, O, N + P - L);
            S.lineTo(O, N + L);
            S.quadraticCurveTo(O, N, O + L, N);
            S.closePath();
            if (R) {
                S.strokeStyle = "white";
                S.globalAlpha = M ? 1 : 0.25;
                S.stroke()
            }
            if (Q) {
                S.fillStyle = "#000000";
                S.globalAlpha = 0.5;
                S.fill()
            }
        }
        B.show = function() {
            D = true;
            if (F > 0) {
                j.style(o, {
                    visibility: "visible"
                })
            }
        };
        B.hide = function() {
            D = false;
            j.style(o, {
                visibility: "hidden"
            })
        };

        function G(L, K) {
            var M = document.createElement(L);
            if (K) {
                M.className = K
            }
            return M
        }
        this.element = function() {
            return o
        };
        v()
    };
    j("." + e, {
        position: "absolute",
        "float": "right",
        display: "inline-block",
        width: m,
        height: k,
        right: 10
    });
    j("." + g, {
        position: "relative",
        display: "none"
    })
})(window.jwplayer);
(function(e) {
    var h = e.html5,
        m = e.utils,
        o = e.events,
        p = o.state,
        n = e.parsers,
        k = m.css,
        j = "playing",
        l = document,
        a = ".jwcaptions",
        b = "absolute",
        c = "none",
        i = "100%",
        f = "hidden",
        g = "normal",
        d = "#FFFFFF";
    h.captions = function(w, O) {
        var u = w,
            aa, v = {
                back: true,
                color: d,
                fontSize: 15,
                fontFamily: "Arial,sans-serif",
                fontOpacity: 100,
                backgroundColor: "#000",
                backgroundOpacity: 100,
                edgeStyle: null,
                windowColor: d,
                windowOpacity: 0
            },
            Z = {
                fontStyle: g,
                fontWeight: g,
                textDecoration: c
            },
            z, q, L, x = [],
            ab = 0,
            Q = -1,
            T = 0,
            N = false,
            K, U = new o.eventdispatcher(),
            s = m.isAndroid(4) && !m.isChrome(),
            t = this;
        m.extend(this, U);

        function Y() {
            aa = l.createElement("div");
            aa.id = u.id + "_caption";
            aa.className = "jwcaptions";
            u.jwAddEventListener(o.JWPLAYER_PLAYER_STATE, E);
            u.jwAddEventListener(o.JWPLAYER_PLAYLIST_ITEM, C);
            u.jwAddEventListener(o.JWPLAYER_MEDIA_ERROR, D);
            u.jwAddEventListener(o.JWPLAYER_ERROR, D);
            u.jwAddEventListener(o.JWPLAYER_READY, H);
            u.jwAddEventListener(o.JWPLAYER_MEDIA_TIME, P);
            u.jwAddEventListener(o.JWPLAYER_FULLSCREEN, y);
            u.jwAddEventListener(o.JWPLAYER_RESIZE, r)
        }

        function r() {
            J(false)
        }

        function D(ac) {
            m.log("CAPTIONS(" + ac + ")")
        }

        function G() {
            q = "idle";
            J(false)
        }

        function E(ac) {
            switch (ac.newstate) {
                case p.IDLE:
                    G();
                    break;
                case p.PLAYING:
                    W();
                    break
            }
        }

        function y(ac) {
            N = ac.fullscreen;
            if (ac.fullscreen) {
                X();
                setTimeout(X, 500)
            } else {
                J(true)
            }
        }

        function X() {
            var ac = aa.offsetHeight,
                ad = aa.offsetWidth;
            if (ac !== 0 && ad !== 0) {
                z.resize(ad, Math.round(ac * 0.94))
            }
        }

        function C() {
            L = 0;
            x = [];
            z.update(0);
            ab = 0;
            if (s) {
                return
            }
            var ak = u.jwGetPlaylist()[u.jwGetPlaylistIndex()],
                ah = ak.tracks,
                ag = [],
                af = 0,
                ai = "",
                ac = 0,
                ad = "",
                aj;
            for (af = 0; af < ah.length; af++) {
                var ae = ah[af].kind.toLowerCase();
                if (ae == "captions" || ae == "subtitles") {
                    ag.push(ah[af])
                }
            }
            T = 0;
            for (af = 0; af < ag.length; af++) {
                ad = ag[af].file;
                if (ad) {
                    if (!ag[af].label) {
                        ag[af].label = af.toString()
                    }
                    x.push(ag[af]);
                    V(x[af].file, af)
                }
            }
            for (af = 0; af < x.length; af++) {
                if (x[af]["default"]) {
                    ac = af + 1;
                    break
                }
            }
            aj = m.getCookies();
            ai = aj.captionLabel;
            if (ai) {
                ah = B();
                for (af = 0; af < ah.length; af++) {
                    if (ai == ah[af].label) {
                        ac = af;
                        break
                    }
                }
            }
            if (ac > 0) {
                F(ac)
            }
            J(false);
            I(o.JWPLAYER_CAPTIONS_LIST, B(), T)
        }

        function V(ad, ac) {
            m.ajax(ad, function(ae) {
                S(ae, ac)
            }, R, true)
        }

        function S(ad, ac) {
            var ah = ad.responseXML ? ad.responseXML.firstChild : null,
                ag;
            ab++;
            if (ah) {
                if (n.localName(ah) == "xml") {
                    ah = ah.nextSibling
                }
                while (ah.nodeType == ah.COMMENT_NODE) {
                    ah = ah.nextSibling
                }
            }
            if (ah && n.localName(ah) == "tt") {
                ag = new e.parsers.dfxp()
            } else {
                ag = new e.parsers.srt()
            }
            try {
                var ae = ag.parse(ad.responseText);
                if (L < x.length) {
                    x[ac].data = ae
                }
                J(false)
            } catch (af) {
                D(af.message + ": " + x[ac].file)
            }
            if (ab == x.length) {
                if (Q > 0) {
                    F(Q);
                    Q = -1
                }
                M()
            }
        }

        function R(ac) {
            ab++;
            D(ac);
            if (ab == x.length) {
                if (Q > 0) {
                    F(Q);
                    Q = -1
                }
                M()
            }
        }

        function M() {
            var ad = [];
            for (var ac = 0; ac < x.length; ac++) {
                ad.push(x[ac])
            }
            U.sendEvent(o.JWPLAYER_CAPTIONS_LOADED, {
                captionData: ad
            })
        }

        function W() {
            q = j;
            J(false)
        }

        function J(ac) {
            if (!x.length || s) {
                z.hide()
            } else {
                if (q == j && T > 0) {
                    z.show();
                    if (N) {
                        y({
                            fullscreen: true
                        });
                        return
                    }
                    A();
                    if (ac) {
                        setTimeout(A, 500)
                    }
                } else {
                    z.hide()
                }
            }
        }

        function A() {
            z.resize()
        }

        function H() {
            m.foreach(v, function(ac, ad) {
                if (O) {
                    if (O[ac] !== undefined) {
                        ad = O[ac]
                    } else {
                        if (O[ac.toLowerCase()] !== undefined) {
                            ad = O[ac.toLowerCase()]
                        }
                    }
                }
                Z[ac] = ad
            });
            z = new e.html5.captions.renderer(Z, aa);
            J(false)
        }

        function F(ac) {
            if (ac > 0) {
                L = ac - 1;
                T = ac
            } else {
                T = 0;
                J(false);
                return
            }
            if (L >= x.length) {
                return
            }
            if (x[L].data) {
                z.populate(x[L].data)
            } else {
                if (ab == x.length) {
                    D("file not loaded: " + x[L].file);
                    if (T != 0) {
                        I(o.JWPLAYER_CAPTIONS_CHANGED, x, 0)
                    }
                    T = 0
                } else {
                    Q = ac
                }
            }
            J(false)
        }

        function P(ac) {
            z.update(ac.position)
        }

        function I(af, ae, ad) {
            var ac = {
                type: af,
                tracks: ae,
                track: ad
            };
            U.sendEvent(af, ac)
        }

        function B() {
            var ad = [{
                label: "Off"
            }];
            for (var ac = 0; ac < x.length; ac++) {
                ad.push({
                    label: x[ac].label
                })
            }
            return ad
        }
        this.element = function() {
            return aa
        };
        this.getCaptionsList = function() {
            return B()
        };
        this.getCurrentCaptions = function() {
            return T
        };
        this.setCurrentCaptions = function(ad) {
            if (ad >= 0 && T != ad && ad <= x.length) {
                F(ad);
                var ac = B();
                m.saveCookie("captionLabel", ac[T].label);
                I(o.JWPLAYER_CAPTIONS_CHANGED, ac, T)
            }
        };
        Y()
    };
    k(a, {
        position: b,
        cursor: "pointer",
        width: i,
        height: i,
        overflow: f
    })
})(jwplayer);
(function(d) {
    var c = d.html5,
        b = d.utils,
        a = b.css.style;
    c.captions.renderer = function(s, i) {
        var r, h, m, q, l, n, e = "visible",
            g = -1;
        this.hide = function() {
            clearInterval(g);
            a(h, {
                display: "none"
            })
        };
        this.populate = function(t) {
            l = -1;
            r = t;
            f()
        };

        function o(t) {
            t = t || "";
            e = "hidden";
            a(h, {
                visibility: e
            });
            q.innerHTML = t;
            if (t.length) {
                e = "visible";
                setTimeout(p, 16)
            }
        }
        this.resize = function() {
            p()
        };

        function p() {
            if (e === "visible") {
                var u = h.clientWidth,
                    v = Math.pow(u / 400, 0.6);
                var t = s.fontSize * v;
                a(q, {
                    maxWidth: u + "px",
                    fontSize: Math.round(t) + "px",
                    lineHeight: Math.round(t * 1.4) + "px",
                    padding: Math.round(1 * v) + "px " + Math.round(8 * v) + "px"
                });
                if (s.windowOpacity) {
                    a(m, {
                        padding: Math.round(5 * v) + "px",
                        borderRadius: Math.round(5 * v) + "px"
                    })
                }
                a(h, {
                    visibility: e
                })
            }
        }

        function f() {
            var u = -1;
            for (var t = 0; t < r.length; t++) {
                if (r[t]["begin"] <= n && (t == r.length - 1 || r[t + 1]["begin"] >= n)) {
                    u = t;
                    break
                }
            }
            if (u == -1) {
                o("")
            } else {
                if (u != l) {
                    l = u;
                    o(r[t]["text"])
                }
            }
        }

        function j() {
            var u = s.fontOpacity,
                y = s.windowOpacity,
                x = s.edgeStyle,
                v = s.backgroundColor,
                t = {
                    display: "inline-block"
                },
                w = {
                    color: b.hexToRgba(b.rgbHex(s.color), u),
                    display: "inline-block",
                    fontFamily: s.fontFamily,
                    fontStyle: s.fontStyle,
                    fontWeight: s.fontWeight,
                    textAlign: "center",
                    textDecoration: s.textDecoration,
                    wordWrap: "break-word"
                };
            if (y) {
                t.backgroundColor = b.hexToRgba(b.rgbHex(s.windowColor), y)
            }
            k(x, w, u);
            if (s.back) {
                w.backgroundColor = b.hexToRgba(b.rgbHex(v), s.backgroundOpacity)
            } else {
                if (x === null) {
                    k("uniform", w)
                }
            }
            h = document.createElement("div");
            m = document.createElement("div");
            q = document.createElement("span");
            a(h, {
                display: "block",
                height: "auto",
                position: "absolute",
                bottom: "20px",
                textAlign: "center",
                width: "100%"
            });
            a(m, t);
            a(q, w);
            m.appendChild(q);
            h.appendChild(m);
            i.appendChild(h)
        }

        function k(w, v, u) {
            var t = b.hexToRgba("#000000", u);
            if (w === "dropshadow") {
                v.textShadow = "0 2px 1px " + t
            } else {
                if (w === "raised") {
                    v.textShadow = "0 0 5px " + t + ", 0 1px 5px " + t + ", 0 2px 5px " + t
                } else {
                    if (w === "depressed") {
                        v.textShadow = "0 -2px 1px " + t
                    } else {
                        if (w === "uniform") {
                            v.textShadow = "-2px 0 1px " + t + ",2px 0 1px " + t + ",0 -2px 1px " + t + ",0 2px 1px " + t + ",-1px 1px 1px " + t + ",1px 1px 1px " + t + ",1px -1px 1px " + t + ",1px 1px 1px " + t
                        }
                    }
                }
            }
        }
        this.show = function() {
            a(h, {
                display: "block"
            });
            p();
            clearInterval(g);
            g = setInterval(p, 250)
        };
        this.update = function(t) {
            n = t;
            if (r) {
                f()
            }
        };
        j()
    }
})(jwplayer);
(function(k) {
    var w = k.html5,
        J = k.utils,
        m = k.events,
        D = m.state,
        B = J.css,
        p = J.transitionStyle,
        d = J.isMobile(),
        c = J.isAndroid(4) && !J.isChrome(),
        H = "button",
        f = "text",
        l = "divider",
        v = "slider",
        t = "relative",
        a = "absolute",
        E = "none",
        i = "block",
        h = "inline",
        G = "inline-block",
        g = "hidden",
        s = "left",
        y = "right",
        b = "100%",
        r = "opacity .25s, background .25s, visibility .25s",
        z = 250,
        F = {
            display: E
        },
        C = {
            display: i
        },
        o = {
            display: u
        },
        A = "span.jwcontrolbar",
        x = "array",
        I = false,
        n = true,
        q = null,
        u, j = window,
        e = document;
    w.controlbar = function(aE, aP) {
        var b0, b1, bO = a2("divider", l),
            aS = {
                margin: 8,
                maxwidth: 800,
                font: "Arial,sans-serif",
                fontsize: 11,
                fontcolor: parseInt("eeeeee", 16),
                fontweight: "bold",
                layout: {
                    left: {
                        position: "left",
                        elements: [a2("play", H), a2("prev", H), a2("next", H), a2("elapsed", f)]
                    },
                    center: {
                        position: "center",
                        elements: [a2("time", v), a2("alt", f)]
                    },
                    right: {
                        position: "right",
                        elements: [a2("duration", f), a2("hd", H), a2("cc", H), a2("mute", H), a2("volume", v), a2("volumeH", v), a2("fullscreen", H)]
                    }
                }
            },
            bf, aF, aR, bL, aC, b3, bT, bc, aM, aj, bz, b4, bd, aW, av, bt, S, bA, a0, bN, aQ, Z, aJ, R, b9, a7, am, U, ad = -1,
            bb = I,
            bP = I,
            ac = q,
            bD = 0,
            b2 = 0,
            bo = [],
            L, a1 = I,
            X = new m.eventdispatcher(),
            aX = {
                play: "pause",
                mute: "unmute",
                fullscreen: "normalscreen"
            },
            bB = {
                play: I,
                mute: I,
                fullscreen: I
            },
            ap = {
                play: aK,
                mute: bm,
                fullscreen: ao,
                next: bn,
                prev: cd,
                hd: cb,
                cc: aT
            },
            ax = {
                time: aB,
                volume: bK
            },
            a4 = {},
            bu = [],
            bk = this;
        J.extend(bk, X);

        function a2(cg, ci, ch) {
            return {
                name: cg,
                type: ci,
                className: ch
            }
        }

        function al() {
            aR = {};
            b0 = aE;
            b3 = b0.id + "_controlbar";
            bT = bc = 0;
            aC = bF();
            aC.id = b3;
            aC.className = "jwcontrolbar";
            b1 = b0.skin;
            aF = b1.getComponentLayout("controlbar");
            if (!aF) {
                aF = aS.layout
            }
            J.clearCss(ag());
            B.block(b3 + "build");
            bG();
            aq();
            B.unblock(b3 + "build");
            Q();
            setTimeout(aw, 0);
            cf();
            bk.visible = false
        }

        function Q() {
            b0.jwAddEventListener(m.JWPLAYER_MEDIA_TIME, aI);
            b0.jwAddEventListener(m.JWPLAYER_PLAYER_STATE, b6);
            b0.jwAddEventListener(m.JWPLAYER_PLAYLIST_ITEM, bp);
            b0.jwAddEventListener(m.JWPLAYER_MEDIA_MUTE, aw);
            b0.jwAddEventListener(m.JWPLAYER_MEDIA_VOLUME, aw);
            b0.jwAddEventListener(m.JWPLAYER_MEDIA_BUFFER, b5);
            b0.jwAddEventListener(m.JWPLAYER_FULLSCREEN, bI);
            b0.jwAddEventListener(m.JWPLAYER_PLAYLIST_LOADED, cf);
            b0.jwAddEventListener(m.JWPLAYER_MEDIA_LEVELS, at);
            b0.jwAddEventListener(m.JWPLAYER_MEDIA_LEVEL_CHANGED, bQ);
            b0.jwAddEventListener(m.JWPLAYER_CAPTIONS_LIST, b7);
            b0.jwAddEventListener(m.JWPLAYER_CAPTIONS_CHANGED, N);
            b0.jwAddEventListener(m.JWPLAYER_RESIZE, bv);
            if (!d) {
                aC.addEventListener("mouseover", function() {
                    j.addEventListener("mousemove", bM, I);
                    j.addEventListener("mousedown", bW, I)
                }, false);
                aC.addEventListener("mouseout", function() {
                    j.removeEventListener("mousemove", bM);
                    j.removeEventListener("mousedown", bW);
                    e.onselectstart = null
                }, false)
            }
        }

        function bv() {
            av = J.bounds(aC);
            if (av.width > 0) {
                bk.show(n)
            }
        }

        function aI(cg) {
            B.block(b3);
            if (cg.duration == Number.POSITIVE_INFINITY || (!cg.duration && J.isSafari() && !d)) {
                bk.setText(b0.jwGetPlaylist()[b0.jwGetPlaylistIndex()].title || "Live broadcast")
            } else {
                var ch;
                if (aR.elapsed) {
                    ch = J.timeFormat(cg.position);
                    aR.elapsed.innerHTML = ch
                }
                if (aR.duration) {
                    ch = J.timeFormat(cg.duration);
                    aR.duration.innerHTML = ch
                }
                if (cg.duration > 0) {
                    ab(cg.position / cg.duration)
                } else {
                    ab(0)
                }
                bT = cg.duration;
                bc = cg.position;
                if (!a1) {
                    bk.setText()
                }
            }
        }

        function b6(cg) {
            switch (cg.newstate) {
                case D.BUFFERING:
                case D.PLAYING:
                    if (aR.timeSliderThumb) {
                        B.style(aR.timeSliderThumb, {
                            opacity: 1
                        })
                    }
                    aN("play", n);
                    break;
                case D.PAUSED:
                    if (!ac) {
                        aN("play", I)
                    }
                    break;
                case D.IDLE:
                    aN("play", I);
                    if (aR.timeSliderThumb) {
                        B.style(aR.timeSliderThumb, {
                            opacity: 0
                        })
                    }
                    if (aR.timeRail) {
                        aR.timeRail.className = "jwrail";
                        setTimeout(function() {
                            aR.timeRail.className += " jwsmooth"
                        }, 100)
                    }
                    aV(0);
                    aI({
                        position: 0,
                        duration: 0
                    });
                    break
            }
        }

        function bp(cg) {
            if (!a1) {
                var ci = b0.jwGetPlaylist()[cg.index].tracks,
                    ch = I,
                    ck = I;
                au();
                if (J.typeOf(ci) == x && !d) {
                    for (var cj = 0; cj < ci.length; cj++) {
                        if (!ch && ci[cj].file && ci[cj].kind && ci[cj].kind.toLowerCase() == "thumbnails") {
                            bN.load(ci[cj].file);
                            ch = n
                        }
                        if (ci[cj].file && ci[cj].kind && ci[cj].kind.toLowerCase() == "chapters") {
                            ay(ci[cj].file);
                            ck = n
                        }
                    }
                }
                if (!ch) {
                    bN.load()
                }
            }
        }

        function aw() {
            var cg = b0.jwGetMute();
            bd = b0.jwGetVolume() / 100;
            aN("mute", cg || bd === 0);
            aG(cg ? 0 : bd)
        }

        function b5(cg) {
            aV(cg.bufferPercent / 100)
        }

        function bI(cg) {
            aN("fullscreen", cg.fullscreen);
            ar();
            if (bk.visible) {
                bk.show(n)
            }
        }

        function cf() {
            B.style(aR.hd, F);
            B.style(aR.cc, F);
            ar();
            az()
        }

        function bl() {
            return (!a1 && aM && aM.length > 1 && R)
        }

        function at(cg) {
            aM = cg.levels;
            if (bl()) {
                B.style(aR.hd, o);
                R.clearOptions();
                for (var ch = 0; ch < aM.length; ch++) {
                    R.addOption(aM[ch].label, ch)
                }
                bQ(cg)
            } else {
                B.style(aR.hd, F)
            }
            az()
        }

        function bQ(cg) {
            aj = cg.currentQuality | 0;
            if (aR.hd) {
                aR.hd.querySelector("button").className = (aM.length === 2 && aj === 0) ? "off" : ""
            }
            if (R && aj >= 0) {
                R.setActive(cg.currentQuality)
            }
        }

        function cc() {
            return (!a1 && bz && bz.length > 1 && am)
        }

        function b7(cg) {
            bz = cg.tracks;
            if (cc()) {
                B.style(aR.cc, o);
                am.clearOptions();
                for (var ch = 0; ch < bz.length; ch++) {
                    am.addOption(bz[ch].label, ch)
                }
                N(cg)
            } else {
                B.style(aR.cc, F)
            }
            az()
        }

        function N(cg) {
            if (!bz) {
                return
            }
            b4 = cg.track | 0;
            if (aR.cc) {
                aR.cc.querySelector("button").className = (bz.length === 2 && b4 === 0) ? "off" : ""
            }
            if (am && b4 >= 0) {
                am.setActive(cg.track)
            }
        }

        function aD() {
            return (!!e.querySelector("#" + b0.id + " .jwplaylist") && !b0.jwGetFullscreen())
        }

        function bG() {
            bf = J.extend({}, aS, b1.getComponentSettings("controlbar"), aP);
            bL = ah("background").height;
            var ch = bb ? 0 : bf.margin;
            var cg = {
                height: bL,
                bottom: ch,
                left: ch,
                right: ch,
                "max-width": bb ? "" : bf.maxwidth
            };
            B.style(aC, cg);
            B(ag(".jwtext"), {
                font: bf.fontsize + "px/" + ah("background").height + "px " + bf.font,
                color: bf.fontcolor,
                "font-weight": bf.fontweight
            });
            B(ag(".jwoverlay"), {
                bottom: bL
            })
        }

        function ag(cg) {
            return "#" + b3 + (cg ? " " + cg : "")
        }

        function bF() {
            return bw("span")
        }

        function bw(cg) {
            return e.createElement(cg)
        }

        function aq() {
            var ci = ak("capLeft");
            var ch = ak("capRight");
            var cg = ak("background", {
                position: a,
                left: ah("capLeft").width,
                right: ah("capRight").width,
                "background-repeat": "repeat-x"
            }, n);
            if (cg) {
                bE(aC, cg)
            }
            if (ci) {
                bE(aC, ci)
            }
            ba();
            if (ch) {
                bE(aC, ch)
            }
        }

        function aL(cg, ch) {
            switch (cg.type) {
                case f:
                    return bj(cg.name);
                case H:
                    if (cg.name != "blank") {
                        return an(cg.name, ch)
                    }
                    break;
                case v:
                    return bx(cg.name)
            }
        }

        function ak(ci, ch, cj, cn, ck) {
            var cm = bF(),
                co = ah(ci),
                cg = cn ? " left center" : " center",
                cp = br(co),
                cl;
            cm.className = "jw" + ci;
            cm.innerHTML = "&nbsp;";
            if (!co || !co.src) {
                return
            }
            if (cj) {
                cl = {
                    background: "url('" + co.src + "') repeat-x " + cg,
                    "background-size": cp,
                    height: ck ? co.height : u
                }
            } else {
                cl = {
                    background: "url('" + co.src + "') no-repeat" + cg,
                    "background-size": cp,
                    width: co.width,
                    height: ck ? co.height : u
                }
            }
            cm.skin = co;
            B(ag((ck ? ".jwvertical " : "") + ".jw" + ci), J.extend(cl, ch));
            aR[ci] = cm;
            return cm
        }

        function an(ch, co) {
            if (!ah(ch + "Button").src) {
                return q
            }
            if (d && (ch == "mute" || ch.indexOf("volume") === 0)) {
                return q
            }
            if (c && /hd|cc/.test(ch)) {
                return q
            }
            var ck = bF();
            var cp = bF();
            var cj = af(bO);
            var cm = bw("button");
            ck.style += " display:inline-block";
            ck.className = "jw" + ch + " jwbuttoncontainer";
            if (co == "left") {
                bE(ck, cp);
                bE(ck, cj)
            } else {
                bE(ck, cj);
                bE(ck, cp)
            }
            if (!d) {
                cm.addEventListener("click", T(ch), I)
            } else {
                if (ch != "hd" && ch != "cc") {
                    var cg = new J.touch(cm);
                    cg.addEventListener(J.touchEvents.TAP, T(ch))
                }
            }
            cm.innerHTML = "&nbsp;";
            bE(cp, cm);
            var ci = ah(ch + "Button"),
                cn = ah(ch + "ButtonOver"),
                cq = ah(ch + "ButtonOff");
            bg(ag(".jw" + ch + " button"), ci, cn, cq);
            var cl = aX[ch];
            if (cl) {
                bg(ag(".jw" + ch + ".jwtoggle button"), ah(cl + "Button"), ah(cl + "ButtonOver"))
            }
            aR[ch] = ck;
            return ck
        }

        function bg(cg, ch, ci, cj) {
            if (!ch || !ch.src) {
                return
            }
            B(cg, {
                width: ch.width,
                background: "url(" + ch.src + ") no-repeat center",
                "background-size": br(ch)
            });
            if (ci.src && !d) {
                B(cg + ":hover," + cg + ".off:hover", {
                    background: "url(" + ci.src + ") no-repeat center",
                    "background-size": br(ci)
                })
            }
            if (cj && cj.src) {
                B(cg + ".off", {
                    background: "url(" + cj.src + ") no-repeat center",
                    "background-size": br(cj)
                })
            }
        }

        function T(cg) {
            return function(ch) {
                if (ap[cg]) {
                    ap[cg]();
                    if (d) {
                        X.sendEvent(m.JWPLAYER_USER_ACTION)
                    }
                }
                if (ch.preventDefault) {
                    ch.preventDefault()
                }
            }
        }

        function aK() {
            if (bB.play) {
                b0.jwPause()
            } else {
                b0.jwPlay()
            }
        }

        function bm() {
            var cg = !bB.mute;
            b0.jwSetMute(cg);
            if (!cg && bd === 0) {
                b0.jwSetVolume(20)
            }
            aw()
        }

        function O(cg) {
            J.foreach(a4, function(ci, ch) {
                if (ci != cg) {
                    if (ci == "cc") {
                        bY()
                    }
                    if (ci == "hd") {
                        ca()
                    }
                    ch.hide()
                }
            })
        }

        function bR() {
            if (aC) {
                var cg = aR.alt;
                if (!cg) {
                    return
                }
                if (aC.parentNode && aC.parentNode.clientWidth >= 320) {
                    B.style(bu, o)
                } else {
                    B.style(bu, F)
                }
            }
        }

        function K() {
            if (bb || a1) {
                return
            }
            B.block(b3);
            aW.show();
            aa("volume", aW);
            O("volume")
        }

        function bK(cg) {
            aG(cg);
            if (cg < 0.1) {
                cg = 0
            }
            if (cg > 0.9) {
                cg = 1
            }
            b0.jwSetVolume(cg * 100)
        }

        function aB(cg) {
            b0.jwSeek(L ? L.position : cg * bT)
        }

        function ao() {
            b0.jwSetFullscreen()
        }

        function bn() {
            b0.jwPlaylistNext()
        }

        function cd() {
            b0.jwPlaylistPrev()
        }

        function aN(cg, ch) {
            if (!J.exists(ch)) {
                ch = !bB[cg]
            }
            if (aR[cg]) {
                aR[cg].className = "jw" + cg + (ch ? " jwtoggle jwtoggling" : " jwtoggling");
                setTimeout(function() {
                    aR[cg].className = aR[cg].className.replace(" jwtoggling", "")
                }, 100)
            }
            bB[cg] = ch
        }

        function ae(cg) {
            return b3 + "_" + cg
        }

        function bj(ch) {
            var ck = {},
                cg = (ch == "alt") ? "elapsed" : ch,
                cj = ah(cg + "Background");
            if (cj.src) {
                var ci = bF();
                ci.id = ae(ch);
                if (ch == "elapsed" || ch == "duration") {
                    ci.className = "jwtext jw" + ch + " jwhidden";
                    bu.push(ci)
                } else {
                    ci.className = "jwtext jw" + ch
                }
                ck.background = "url(" + cj.src + ") repeat-x center";
                ck["background-size"] = br(ah("background"));
                B.style(ci, ck);
                ci.innerHTML = (ch != "alt") ? "00:00" : "";
                aR[ch] = ci;
                return ci
            }
            return null
        }

        function br(cg) {
            return cg ? parseInt(cg.width, 10) + "px " + parseInt(cg.height, 10) + "px" : "0 0"
        }

        function af(ch) {
            var cg = ak(ch.name);
            if (!cg) {
                cg = bF();
                cg.className = "jwblankDivider"
            }
            if (ch.className) {
                cg.className += " " + ch.className
            }
            return cg
        }

        function be() {
            if (aM && aM.length > 2) {
                if (Z) {
                    clearTimeout(Z);
                    Z = u
                }
                B.block(b3);
                R.show();
                aa("hd", R);
                O("hd")
            }
        }

        function ce() {
            if (bz && bz.length > 2) {
                if (b9) {
                    clearTimeout(b9);
                    b9 = u
                }
                B.block(b3);
                am.show();
                aa("cc", am);
                O("cc")
            }
        }

        function M(cg) {
            if (cg >= 0 && cg < aM.length) {
                b0.jwSetCurrentQuality(cg);
                ca();
                R.hide()
            }
        }

        function bi(cg) {
            if (cg >= 0 && cg < bz.length) {
                b0.jwSetCurrentCaptions(cg);
                bY();
                am.hide()
            }
        }

        function aT() {
            if (bz.length != 2) {
                return
            }
            bi((b4 + 1) % 2)
        }

        function cb() {
            if (aM.length != 2) {
                return
            }
            M((aj + 1) % 2)
        }

        function bx(cg) {
            if (d && cg.indexOf("volume") === 0) {
                return
            }
            var ci = bF(),
                cl = cg == "volume",
                cj = cg + (cg == "time" ? "Slider" : ""),
                co = cj + "Cap",
                ck = cl ? "Top" : "Left",
                cq = cl ? "Bottom" : "Right",
                cm = ak(co + ck, q, I, I, cl),
                cn = ak(co + cq, q, I, I, cl),
                ch = bH(cg, cl, ck, cq),
                cr = ah(co + ck),
                cp = ah(co + ck);
            ci.className = "jwslider jw" + cg;
            if (cm) {
                bE(ci, cm)
            }
            bE(ci, ch);
            if (cn) {
                if (cl) {
                    cn.className += " jwcapBottom"
                }
                bE(ci, cn)
            }
            B(ag(".jw" + cg + " .jwrail"), {
                left: cl ? u : cr.width,
                right: cl ? u : cp.width,
                top: cl ? cr.height : u,
                bottom: cl ? cp.height : u,
                width: cl ? b : u,
                height: cl ? "auto" : u
            });
            aR[cg] = ci;
            ci.vertical = cl;
            if (cg == "time") {
                bA = new w.overlay(b3 + "_timetooltip", b1);
                bN = new w.thumbs(b3 + "_thumb");
                aQ = bw("div");
                aQ.className = "jwoverlaytext";
                a0 = bw("div");
                bE(a0, bN.element());
                bE(a0, aQ);
                bA.setContents(a0);
                bt = ch;
                bC(0);
                bE(ch, bA.element());
                V(ci);
                ab(0);
                aV(0)
            } else {
                if (cg.indexOf("volume") === 0) {
                    a6(ci, cl, ck, cq)
                }
            }
            return ci
        }

        function bH(cz, ch, cl, cx) {
            var ci = bF(),
                cq = ["Rail", "Buffer", "Progress"],
                cm, ct;
            ci.className = "jwrail jwsmooth";
            for (var cs = 0; cs < cq.length; cs++) {
                ct = (cz == "time" ? "Slider" : "");
                var cr = cz + ct + cq[cs],
                    ck = ak(cr, q, !ch, (cz.indexOf("volume") === 0), ch),
                    cn = ak(cr + "Cap" + cl, q, I, I, ch),
                    co = ak(cr + "Cap" + cx, q, I, I, ch),
                    cj = ah(cr + "Cap" + cl),
                    cg = ah(cr + "Cap" + cx);
                if (ck) {
                    var cp = bF();
                    cp.className = "jwrailgroup " + cq[cs];
                    if (cn) {
                        bE(cp, cn)
                    }
                    bE(cp, ck);
                    if (co) {
                        bE(cp, co);
                        co.className += " jwcap" + (ch ? "Bottom" : "Right")
                    }
                    B(ag(".jwrailgroup." + cq[cs]), {
                        "min-width": (ch ? u : cj.width + cg.width)
                    });
                    cp.capSize = ch ? cj.height + cg.height : cj.width + cg.width;
                    B(ag("." + ck.className), {
                        left: ch ? u : cj.width,
                        right: ch ? u : cg.width,
                        top: ch ? cj.height : u,
                        bottom: ch ? cg.height : u,
                        height: ch ? "auto" : u
                    });
                    if (cs == 2) {
                        cm = cp
                    }
                    if (cs == 2 && !ch) {
                        var cy = bF();
                        cy.className = "jwprogressOverflow";
                        bE(cy, cp);
                        aR[cr] = cy;
                        bE(ci, cy)
                    } else {
                        aR[cr] = cp;
                        bE(ci, cp)
                    }
                }
            }
            var cv = ak(cz + ct + "Thumb", q, I, I, ch);
            if (cv) {
                B(ag("." + cv.className), {
                    opacity: cz == "time" ? 0 : 1,
                    "margin-top": ch ? cv.skin.height / -2 : u
                });
                cv.className += " jwthumb";
                bE(ch && cm ? cm : ci, cv)
            }
            if (!d) {
                var cw = cz;
                if (cw == "volume" && !ch) {
                    cw += "H"
                }
                ci.addEventListener("mousedown", bX(cw), I)
            } else {
                var cu = new J.touch(ci);
                cu.addEventListener(J.touchEvents.DRAG_START, ai);
                cu.addEventListener(J.touchEvents.DRAG, bU);
                cu.addEventListener(J.touchEvents.DRAG_END, bU);
                cu.addEventListener(J.touchEvents.TAP, aA)
            }
            if (cz == "time" && !d) {
                ci.addEventListener("mousemove", bV, I);
                ci.addEventListener("mouseout", Y, I)
            }
            aR[cz + "Rail"] = ci;
            return ci
        }

        function P() {
            var cg = b0.jwGetState();
            return (cg == D.IDLE)
        }

        function bW(cg) {
            cg.preventDefault();
            e.onselectstart = function() {
                return I
            }
        }

        function aH(cg) {
            W();
            ac = cg;
            j.addEventListener("mouseup", bM, I)
        }

        function W() {
            j.removeEventListener("mouseup", bM);
            ac = q
        }

        function ai() {
            aR.timeRail.className = "jwrail";
            if (!P()) {
                b0.jwSeekDrag(n);
                aH("time");
                bV();
                X.sendEvent(m.JWPLAYER_USER_ACTION)
            }
        }

        function bU(cg) {
            if (!ac) {
                return
            }
            var ch = (new Date()).getTime();
            if (ch - b2 > 50) {
                a9(cg);
                b2 = ch
            }
            var cj = aR[ac].querySelector(".jwrail"),
                ck = J.bounds(cj),
                ci = cg.x / ck.width;
            if (ci > 100) {
                ci = 100
            }
            if (cg.type == J.touchEvents.DRAG_END) {
                b0.jwSeekDrag(I);
                aR.timeRail.className = "jwrail jwsmooth";
                W();
                ax.time(ci);
                Y();
                X.sendEvent(m.JWPLAYER_USER_ACTION)
            } else {
                ab(ci);
                if (ch - bD > 500) {
                    bD = ch;
                    ax.time(ci)
                }
                X.sendEvent(m.JWPLAYER_USER_ACTION)
            }
        }

        function aA(cg) {
            var ci = aR.time.querySelector(".jwrail"),
                cj = J.bounds(ci),
                ch = cg.x / cj.width;
            if (ch > 100) {
                ch = 100
            }
            if (!P()) {
                ax.time(ch);
                X.sendEvent(m.JWPLAYER_USER_ACTION)
            }
        }

        function bX(cg) {
            return (function(ch) {
                if (ch.button) {
                    return
                }
                aR[cg + "Rail"].className = "jwrail";
                if (cg == "time") {
                    if (!P()) {
                        b0.jwSeekDrag(n);
                        aH(cg)
                    }
                } else {
                    aH(cg)
                }
            })
        }

        function bM(cg) {
            var ci = (new Date()).getTime();
            if (ci - b2 > 50) {
                a9(cg);
                b2 = ci
            }
            if (!ac || cg.button) {
                return
            }
            var ck = aR[ac].querySelector(".jwrail"),
                cl = J.bounds(ck),
                ch = ac,
                cj = aR[ch].vertical ? (cl.bottom - cg.pageY) / cl.height : (cg.pageX - cl.left) / cl.width;
            if (cg.type == "mouseup") {
                if (ch == "time") {
                    b0.jwSeekDrag(I)
                }
                aR[ch + "Rail"].className = "jwrail jwsmooth";
                W();
                ax[ch.replace("H", "")](cj)
            } else {
                if (ac == "time") {
                    ab(cj)
                } else {
                    aG(cj)
                }
                if (ci - bD > 500) {
                    bD = ci;
                    ax[ac.replace("H", "")](cj)
                }
            }
            return false
        }

        function bV() {
            if (bA && bT && !bb && !d) {
                B.block(b3);
                bA.show();
                aa("time", bA)
            }
        }

        function Y() {
            if (bA) {
                bA.hide()
            }
        }

        function a9(ch) {
            av = J.bounds(aC);
            S = J.bounds(bt);
            if (!S || S.width === 0) {
                return
            }
            var cg = ch.x;
            if (ch.pageX) {
                cg = ch.pageX - S.left
            }
            if (cg >= 0 && cg <= S.width) {
                bA.positionX(Math.round(cg));
                bC(bT * cg / S.width)
            }
        }

        function bC(cg) {
            var ci = bN.updateTimeline(cg, function(cj) {
                B.style(bA.element(), {
                    width: cj
                });
                aa("time", bA)
            });
            var ch;
            if (L) {
                ch = L.text;
                if (ch) {
                    B.style(bA.element(), {
                        width: (ch.length > 32) ? 160 : ""
                    })
                }
            } else {
                ch = J.timeFormat(cg);
                if (!ci) {
                    B.style(bA.element(), {
                        width: ""
                    })
                }
            }
            if (aQ.innerHTML !== ch) {
                aQ.innerHTML = ch
            }
            aa("time", bA)
        }

        function V() {
            if (!aR.timeSliderRail) {
                B.style(aR.time, F)
            }
            if (aR.timeSliderThumb) {
                B.style(aR.timeSliderThumb, {
                    "margin-left": (ah("timeSliderThumb").width / -2)
                })
            }
            var ci = "timeSliderCue",
                cg = ah(ci),
                ch = {
                    "z-index": 1
                };
            if (cg && cg.src) {
                ak(ci);
                ch["margin-left"] = cg.width / -2
            } else {
                ch.display = E
            }
            B(ag(".jw" + ci), ch);
            aV(0);
            ab(0)
        }

        function a5(ck, cj) {
            if (ck.toString().search(/^[\d\.]+%?$/) >= 0) {
                var ch = ak("timeSliderCue"),
                    ci = aR.timeSliderRail,
                    cg = {
                        position: ck,
                        text: cj,
                        element: ch
                    };
                if (ch && ci) {
                    ci.appendChild(ch);
                    ch.addEventListener("mouseover", function() {
                        L = cg
                    }, false);
                    ch.addEventListener("mouseout", function() {
                        L = q
                    }, false);
                    bo.push(cg)
                }
            }
            aZ()
        }

        function aZ() {
            J.foreach(bo, function(ch, cg) {
                var ci = {};
                if (cg.position.toString().search(/^[\d\.]+%$/) > -1) {
                    ci.left = cg.position
                } else {
                    ci.left = (100 * cg.position / bT).toFixed(2) + "%"
                }
                B.style(cg.element, ci)
            })
        }

        function au() {
            var cg = aR.timeSliderRail;
            J.foreach(bo, function(ci, ch) {
                cg.removeChild(ch.element)
            });
            bo.length = 0
        }
        bk.setText = function(ci) {
            B.block(b3);
            var cg = aR.alt,
                ch = aR.time;
            if (!aR.timeSliderRail) {
                B.style(ch, F)
            } else {
                B.style(ch, ci ? F : C)
            }
            if (cg) {
                B.style(cg, ci ? C : F);
                cg.innerHTML = ci || ""
            }
            az()
        };

        function a6(ci, cg, cl, ch) {
            var cj = "volume" + (cg ? "" : "H"),
                ck = cg ? "vertical" : "horizontal";
            B(ag(".jw" + cj + ".jw" + ck), {
                width: ah(cj + "Rail", cg).width + (cg ? 0 : (ah(cj + "Cap" + cl).width + ah(cj + "RailCap" + cl).width + ah(cj + "RailCap" + ch).width + ah(cj + "Cap" + ch).width)),
                height: cg ? (ah(cj + "Cap" + cl).height + ah(cj + "Rail").height + ah(cj + "RailCap" + cl).height + ah(cj + "RailCap" + ch).height + ah(cj + "Cap" + ch).height) : u
            });
            ci.className += " jw" + ck
        }
        var aY = {};

        function ba() {
            a8("left");
            a8("center");
            a8("right");
            bE(aC, aY.left);
            bE(aC, aY.center);
            bE(aC, aY.right);
            a3();
            B.style(aY.right, {
                right: ah("capRight").width
            })
        }

        function a3() {
            if (aR.hd) {
                R = new w.menu("hd", b3 + "_hd", b1, M);
                if (!d) {
                    aU(R, aR.hd, be, bS)
                } else {
                    bJ(R, aR.hd, be, "hd")
                }
                a4.hd = R
            }
            if (aR.cc) {
                am = new w.menu("cc", b3 + "_cc", b1, bi);
                if (!d) {
                    aU(am, aR.cc, ce, bq)
                } else {
                    bJ(am, aR.cc, ce, "cc")
                }
                a4.cc = am
            }
            if (aR.mute && aR.volume && aR.volume.vertical) {
                aW = new w.overlay(b3 + "_volumeoverlay", b1);
                aW.setContents(aR.volume);
                aU(aW, aR.mute, K);
                a4.volume = aW
            }
        }

        function bq() {
            b9 = setTimeout(am.hide, 500)
        }

        function bS() {
            Z = setTimeout(R.hide, 500)
        }

        function aU(cg, ci, cj, ck) {
            if (d) {
                return
            }
            var ch = cg.element();
            bE(ci, ch);
            ci.addEventListener("mousemove", cj, I);
            if (ck) {
                ci.addEventListener("mouseout", ck, I)
            } else {
                ci.addEventListener("mouseout", cg.hide, I)
            }
            B.style(ch, {
                left: "50%"
            })
        }

        function bJ(ch, ck, cl, cg) {
            if (!d) {
                return
            }
            var cj = ch.element();
            bE(ck, cj);
            var ci = new J.touch(ck);
            ci.addEventListener(J.touchEvents.TAP, function() {
                b8(ch, cl, cg)
            })
        }

        function b8(ch, ci, cg) {
            if (cg == "cc") {
                if (bz.length == 2) {
                    ci = aT
                }
                if (a7) {
                    bY();
                    ch.hide()
                } else {
                    a7 = setTimeout(function() {
                        ch.hide();
                        a7 = u
                    }, 4000);
                    ci()
                }
                X.sendEvent(m.JWPLAYER_USER_ACTION)
            } else {
                if (cg == "hd") {
                    if (aM.length == 2) {
                        ci = cb
                    }
                    if (aJ) {
                        ca();
                        ch.hide()
                    } else {
                        aJ = setTimeout(function() {
                            ch.hide();
                            aJ = u
                        }, 4000);
                        ci()
                    }
                    X.sendEvent(m.JWPLAYER_USER_ACTION)
                }
            }
        }

        function a8(ch) {
            var cg = bF();
            cg.className = "jwgroup jw" + ch;
            aY[ch] = cg;
            if (aF[ch]) {
                aO(aF[ch], aY[ch], ch)
            }
        }

        function aO(cj, cg, ck) {
            if (cj && cj.elements.length > 0) {
                for (var ci = 0; ci < cj.elements.length; ci++) {
                    var ch = aL(cj.elements[ci], ck);
                    if (ch) {
                        if (cj.elements[ci].name == "volume" && ch.vertical) {
                            aW = new w.overlay(b3 + "_volumeOverlay", b1);
                            aW.setContents(ch)
                        } else {
                            bE(cg, ch)
                        }
                    }
                }
            }
        }

        function az() {
            clearTimeout(U);
            U = setTimeout(bk.redraw, 0)
        }
        bk.redraw = function(ch) {
            B.block(b3);
            if (ch && bk.visible) {
                bk.show(n)
            }
            bG();
            var ck = (top !== window.self) && J.isMSIE();
            B.style(aR.fullscreen, {
                display: (bb || bP || ck) ? E : ""
            });
            B(ag(".jwvolumeH"), {
                display: bb || a1 ? i : E
            });
            B(ag(".jwmute .jwoverlay"), {
                display: !(bb || a1) ? i : E
            });
            B.style(aR.hd, {
                display: !bb && bl() ? "" : E
            });
            B.style(aR.cc, {
                display: !bb && cc() ? "" : E
            });
            aZ();
            B.unblock(b3);
            if (bk.visible) {
                var cj = ah("capLeft"),
                    ci = ah("capRight"),
                    cg = {
                        left: Math.round(J.parseDimension(aY.left.offsetWidth) + cj.width),
                        right: Math.round(J.parseDimension(aY.right.offsetWidth) + ci.width)
                    };
                B.style(aY.center, cg)
            }
        };

        function ar() {
            if (b0.jwGetPlaylist().length > 1 && !aD()) {
                B.style(aR.next, o);
                B.style(aR.prev, o)
            } else {
                B.style(aR.next, F);
                B.style(aR.prev, F)
            }
        }

        function aa(ci, ch) {
            if (!av) {
                av = J.bounds(aC)
            }
            var cg = true;
            ch.constrainX(av, cg)
        }
        bk.audioMode = function(cg) {
            if (cg != bb) {
                bb = cg;
                az()
            }
        };
        bk.instreamMode = function(cg) {
            if (cg != a1) {
                a1 = cg
            }
        };
        bk.hideFullscreen = function(cg) {
            if (cg != bP) {
                bP = cg;
                az()
            }
        };
        bk.element = function() {
            return aC
        };
        bk.margin = function() {
            return parseInt(bf.margin, 10)
        };
        bk.height = function() {
            return bL
        };

        function aV(cg) {
            if (aR.timeSliderBuffer) {
                cg = Math.min(Math.max(0, cg), 1);
                B.style(aR.timeSliderBuffer, {
                    width: (cg * 100).toFixed(1) + "%",
                    opacity: cg > 0 ? 1 : 0
                })
            }
        }

        function bZ(cj, cn) {
            if (!aR[cj]) {
                return
            }
            var ch = aR[cj].vertical,
                cm = cj + (cj === "time" ? "Slider" : ""),
                ck = 100 * Math.min(Math.max(0, cn), 1) + "%",
                ci = aR[cm + "Progress"],
                cg = aR[cm + "Thumb"],
                cl;
            if (ci) {
                cl = {};
                if (ch) {
                    cl.height = ck;
                    cl.bottom = 0
                } else {
                    cl.width = ck
                }
                if (cj !== "volume") {
                    cl.opacity = (cn > 0 || ac) ? 1 : 0
                }
                B.style(ci, cl)
            }
            if (cg) {
                cl = {};
                if (ch) {
                    cl.top = 0
                } else {
                    cl.left = ck
                }
                B.style(cg, cl)
            }
        }

        function aG(cg) {
            bZ("volume", cg);
            bZ("volumeH", cg)
        }

        function ab(cg) {
            bZ("time", cg)
        }

        function ah(ch) {
            var cg = "controlbar",
                cj, ci = ch;
            if (ch.indexOf("volume") === 0) {
                if (ch.indexOf("volumeH") === 0) {
                    ci = ch.replace("volumeH", "volume")
                } else {
                    cg = "tooltip"
                }
            }
            cj = b1.getSkinElement(cg, ci);
            if (cj) {
                return cj
            } else {
                return {
                    width: 0,
                    height: 0,
                    src: "",
                    image: u,
                    ready: I
                }
            }
        }

        function bE(cg, ch) {
            cg.appendChild(ch)
        }
        bk.show = function(cg) {
            if (bk.visible && !cg) {
                return
            }
            bk.visible = true;
            var ch = {
                display: G
            };
            var ci = bf.maxwidth | 0;
            if (!bb && ci) {
                if (aC.parentNode && J.isIETrident()) {
                    if (aC.parentNode.clientWidth > ci + (bf.margin | 0 * 2)) {
                        ch.width = ci
                    } else {
                        ch.width = ""
                    }
                }
            }
            B.style(aC, ch);
            av = J.bounds(aC);
            bR();
            B.block(b3);
            aw();
            az();
            by();
            ad = setTimeout(function() {
                B.style(aC, {
                    opacity: 1
                })
            }, 0)
        };
        bk.showTemp = function() {
            if (!this.visible) {
                aC.style.opacity = 0;
                aC.style.display = G
            }
        };
        bk.hideTemp = function() {
            if (!this.visible) {
                aC.style.display = E
            }
        };

        function by() {
            clearTimeout(ad);
            ad = -1
        }

        function bY() {
            clearTimeout(a7);
            a7 = u
        }

        function ca() {
            clearTimeout(aJ);
            aJ = u
        }

        function ay(cg) {
            if (cg) {
                J.ajax(cg, bh, bs, n)
            } else {
                bo.length = 0
            }
        }

        function bh(cg) {
            var ch = new k.parsers.srt().parse(cg.responseText, true);
            if (J.typeOf(ch) !== x) {
                return bs("Invalid data")
            }
            bk.addCues(ch)
        }
        bk.addCues = function(cg) {
            J.foreach(cg, function(ch, ci) {
                if (ci.text) {
                    a5(ci.begin, ci.text)
                }
            })
        };

        function bs(cg) {
            J.log("Cues failed to load: " + cg)
        }
        bk.hide = function() {
            if (!bk.visible) {
                return
            }
            bk.visible = false;
            B.style(aC, {
                opacity: 0
            });
            by();
            ad = setTimeout(function() {
                B.style(aC, {
                    display: E
                })
            }, z)
        };
        al()
    };
    B(A, {
        position: a,
        margin: "auto",
        opacity: 0,
        display: E
    });
    B(A + " span", {
        height: b
    });
    J.dragStyle(A + " span", E);
    B(A + " .jwgroup", {
        display: h
    });
    B(A + " span, " + A + " .jwgroup button," + A + " .jwleft", {
        position: t,
        "float": s
    });
    B(A + " .jwright", {
        position: t,
        "float": y
    });
    B(A + " .jwcenter", {
        position: a
    });
    B(A + " buttoncontainer," + A + " button", {
        display: G,
        height: b,
        border: E,
        cursor: "pointer"
    });
    B(A + " .jwcapRight," + A + " .jwtimeSliderCapRight," + A + " .jwvolumeCapRight", {
        right: 0,
        position: a
    });
    B(A + " .jwcapBottom", {
        bottom: 0,
        position: a
    });
    B(A + " .jwtime", {
        position: a,
        height: b,
        width: b,
        left: 0
    });
    B(A + " .jwthumb", {
        position: a,
        height: b,
        cursor: "pointer"
    });
    B(A + " .jwrail", {
        position: a,
        cursor: "pointer"
    });
    B(A + " .jwrailgroup", {
        position: a,
        width: b
    });
    B(A + " .jwrailgroup span", {
        position: a
    });
    B(A + " .jwdivider+.jwdivider", {
        display: E
    });
    B(A + " .jwtext", {
        padding: "0 5px",
        "text-align": "center"
    });
    B(A + " .jwalt", {
        display: E,
        overflow: "hidden"
    });
    B(A + " .jwalt", {
        position: a,
        left: 0,
        right: 0,
        "text-align": "left"
    }, n);
    B(A + " .jwoverlaytext", {
        padding: 3,
        "text-align": "center"
    });
    B(A + " .jwvertical *", {
        display: i
    });
    B(A + " .jwvertical .jwvolumeProgress", {
        height: "auto"
    }, n);
    B(A + " .jwprogressOverflow", {
        position: a,
        overflow: g
    });
    p(A, r);
    p(A + " button", r);
    p(A + " .jwtime .jwsmooth span", r + ", width .25s linear, left .05s linear");
    p(A + " .jwtoggling", E)
})(window.jwplayer);
(function(d) {
    var c = d.html5,
        a = d.utils,
        f = d.events,
        b = f.state,
        h = d.playlist,
        e = true,
        g = false;
    c.controller = function(l, m) {
        var q = l,
            n = m,
            L = new f.eventdispatcher(q.id, q.config.debug),
            v = g,
            r = -1,
            D, M, Q = g,
            j, B = [];
        a.extend(this, L);

        function R() {
            q.addEventListener(f.JWPLAYER_MEDIA_BUFFER_FULL, u);
            q.addEventListener(f.JWPLAYER_MEDIA_COMPLETE, function() {
                setTimeout(G, 25)
            });
            q.addEventListener(f.JWPLAYER_MEDIA_ERROR, function(W) {
                var V = a.extend({}, W);
                V.type = f.JWPLAYER_ERROR;
                L.sendEvent(V.type, V)
            })
        }

        function t() {
            return l.getVideo()
        }

        function w(V) {
            if (!v) {
                n.completeSetup();
                L.sendEvent(V.type, V);
                if (d.utils.exists(window.jwplayer.playerReady)) {
                    d.playerReady(V)
                }
                q.addGlobalListener(s);
                n.addGlobalListener(s);
                L.sendEvent(d.events.JWPLAYER_PLAYLIST_LOADED, {
                    playlist: d(q.id).getPlaylist()
                });
                L.sendEvent(d.events.JWPLAYER_PLAYLIST_ITEM, {
                    index: q.item
                });
                O();
                if (q.autostart && !a.isMobile()) {
                    H()
                }
                v = e;
                while (B.length > 0) {
                    var W = B.shift();
                    F(W.method, W.arguments)
                }
            }
        }

        function s(V) {
            L.sendEvent(V.type, V)
        }

        function u() {
            t().play()
        }

        function O(V) {
            A(e);
            switch (a.typeOf(V)) {
                case "string":
                    T(V);
                    break;
                case "object":
                case "array":
                    q.setPlaylist(new d.playlist(V));
                    break;
                case "number":
                    q.setItem(V);
                    break
            }
        }

        function T(W) {
            var V = new h.loader();
            V.addEventListener(f.JWPLAYER_PLAYLIST_LOADED, function(X) {
                O(X.playlist)
            });
            V.addEventListener(f.JWPLAYER_ERROR, function(X) {
                O([]);
                X.message = "Could not load playlist: " + X.message;
                s(X)
            });
            V.load(W)
        }

        function H(W) {
            if (!a.exists(W)) {
                W = e
            }
            if (!W) {
                return k()
            }
            try {
                if (r >= 0) {
                    O(r);
                    r = -1
                }
                if (!D) {
                    D = e;
                    L.sendEvent(f.JWPLAYER_MEDIA_BEFOREPLAY);
                    D = g;
                    if (j) {
                        j = g;
                        M = null;
                        return
                    }
                }
                if (i()) {
                    if (q.playlist.length === 0) {
                        return g
                    }
                    t().load(q.playlist[q.item])
                } else {
                    if (q.state == b.PAUSED) {
                        t().play()
                    }
                }
                return e
            } catch (V) {
                L.sendEvent(f.JWPLAYER_ERROR, V);
                M = null
            }
            return g
        }

        function A(V) {
            M = null;
            try {
                if (!i()) {
                    t().stop()
                } else {
                    if (!V) {
                        Q = e
                    }
                }
                if (D) {
                    j = e
                }
                return e
            } catch (W) {
                L.sendEvent(f.JWPLAYER_ERROR, W)
            }
            return g
        }

        function k(W) {
            M = null;
            if (!a.exists(W)) {
                W = e
            }
            if (!W) {
                return H()
            }
            try {
                switch (q.state) {
                    case b.PLAYING:
                    case b.BUFFERING:
                        t().pause();
                        break;
                    default:
                        if (D) {
                            j = e
                        }
                }
                return e
            } catch (V) {
                L.sendEvent(f.JWPLAYER_ERROR, V)
            }
            return g
        }

        function i() {
            return (q.state == b.IDLE)
        }

        function C(V) {
            if (q.state != b.PLAYING) {
                H(e)
            }
            t().seek(V)
        }

        function y(V) {
            n.fullscreen(V)
        }

        function I(V) {
            a.css.block(q.id + "_next");
            O(V);
            H();
            a.css.unblock(q.id + "_next")
        }

        function J() {
            I(q.item - 1)
        }

        function o() {
            I(q.item + 1)
        }

        function G() {
            if (!i()) {
                return
            } else {
                if (Q) {
                    Q = g;
                    return
                }
            }
            M = G;
            if (q.repeat) {
                o()
            } else {
                if (q.item == q.playlist.length - 1) {
                    r = 0;
                    A(e);
                    setTimeout(function() {
                        L.sendEvent(f.JWPLAYER_PLAYLIST_COMPLETE)
                    }, 0)
                } else {
                    o()
                }
            }
        }

        function z(V) {
            t().setCurrentQuality(V)
        }

        function S() {
            if (t()) {
                return t().getCurrentQuality()
            } else {
                return -1
            }
        }

        function P() {
            if (t()) {
                return t().getQualityLevels()
            } else {
                return null
            }
        }

        function U(V) {
            n.setCurrentCaptions(V)
        }

        function K() {
            return n.getCurrentCaptions()
        }

        function E() {
            return n.getCaptionsList()
        }

        function x() {
            try {
                return q.getVideo().detachMedia()
            } catch (V) {
                return null
            }
        }

        function p(W) {
            try {
                q.getVideo().attachMedia(W);
                if (typeof M == "function") {
                    M()
                }
            } catch (V) {
                return null
            }
        }

        function N(V) {
            return function() {
                if (v) {
                    F(V, arguments)
                } else {
                    B.push({
                        method: V,
                        arguments: arguments
                    })
                }
            }
        }

        function F(Y, W) {
            var V = [],
                X;
            for (X = 0; X < W.length; X++) {
                V.push(W[X])
            }
            Y.apply(this, V)
        }
        this.play = N(H);
        this.pause = N(k);
        this.seek = N(C);
        this.stop = function() {
            Q = e;
            N(A)()
        };
        this.load = N(O);
        this.next = N(o);
        this.prev = N(J);
        this.item = N(I);
        this.setVolume = N(q.setVolume);
        this.setMute = N(q.setMute);
        this.setFullscreen = N(y);
        this.detachMedia = x;
        this.attachMedia = p;
        this.setCurrentQuality = N(z);
        this.getCurrentQuality = S;
        this.getQualityLevels = P;
        this.setCurrentCaptions = N(U);
        this.getCurrentCaptions = K;
        this.getCaptionsList = E;
        this.checkBeforePlay = function() {
            return D
        };
        this.playerReady = w;
        R()
    }
})(jwplayer);
(function(a) {
    a.html5.defaultskin = function() {
        this.text = '<?xml version="1.0" ?><skin author="JW Player" name="Six" target="6.7" version="3.0"><components><component name="controlbar"><settings><setting name="margin" value="10"/><setting name="maxwidth" value="800"/><setting name="fontsize" value="11"/><setting name="fontweight" value="normal"/><setting name="fontcase" value="normal"/><setting name="fontcolor" value="0xd2d2d2"/></settings><elements><element name="background" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAeCAYAAADtlXTHAAAAN0lEQVR42mMQFRW/x2RiYqLI9O3bNwam////MzAxAAESARQCsf6jcmFiOLkIoxAGEGIBmSAHAQBWYyX2FoQvwgAAAABJRU5ErkJggg=="/><element name="capLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAeCAYAAAARgF8NAAAAtElEQVR42tWRQQrCMBBFvzDJRltcmDTURYO3kHoK71K8hGfxFh7DnS2atXSRpozbViwVRNS3frw/MMTM0NpYADsAOYAZOpDWZgXgEMfxwlqrpJSyJwAooihSWZalbduirms8CnmSJCqEgGcQgJkQQmAAwgivCcyjBf78xLs3/MUEM3/9WT9QuDVNE4gEDQlH564mTZdqSNh779dVVU6U0nMi6pXIuctJa7P13hdled4AmHaFO61WQkab+AHPAAAAAElFTkSuQmCC"/><element name="capRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAeCAYAAAARgF8NAAAAtklEQVR42tWTMQrCUBBE35evhX2UYJGTeACx8y4eQvRW6jWSVBJ/BCXEFMmStRISNKQSdWCrnZ0ZdlnjedOQNnLgCGycS2KzWCy12S3LsozjOM2y7AKsbFEUrXFjzCgIglkUReR5vh6oKs2q6xoRwff9CTAf0AFr7RAYdxKe6CVY1R4C6Ict+hX6MvyHhap++1g/rSBSCVB0KpzPyRXYv2xSRCRN3a2qqhOwM2+e9w4cgK1zSfgA16hp3sNEmiwAAAAASUVORK5CYII="/><element name="playButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAeCAYAAAA2Lt7lAAABIklEQVR42u3VoWqFUBjAcWFpaWn11qULew8RmQg+wnwAH0NBQYPFcosXdooYTH7FZhIEDQoaDIJJVDQ5bTeIHO8UFjzwR9sPPcdPYhxH4siIEziB/YFpvU69T71NvRAbFw5wybLsJgjC93T/sRXCAa5VVcEwDBCG4c9WCAf4zPMc5sqyhL7vN0FYQJIk8FhRFNB1HRaEBURRBEvNT9W27SqEBQRBAGulaQpN0yxCWIDv+4BTHMdQ1/V8vWua9jUfcSzA8zzYkm3bd0mSGGzAdV3AyTAMxHEcv/kVOY4Da+m6jliW5Z/eZMuyYClVVRHDMPyfjylCCB6TZRnRNM3v9aFdTdOEOVEUEUVR/N6j4qIoyo0kSf6oYXfsuD5/mSfw/4BfzM60PxpdNhsAAAAASUVORK5CYII="/><element name="playButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAeCAYAAAA2Lt7lAAABIklEQVR42u3VoWqFUBjAccPi4uIe4D7A4g3rIoIIvsRd8ymmgoIGi9liEYPJZDMJgm4o6MCJYBIVTd+03SByzqaw4IE/2n7oOX4SAEAcGXECJ7A/MK/Huee5p7kHAnOhAJc8zz94nn+f719wIRTg2jQNTNMEURR940IowGtRFLBU1zWM44gFIQFpmsJ9ZVnCMAxIEBIQxzGstTxV3/ebEBIQhiFslWUZdF23CiEBQRAASkmSQNu2y7XQNO22HHEkwPd9wMlxnC9Jkt6QAc/zACXDMCqO4wTsV+S6Lmyl63rFsqzw6022bRvWUlW1YhhG+PMxtSwL7pNluaJpWtjrQ7uapglLoihWFEUJe4+Ki6IonyRJCkcNu2PH9fnLPIH/B/wA5fzQF959z6UAAAAASUVORK5CYII="/><element name="pauseButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAeCAYAAAA2Lt7lAAAAmUlEQVR42u2WTQoCMQxGX8RlDzAX9FRezXXxAN30B+KmIDilmQHLKNNsCt8jPAg0RFSVkXVhcE3BCQTXVigiDlgAV6MAPOtLzVdcVcMmAbCo6v1DegMeG7kpcN77VbaDmwJKKd3ZWtwU5Jy7jRY/XpBS6jZa/HhBjLHbaPETjGi44O//QWisgrCDv5dg66r45rqWebZMwe8LXlPydRVUwjqdAAAAAElFTkSuQmCC"/><element name="pauseButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAeCAYAAAA2Lt7lAAAAn0lEQVR42u2VSwrFIAxFr9AFuIRuoftxz+0SOnLs1A/cN3H0WhILlVJqJkIO4ZCIcSKJnjGhcwzBVwXGGAtgBmBrKgDY64maP3CSobWDmeT6J10AbI1cFVjv/SF3get3UEoRZ6txVZBzFgs1/rwgpSQWavx5QYxRLNT4B0bUXfD6dxBOVkG4wFXB7pxbTtZ1K5cFda9vQucaH3/yENwYP2sBdLsTPIMJAAAAAElFTkSuQmCC"/><element name="prevButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAeCAYAAAAhDE4sAAAA6UlEQVR42mP4//8/AzUww6hBowYNaoOAgAeIJaA0OmAGYn4gFgViTkIGqQDp/SAaiwHqJSUl6Q8ePFgMZMsRMsjg0aNHIIMM0A24cuXKmh8/fux/+fIlSF6XoEG3bt0CKbRHNuDbt2/7Hz9+vB8kB5U3IGjQ+fPn96enp5feuHFj5efPn/ffvn17P0gMGRNl0JEjR/YnJSWVbdmyZSWIjQ0TZdCuXbvgXgsNDc2YPXv2WpAYMibKoPXr12MEdkBAQMbEiRPXguSg8gQDW2X58uU4o9/X1zdj8uTJREU/dRLkaO4fNWhYGAQACIKTdMKw1gUAAAAASUVORK5CYII="/><element name="prevButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAeCAYAAAAhDE4sAAAA6UlEQVR42mP4//8/AzUww6hBowYNaoOAQACIFaA0OmABYhEglgFiHkIGGfyHMAywGGBSUlLS9eDBg5tAtgYhgxwePXoEYjigG3DlypVnP378+P/y5UuQvA1Bg27dugVihCAb8O3bt/+PHz/+D5KDyjsQNOj8+fP/09PT59y4cePh58+f/9++ffs/SAwZE2XQkSNH/iclJc3dsmXLIxAbGybKoF27dsG9Fhoa2j179uznIDFkTJRB69evxwjsgICA7okTJz4HyUHlCQa2wfLly3FGv6+vb/fkyZNvERP91EmQo7l/1KBhYRAAuDSgTOE1ffsAAAAASUVORK5CYII="/><element name="nextButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAeCAYAAADKO/UvAAAA6klEQVR42mP4//8/A6WYYdSQUUMGxBAg4ARiUSDmB2JmBkzAA8QSIBqfIXIPHjxYXFJSkg5kq2MxTAWobj+UxmmI7suXL/f/+PFj/5UrV9ZgMczg0aNHIEMM8BlicOvWrf0g/Pjx4/3fvn1DN8weJEfQkPPnz+9Hxrdv397/+fPn/Tdu3FiZnp5eChIjaMiRI0f2Y8NbtmxZmZSUVAZiEzRk165d+5Hx7Nmz14aGhmbAvAMSI2SI7vr16/eD8MSJE9cGBARkoAcsSI6QIXKTJ09e7Ovrm4EripcvX04wiilPbKO5eNSQQW8IAG8yOc7bkjJcAAAAAElFTkSuQmCC"/><element name="nextButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAeCAYAAADKO/UvAAAA6klEQVR42mP4//8/A6WYYdSQUUMGxBAg4AFiGSAWAWIWBkwgAMQKIBqfIRoPHjy4WVJS0gVkm2AxzOA/RKEBPkNsXr58+f/Hjx//r1y58gyLYQ6PHj0CKXTAZ4jDrVu3/oPw48eP/3/79g3dsBCQHEFDzp8//x8Z3759+//nz5//37hx42F6evockBhBQ44cOfIfG96yZcujpKSkuSA2QUN27dr1HxnPnj37eWhoaDfMOyAxQobYrF+//j8IT5w48XlAQEA3esCC5AgZojF58uRbvr6+3biiePny5QSjmPLENpqLRw0Z9IYAAGB2RqagdTNIAAAAAElFTkSuQmCC"/><element name="elapsedBackground" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAeCAYAAAAPSW++AAAAFklEQVR42mP4//8/AzbMMCoxKjHcJAArFxoDYgoNvgAAAABJRU5ErkJggg=="/><element name="durationBackground" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAeCAYAAAAPSW++AAAAFklEQVR42mP4//8/AzbMMCoxKjHcJAArFxoDYgoNvgAAAABJRU5ErkJggg=="/><element name="timeSliderCapLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAeCAYAAADpYKT6AAAAFElEQVR42mP4//8/AwwzjHIGhgMAcFgNAkNCQTAAAAAASUVORK5CYII="/><element name="timeSliderCapRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAeCAYAAADpYKT6AAAAFElEQVR42mP4//8/AwwzjHIGhgMAcFgNAkNCQTAAAAAASUVORK5CYII="/><element name="timeSliderRail" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAeCAYAAADtlXTHAAAAM0lEQVR42pWNIRLAIADD0vrJwv9f2gkONJhcokJbDFyDZNbJwLYPhKWdkpaRzNL242X0A7ayDBvOWGKEAAAAAElFTkSuQmCC"/><element name="timeSliderRailCapLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAoUlEQVR42t3RTQrCMBCG4SwKgrhttaSkFAppS9Mk/VEPoTvBC7nyUIpnKq4/JwGDeANdPJt3MZMhDAD7xv4ixvH6SG5kfocL5wJlKVHXrQ+HLBNoGoW21R5Lks1dyhpdZwMXZ60tjOkDH40ZYO0YsDTlDzdvGLYBq6rmJESBvp8wjjvPPSnK8+JKoJTGNO3DFQsKZzeKdjw/z4vIkqx++o9eChh4OrGutekAAAAASUVORK5CYII="/><element name="timeSliderRailCapRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAqElEQVR42t3RTQrCMBCG4VkIgritWlpaCoW2oc1Pf9RD6E48kSsPpXim6vpzphAX3kAXz+ZNMiSEANA3+ukYBOuR3djhE6uqRp4XiKIEvHCZYl0bCKUaxPG0cCStHbyiUFitNneytoVnjJM4knM9PGs7iU/qui08mRuG0YP6fgfRtgOSJENZqhMNwx5NY5CmmbjylWbEM15yRGt75jD3z1yyhez4iz96A9GweD4LqeZmAAAAAElFTkSuQmCC"/><element name="timeSliderBuffer" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAeCAYAAADtlXTHAAAALUlEQVR42mP+//8/A3NDQwOJxNy58/8zCwkJNyARwsJglgiIBSPevn3TSLrxAICJLIFssC4FAAAAAElFTkSuQmCC"/><element name="timeSliderBufferCapLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAbElEQVR42mP8//8/AzpgHL6CMjJyvoyMDJlAIVuwoKysvA8TE9NCRkZGISCGqJSXV9wKFPQCC8AElZRUPgEFeVHMVFFR/QRUgSqoqqq+Dcj2RBFUU9PwBbIXALEQipOAEn5ACugkBlvGkREdAE2UZQboCcvbAAAAAElFTkSuQmCC"/><element name="timeSliderBufferCapRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAaUlEQVR42t3QuxGAIBBFUfoA+S1oM1KudkUi5s8VwXEcKzC4yXlLggAg3on/oVK6KDUsUg7zjdZ6GOOgtc18kCp6H+Ac4Rx5WCsSRfR43CqGENEjCqXhiEfX8xgntDKXOu7c2uGnP/+FB8gXjGr6cT/xAAAAAElFTkSuQmCC"/><element name="timeSliderProgress" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAeCAYAAADtlXTHAAAALklEQVR42p3MsQ0AQAjDQCv7z8gakCo0LPDfnFyZJAh4J6oqZBt19zEzV7bhb792VRs5A8JlWAAAAABJRU5ErkJggg=="/><element name="timeSliderProgressCapLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAYklEQVR42mP8//8/AzpgHNaCvkCcCcS2MEGfb9++Lfz48aPQz58/ISpfv3699c2bN14o2s+dO/cJyOZFETx69Cim4N69e7cB2Z4oglu2bAHZvACIhVCctHbtWj90Jw3z6AAAdAV63jcCcQsAAAAASUVORK5CYII="/><element name="timeSliderProgressCapRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAZUlEQVR42t3QIQ7AIAyFYQ44boojQ1VisVgcggQzhn5ryraQ7QaIz/xJ85IqAOpLLRkb29n2xpQScs7ovVcOWmKMEY9SipMYQsDkkOi9x6RJJCJMxrm1FrfKxpAx5mSO6bU//3MBeArIus+/eXoAAAAASUVORK5CYII="/><element name="timeSliderThumb" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAeCAYAAAAl+Z4RAAABm0lEQVR42u2UTUsCURSGJ0kNV1MghjuhVhYEbSPoY5WbWhV90pd/SfwPulDc6c6vvYrjQl2kLdQ/IDhwe8/wTsQ04ZSbFg48Mtzzvsdzz71nNKWUtgjaMsF/SOB4VoAPrIIAWCMBrvmocX0k6Afr4BBcgRdyCQ4Y81P7zRwEO+CpUCjkJpPJ0DTNmTAejweyhtgjNcGvSWzzLkh2u11jNBqpXq+nDMOw6Pf7CkmUxERD7WcSKSki/9xqtYxOp6Pa7bYrEhONaMEmvVoIHGUymfxPRifZbDYPzzG9mg6ua7XawGuCer0+hOeGXi0snW42mzOvCbCNGTyv9Fp7+VWCRqMxheeZXuvntlKpeN5CtVodwHPH5ltlnKXTac9NFC08CXsL0oi4lFQsFo15ZtGw/LjdRDmKqBylXJJSqWTMMSepjdrH6GemGDiVhqZSqRz2+Y5um2jutFwuv8ka5+KEWt2+SPZV3mBgH1yABx6VcA/OGYtR6zoPOkvb5tDsEXnfYkx3mp3jHKIozCOO8F1nzHWc//5BWX6VF0/wATCN7PmY+qrmAAAAAElFTkSuQmCC"/><element name="timeSliderCue" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAeCAYAAAAl+Z4RAAAAfElEQVR42mP4//8/AyWYYdSAUQOGuQGiouJZQHwEirNIMgCkwcbG7klra/tvEAaxcRmCy4Aj1dV1v3Nz8/+DMIgNEiPJgLS0jN+ZmTn/QRjEBoodJckLRkYmT5KSUn8nJqb8BrGBYtmkBmI2yFYgPgTEmaMpcdSAUQPwYwAtmWpcwU8bfwAAAABJRU5ErkJggg=="/><element name="hdButtonOff" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAeCAYAAADQBxWhAAABiElEQVR42u2Vu0oDQRSGF1SwiIVCspfZnb1rEcxFCOmNzdb2PoIvpCCxEyJYqdU+gbVtKmMeQavx/KMDg4I4GxACU/wcZjL/+ebMzNk4Qgjnv+VYqIVa6HpC2223Ii1IYgXBX5lAF0HARBjyxoIfeUygIo5TkSQZmUO5c8TvY70yzwskDGsg+DFvBE3TXGRZoYw7jIWPnCcCEWM1D9V1vTcajSvX9edRFEsf/MZQGBWU5Pg+eyAJRIzVPOmS9ESw8XB4dIKKda8RNM9LKZW81xtMut3DM0QdSpB7xiJBVd5Mp9dbNPeme42gRVFKqeR0h+cEuEDUoag8ijhO4I7GG6R33WsI3ZfSK8JDQdShtIkrqvKZTgFtNsHx6l4jaFkeSOkVcR7/uFNavz2b3e7Sho5pPMdj072NoLgv1SK4p99aBi8XFTaCdjreK3oNRtwNXiKASIioXifaAus+2yuXvykg5inP8s/Qfn9wCsMqn0HyvyCPyQd/k9RSzd9Qra889q/NQi10DaEfbVCWtJniLegAAAAASUVORK5CYII="/><element name="hdButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAeCAYAAADQBxWhAAABwklEQVR4nO2Uz0oCURTGXZigT+Br+ALiKyi4UAMJDAaEFkGLVrkM3BjkQiSFGElE0IUIIgrCLERUEkFJyD+ghLS1aVWn88kEg7i4KcwiRvhxzvngOx/cuV4LEVmMxvBAM9QM/Weh/DthnIyLcTOeA3Brfuw5EQl1xmKx+HK5VDebDR0K/NiDfSKhrul0qq5WKxgPBn7swT6RUPdisaDZbHY02IN9IqGeyWRCeli7y+fza/SomDX9mjmz2+2Xfr//UVEUdY/XIxQ6HA5JD2vnlUplgh4Vs6aHa7Wa0u/33wKBwK3X633Y4xUL7Xa7pIe1QCQSuZEk6QkVs6ZHi8XifDAYULlcHlmt1mi73f7a8YqF8jGRHtZOE4mEnM1mn1Exa3o0l8vN0cuy/GKz2S5ardb3jlcstNFokB7WpEKh8NrpdAgVs6aHM5mMwto7H+99KBSSm83mrlcstFqtkh5cnGQyuUaPilnTtxfJ4XBc+Xw+mUM+93iFQt2lUon0jMdjqtfr2x4V868ORqMR9Xo9XDLa9Yr+ZVz87VQ+MjoW7BF9HJz8beLpdFrlS0KHkkqlPoLBoPAzaPyDbwRmqBlqhv6JH8CLXqCC55PmAAAAAElFTkSuQmCC"/><element name="ccButtonOff" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAeCAYAAADQBxWhAAAB10lEQVR42u1Vu0oDQRQNmEZQSGHMYzebZHcTg0IeFlZaCIpGRI2itb+hEOMnWEasbGLlo/EHJDY21jYWvhURH5UijudMEomI4CQgBLY4zMxhzj1z78zddQkhXP8Nl2PqmDqmrWnq9fqywBUgmgD1WRXTq2BQE7puNAzqGUfFVITDURGJmBKhUFj4/UGZQXe3X2ha6Afv8wW+eIJ68kqm0aglTNMWhhGh0XUymV4olba8udxsn6bpOzSA0Vk6nZnZ3t7pmpycSoHfJ08d9cqmFBKBgCYQeBrmE+DPYbRRLK57cJD7TKZ/FNnOgb8Av1YorHaBf64dWNnUsmISmL/l8yvtCHZQd1cPWN9ibxvGI/LgPsgD73VaNVPbjklg/gq4cXdlwwjL4CjjLjI74V6Mx1X+nWXHIR4ty65pVU3jEtWHMpxI9M4j4A2y2qyW8Qn8QDyeWMT8DuUvLi0tezF/YZbUKpvGYj0SfEi8S4zZcvnQMzY2HsVaPiSMpzAYIT84OGRjvcdS17QNm/LELF99y+h65YV+bxm/7E/ub8iULcJeq4lZLtO0ZBsQlTuL/8pTQz2v48+mqVR6joJmPoPQXzKOygffDXQAnU2goxrH+bU5po5pC5p+AoMCobNnBGFcAAAAAElFTkSuQmCC"/><element name="ccButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAeCAYAAADQBxWhAAACIklEQVR42u2VO4saURiGbVZERC39AVZ2U9jK/gERCxG1sdIiAZukCWSxs1hZlE0jLtEQb9FCUfF+v4DXFTR4KxSDE9ikSDM72WTRk3OGGIatDgpLihGewo953+c4Z+bIAwDwnhseJ+WknPQkKfycQWQQAqKCnB+B6m8e9ZzhSGV2u/1yu93SFEWBY0F51IP6cKTEarWiSZJEwaNBedSD+nCkqs1mA9br9cmgHtSHIz1fLpeATa/X+2U2m+NisfiCIAhXIBD4gubtdvunyWSKiUSit0ql8joSiZBPs6gPSzqZTAAbg8HwyWKxvJ/P51Q4HP4sFAo9nU7nQavV+m0228fFYkH5/f5biURy0+12d+wstnQwGIADsGQPJa+LxSI5Go3AdDoFUPLYaDTQfr2s1Wp3hzlc1GO/3wfsPLa01WqBA/V6fS8QCF7FYrGv6Huz2QRut/sulUr9gNe+SCQS39EcLmLvcrm+5fP5HTuPLS2Xy+BApVIBer0+BPf0QzKZvHc6nRN4G68LhcJvtVp9Y7VaI3ABtMPhuJVKpe+y2eyOnceWZjIZwKZarT7odLoon89/I5fLnaFQaJvL5dCCaI1GE0ZzhUJxBR8kZs7O4kpV8XgcsIG/hNmf2WzGPBylUomZp9NpMBwOmfl4PP43Z4P7yhA+n4+ORqPgVFAP7uEgg+/epdfrpYPBIDgWj8dzbzQasY/B5z/wuT9xTspJ/zvpH7Snd5Nr6YMeAAAAAElFTkSuQmCC"/><element name="muteButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAeCAYAAAAy2w7YAAACPUlEQVR42mP4//8/Az0ww6hFoxYNvEVkAiYgZgZiRpgALSxijIuL4zt58qQNkM0Fs4xci0CaWYCYHUoji7G4u7sLv337dtaKFStsoWrIsghkILu1tbXCixcvmoBsXqg4C9AXphs3bjQEsvnKysr0gZYtlJaWFgUFJakWgcKet7Oz0/bdu3crX758uR/IF4f6hHXmzJna79+/X+Dl5SUD5AsdP368+uDBgwEghxFjERtIExBLALHMjh070r58+bL7zp07+69evQqySPbChQu2ycnJIAsFNm3alHDt2rUcEHvq1KnWt2/fbgX5kBiLhID0fhgGBsf+ixcv7j9//jwYA+Xljh49Gvb48eN6kOGenp7yQEfMA7KFOTk5xYCWLgKxibFI4sSJE/txYaC8FCj4rly5shhkIAifOnVqAYwNjLcFRFsEDOf9uDBQXpqDg0Pi8OHDMItEgGy4RTA2UUG3a9eu/bgwUF7+5s2b8evXr68EBV1kZKTSvn375oIMFxQUFNu/f/9CaPCTlhgaGxtTgEl495YtW/aDMCgxbNiwwdDU1BSkRgAYfxmLFy9OA7HXrFljv27duiZiEwN68uaJjo62Ahq2EmgILHmDihtWIN8QaNE8PT09SZDjLl++3DBjxgwvYpM31gyroaEhDzSkHjnDbtu2Ta+qqkoT5IMJEyaYHjp0aC4w5QmTk2EJFUEgn7EkJiaKAUuN+SUlJZaUFEEEC1UzMzOurq4uM2oUqgQtI7maGK3KRy0aPhYBAK/+y9iyNfpJAAAAAElFTkSuQmCC"/><element name="muteButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAeCAYAAAAy2w7YAAACW0lEQVR42mP4//8/Az0ww6hFoxYNvEVkAlYg5gBiFpgALSxitLOzk122bFkikC0NxMyUWMQIxNxALALEXFAxFiibS1tbW+vx48fX6urqcqFqyLII5EIRJSUlr8uXL+8HslWg4pwrVqwI7ezsDAGyVf38/OKBlj3k5+c3BgUlqRaxAbFiXFxc+YMHD96/fPkSpMAOZAkQ8+Xm5gY+e/bsvo6OjgOQr79p06btc+bMaQE5jBiLBIDYAIhBmn0mTJiw9uPHj3/u3Lnz/+rVqyAFfkADE4DxYghka02dOnXmnj17lgLZOvn5+VnHjx8/BGSrEWORwX8k8Pbt2/8XL178f/78eTAGygesXLmy/cKFCzuBbE1g/HhcunTpLpBtyMrKanHu3LmHIDYxFjmcOHHiPy4MlHcDYtszZ848AdJGQGxy8ODBB0AaFDfGBw4cALOJsgio8T8uDJR3Z2Fhsd+9ezfIIlDwmQLZcItgbKKCbteuXf9xYaB84L59+ybOnz9/EyjozMzMvLds2QIOOk5OTqtt27Y9hAY/aYkhNTV19fr16/8ADfsPwkAx3/7+/kAFBQUNIFt748aNi7u7u+eDEkNTU1M+0AH7QMmdnOStYGtrWzJr1qz369atAymwBWJ2IOYFGhwBjLc7UlJS1iDH7d+/f29FRUUtkC1MboYVFhMT8wS6fDeQrQzLsMCk7RMdHe0F8kFKSkrazp077wBTngE5GRZfEcQMLUg5gT7Wu3fv3t2wsLB0kKNoVqjKy8tLFhQURALZUpQWqoQACzTemImuJkar8lGLho9FAFfb1pYP/NUtAAAAAElFTkSuQmCC"/><element name="unmuteButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAeCAYAAAAy2w7YAAAA2klEQVR42mP4//8/Az0ww6hFoxaNWkR9i3AARiBmAWJ2EE0ri0CWsFtbWys8e/asCcjmpYVFTCCD29rabN69e7cSiPcD+WLUsogNiIWAWAKIZbZv357y9evX3Y8ePdp/584dkEUS1LJICEjvh2GQL65evbr/8uXLYExNiyROnjy5HxemqkUHDhzYjwtTNei2bdu2HxempkUoiaG6ujpl1apVO9euXbsfhKlpEXry5gkPD7eaM2fOymXLllE1eWPNsMrKynITJ06sp1WGpV0RNFpNjFo0atHgtQgANKFe0TzIhR0AAAAASUVORK5CYII="/><element name="unmuteButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAeCAYAAAAy2w7YAAAA2klEQVR42mP4//8/Az0ww6hFoxaNWkR9i3AARiDmBmIRIOailUXMIAuUlJS8Ll26tBfIVqaFRWxArBgTE1P64MGD9+/evQMpsKKWRQJAbADEDkDs09/fv/rTp09/Hj169P/OnTsgBQ7UssjgPxIA+eLq1av/L1++DMbUtMjh5MmT/3Fhqlp04MCB/7gwVYNu27Zt/3FhalqEkhgSExNXLV++/M/atWv/gzA1LUJP3grW1tbFkyZNer9s2TKQAktaZlhhIPBoaWnZTasMS7siaLSaGLVo1KLBaxEAvQpqyzzc7aAAAAAASUVORK5CYII="/><element name="fullscreenButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAeCAYAAAAo5+5WAAABX0lEQVR42u2UQYuCQBTHFTxJUJ0LJWiPQp/Dm126+x3yLi3YKU/dO+ilgx2iyETesXuelESNuvcN3HkwLh6WRXZYlgUHfoyg/ObN/43DlWXJ/QZcK27Ffyj+ZvAEkSATFMKEMiZ0mMSz2Ux+PB4O+Q7qoJy14p4kSdPL5eKTBaACK2cRCxjDarVa3O93yLLsE1Zxd7PZzF+vFyRJAnEcAxk+PmPmLOK+53lWFEVwvV7BMIz34XA4DcPQwZ00EfM1cPtdzBY7T3hbr9eWaZoGPR09VVVxFpuIRU3TZCqTcfun08lCKZX36TuhXkQTsVwUhTMajaa2bS+ezyekaQrn89mi0i9HE7FCjhPcbjcfu388HuFwOMByuZzTWH4snux2OwiCAHAmDQNd1xc0U4FJvN1uoYI0yx8MBhrNlWcRj13XhYr9fg95njv4O7OKO/RiqS4ZhcYgMonbi74V/0PxB6RCFmvPDfJxAAAAAElFTkSuQmCC"/><element name="fullscreenButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAeCAYAAAAo5+5WAAABaklEQVR42u2UIWzCQBSGAYFsEGwISBNkp5hHoHFV9dXD1tehiqpjSQ0GwS2hNE0bUokHBYUUmtbXVb7dS66IZVkaLsuypJd86aXiu3f/u7saANR+g1olrsR/KP5h1CkCRaIMKSPGgNLiETcURZGSJAnhy0A5b8XPoihOdrtdTheAAqycR9zEGAzDIHEcQxRFd3jFbcuy5lmWwel0guPxCEEQ5DjHzHnEndVqZR8OB9jv96Bp2kev15tst9sQd1JGjFk22Be338ZssfOUV9M0bV3X3+n8Bf+Px2M8JUIZsSDLssRkEm7fdV0bpUzeoTyxRe9FlBFLt9st7Pf7k9lsRtI0hcvlAp7n2Uz67SgjHtLjBOfzOcfuO44Dm80GptPpnMXysHhECAHf9wG/tGGgqiphN67JJV4ul1BAm5V3u903lnmdRzxYLBZQsF6v4Xq9hnidWaMeFrfYw1I8MkMWg8BVcfXQV+J/KP4EGwslGEtzWUAAAAAASUVORK5CYII="/><element name="normalscreenButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAeCAYAAAAo5+5WAAABX0lEQVR42u3VMYvCMBQHcPXw1K3oKfclzqGlU7+MWye3c3Lph+gmdHGuW8WpGUrrarEIrlZEBKEtdPbegxeQG3pHglsDf0hJ+6N5adLG4/FovCKNGq7havgfrfmUFqQD6ULecFAGbs/n8w/ClCAIJofD4Rv6A8RlYCXLsoVhGOP1em2WZekXRcEAn8FYTwYe3W43dr/fXUTP5zOD+JvNZoJlkYE/Ebter4yjy+XSxJlgzaXgNE0ZT5Ikrq7rX1TzpgzcP51OjOdyuTCsuWVZQ1n4HXF8c8qIytD+C27STQo9xIE+oZWtEsZp5Xm+gGv2HMLFYVwITdPGURS5sDiMh95cGMZtqnieZx6PR3+/3zMeWbiD2xQ2gB/HMYP4cO1in2ouDPe22+1st9sxiG/btqmq6jgMwwUtqDCMp9RgtVrNHMeZENadTqdD+lqEYY736Ehs/ToqxeD611TDr4V/ALfMb7vGw5DiAAAAAElFTkSuQmCC"/><element name="normalscreenButtonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAeCAYAAAAo5+5WAAABbklEQVR42u3VMauCUBQH8GqIN8UbImlocHSrPeR9haYWV7fX6NRniIbCqUDQwRpycVC/hFMNXSKzoD0Cx/PugeMbGnwPL21e+KOg/jj36L3WAKD2jtQquIKL4X+MOk+Djk2eNk+H5wMvisCt0WikEKZYlrUKgsDn5wPERWDler0yWZYn8/ncez6f8Hg8IIoixCUReHi/3+F0OmUIJkkC5/MZTNNcYVtE4C/GGFwuF8Dj8XiE6XTq4Uyw50Lwfr+HPLwFWa/X+6ae10XgfhzHkOdwOECapmw8HmPFDRH4E3GsnDKkNrT+qrhONyn0UA70CS0cRXADp3W73Ri8DMJLw1hxp9vtTtbrdeb7PuShykvDuEyV2WzmhWEIu93uN6JwG5cpXwCw3W7BdV1YLpfZZrMB6nlpWOKw7zgO2LYNmqZ5kiRNFosFoxdaGsZdamAYhq/r+oqwjqqq+SdVGs5xibbE5stWWQ6ufk0V/F74Bzh6cDMaFwHFAAAAAElFTkSuQmCC"/><element name="volumeCapLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAeCAYAAADpYKT6AAAAFElEQVR42mP4//8/AwwzjHIGhgMAcFgNAkNCQTAAAAAASUVORK5CYII="/><element name="volumeCapRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAeCAYAAADpYKT6AAAAFElEQVR42mP4//8/AwwzjHIGhgMAcFgNAkNCQTAAAAAASUVORK5CYII="/><element name="volumeRail" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAeCAYAAABaKIzgAAAAWElEQVR42u3VsQ3AIBBDUW4ASpQGIRS4sP+EzgzpYun/CV5lh6TiUAAFChQoUKD/grZ2WUij9+EBnfP2gK6VHtC9baCPBzTzeEBt5klS5ZmAAgUKFCjQr71HYkzTWoeyuwAAAABJRU5ErkJggg=="/><element name="volumeRailCapLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAeCAYAAAALvL+DAAAAgUlEQVR42tXQQQqDMBAF0MFdwa02xBDTSWK3dW+X9rYt9GTV9gDfmUDBK7h4kPn5kCEEgPboOEHTnFUWT7HqcBUfYyyc86C2NS9rHfr+ghAY2lj1wJwQYy6NL3NESrmgrnNv74MMQ0HTdL9Ja/mH+nY1z49Rm3LxK3toKE6iPs4XboLWK4v24Kf0AAAAAElFTkSuQmCC"/><element name="volumeRailCapRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAeCAYAAAALvL+DAAAAgUlEQVR42tWQTQrCMBCFB3dCt60hDWmcJHWr+7qst1XwZCp1/3wjCF6hiw/m/cAMIwDkH1mP0ba7F7mS+jVCiHDOg8aDHCQlxTDs4X1A17mb5FyhWmABG4uUUmGoZmu8aYwwYkzo+3CXn2D6nKbzUTgslszz5cS1GzumIVsT63rhB+kPMQcishPoAAAAAElFTkSuQmCC"/><element name="volumeProgress" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAeCAYAAABaKIzgAAAASElEQVR42u3UsQnAQAwEwRe4/wLVh5TqWzDGiWC2guGCi5k5GwpQUFBQUFDQr9AV0sjMFdCnqg7on9DutqgfBQUFBQUFBX3bBU4WWutcf3kcAAAAAElFTkSuQmCC"/><element name="volumeProgressCapLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAeCAYAAAALvL+DAAAATklEQVR42mP8//8/AzJgHB4CfUCcDBb4/fv3hDdv3uR/+/YNouLy5csf//79ywfXcvTo0Y9ANkJg9+7dE4HsPBRDN2zYMAFIJTEOoxADAG38dDtrd5P1AAAAAElFTkSuQmCC"/><element name="volumeProgressCapRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAeCAYAAAALvL+DAAAAT0lEQVR42t3QIQ6AMAxG4d5fkHGS+un6JtXV84Cr+TfKQuAIID7z5CMA9ETfDtuw3MHd0VpDRJQMqoqTmR0ZRATTFWqtmNYMzLwP5SeDXjqg+Gveu5kMqgAAAABJRU5ErkJggg=="/></elements></component><component name="display"><settings><setting name="bufferrotation" value="90"/><setting name="bufferinterval" value="125"/><setting name="fontcase" value="normal"/><setting name="fontcolor" value="0xffffff"/><setting name="fontsize" value="11"/><setting name="fontweight" value="normal"/></settings><elements><element name="background" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAA0CAYAAACQGfi1AAAAZUlEQVR42u2VwQ3AMAgDebBClEUYt8NV+XUBvnQKq0UcC1jYZ9nX2pcJzyNiSwUy06QCJj6vMvUH1dwiBEZgSg+gCIv6Y0rIAygi5D8UjUUjA/aAyZwwOPIP2mMKRd9bdM79KAVee0AqrmZ58iQAAAAASUVORK5CYII="/><element name="backgroundOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAA0CAYAAACQGfi1AAAAZklEQVR42u2VsQ3AQAgDKVjhlS5TsH+dMV4MQUumsBL0xwIW9ln2ta7HhOcRcUsFqsqkAiY+7zb1Bz3cIgSOwJQeQBEWzceUkA+giJD/UDQWjQzYAybzhMGRfzAeUyj63qLMnUqBF2JaKtp629puAAAAAElFTkSuQmCC"/><element name="capLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAA0CAYAAACHO2h8AAAA7ElEQVR42u3XvQqDMBQFYCPYWLWIiNFFUePvUju2e/sA9Vnsmzj2WbXXQktxkWgoIjlwudtH7pDhoL7vpSGEeBWsG0wEgyXGoAEC5G5ZVk0I0XRdV2RZRsyQ47hHQB6+75td173hzytZoYbS+IyxynzOGGrzvAjmnDOGnmVZutLCCOjfUFGsDyoENAHBp90ulK8MyjIBTUMZHyhNBTQFJUkqoAmI0mSrUBxzg+jKoChaHxTzgUJuUMgNirhAbRCEAYIshRrX9S6qut8thSpN0xvbts0lxeZb/ACrDeOgYYyVOWeinyp6gnWdW0Vft69cndg2ea8AAAAASUVORK5CYII="/><element name="capLeftOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAA0CAYAAACHO2h8AAAA50lEQVR42mP8//8/AwiIiUnYAKlIINYCYk4GEgEL1JAMQUHBTDExMV5ubm42JiAg2SCQS0CGyMrKCv/794/p58+fDDBXkuqiSCEhQZ4/f/6Q7Ap0gzRZWNjYyXAEhkFcTEyMQNdQZhITA5XAqEFEpmxKo576LqI0DY3G2pD22qCK/mEc2IMv1kYDm+gwGi0hR2YYUS2LjBa1dC/YqOai/4PMa9/+/fv/j5GRkYnSWLv+8+ePX9SI/uWfgeDfv7//IF4kDzO9evXiyLdvX6e/BYLv33/8AHoTXKqQihmRuqK2QCqC3K4oAL0UgwtgxUxZAAAAAElFTkSuQmCC"/><element name="capRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAA0CAYAAACHO2h8AAAA8klEQVR42u1XQQ6CQAwEUlfjTRLAC4k/8MIX/IDv8w16l1foA9RwUjhw2JW4IWFt9QPAokHcJk2zPUw6nWyTAc8LNlbzkJhnzH2aXo/UgCiKgqYoVVUpIUSQZdnS9+dbBNtBURSNx7ExGGPjMAwZPtcIdoIWtCyl1CtxMtt1Z9M8z1eAb60AYCMsC5xID8lxbBvLBKyOwgDVANKV/xPUlFHtB1UbrPyDXnbfVDPLrrMjcyH/eEcdfhFzar932DqbqHfy66qm3p9Vaqsm5aMk76ZFjXwb55x8WtyKGtGRUpZCcLR7dzJ+B0iSy03DisYEQo0nc8B4p9SUlywAAAAASUVORK5CYII="/><element name="capRightOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAA0CAYAAACHO2h8AAAA7klEQVR42u1XMQ6CMBSF5qdGEwdJQBfY3Rm9iEfwRHoDL8LgAYyzYTIwMFCrOFBfPQFQNKh9yU/TDi///Zf+5JHvzw9Oe9xQJ9Q+yy6JfqA4jqO2LDUghIjyPF8FwWILsh1JKVu347ou45yPwzAc4boB2ZE6yHKUUq9CY8zzZtOiKNaEuxGIOMexREdmTIy5DMeEnJ5giRoQmdr/DmnKuvaFrv2s/T897KG5ZofdZEZ2Q/7xjHr8InbVfm6x9dbR4Ow3dQ1/tdaxy9i1qro/dHYzkqZzWwnoANhJGuSoChCiLKW86uCXUJqe0z6i6BMdqXhIR7IE5AAAAABJRU5ErkJggg=="/><element name="bufferIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAA0CAYAAADi1poDAAABTElEQVR42u3WPUtCURzH8Xt92HRwCJokNAOJqKVcitBF0pr0FfRAay+gqDFobXaoKXsD6SY4Nbk7CA4OUa/h9jvwjy6XfDjdw+UIP+EzXfR+z/3fc9DxPM+xicMgBjGIQQxiEIPsC6rAGD6gYUPQ0Pv9fIIbVVAcknOCvqIKOoaBqP8xshFMoBm45soilJjJoHd5EkpfY8UJX1DSZFDPF9S1IagEHXiDXY0gV6ISpkfGg3EpgnbgCdpwYOBmKSiI1H+CWvISK69hDzzYgKJYDxvUtiFoG57hBfYNjCwddmTcZUsdtAW3cA15jRtk4BDKsGIy6B4exY1GkIo5EVVTQWq7P/iC7jT/3v4EHS1ydCz6w3sSpZ7UZuBaDi5EcJyrElKDrOmXetrqzuBKXE75XizKXXbqCzq3YdtnJUpZ48HIIAYxiEEMYhCDZvsG/QUNjWGQyWIAAAAASUVORK5CYII="/><element name="bufferIconOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAA0CAYAAADi1poDAAABTElEQVR42u3WPUtCURzH8Xt92HRwCJokNAOJqKVcitBF0pr0FfRAay+gqDFobXaoKXsD6SY4Nbk7CA4OUa/h9jvwjy6XfDjdw+UIP+EzXfR+z/3fc9DxPM+xicMgBjGIQQxiEIPsC6rAGD6gYUPQ0Pv9fIIbVVAcknOCvqIKOoaBqP8xshFMoBm45soilJjJoHd5EkpfY8UJX1DSZFDPF9S1IagEHXiDXY0gV6ISpkfGg3EpgnbgCdpwYOBmKSiI1H+CWvISK69hDzzYgKJYDxvUtiFoG57hBfYNjCwddmTcZUsdtAW3cA15jRtk4BDKsGIy6B4exY1GkIo5EVVTQWq7P/iC7jT/3v4EHS1ydCz6w3sSpZ7UZuBaDi5EcJyrElKDrOmXetrqzuBKXE75XizKXXbqCzq3YdtnJUpZ48HIIAYxiEEMYhCDZvsG/QUNjWGQyWIAAAAASUVORK5CYII="/><element name="errorIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAA0CAYAAADi1poDAAACs0lEQVR42u2XTWsaURSGbWtKqbQULJiGbrppN666K3EhNF11IYhZJnSrCO0P6MKG/gEX7SKbiKKCEUQEC4pCIKCoqPUThJDqSg1C6CoQwu15B0fMdBzHkDEhXOGB8dxz7zzOdeZVHWNMd5vQcSEuxIW4EBfiQndJ6IqvFeLpmJXbILS6u7v7FeD4poUeGY3G991u97TX652aTKYN1G5K6D7xyufzJfv9PgN7e3u/UMPYTQg9sVqtnwaDwTldHQZwjBrGli30gDBns9kmbRc7Pj4WwDFqGEPPMoWMTqfzG10RdnR0dAnU3G73DnqWJfRQr9e/q9Vqw06nw+TAGHrQq7XQPeKl1+sNY4tarZaAzWbzA/E9xtCDXszRUuix2Wy20wnP6vU6E6H6RzBdQw96qW7QSgi3+etYLJZrNBqsUqlMoLoVTNfQE4/H81R/s8hjYBGhZ5ubm5/pk1+USiU2jSgkraMXczD3uoWQV29zudyfQqHA8vn8JUQhaR29mIO5anNOrdCqx+P50Ww22eHh4X+IQnJjmENzf6rNOTVCyKsNunv+HhwcMDlEoVnjmLu2tvZBTc7NE5rkFV16lslkZBGFZo1jrtqcmyck5FW73T5PpVJsFuJtr9SDNdTknJKQkFfpdLqJBZPJ5Ey2t7f9W1tbfqUerIG1xjmnv4qQ0eVy7ZTLZZZIJBQZjUYC8/qwFuXcd1r7+aJCQl4Vi8UhPQjZdUKPAsWckxOa5BX9lGDRaHQuFotlH6jpxZpKOScnJORVtVo9i0QiTA12u32fiKjtx9qzck4qNMkrXN5wOKyK4XDITk5OVPePt08256RCQl7RPl8Eg0GmJfT9vHA4HF+kOScVevGbXqFQiAUCAU2BFM6FcyoJGbBlxLr49NWQ9fG5DPy/PRfiQlyIC3EhLqQh/wBHF7waCbYO0QAAAABJRU5ErkJggg=="/><element name="errorIconOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAA0CAYAAADi1poDAAACs0lEQVR42u2XTWsaURSGbWtKqbQULJiGbrppN666K3EhNF11IYhZJnSrCO0P6MKG/gEX7SKbiKKCEUQEC4pCIKCoqPUThJDqSg1C6CoQwu15B0fMdBzHkDEhXOGB8dxz7zzOdeZVHWNMd5vQcSEuxIW4EBfiQndJ6IqvFeLpmJXbILS6u7v7FeD4poUeGY3G991u97TX652aTKYN1G5K6D7xyufzJfv9PgN7e3u/UMPYTQg9sVqtnwaDwTldHQZwjBrGli30gDBns9kmbRc7Pj4WwDFqGEPPMoWMTqfzG10RdnR0dAnU3G73DnqWJfRQr9e/q9Vqw06nw+TAGHrQq7XQPeKl1+sNY4tarZaAzWbzA/E9xtCDXszRUuix2Wy20wnP6vU6E6H6RzBdQw96qW7QSgi3+etYLJZrNBqsUqlMoLoVTNfQE4/H81R/s8hjYBGhZ5ubm5/pk1+USiU2jSgkraMXczD3uoWQV29zudyfQqHA8vn8JUQhaR29mIO5anNOrdCqx+P50Ww22eHh4X+IQnJjmENzf6rNOTVCyKsNunv+HhwcMDlEoVnjmLu2tvZBTc7NE5rkFV16lslkZBGFZo1jrtqcmyck5FW73T5PpVJsFuJtr9SDNdTknJKQkFfpdLqJBZPJ5Ey2t7f9W1tbfqUerIG1xjmnv4qQ0eVy7ZTLZZZIJBQZjUYC8/qwFuXcd1r7+aJCQl4Vi8UhPQjZdUKPAsWckxOa5BX9lGDRaHQuFotlH6jpxZpKOScnJORVtVo9i0QiTA12u32fiKjtx9qzck4qNMkrXN5wOKyK4XDITk5OVPePt08256RCQl7RPl8Eg0GmJfT9vHA4HF+kOScVevGbXqFQiAUCAU2BFM6FcyoJGbBlxLr49NWQ9fG5DPy/PRfiQlyIC3EhLqQh/wBHF7waCbYO0QAAAABJRU5ErkJggg=="/><element name="playIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAA0CAYAAADi1poDAAABzElEQVR42u3XTYtBURjA8VuzmdWsZmk7GzWfxL1IJMs5n8GXkISFzCQz5pSUlMUjC2WhLCyUBclLXkIkNt5ZmXt3FpLn3nPRdE796y5/dc+rcDwehUdK4CAO4iAO4iAO+o8geTzLvcq9yD0JOg0MyNDv9z/dbveH/P2mFwwDMs7nczgcDlCr1X71gmFA76PRCJRmsxns93tdYCjQYDCA06bTKXMYCtTr9eBck8kEdrsdExgK1Ol04FLj8VgzDAVqtVpwTcPhELbbrSoYClSv1wGTvE3AZrNBwVCgarUKaup2u7Ber6+CoUCVSgW01G63YbVaXYShQOVyGVjUbDZhuVyehaFApVIJWKbMs8ViAY1G4zsUConKeYkCFYtF0KNMJvPj8/kkNKhQKADLYrEYdblcRPUvy+fzwKJoNEqdTifRPKlzuRxoKRKJUIfDQZgt+2w2C2oKh8PUbrcT5hsjIIe8cqjNZiO6HR3pdBquKRgMUqvVSnQ/XFOpFFzK7/dTi8VCbnb9SCaTcC55D6Fms5nc/IKWSCTgNK/XSyVJIve6whrj8TgoeTweKooiufcl3xAIBL5MJhN5lGfQYz0U+duegziIgziIgzhIfX+1FIqPwZcb/gAAAABJRU5ErkJggg=="/><element name="playIconOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAA0CAYAAADi1poDAAAByklEQVR42u3XuWoCQRzHcYuUKVPmAXyAlBbpPRFFfIek8yXMIGohFiLYiCCChWIhWAgWFoKFIh54RGUH0cZbq192OwsR/+uuSpiBL2z5gZ3TAMDwTBkESIAESIAESID+I0ger3Lvcm9yLwadBgVkHI1GHZ/P9yN/f+gFo4BMi8UCx+MRzWZT0gtGAX1Op1MozedzHA4HXWAk0Hg8xmmz2UxzGAk0HA5xLs459vu9JjASqN/v41KSJN0MI4G63S6uaTKZYLfbqYKRQK1WC5TkbQLb7ZYEI4EajQbUNBgMsNlsroKRQPV6HbfU6/WwXq8vwkigWq0GLep0OlitVmdhJFC1WoWWKfNsuVyi3W7/RiKRL+W8JIEqlQr0KJ/PjwOBwDcZVC6XoWWJRIJ7vV6m+peVSiVoUTwe5x6Ph908qYvFIm4pFotxt9vNNFv2hUIBaopGo9zlcjHNN8ZcLgdK8srhTqeT6XZ0ZLNZXFM4HOYOh4PpfrhmMhlcKhgMcrvdzu52/Uin0ziXvIdwm83G7n5BS6VSOI0xxq1WK3vUFdaUTCah5Pf7ucViYY++5BtDoVDXbDazZ3kGPddDUbztBUiABEiABEiA1PcHSCzm64IZEhcAAAAASUVORK5CYII="/><element name="replayIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAA0CAYAAADi1poDAAAEwUlEQVR42u1YW0icRxR2o6k2pmyMa0NJjRrRtWgp3rA00ifJpuqqL1FEpGLxQQVJIaUVgnZViqIglHh5UHej4mXpqruj4v2CFwTxLgjiFRUUUby8KCL2fMv8QYKa/Lsb0sL+8OHvzJxvvn/OmTln1ubi4sLmvwQbqyCrIKsgqyCroP+jIBMeB8J9wheEWx9q9DEFPVxeXi5JSUmJo3c3wh2C5FMK+mZ/f5+dnJywoaGhsvDw8J8gkq+c5FMI+nZra4sBXJiBMVYUEhLyI/U9IHx2lTBLCZLwL5cR3AlygnJjY4MJ2NzcZAcHB+zo6Ki5pqYmx83NLYjGOBPsLClIwmPDNTIyUlFXV6eanp5W7+7u6k5PTw3r6+vsXUDc4eEh29nZ+ae0tPSlo6PjY75aZgvCl8mUSuXT4eHhcgjACmxvbxsnXVtbY6urq9cCY46Pj9n4+Hgm8dw1V9BtBGhubm46uaAFIpaWlkRhcHCwPiMjIwWra+4KYWVcNRrNKxJjJF9cXDSitbX1jUqlylQoFEpyxXOh/TJoRXTZ2dm/29vb+xKP1NwYQsy4FBUVvdjb22MLCwtG9Pf3a5OTk3+hPm8eqAjw74R+YGpqSl9cXPyXh4dHCA9+O0ts+zsIXnKRfn5+ngEtLS3VNMkT6rtHsL18DqF/dnaWVVVVvabtHkZtX13a7sKG+FIqlT7gHyFKEAhcBwYGyubm5tjMzAzr6urSent7h1K74xVnysO2trbXUVFRz+n9EeHzS2PwVxodHR1GG+LvycnJYvr/a7SLEeRA5M9WVlYMRMAmJiZYfHz8zzwOJDfksrtX5LJbCQkJ/rTLWrAbwQlu2IgRJKuurv6TghKByejMeUNtXu+46UMffMDjhoYGjcAHbswhRpA7uUg9NjbGgKysrEwewKY+zuAQ+MCNOcQIklOS1JHPGRAREaEUAtHExwEcAh+4MYcYQb5kaKADDYcac3Z2DjbRXW/jSCaTBQl8IyMjBswhSlBPT4+hr6+PAT4+Pj+YK8jFxSVI4Ovt7RUtSN7U1KTr7u5mQFxcXLSZLrOnbR8p8IFbrMvcKysr1R0dHQwoKCj4jW9rU5/7hYWFLwW+iooK0UEty8nJUdFhxwAi0Zix7WHj1dnZqRH4KFGL3vYOYWFhz/R6vYEeNjo6ytLS0m46GG86g6SwBQe4wAlusQcjiB7l5+eXNzc3M4BSiNbPz++61HGdGEfYUI5rFHjAydOLRHRyDQ0NVdTX1+t1Oh0OM0YVYrVcLn/CV8r2PW6SYixsYAsOcIGTJ1rTyo+kpKQXjY2NTKvVovRABajl7vPige7A85ctf8eJ7oUxGAsb2IIDXOAUVtjkAi01NfUVfR2jfMTa29sZ1dGoeTRlZWV/xMTEKJ2cnII9PT2/pwQcQ7VzJvowBmNhA9v09PQsXjHaWaSEjY2NTafKsYUSLZKt8YBDBYla+fz8nJ2dnRkLerShTxhHNvrExMRfuZjblrp1GIv8wMDAp1SSltPVxlBbW8tuAo1hGBsQEKDgbrKz9L3s7TXI399fQW5U5eXlqUtKSnRqtdoA4B1t6AsODg7nu+naa/XHvCj6csh5m+x912hRgqy/D1kFWQVZBVkFWQVdj38BAk7AFyu8ie8AAAAASUVORK5CYII="/><element name="replayIconOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAA0CAYAAADi1poDAAAE2ElEQVR42u1YaUhcVxi1xirttDHWpbQxtSKoSRTiVoUaKFQquBOCVkQwkmmrVqH9FyiKC1TRYv+o+eFWNW513zruiguCdRcUcWXGRhFFR1q143j7neG+IMFJ88YJaWEuHHze5bzz7v22O0aMMaP/EowMggyCDIIMggyC/o+CdGjvED4kvEe48rKLXqUgp5WVlXmpVPoDPbsQrhKMX6egT/f29tjx8TEbGhpaCAgI+Ib6HAkSwhuvQ9Bnm5ubDODC1K2trWPe3t5f0pg94a2LhOlLkDH/cluCK8GbkCiXy5kAhULB9vf3mVKp/Lu8vLzTzs4ugOZcJ5jqU5Axt41bQUFB0srKStn09LR8Z2fnr5OTk7ONjQ32PCDu4OCAbW9v/5mfn/9EIpHc4bt1aUFvEm4EBwc/HB4eXoQA7MDW1pbmpevr62xtbU0rMOfw8JCNj4/XE4/FZQWZwYvS09Mf0xGoIGJ5eVkUBgcH95KSkn7G7l52h7AzN0tLS5tJjIZ8aWlJg7a2tj9SU1Pr/P39k+goHgn950E7cpSSklJjZmZ2l3hsOJ/ONgSb+SgnJ6dkd3eXLSwsaNDf36+MjY39icY+4YYKA/9cGAempqZOc3Nz++3t7UO58Zvqw+2vwnjpiE7n5+cZ0NTU9JRecp/G3ieYnI9DGJ+dnWXFxcVz5O4PqM/hnLsLDvGxubm5Pf8IUYJAcGtgYGBhbm6OzczMsK6uLqWjo2M49V+7IKY4tbe3z4WEhDyi59uEd89Favy1CQ0NfUAOMT05Ofk7/e+MfjGCJET+1erq6hkRsImJCRYZGfkjt4OLIq+E5zKLC3LZlaioqC/Iy1TwRnCCG2vECLItKyv7jYwShsko5mxSn9dzx/SyDTt0p7q6WiHwgRvvECPIlY5IPjY2xoDk5OQ6bsC6tuvgEPjAjXeIEeRDSfKIzpwBgYGBiYIh6tgk4BD4wI13iBF0lxaqKaAhqDFLS8tAHY/rmR1ZWVkFCHwjIyNqvEOUoJ6eHnVfXx8DnJ2d711WkLW1dYDA19vbK1qQT0NDw1F3dzcDIiIivuNVoa7tbXL7bwU+cIs9MteioiK5TCZjQFZWViV3a13bB9nZ2U8EvsLCQtFGbZuWliajYMcAIlFQn6eOx4Y1np2dnQqBjxK1aLeX+Pn5fd3c3HzW0tLCRkdHWXx8/IsCo7aGuTZYCw5wgRPcYgMjgtntzMzMxcbGRgZQClG6uLhoSx3axFzDGspxBwIPOHl6MRadXH19faVVVVWn9fX1CGaMKsSnTk5O9/lOmfzLMdlgLtZgLTjABU6eaHUrP2JiYkpqampYbW0tSg9UgEp+fJ7c0CU8f5lwT0RE98QczMUarAUHuMApJF5dCjTUMTfj4uKa6esY5SPW0dHBqI5GzaMoKCj4NSwsLNHCwiLQwcEhjBLw91Q712EMczAXa7A2ISGhDVzna6NLlbDh4eGPqXJUUaJFstUEOFSQqJXVajVTqVSagh59GBPm0ZrT6OjoX3j5aqavW4emyPfw8HhIJekiXW3OKioq2ItAcxjmuru7S/kxmer7XvbsGuTm5ialY5RlZGTI8/LyjkpKSs4APKMPY15eXnHcm7Req1/VRdEHeYnDh/fd4AZurJe7veH3IYMggyCDIIMggyDt+AeCTA8AFSrCbwAAAABJRU5ErkJggg=="/></elements></component><component name="dock"><settings><setting name="iconalpha" value="1"/><setting name="iconalphaactive" value="1"/><setting name="iconalphaover" value="1"/></settings><elements><element name="button" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAgCAYAAABpRpp6AAAAzUlEQVR42u2YMQ7CMAxF7aRiSQckWtGOHKMLR2DimFyAE3CUdqWiQ4ucYANXqIiRv+T96ek7kYx1vS8A4MzT8QTIMxPPjefyhm2a5tS2bem9xxxpiSj1fV8Pw/AU4K6qduWyLJhSylIvcoSRgY8CHIgiQsb5ihTG4EBZDHjtFJ+OKANmZKuEAWvtsE7DmpbOKmGVsEr8xrB9zSsbVvdKWCVs6cywGf4bwwI8EcXknMv6+hNjFKuTD6HcIsJhw5EbVq6w43h/zPN8RW3n1hcs+1ICqMmZZQAAAABJRU5ErkJggg=="/><element name="buttonOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAgCAYAAABpRpp6AAAA1UlEQVR42u2YMQ4CIRBFgV1LoXA3snoht/MOtnoarbyF1R5ptxRsDAngTKKtnWbYzE8+oXz8/IGEum3XCyHECbwDa0FTD/AAPtewHK21h67rTFVViiJtjDGN47iZpumJwH3TrEwIQeWcScYrpVTICMB7BNZwACUI6x0kMupaFCYG/gsw0Vn7lnDmSjBw4R3moeNKcCW4EjO7h/lp/nHCxd0SXAkeOk6YE55Vwj7GlBSIMmgCISsCD97ft1obQxUaYb13DrY3BL445yS4h/2SaMCf79brC0M0WI9LC6AuAAAAAElFTkSuQmCC"/><element name="buttonActive" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAgCAYAAABpRpp6AAAAyklEQVR42u2YPQ4CIRSEccF2fwIbKz2T23kKaz2BVt7Dai9G4kJls+CbRDtbzWPzJhlCqL5MBkie6fvNWil1Ju/JreKpQB7JF0PLyTl3tNZ2WuuKI20iee+35CeAB86wUEUCIwEfANziIOesOAuMYDWqMAnwX4CZ1/dbwlkqIcCFd1gunVRCKiGVWNg7LF/zjxMu7pWQSsilk4Ql4UUlPM1zSu/JClthvgZWAI8xTru6bjqu0ICNMTxoewfwNYSwIg+0b5gG/Bm33l7CZ0/XNL9BmAAAAABJRU5ErkJggg=="/><element name="divider" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAgCAYAAAA1zNleAAAAFUlEQVR42mP4//8/AzJmGBUYFUBgAEE5fpDLFJZbAAAAAElFTkSuQmCC"/></elements></component><component name="playlist"><settings><setting name="backgroundcolor" value="0x3c3c3e"/><setting name="fontcolor" value="0x848489"/><setting name="fontsize" value="11"/><setting name="fontweight" value="normal"/><setting name="activecolor" value="0xb2b2b6"/><setting name="overcolor" value="0xb2b2b6"/><setting name="titlecolor" value="0xb9b9be"/><setting name="titlesize" value="12"/><setting name="titleweight" value="bold"/><setting name="titleactivecolor" value="0xececf4"/><setting name="titleovercolor" value="0xececf4"/></settings><elements><element name="item" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABMCAIAAACnG28HAAAAoElEQVR42u3SQQkAAAwDsQor8y9rJvYZBKLguLQD5yIBxsJYGAuMhbEwFhgLY2EsMBbGwlhgLIyFscBYGAtjgbEwFsYCY2EsjAXGwlgYC4yFsTAWGAtjYSwwFsbCWGAsjIWxwFgYC2OBsTAWxgJjYSyMBcbCWBgLjIWxMBYYC2NhLDAWxsJYYCyMhbHAWBgLY4GxMBbGAmNhLIwFxsJY/LSgjDi3dpmB4AAAAABJRU5ErkJggg=="/><element name="itemActive" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABMCAIAAACnG28HAAAAoElEQVR42u3SQQkAAAwDsToq829uJvYZBKLguLQD5yIBxsJYGAuMhbEwFhgLY2EsMBbGwlhgLIyFscBYGAtjgbEwFsYCY2EsjAXGwlgYC4yFsTAWGAtjYSwwFsbCWGAsjIWxwFgYC2OBsTAWxgJjYSyMBcbCWBgLjIWxMBYYC2NhLDAWxsJYYCyMhbHAWBgLY4GxMBbGAmNhLIwFxsJY/LRBziyQuYSeagAAAABJRU5ErkJggg=="/><element name="itemImage" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAA2CAIAAAC3LQuFAAAB9UlEQVR42u3ZiWrCQBAGYF9CzWnu05hDbX3/N+tfBqdrjEIptNL9YQo5hKQfuzM7m9V6vWU8iRX+zucLYzEIRCACEYhABCIQgQjEIBCBCEQgAv0s6nrveQGBHgZ0CHSpqtZ1fc8Lu24wr+MUr5qmudVAbXvQrbzt1j0e3/RWHKe4iB9YDeT7obndud/3ch1Sm42DKybZ/wfK8wr/dlFUcjoMx9l+cNN013nX4NT3dxZVMeWAkYwLeD0CQkrCaZ6XFgFlWaEQko9dN1gEOhxG82e2AKFUKUTbdn0/3n9yEaAkyWSgnU7vtgANw4TnOo4nqRcQWVYuAml6DsPYipV0GEZ9PxVFjedilqGW40DWPlcXxwTCLTkuy9oKIIyaNC2CIMJzISVAcZwpCu6aQFr4MQctGUExjPBQaRpmcwocOmRkiOmi0ZZmVXONLH9mQHXdmkCSfRBRlNoChMWxJJpxPM2AMExQp2RNOAuo2QIEAnRVZdnoGxgT6nMdKPl7FqJp436QTiIcTNN5EQgFzt4NMy1S6DOuDdp8QfTLWxyvBYSUhKK228W6Sr4H0p6eW643Zc7M3AT6CnOhiEiS/A9f5hWBZkkarTyBbsJs69G48bPP8iBC6kG/JoWfQPxwSCACEYhBIAIRiEAEIhCBCMQg0HeBGE/iA2Oi1tFMiSX7AAAAAElFTkSuQmCC"/><element name="divider" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANIAAAABCAIAAAAkUWeUAAAAEUlEQVR42mPQ1zccRaOIzggAmuR1T+nadMkAAAAASUVORK5CYII="/><element name="sliderRail" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAABCAYAAADErm6rAAAAIklEQVR42mP6//8/Az4sKir+X0lJ5b+ysioKBomB5AjpBwAxrjrJQvfEawAAAABJRU5ErkJggg=="/><element name="sliderCapTop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAKCAYAAACuaZ5oAAAAGUlEQVR42mP4//8/Ay0xw6gFoxaMWkB7CwB2As1P8WmmAwAAAABJRU5ErkJggg=="/><element name="sliderCapBottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAKCAYAAACuaZ5oAAAAGUlEQVR42mP4//8/Ay0xw6gFoxaMWkB7CwB2As1P8WmmAwAAAABJRU5ErkJggg=="/><element name="sliderRailCapTop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAECAYAAACUY/8YAAAAYUlEQVR42q2PSwqAMBBDe4mqrVL7sXh6vZoUDxAnxX0LungQEpJhFADVQusxC4dQXqhzT7dnfBcuY2Y4t1ao6TH7fGAYptPaBd5HhJAq1PSY/fFB4WCMG1LKFWp6kt2t/gOk+eeZy1KEHQAAAABJRU5ErkJggg=="/><element name="sliderRailCapBottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAECAYAAACUY/8YAAAAYElEQVR42mP4//8/Az4sJibxSUlJ5b+ysioKBokB5b4Q0s9ASIG0tMxGWVl5DAtAYiA5ii2wsbE1ALr0A8hAkKtBGMQGiYHkKLYAiJlcXd0MQa4FGvoZhEFskBhIjpB+AF4F6qfhUR58AAAAAElFTkSuQmCC"/><element name="sliderThumb" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAABCAYAAADErm6rAAAAKElEQVR4XmP8//8/AyHw+PHj/z9+/GD4+vUrGH/79g1MBwQEMBLSCwC4sRX/S7kwJwAAAABJRU5ErkJggg=="/><element name="sliderThumbCapBottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAECAYAAACUY/8YAAAASElEQVR42q3NoQ0AMAgFUfYXrIJH4/FIFmg6wS/1TUqaipOXRwDoVmbOiIC7w8ygqhCR2XmpCfAB4G/ArgAuYBQwCuDu1wZeW0osItX5QArCAAAAAElFTkSuQmCC"/><element name="sliderThumbCapTop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAECAYAAACUY/8YAAAAWUlEQVR42rWNoQ1AIQwF2V8QHAJJKlAoSHVJ6qpI2IMwwPsrIPji3F3OAXB/ci221nytdRPRTin5p4MxRlBViAiYGaUUxBjDs8Gcc6+1YGYQEfTekXM+N+0HR/gfgjnWeYEAAAAASUVORK5CYII="/></elements></component><component name="tooltip"><settings><setting name="fontcase" value="normal"/><setting name="fontcolor" value="0xacacac"/><setting name="fontsize" value="11"/><setting name="fontweight" value="normal"/><setting name="activecolor" value="0xffffff"/><setting name="overcolor" value="0xffffff"/></settings><elements><element name="background" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAACCAYAAABsfz2XAAAAEklEQVR42mOwtnV8RgpmIFUDAFr3JukT6L+UAAAAAElFTkSuQmCC"/><element name="arrow" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAADCAYAAACnI+4yAAAAEklEQVR42mP4//8/AymYgeYaABssa5WUTzsyAAAAAElFTkSuQmCC"/><element name="capTop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAECAYAAAC6Jt6KAAAAHUlEQVR42mMUFRU/wUACYHR1935GkgZrW0faagAAqHQGCWgiU9QAAAAASUVORK5CYII="/><element name="capBottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAECAYAAAC6Jt6KAAAAGElEQVR42mOwtnV8RgpmoL0GUVHxE6RgAO7IRsl4Cw8cAAAAAElFTkSuQmCC"/><element name="capLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAACCAYAAACUn8ZgAAAAFklEQVR42mMQFRU/YW3r+AwbZsAnCQBUPRWHq8l/fAAAAABJRU5ErkJggg=="/><element name="capRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAACCAYAAACUn8ZgAAAAFklEQVR42mOwtnV8hg2LioqfYMAnCQBwXRWHw2Rr1wAAAABJRU5ErkJggg=="/><element name="capTopLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAECAYAAABCxiV9AAAAPklEQVR4XmMQFRVnBeIiIN4FxCeQMQOQU6ijq3/VycXjiau79zNkDJLcZWvv9MTGzumZta0jCgZJnkAXhPEBnhkmTDF7/FAAAAAASUVORK5CYII="/><element name="capTopRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAECAYAAABCxiV9AAAAPklEQVR42mMQFRU/gYZ3A3ERELMyuLp7P0PGTi4eT3R09a8CJbMYrG0dnyFjGzunZ7b2Tk+AkrswJGEYZAUA8XwmRnLnEVMAAAAASUVORK5CYII="/><element name="capBottomLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAECAYAAABCxiV9AAAAMklEQVR42mMQFRU/YW3r+AwbZgBK7rK0snuCS7JQXUP7qqW1/RNskqxAXATEu0FWIGMAFlYlnOJtim4AAAAASUVORK5CYII="/><element name="capBottomRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAECAYAAABCxiV9AAAANUlEQVR42mOwtnV8hg2LioqfYMAmYWll9wQouQtD0tLa/om6hvZVoGQ2A0g7Gt4NxEVAzAoAZzolltlSH50AAAAASUVORK5CYII="/><element name="menuOption" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAARCAYAAADkIz3lAAAAdklEQVR42mP4//8/AzGYYdgpFBUVlwPiXUD8GUrLYVUoJiaxR1JS+r+srNx/EA3kH8Bl4md5ecX/iorK/xUUlP4D+T+xKgSask9GRu6/srLqfxAN5B/CqtDb21cdpBho5VcQ7enprYHL10xAzAXEPFCaaVhHIQBeKc15eWl8jgAAAABJRU5ErkJggg=="/><element name="menuOptionOver" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAARCAYAAADkIz3lAAAAdklEQVR42mP4//8/AzGYYdgpFBUVlwPiXUD8GUrLYVUoJiaxR1JS+r+srNx/EA3kH8Bl4md5ecX/iorK/xUUlP4D+T+xKgSask9GRu6/srLqfxAN5B/CqtDb21cdpBho5VcQ7enprYHL10xAzAXEPFCaaVhHIQBeKc15eWl8jgAAAABJRU5ErkJggg=="/><element name="menuOptionActive" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAARCAYAAADkIz3lAAAAqklEQVR42mP4//8/AzGYYSgohAIZIHYE4lAoDeJjKJR1c3PLffTo0aXfv39/B9EgPlBcDl2h0/379y+/fv36/9OnT/+DaKDiq0BxF3SFoc+ePQOZ9B+Gnz9//hsoHo6u0GX//v2Xr1279h+GDx48CDLRDV2hkq2tbe6uXbsunz9//geItre3B7lRGV0hMxCrAbEHEIdBaRCfGVvwgBRzADE3lGbGCJ4hENcAI1indUdh01cAAAAASUVORK5CYII="/><element name="volumeCapTop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAFCAYAAAB1j90SAAAAE0lEQVR42mP4//8/AzmYYQRoBADgm9EvDrkmuwAAAABJRU5ErkJggg=="/><element name="volumeCapBottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAFCAYAAAB1j90SAAAAE0lEQVR42mP4//8/AzmYYQRoBADgm9EvDrkmuwAAAABJRU5ErkJggg=="/><element name="volumeRailCapTop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAECAYAAAC+0w63AAAAXklEQVR42n2NWwqAIBRE3YSmJT4KafW1tZAWMN2RPkSojwPDPO5VAFSP1lMRDqG+UJexN4524bJ2hvehQU2P2efQGHs6tyCEhBhzg5oes7+PlcWUVuS8Nah5QLK77z7Bcm/CZuJM1AAAAABJRU5ErkJggg=="/><element name="volumeRailCapBottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAECAYAAAC+0w63AAAAXklEQVR42mP4//8/AwyLiUl8UlVV/6+mpoGCQWJAuS/IahmQOdLSMhvl5RUxNILEQHI4NdrY2BoATf4AUgiyBYRBbJAYSA6nRiBmcnV1MwSZDlT8GYRBbJAYSA5ZLQArC3Oj7DuqswAAAABJRU5ErkJggg=="/><element name="volumeRail" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAA0CAYAAAC6qQkaAAAAXklEQVR42mP5//8/AwyIiUn85+bmZmBkZGRABiA1X79+ZXj16gVcgoUBDaBrwiWGoZFYMCg0MpKnkZFxCPlxVONw0MjIyDgaOCM7AdC7lBuNjtGiY1TjqMbRwooijQBUhw3jnmCdzgAAAABJRU5ErkJggg=="/><element name="volumeProgress" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAA0CAYAAAC6qQkaAAAAT0lEQVR42u3LIQ4AQQhDUe5/FjJ4NH48ggQu0rWbGbEH2Iqanz4BIO9VFTITe29EBNwdqorzJ2fo7guutb7hzFzQzAgJCQkJCQkJCQn/AR/HKvJmqR7XwAAAAABJRU5ErkJggg=="/><element name="volumeProgressCapTop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAECAYAAAC+0w63AAAAWUlEQVR42p2LoQoAIRAF/f8gNsNGMZhMK+YVtpkW/A/xA9714+COC1OGGQfA/eFRMrOvte6c8yYi/2kcYwRVhYig945SCmKM4XU0s73WwpwTIoLWGlJK595da8On65TYLg8AAAAASUVORK5CYII="/><element name="volumeProgressCapBottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAECAYAAAC+0w63AAAASElEQVR42o3LIQ4AMQgFUe6v6EnwaDweyQ3aPcBf6poNyVaMm0cA6CwzZ0TA3WFmUFWIyPP9qIGjgeMX7gpywVVwFeTuaeFNL2bLq1AT4lm+AAAAAElFTkSuQmCC"/><element name="volumeThumb" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAQCAYAAAAmlE46AAABQElEQVR42p2SsWqDUBSGTYgpEqlLqNCxdHMoGTp079Y1kFJohrR5mzyCm4PpA2Rw1MlZg7gk6eSWXcxgzy//BWkbLBU+uZzz/derHq2ua+0/tK+e0BcGwlC4IEPW+nR+hNAcCffCVFiQKWsjOr12SBeuhJnv++uiKHZVVZUAa9TQo6OrMHa5FJ6DINgcj8f6cDjUeZ43YI0aenAEixnNEB48z/P3+32dZdmvoAcHLjPNDrM4jnfnQgo4PDIy2lhYbrfbU1cwTdOTuO/MaPZfg0mSlOK+MdPcXsIw7DwqHLgqiMc+rlardVcQDlx1VLzorfDquu7mXAg9ceZ0LfU78OgJGrLrRxRFn/IhSoA1agxN6BpqAEzhWnCEJ0pLMmfNoWOqAVAjZ3K3G0p3xGHNpqN/n9cBj2Dx5W0yZs1oD/kXpOphz005RgUAAAAASUVORK5CYII="/></elements></component></components></skin>';
        this.xml = a.utils.parseXML(this.text);
        return this
    }
})(jwplayer);
(function(d) {
    var g = d.html5,
        n = d.utils,
        o = d.events,
        p = o.state,
        k = n.css,
        l = n.isMobile(),
        m = document,
        a = ".jwdisplay",
        i = ".jwpreview",
        c = true,
        j = false,
        b = "absolute",
        h = "100%",
        e = "hidden",
        f = "opacity .25s, background-image .25s, color .25s";
    g.display = function(s, T) {
        var F = s.skin,
            ae, ah, O, K, u, H, Z, q = j,
            ai = {},
            X = j,
            ad = j,
            aa = {},
            r, Q, L, V, M, af = n.extend({
                showicons: c,
                bufferrotation: 45,
                bufferinterval: 100,
                fontcolor: "#ccc",
                overcolor: "#fff",
                fontsize: 15,
                fontweight: ""
            }, F.getComponentSettings("display"), T),
            U = new o.eventdispatcher(),
            v, ac;
        n.extend(this, U);

        function ab() {
            ae = m.createElement("div");
            ae.id = s.id + "_display";
            ae.className = "jwdisplay";
            ah = m.createElement("div");
            ah.className = "jwpreview jw" + s.jwGetStretching();
            ae.appendChild(ah);
            s.jwAddEventListener(o.JWPLAYER_PLAYER_STATE, x);
            s.jwAddEventListener(o.JWPLAYER_PLAYLIST_ITEM, y);
            s.jwAddEventListener(o.JWPLAYER_PLAYLIST_COMPLETE, W);
            s.jwAddEventListener(o.JWPLAYER_MEDIA_ERROR, w);
            s.jwAddEventListener(o.JWPLAYER_ERROR, w);
            if (!l) {
                ae.addEventListener("click", ag, j)
            } else {
                O = new n.touch(ae);
                O.addEventListener(n.touchEvents.TAP, ag)
            }
            Y();
            x({
                newstate: p.IDLE
            })
        }

        function ag(ak) {
            if (v && (s.jwGetControls() || s.jwGetState() == p.PLAYING)) {
                v(ak);
                return
            }
            if (!l || !s.jwGetControls()) {
                U.sendEvent(o.JWPLAYER_DISPLAY_CLICK)
            }
            if (!s.jwGetControls()) {
                return
            }
            var al = J();
            if (ac && al - ac < 500) {
                s.jwSetFullscreen();
                ac = undefined
            } else {
                ac = J()
            }
            var aj = n.bounds(ae.parentNode.querySelector(".jwcontrolbar")),
                ao = n.bounds(ae),
                an = {
                    left: aj.left - 10 - ao.left,
                    right: aj.left + 30 - ao.left,
                    top: ao.bottom - 40,
                    bottom: ao.bottom
                },
                am = {
                    left: aj.right - 30 - ao.left,
                    right: aj.right + 10 - ao.left,
                    top: an.top,
                    bottom: an.bottom
                };
            if (l) {
                if (N(an, ak.x, ak.y)) {} else {
                    if (N(am, ak.x, ak.y)) {
                        s.jwSetFullscreen();
                        return
                    } else {
                        U.sendEvent(o.JWPLAYER_DISPLAY_CLICK);
                        if (r) {
                            return
                        }
                    }
                }
            }
            switch (s.jwGetState()) {
                case p.PLAYING:
                case p.BUFFERING:
                    s.jwPause();
                    break;
                default:
                    s.jwPlay();
                    break
            }
        }

        function N(ak, aj, al) {
            return (aj >= ak.left && aj <= ak.right && al >= ak.top && al <= ak.bottom)
        }

        function J() {
            return new Date().getTime()
        }
        this.clickHandler = ag;

        function Y() {
            var aj = {
                    font: af.fontweight + " " + af.fontsize + "px/" + (parseInt(af.fontsize, 10) + 3) + "px Arial, Helvetica, sans-serif",
                    color: af.fontcolor
                },
                ak = {
                    color: af.overcolor
                };
            L = new g.displayicon(ae.id + "_button", s, aj, ak);
            ae.appendChild(L.element())
        }

        function A(aj, ak) {
            if (!af.showicons) {
                return
            }
            if (aj || ak) {
                L.setRotation(aj == "buffer" ? parseInt(af.bufferrotation, 10) : 0, parseInt(af.bufferinterval, 10));
                L.setIcon(aj);
                L.setText(ak)
            } else {
                L.hide()
            }
        }

        function y() {
            B();
            K = s.jwGetPlaylist()[s.jwGetPlaylistIndex()];
            var aj = K ? K.image : "";
            M = undefined;
            t(aj)
        }

        function t(aj) {
            if (u != aj) {
                if (u) {
                    R(i, j)
                }
                u = aj;
                I()
            } else {
                if (u && !r) {
                    R(i, c)
                }
            }
            z(s.jwGetState())
        }

        function W() {
            ad = c;
            A("replay");
            var aj = s.jwGetPlaylist()[0];
            t(aj.image)
        }
        var G;

        function E() {
            return V ? V : (s ? s.jwGetState() : p.IDLE)
        }

        function x(aj) {
            clearTimeout(G);
            G = setTimeout(function() {
                z(aj.newstate)
            }, 100)
        }

        function z(ak) {
            ak = E();
            if (ak != M) {
                M = ak;
                if (L) {
                    L.setRotation(0)
                }
                switch (ak) {
                    case p.IDLE:
                        if (!X && !ad) {
                            if (u && !q) {
                                R(i, c)
                            }
                            var aj = true;
                            if (s._model && s._model.config.displaytitle === false) {
                                aj = false
                            }
                            A("play", (K && aj) ? K.title : "")
                        }
                        break;
                    case p.BUFFERING:
                        B();
                        ad = j;
                        A("buffer");
                        break;
                    case p.PLAYING:
                        A();
                        break;
                    case p.PAUSED:
                        A("play");
                        break
                }
            }
        }
        this.forceState = function(aj) {
            V = aj;
            z(aj);
            this.show()
        };
        this.releaseState = function(aj) {
            V = null;
            z(aj);
            this.show()
        };
        this.hidePreview = function(aj) {
            q = aj;
            R(i, !aj);
            if (aj) {
                r = true
            }
        };
        this.setHiding = function() {
            r = true
        };
        this.element = function() {
            return ae
        };

        function S(aj) {
            return "#" + ae.id + " " + aj
        }

        function I() {
            if (u) {
                var aj = new Image();
                aj.addEventListener("load", D, j);
                aj.src = u
            } else {
                k(S(i), {
                    "background-image": undefined
                });
                R(i, j);
                H = Z = 0
            }
        }

        function D() {
            H = this.width;
            Z = this.height;
            z(s.jwGetState());
            C();
            if (u) {
                k(S(i), {
                    "background-image": "url(" + u + ")"
                })
            }
        }

        function w(aj) {
            X = c;
            A("error", aj.message)
        }

        function B() {
            X = j;
            if (ai.error) {
                ai.error.setText()
            }
        }

        function C() {
            if (ae.clientWidth * ae.clientHeight > 0) {
                n.stretch(s.jwGetStretching(), ah, ae.clientWidth, ae.clientHeight, H, Z)
            }
        }
        this.redraw = C;

        function R(aj, ak) {
            if (!n.exists(aa[aj])) {
                aa[aj] = false
            }
            if (aa[aj] != ak) {
                aa[aj] = ak;
                k(S(aj), {
                    opacity: ak ? 1 : 0,
                    visibility: ak ? "visible" : "hidden"
                })
            }
        }
        this.show = function(aj) {
            if (L && (aj || E() != p.PLAYING)) {
                P();
                ae.style.display = "block";
                L.show();
                r = false
            }
        };
        this.hide = function() {
            if (L) {
                L.hide();
                r = true
            }
        };

        function P() {
            clearTimeout(Q);
            Q = undefined
        }
        this.setAlternateClickHandler = function(aj) {
            v = aj
        };
        this.revertAlternateClickHandler = function() {
            v = undefined
        };
        ab()
    };
    k(a, {
        position: b,
        cursor: "pointer",
        width: h,
        height: h,
        overflow: e
    });
    k(a + " .jwpreview", {
        position: b,
        width: h,
        height: h,
        background: "no-repeat center",
        overflow: e,
        opacity: 0
    });
    k(a + ", " + a + " *", {
        "-webkit-transition": f,
        "-moz-transition": f,
        "-o-transition": f
    })
})(jwplayer);
(function(b) {
    var d = b.html5,
        h = b.utils,
        f = h.css,
        c = ".jwplayer .jwdisplayIcon",
        g = document,
        a = "none",
        e = "100%",
        i = "center";
    d.displayicon = function(n, H, s, B) {
        var v = H.skin,
            w, I, O, z, u, m, C, A = {},
            E, D = 0,
            x = -1,
            L = 0;

        function y() {
            w = K("jwdisplayIcon");
            w.id = n;
            t();
            m = K("jwtext", w, s, B);
            C = K("jwicon", w);
            H.jwAddEventListener(b.events.JWPLAYER_RESIZE, r);
            k();
            l()
        }

        function p(P, Q) {
            return "#" + n + (Q ? ":hover" : "") + " " + (P ? P : "")
        }

        function K(Q, S, R, P) {
            var T = g.createElement("div");
            T.className = Q;
            if (S) {
                S.appendChild(T)
            }
            if (w) {
                M(T, Q, "." + Q, R, P)
            }
            return T
        }

        function t() {
            I = F("background");
            O = F("capLeft");
            z = F("capRight");
            u = (O.width * z.width > 0);
            var P = {
                "background-image": "url(" + O.src + "), url(" + I.src + "), url(" + z.src + ")",
                "background-position": "left,center,right",
                "background-repeat": "no-repeat",
                padding: "0 " + z.width + "px 0 " + O.width + "px",
                height: I.height,
                "margin-top": I.height / -2
            };
            f(p(), P);
            if (!h.isMobile()) {
                if (I.overSrc) {
                    P["background-image"] = "url(" + O.overSrc + "), url(" + I.overSrc + "), url(" + z.overSrc + ")"
                }
                f("#" + H.id + " .jwdisplay:hover " + p(), P)
            }
        }

        function M(T, R, P, U, Q) {
            var S = F(R);
            if (R == "replayIcon" && !S.src) {
                S = F("playIcon")
            }
            if (S.src) {
                U = h.extend({}, U);
                if (R.indexOf("Icon") > 0) {
                    D = S.width | 0
                }
                U.width = S.width;
                U["background-image"] = "url(" + S.src + ")";
                U["background-size"] = S.width + "px " + S.height + "px";
                Q = h.extend({}, Q);
                if (S.overSrc) {
                    Q["background-image"] = "url(" + S.overSrc + ")"
                }
                if (!h.isMobile()) {
                    f("#" + H.id + " .jwdisplay:hover " + P, Q)
                }
                f.style(w, {
                    display: "table"
                })
            } else {
                f.style(w, {
                    display: "none"
                })
            }
            if (U) {
                f.style(T, U)
            }
            E = S
        }

        function F(Q) {
            var R = v.getSkinElement("display", Q),
                P = v.getSkinElement("display", Q + "Over");
            if (R) {
                R.overSrc = (P && P.src) ? P.src : "";
                return R
            }
            return {
                src: "",
                overSrc: "",
                width: 0,
                height: 0
            }
        }

        function l() {
            var P = u || (D === 0);
            f.style(m, {
                display: (m.innerHTML && P) ? "" : a
            });
            L = P ? 30 : 0;
            r()
        }

        function r() {
            clearTimeout(x);
            if (L-- > 0) {
                x = setTimeout(r, 33)
            }
            var Q = "px " + e;
            var P = Math.ceil(Math.max(E.width, h.bounds(w).width - z.width - O.width));
            var R = {
                "background-size": [O.width + Q, P + Q, z.width + Q].join(", ")
            };
            if (w.parentNode) {
                R.left = (w.parentNode.clientWidth % 2 == 1) ? "0.5px" : ""
            }
            f.style(w, R)
        }
        this.element = function() {
            return w
        };
        this.setText = function(Q) {
            var P = m.style;
            m.innerHTML = Q ? Q.replace(":", ":<br>") : "";
            P.height = "0";
            P.display = "block";
            if (Q) {
                while (j(m) > 2) {
                    m.innerHTML = m.innerHTML.replace(/(.*) .*$/, "$1...")
                }
            }
            P.height = "";
            P.display = "";
            l()
        };
        this.setIcon = function(P) {
            var Q = A[P];
            if (!Q) {
                Q = K("jwicon");
                Q.id = w.id + "_" + P
            }
            M(Q, P + "Icon", "#" + Q.id);
            if (w.contains(C)) {
                w.replaceChild(Q, C)
            } else {
                w.appendChild(Q)
            }
            C = Q
        };
        var q, o = 0,
            N;

        function G(Q, P) {
            clearInterval(q);
            N = 0;
            o = Q | 0;
            if (o === 0) {
                J()
            } else {
                q = setInterval(J, P)
            }
        }

        function J() {
            N = (N + o) % 360;
            h.rotate(C, N)
        }
        this.setRotation = G;

        function j(P) {
            return Math.floor(P.scrollHeight / g.defaultView.getComputedStyle(P, null).lineHeight.replace("px", ""))
        }
        var k = this.hide = function() {
            w.style.opacity = 0
        };
        this.show = function() {
            w.style.opacity = 1
        };
        y()
    };
    f(c, {
        display: "table",
        cursor: "pointer",
        position: "relative",
        "margin-left": "auto",
        "margin-right": "auto",
        top: "50%"
    });
    f(c + " div", {
        position: "relative",
        display: "table-cell",
        "vertical-align": "middle",
        "background-repeat": "no-repeat",
        "background-position": i
    });
    f(c + " div", {
        "vertical-align": "middle"
    }, true);
    f(c + " .jwtext", {
        color: "#fff",
        padding: "0 1px",
        "max-width": "300px",
        "overflow-y": "hidden",
        "text-align": i,
        "-webkit-user-select": a,
        "-moz-user-select": a,
        "-ms-user-select": a,
        "user-select": a
    })
})(jwplayer);
(function(d) {
    var f = d.html5,
        k = d.utils,
        i = k.css,
        e = k.bounds,
        b = ".jwdock",
        h = ".jwdockbuttons",
        j = document,
        c = "none",
        a = "block",
        g = "100%";
    f.dock = function(w, G) {
        var z = w,
            y = {
                iconalpha: 0.75,
                iconalphaactive: 0.5,
                iconalphaover: 1,
                margin: 8
            },
            r = k.extend({}, y, G),
            l = z.id + "_dock",
            s = z.skin,
            C = 0,
            o = {},
            p = {},
            t, D, H, A, B = this;

        function u() {
            B.visible = false;
            t = F("div", "jwdock");
            D = F("div", "jwdockbuttons");
            t.appendChild(D);
            t.id = l;
            v();
            setTimeout(function() {
                H = e(t)
            })
        }

        function v() {
            var J = x("button"),
                K = x("buttonOver"),
                L = x("buttonActive");
            if (!J) {
                return
            }
            i(m(), {
                height: J.height,
                padding: r.margin
            });
            i(h, {
                height: J.height
            });
            i(m("button"), k.extend(q(J), {
                width: J.width,
                cursor: "pointer",
                border: c
            }));
            i(m("button:hover"), q(K));
            i(m("button:active"), q(L));
            i(m("button>div"), {
                opacity: r.iconalpha
            });
            i(m("button:hover>div"), {
                opacity: r.iconalphaover
            });
            i(m("button:active>div"), {
                opacity: r.iconalphaactive
            });
            i(m(".jwoverlay"), {
                top: r.margin + J.height
            });
            E("capLeft", D);
            E("capRight", D);
            E("divider")
        }

        function q(J) {
            if (!(J && J.src)) {
                return {}
            }
            return {
                background: "url(" + J.src + ") center",
                "background-size": J.width + "px " + J.height + "px"
            }
        }

        function E(L, K) {
            var J = x(L);
            i(m("." + L), k.extend(q(J), {
                width: J.width
            }));
            return F("div", L, K)
        }

        function m(J) {
            return "#" + l + " " + (J ? J : "")
        }

        function F(L, J, K) {
            var M = j.createElement(L);
            if (J) {
                M.className = J
            }
            if (K) {
                K.appendChild(M)
            }
            return M
        }

        function x(J) {
            var K = s.getSkinElement("dock", J);
            return K ? K : {
                width: 0,
                height: 0,
                src: ""
            }
        }
        B.redraw = function() {
            H = e(t)
        };

        function I(K) {
            var N = p[K],
                J, M = o[K],
                O, L = e(M.icon);
            N.offsetX(0);
            O = e(t);
            i("#" + N.element().id, {
                left: L.left - O.left + L.width / 2
            });
            J = e(N.element());
            if (O.left > J.left) {
                N.offsetX(O.left - J.left + 8)
            }
        }
        B.element = function() {
            return t
        };
        B.offset = function(J) {
            i(m(), {
                "margin-left": J
            })
        };
        B.hide = function() {
            if (!B.visible) {
                return
            }
            B.visible = false;
            t.style.opacity = 0;
            clearTimeout(A);
            A = setTimeout(function() {
                t.style.display = c
            }, 250)
        };
        B.showTemp = function() {
            if (!B.visible) {
                t.style.opacity = 0;
                t.style.display = a
            }
        };
        B.hideTemp = function() {
            if (!B.visible) {
                t.style.display = c
            }
        };
        B.show = function() {
            if (B.visible || !C) {
                return
            }
            B.visible = true;
            t.style.display = a;
            clearTimeout(A);
            A = setTimeout(function() {
                t.style.opacity = 1
            }, 0)
        };
        B.addButton = function(K, S, O, L) {
            if (o[L]) {
                return
            }
            var M = F("div", "divider", D),
                N = F("button", null, D),
                R = F("div", null, N);
            R.id = l + "_" + L;
            R.innerHTML = "&nbsp;";
            i("#" + R.id, {
                "background-image": K
            });
            if (typeof O == "string") {
                O = new Function(O)
            }
            if (!k.isMobile()) {
                N.addEventListener("click", function(U) {
                    O(U);
                    U.preventDefault()
                })
            } else {
                var J = new k.touch(N);
                J.addEventListener(k.touchEvents.TAP, function(U) {
                    O(U)
                })
            }
            o[L] = {
                element: N,
                label: S,
                divider: M,
                icon: R
            };
            if (S) {
                var T = new f.overlay(R.id + "_tooltip", s, true),
                    P = F("div");
                P.id = R.id + "_label";
                P.innerHTML = S;
                i("#" + P.id, {
                    padding: 3
                });
                T.setContents(P);
                if (!k.isMobile()) {
                    var Q;
                    N.addEventListener("mouseover", function() {
                        clearTimeout(Q);
                        I(L);
                        T.show();
                        k.foreach(p, function(U, V) {
                            if (U != L) {
                                V.hide()
                            }
                        })
                    }, false);
                    N.addEventListener("mouseout", function() {
                        Q = setTimeout(T.hide, 100)
                    }, false);
                    t.appendChild(T.element());
                    p[L] = T
                }
            }
            C++;
            n()
        };
        B.removeButton = function(K) {
            if (o[K]) {
                D.removeChild(o[K].element);
                D.removeChild(o[K].divider);
                var J = document.getElementById("" + l + "_" + K + "_tooltip");
                if (J) {
                    t.removeChild(J)
                }
                delete o[K];
                C--;
                n()
            }
        };
        B.numButtons = function() {
            return C
        };

        function n() {
            i(h + " .capLeft, " + h + " .capRight", {
                display: C ? a : c
            })
        }
        u()
    };
    i(b, {
        opacity: 0,
        display: c
    });
    i(b + " > *", {
        height: g,
        "float": "left"
    });
    i(b + " > .jwoverlay", {
        height: "auto",
        "float": c,
        "z-index": 99
    });
    i(h + " button", {
        position: "relative"
    });
    i(h + " > *", {
        height: g,
        "float": "left"
    });
    i(h + " .divider", {
        display: c
    });
    i(h + " button ~ .divider", {
        display: a
    });
    i(h + " .capLeft, " + h + " .capRight", {
        display: c
    });
    i(h + " .capRight", {
        "float": "right"
    });
    i(h + " button > div", {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        margin: 5,
        position: "absolute",
        "background-position": "center",
        "background-repeat": "no-repeat"
    });
    k.transitionStyle(b, "background .25s, opacity .25s");
    k.transitionStyle(b + " .jwoverlay", "opacity .25s");
    k.transitionStyle(h + " button div", "opacity .25s")
})(jwplayer);
(function(b, f) {
    var a = b.html5,
        d = b.utils,
        e = b.events,
        c = e.state,
        g = b.playlist;
    a.instream = function(o, l, j, D) {
        var Q = {
            controlbarseekable: "never",
            controlbarpausable: true,
            controlbarstoppable: true,
            loadingmessage: "Loading ad",
            playlistclickable: true,
            skipoffset: null,
            tag: null
        };
        var I, s, v = 0,
            k, P = {
                controlbarseekable: "never",
                controlbarpausable: false,
                controlbarstoppable: false
            },
            B, q, G, m, K, i, M, N, F, x, h = new e.eventdispatcher(),
            E, y, n = this,
            C = true,
            w = -1;
        o.jwAddEventListener(e.JWPLAYER_RESIZE, J);
        o.jwAddEventListener(e.JWPLAYER_FULLSCREEN, r);
        n.init = function() {
            q = D.detachMedia();
            O();
            y = new a.model({}, N);
            y.setVolume(l.volume);
            y.setMute(l.mute);
            M = l.playlist[l.item];
            G = q.src ? q.src : q.currentSrc;
            m = q.innerHTML;
            K = q.currentTime;
            if (D.checkBeforePlay() || K === 0) {
                i = c.PLAYING;
                C = false
            } else {
                if (o.jwGetState() === c.IDLE || l.getVideo().checkComplete()) {
                    i = c.IDLE
                } else {
                    i = c.PLAYING
                }
            }
            if (i == c.PLAYING) {
                q.pause()
            }
            x = new a.display(n);
            x.forceState(c.BUFFERING);
            E = document.createElement("div");
            E.id = n.id + "_instream_container";
            E.appendChild(x.element());
            F = new a.controlbar(n);
            F.instreamMode(true);
            E.appendChild(F.element());
            if (o.jwGetControls()) {
                F.show();
                x.show()
            } else {
                F.hide();
                x.hide()
            }
            j.setupInstream(E, F, x, y);
            J();
            n.jwInstreamSetText(Q.loadingmessage)
        };
        n.load = function(T, R) {
            if (d.isAndroid(2.3)) {
                L({
                    type: e.JWPLAYER_ERROR,
                    message: "Error loading instream: Cannot play instream on Android 2.3"
                });
                return
            }
            z(e.JWPLAYER_PLAYLIST_ITEM, {
                index: v
            }, true);
            var V = d.bounds(document.getElementById(o.id));
            var U = j.getSafeRegion();
            if (d.typeOf(T) == "object") {
                I = new g.item(T);
                y.setPlaylist([T]);
                P = d.extend(Q, R);
                B = new a.adskipbutton(o, V.height - (U.y + U.height) + 10, P.skipMessage, P.skipText);
                B.addEventListener(e.JWPLAYER_AD_SKIPPED, u);
                B.reset(P.skipoffset || -1)
            } else {
                if (d.typeOf(T) == "array") {
                    var W;
                    if (R) {
                        k = R;
                        W = R[v]
                    }
                    P = d.extend(Q, W);
                    B = new a.adskipbutton(o, V.height - (U.y + U.height) + 10, P.skipMessage, P.skipText);
                    B.addEventListener(e.JWPLAYER_AD_SKIPPED, u);
                    B.reset(P.skipoffset || -1);
                    s = T;
                    T = s[v];
                    I = new g.item(T);
                    y.setPlaylist([T])
                }
            }
            if (o.jwGetControls()) {
                B.show()
            } else {
                B.hide()
            }
            var S = B.element();
            E.appendChild(S);
            y.addEventListener(e.JWPLAYER_ERROR, L);
            x.setAlternateClickHandler(function(X) {
                if (o.jwGetControls()) {
                    if (y.state == c.PAUSED) {
                        n.jwInstreamPlay()
                    } else {
                        n.jwInstreamPause()
                    }
                    X.hasControls = true
                } else {
                    X.hasControls = false
                }
                z(e.JWPLAYER_INSTREAM_CLICK, X)
            });
            if (d.isIE()) {
                q.parentElement.addEventListener("click", x.clickHandler)
            }
            j.addEventListener(e.JWPLAYER_AD_SKIPPED, u);
            N.load(y.playlist[0])
        };

        function L(R) {
            z(R.type, R);
            if (y) {
                o.jwInstreamDestroy(false, n)
            }
        }
        n.jwInstreamDestroy = function(R) {
            if (!y) {
                return
            }
            clearTimeout(w);
            w = -1;
            N.detachMedia();
            D.attachMedia();
            if (i != c.IDLE) {
                l.getVideo().load(M, false)
            } else {
                l.getVideo().stop()
            }
            h.resetEventListeners();
            N.resetEventListeners();
            y.resetEventListeners();
            if (F) {
                try {
                    F.element().parentNode.removeChild(F.element())
                } catch (S) {}
            }
            if (x) {
                if (q && q.parentElement) {
                    q.parentElement.removeEventListener("click", x.clickHandler)
                }
                x.revertAlternateClickHandler()
            }
            z(e.JWPLAYER_INSTREAM_DESTROYED, {
                reason: R ? "complete" : "destroyed"
            }, true);
            if (i == c.PLAYING) {
                q.play();
                if (l.playlist[l.item] == M) {
                    if (C) {
                        l.getVideo().seek(K)
                    }
                }
            }
            j.destroyInstream(N.audioMode());
            y = null
        };
        n.jwInstreamAddEventListener = function(R, S) {
            h.addEventListener(R, S)
        };
        n.jwInstreamRemoveEventListener = function(R, S) {
            h.removeEventListener(R, S)
        };
        n.jwInstreamPlay = function() {
            N.play(true);
            l.state = c.PLAYING;
            x.show()
        };
        n.jwInstreamPause = function() {
            N.pause(true);
            l.state = c.PAUSED;
            if (o.jwGetControls()) {
                x.show()
            }
        };
        n.jwInstreamSeek = function(R) {
            N.seek(R)
        };
        n.jwInstreamSetText = function(R) {
            F.setText(R)
        };
        n.jwInstreamState = function() {
            return l.state
        };

        function O() {
            N = new a.video(q);
            N.addGlobalListener(p);
            N.addEventListener(e.JWPLAYER_MEDIA_META, A);
            N.addEventListener(e.JWPLAYER_MEDIA_COMPLETE, H);
            N.addEventListener(e.JWPLAYER_MEDIA_BUFFER_FULL, t);
            N.addEventListener(e.JWPLAYER_MEDIA_ERROR, L);
            N.addEventListener(e.JWPLAYER_MEDIA_TIME, function(R) {
                if (B) {
                    B.updateSkipTime(R.position, R.duration)
                }
            });
            N.attachMedia();
            N.mute(l.mute);
            N.volume(l.volume)
        }

        function u(R) {
            z(R.type, R);
            H(null)
        }

        function p(R) {
            z(R.type, R)
        }

        function r(R) {
            J();
            if (!R.fullscreen && d.isIPad()) {
                if (y.state === c.PAUSED) {
                    x.show(true)
                } else {
                    if (y.state === c.PLAYING) {
                        x.hide()
                    }
                }
            }
        }

        function t() {
            if (x) {
                x.releaseState(n.jwGetState())
            }
            N.play()
        }

        function H() {
            if (s && v + 1 < s.length) {
                v++;
                var R = s[v];
                I = new g.item(R);
                y.setPlaylist([R]);
                var S;
                if (k) {
                    S = k[v]
                }
                P = d.extend(Q, S);
                N.load(y.playlist[0]);
                B.reset(P.skipoffset || -1);
                w = setTimeout(function() {
                    z(e.JWPLAYER_PLAYLIST_ITEM, {
                        index: v
                    }, true)
                }, 0)
            } else {
                w = setTimeout(function() {
                    z(e.JWPLAYER_PLAYLIST_COMPLETE, {}, true);
                    o.jwInstreamDestroy(true, n)
                }, 0)
            }
        }

        function A(R) {
            if (R.width && R.height) {
                if (x) {
                    x.releaseState(n.jwGetState())
                }
                j.resizeMedia()
            }
        }

        function z(R, S) {
            S = S || {};
            if (Q.tag && !S.tag) {
                S.tag = Q.tag
            }
            h.sendEvent(R, S)
        }

        function J() {
            if (F) {
                F.redraw()
            }
            if (x) {
                x.redraw()
            }
        }
        n.setControls = function(R) {
            if (R) {
                B.show()
            } else {
                B.hide()
            }
        };
        n.jwPlay = function() {
            if (P.controlbarpausable.toString().toLowerCase() == "true") {
                n.jwInstreamPlay()
            }
        };
        n.jwPause = function() {
            if (P.controlbarpausable.toString().toLowerCase() == "true") {
                n.jwInstreamPause()
            }
        };
        n.jwStop = function() {
            if (P.controlbarstoppable.toString().toLowerCase() == "true") {
                o.jwInstreamDestroy(false, n);
                o.jwStop()
            }
        };
        n.jwSeek = function(R) {
            switch (P.controlbarseekable.toLowerCase()) {
                case "never":
                    return;
                case "always":
                    n.jwInstreamSeek(R);
                    break;
                case "backwards":
                    if (y.position > R) {
                        n.jwInstreamSeek(R)
                    }
                    break
            }
        };
        n.jwSeekDrag = function(R) {
            y.seekDrag(R)
        };
        n.jwGetPosition = function() {};
        n.jwGetDuration = function() {};
        n.jwGetWidth = o.jwGetWidth;
        n.jwGetHeight = o.jwGetHeight;
        n.jwGetFullscreen = o.jwGetFullscreen;
        n.jwSetFullscreen = o.jwSetFullscreen;
        n.jwGetVolume = function() {
            return l.volume
        };
        n.jwSetVolume = function(R) {
            y.setVolume(R);
            o.jwSetVolume(R)
        };
        n.jwGetMute = function() {
            return l.mute
        };
        n.jwSetMute = function(R) {
            y.setMute(R);
            o.jwSetMute(R)
        };
        n.jwGetState = function() {
            if (!y) {
                return c.IDLE
            }
            return y.state
        };
        n.jwGetPlaylist = function() {
            return [I]
        };
        n.jwGetPlaylistIndex = function() {
            return 0
        };
        n.jwGetStretching = function() {
            return l.config.stretching
        };
        n.jwAddEventListener = function(S, R) {
            h.addEventListener(S, R)
        };
        n.jwRemoveEventListener = function(S, R) {
            h.removeEventListener(S, R)
        };
        n.jwSetCurrentQuality = function() {};
        n.jwGetQualityLevels = function() {
            return []
        };
        n.jwGetControls = function() {
            return o.jwGetControls()
        };
        n.skin = o.skin;
        n.id = o.id + "_instream";
        return n
    }
})(window.jwplayer);
(function(c) {
    var m = c.utils,
        h = c.html5,
        l = m.css,
        o = c.events.state,
        i = undefined,
        j = "free",
        f = "pro",
        g = "premium",
        n = "ads",
        e = "open",
        p = "http://www.longtailvideo.com/jwpabout/?a=l&v=",
        a = "visible",
        d = "hidden",
        k = ".jwlogo";
    var b = h.logo = function(x, y) {
        var D = x,
            E = D.id + "_logo",
            u, r, v = b.defaults,
            C = false;

        function w() {
            B();
            s()
        }

        function B() {
            var F = "o";
            if (D.edition) {
                F = z(D.edition())
            }
            if (F == "o" || F == "f") {
                v.link = p + c.version + "&m=h&e=" + F
            }
            u = m.extend({}, v, y);
            u.hide = (u.hide.toString() == "true")
        }

        function s() {
            r = document.createElement("img");
            r.className = "jwlogo";
            r.id = E;
            if (!u.file) {
                r.style.display = "none";
                return
            }
            var F = (/(\w+)-(\w+)/).exec(u.position),
                G = {},
                I = u.margin;
            if (F.length == 3) {
                G[F[1]] = I;
                G[F[2]] = I
            } else {
                G.top = G.right = I
            }
            l(q(), G);
            r.src = (u.prefix ? u.prefix : "") + u.file;
            if (!m.isMobile()) {
                r.onclick = A
            } else {
                var H = new m.touch(r);
                H.addEventListener(m.touchEvents.TAP, A)
            }
        }
        this.resize = function(G, F) {};
        this.element = function() {
            return r
        };
        this.offset = function(F) {
            l(q(), {
                "margin-bottom": F
            })
        };
        this.position = function() {
            return u.position
        };
        this.margin = function() {
            return parseInt(u.margin)
        };

        function t() {
            if (D.jwGetState() == o.IDLE || D.jwGetState() == o.PAUSED) {
                D.jwPlay()
            } else {
                D.jwPause()
            }
        }

        function A(F) {
            if (m.exists(F) && F.stopPropagation) {
                F.stopPropagation()
            }
            if (!C || !u.link) {
                t()
            }
            if (C && u.link) {
                D.jwPause();
                D.jwSetFullscreen(false);
                window.open(u.link, u.linktarget)
            }
            return
        }

        function z(F) {
            if (F == f) {
                return "p"
            } else {
                if (F == g) {
                    return "r"
                } else {
                    if (F == n) {
                        return "a"
                    } else {
                        if (F == j) {
                            return "f"
                        } else {
                            return "o"
                        }
                    }
                }
            }
        }

        function q(F) {
            return "#" + E + " " + (F ? F : "")
        }
        this.hide = function(F) {
            if (u.hide || F) {
                C = false;
                r.style.visibility = "hidden";
                r.style.opacity = 0
            }
        };
        this.show = function() {
            C = true;
            r.style.visibility = "visible";
            r.style.opacity = 1
        };
        w();
        return this
    };
    b.defaults = {
        prefix: m.repo(),
        file: "logo.png",
        linktarget: "_top",
        margin: 8,
        hide: false,
        position: "top-right"
    };
    l(k, {
        cursor: "pointer",
        position: "absolute",
        "z-index": 100,
        opacity: 0
    });
    m.transitionStyle(k, "visibility .25s, opacity .25s")
})(jwplayer);
(function(c) {
    var f = c.html5,
        j = c.utils,
        i = j.css,
        h = "jwmenu",
        d = "jwoption",
        g, a = "#ffffff",
        b = "#cccccc";
    f.menu = function(l, m, z, s) {
        var w = m,
            n = s,
            p = new f.overlay(w + "_overlay", z),
            q = j.extend({
                fontcase: g,
                fontcolor: b,
                fontsize: 11,
                fontweight: g,
                activecolor: a,
                overcolor: a
            }, z.getComponentSettings("tooltip")),
            o, y = [];

        function v() {
            o = t(h);
            o.id = w;
            var E = r("menuTop" + l),
                C = r("menuOption"),
                B = r("menuOptionOver"),
                D = r("menuOptionActive");
            if (E && E.image) {
                var F = new Image();
                F.src = E.src;
                F.width = E.width;
                F.height = E.height;
                o.appendChild(F)
            }
            if (C) {
                var A = "#" + m + " ." + d;
                i(A, j.extend(x(C), {
                    height: C.height,
                    color: q.fontcolor,
                    "padding-left": C.width,
                    font: q.fontweight + " " + q.fontsize + "px Arial,Helvetica,sans-serif",
                    "line-height": C.height,
                    "text-transform": (q.fontcase == "upper") ? "uppercase" : g
                }));
                i(A + ":hover", j.extend(x(B), {
                    color: q.overcolor
                }));
                i(A + ".active", j.extend(x(D), {
                    color: q.activecolor
                }))
            }
            p.setContents(o)
        }

        function x(A) {
            if (!(A && A.src)) {
                return {}
            }
            return {
                background: "url(" + A.src + ") no-repeat left",
                "background-size": A.width + "px " + A.height + "px"
            }
        }
        this.element = function() {
            return p.element()
        };
        this.addOption = function(B, D) {
            var C = t(d, o);
            C.id = w + "_option_" + D;
            C.innerHTML = B;
            if (!j.isMobile()) {
                C.addEventListener("click", u(y.length, D))
            } else {
                var A = new j.touch(C);
                A.addEventListener(j.touchEvents.TAP, u(y.length, D))
            }
            y.push(C)
        };

        function u(A, B) {
            return function() {
                k(A);
                if (n) {
                    n(B)
                }
            }
        }
        this.clearOptions = function() {
            while (y.length > 0) {
                o.removeChild(y.pop())
            }
        };
        var k = this.setActive = function(A) {
            for (var B = 0; B < y.length; B++) {
                var C = y[B];
                C.className = C.className.replace(" active", "");
                if (B == A) {
                    C.className += " active"
                }
            }
        };

        function t(B, A) {
            var C = document.createElement("div");
            if (B) {
                C.className = B
            }
            if (A) {
                A.appendChild(C)
            }
            return C
        }

        function r(A) {
            var B = z.getSkinElement("tooltip", A);
            return B ? B : {
                width: 0,
                height: 0,
                src: g
            }
        }
        this.show = p.show;
        this.hide = p.hide;
        this.offsetX = p.offsetX;
        this.positionX = p.positionX;
        this.constrainX = p.constrainX;
        v()
    };

    function e(k) {
        return "." + k.replace(/ /g, " .")
    }
    i(e(h + " " + d), {
        cursor: "pointer",
        position: "relative"
    })
})(jwplayer);
(function(b) {
    var a = jwplayer.utils,
        d = jwplayer.events,
        e = undefined,
        c = true,
        f = false;
    b.model = function(i, h) {
        var o = this,
            k, q, r = a.getCookies(),
            g = {
                controlbar: {},
                display: {}
            },
            m = {
                autostart: f,
                controls: c,
                debug: e,
                fullscreen: f,
                height: 320,
                mobilecontrols: f,
                mute: f,
                playlist: [],
                playlistposition: "none",
                playlistsize: 180,
                playlistlayout: "extended",
                repeat: f,
                skin: e,
                stretching: a.stretching.UNIFORM,
                width: 480,
                volume: 90
            };

        function n(s) {
            a.foreach(s, function(t, u) {
                s[t] = a.serialize(u)
            });
            return s
        }

        function p() {
            a.extend(o, new d.eventdispatcher());
            o.config = n(a.extend({}, m, r, i));
            a.extend(o, {
                id: i.id,
                state: d.state.IDLE,
                duration: -1,
                position: 0,
                buffer: 0
            }, o.config);
            o.playlist = [];
            o.setItem(0);
            o.setVideo(h ? h : new b.video())
        }
        var l = {};
        l[d.JWPLAYER_MEDIA_MUTE] = "mute";
        l[d.JWPLAYER_MEDIA_VOLUME] = "volume";
        l[d.JWPLAYER_PLAYER_STATE] = "newstate->state";
        l[d.JWPLAYER_MEDIA_BUFFER] = "bufferPercent->buffer";
        l[d.JWPLAYER_MEDIA_TIME] = "position,duration";

        function j(s) {
            var z = (l[s.type] ? l[s.type].split(",") : []),
                w, y;
            if (z.length > 0) {
                for (w = 0; w < z.length; w++) {
                    var u = z[w],
                        v = u.split("->"),
                        x = v[0],
                        t = v[1] ? v[1] : x;
                    if (o[t] != s[x]) {
                        o[t] = s[x];
                        y = true
                    }
                }
                if (y) {
                    o.sendEvent(s.type, s)
                }
            } else {
                o.sendEvent(s.type, s)
            }
        }
        o.setVideo = function(s) {
            if (k) {
                k.removeGlobalListener(j)
            }
            k = s;
            q = k.getTag();
            k.volume(o.volume);
            k.mute(o.mute);
            k.addGlobalListener(j)
        };
        o.getVideo = function() {
            return k
        };
        o.seekDrag = function(s) {
            k.seekDrag(s)
        };
        o.setFullscreen = function(s) {
            if (s != o.fullscreen) {
                o.fullscreen = s;
                o.sendEvent(d.JWPLAYER_FULLSCREEN, {
                    fullscreen: s
                })
            }
        };
        o.setPlaylist = function(s) {
            o.playlist = a.filterPlaylist(s);
            if (o.playlist.length == 0) {
                o.sendEvent(d.JWPLAYER_ERROR, {
                    message: "Error loading playlist: No playable sources found"
                })
            } else {
                o.sendEvent(d.JWPLAYER_PLAYLIST_LOADED, {
                    playlist: jwplayer(o.id).getPlaylist()
                });
                o.item = -1;
                o.setItem(0)
            }
        };
        o.setItem = function(s) {
            var t;
            var u = false;
            if (s == o.playlist.length || s < -1) {
                t = 0;
                u = true
            } else {
                if (s == -1 || s > o.playlist.length) {
                    t = o.playlist.length - 1
                } else {
                    t = s
                }
            }
            if (u || t != o.item) {
                o.item = t;
                o.sendEvent(d.JWPLAYER_PLAYLIST_ITEM, {
                    index: o.item
                })
            }
        };
        o.setVolume = function(s) {
            if (o.mute && s > 0) {
                o.setMute(f)
            }
            s = Math.round(s);
            if (!o.mute) {
                a.saveCookie("volume", s)
            }
            j({
                type: d.JWPLAYER_MEDIA_VOLUME,
                volume: s
            });
            k.volume(s)
        };
        o.setMute = function(s) {
            if (!a.exists(s)) {
                s = !o.mute
            }
            a.saveCookie("mute", s);
            j({
                type: d.JWPLAYER_MEDIA_MUTE,
                mute: s
            });
            k.mute(s)
        };
        o.componentConfig = function(s) {
            return g[s]
        };
        p()
    }
})(jwplayer.html5);
(function(j) {
    var e = j.html5,
        q = j.utils,
        m = q.css,
        r = q.transitionStyle,
        c = "relative",
        d = "absolute",
        g = "hidden",
        i = "100%",
        p = "opacity .25s, visibility .25s",
        k = ".jwoverlay",
        a = "jwcontents",
        o = "top",
        f = "bottom",
        h = "right",
        l = "left",
        s = "#ffffff",
        t, b = document,
        n = {
            fontcase: t,
            fontcolor: s,
            fontsize: 12,
            fontweight: t,
            activecolor: s,
            overcolor: s
        };
    e.overlay = function(G, I, E) {
        var J = this,
            w = G,
            B = I,
            K = E,
            C, N, H, u, v = q.extend({}, n, B.getComponentSettings("tooltip")),
            y = {};

        function D() {
            C = L(k.replace(".", ""));
            C.id = w;
            var P = x("arrow", "jwarrow");
            u = P[0];
            H = P[1];
            m.style(u, {
                position: d,
                bottom: K ? t : 0,
                top: K ? 0 : t,
                width: H.width,
                height: H.height,
                left: "50%"
            });
            M(o, l);
            M(f, l);
            M(o, h);
            M(f, h);
            M(l);
            M(h);
            M(o);
            M(f);
            var O = x("background", "jwback");
            m.style(O[0], {
                left: y.left,
                right: y.right,
                top: y.top,
                bottom: y.bottom
            });
            N = L(a, C);
            m(z(a) + " *", {
                color: v.fontcolor,
                font: v.fontweight + " " + (v.fontsize) + "px Arial,Helvetica,sans-serif",
                "text-transform": (v.fontcase == "upper") ? "uppercase" : t
            });
            if (K) {
                q.transform(z("jwarrow"), "rotate(180deg)")
            }
            m.style(C, {
                padding: (y.top + 1) + "px " + y.right + "px " + (y.bottom + 1) + "px " + y.left + "px"
            });
            J.showing = false
        }

        function z(O) {
            return "#" + w + (O ? " ." + O : "")
        }

        function L(P, O) {
            var Q = b.createElement("div");
            if (P) {
                Q.className = P
            }
            if (O) {
                O.appendChild(Q)
            }
            return Q
        }

        function x(O, Q) {
            var P = F(O),
                R = L(Q, C);
            m.style(R, A(P));
            return [R, P]
        }

        function A(O) {
            return {
                background: "url(" + O.src + ") center",
                "background-size": O.width + "px " + O.height + "px"
            }
        }

        function M(U, T) {
            if (!T) {
                T = ""
            }
            var Q = x("cap" + U + T, "jwborder jw" + U + (T ? T : "")),
                O = Q[0],
                R = Q[1],
                P = q.extend(A(R), {
                    width: (U == l || T == l || U == h || T == h) ? R.width : t,
                    height: (U == o || T == o || U == f || T == f) ? R.height : t
                });
            P[U] = ((U == f && !K) || (U == o && K)) ? H.height : 0;
            if (T) {
                P[T] = 0
            }
            m.style(O, P);
            var S = {},
                W = {},
                V = {
                    left: R.width,
                    right: R.width,
                    top: (K ? H.height : 0) + R.height,
                    bottom: (K ? 0 : H.height) + R.height
                };
            if (T) {
                S[T] = V[T];
                S[U] = 0;
                W[U] = V[U];
                W[T] = 0;
                m(z("jw" + U), S);
                m(z("jw" + T), W);
                y[U] = V[U];
                y[T] = V[T]
            }
        }
        J.element = function() {
            return C
        };
        J.setContents = function(O) {
            q.empty(N);
            N.appendChild(O)
        };
        J.positionX = function(O) {
            m.style(C, {
                left: Math.round(O)
            })
        };
        J.constrainX = function(O, P) {
            if (J.showing && O.width !== 0) {
                var Q = J.offsetX(0);
                if (Q) {
                    if (P) {
                        m.unblock()
                    }
                    var R = q.bounds(C);
                    if (R.width !== 0) {
                        if (R.right > O.right) {
                            J.offsetX(O.right - R.right)
                        } else {
                            if (R.left < O.left) {
                                J.offsetX(O.left - R.left)
                            }
                        }
                    }
                }
            }
        };
        J.offsetX = function(P) {
            P = Math.round(P);
            var O = C.clientWidth;
            if (O !== 0) {
                m.style(C, {
                    "margin-left": Math.round(-O / 2) + P
                });
                m.style(u, {
                    "margin-left": Math.round(-H.width / 2) - P
                })
            }
            return O
        };
        J.borderWidth = function() {
            return y.left
        };

        function F(O) {
            var P = B.getSkinElement("tooltip", O);
            if (P) {
                return P
            } else {
                return {
                    width: 0,
                    height: 0,
                    src: "",
                    image: t,
                    ready: false
                }
            }
        }
        J.show = function() {
            J.showing = true;
            m.style(C, {
                opacity: 1,
                visibility: "visible"
            })
        };
        J.hide = function() {
            J.showing = false;
            m.style(C, {
                opacity: 0,
                visibility: g
            })
        };
        D()
    };
    m(k, {
        position: d,
        visibility: g,
        opacity: 0
    });
    m(k + " .jwcontents", {
        position: c,
        "z-index": 1
    });
    m(k + " .jwborder", {
        position: d,
        "background-size": i + " " + i
    }, true);
    m(k + " .jwback", {
        position: d,
        "background-size": i + " " + i
    });
    r(k, p)
})(jwplayer);
(function(c) {
    var b = c.html5,
        a = c.utils;
    b.player = function(f) {
        var n = this,
            o, k, l, e;

        function p() {
            o = new b.model(f);
            n.id = o.id;
            a.css.block(n.id);
            k = new b.view(n, o);
            l = new b.controller(o, k);
            n._model = o;
            h();
            var q = new b.setup(o, k, l);
            q.addEventListener(c.events.JWPLAYER_READY, i);
            q.addEventListener(c.events.JWPLAYER_ERROR, m);
            q.start()
        }

        function i(q) {
            l.playerReady(q);
            a.css.unblock(n.id)
        }

        function m(q) {
            a.log("There was a problem setting up the player: ", q);
            a.css.unblock(n.id)
        }

        function g() {
            var s = o.playlist,
                q = [];
            for (var r = 0; r < s.length; r++) {
                q.push(d(s[r]))
            }
            return q
        }

        function d(q) {
            var r = {
                description: q.description,
                file: q.file,
                image: q.image,
                mediaid: q.mediaid,
                title: q.title
            };
            a.foreach(q, function(s, t) {
                r[s] = t
            });
            r.sources = [];
            r.tracks = [];
            if (q.sources.length > 0) {
                a.foreach(q.sources, function(s, t) {
                    var u = {
                        file: t.file,
                        type: t.type ? t.type : undefined,
                        label: t.label,
                        "default": t["default"] ? true : false
                    };
                    r.sources.push(u)
                })
            }
            if (q.tracks.length > 0) {
                a.foreach(q.tracks, function(u, t) {
                    var s = {
                        file: t.file,
                        kind: t.kind ? t.kind : undefined,
                        label: t.label,
                        "default": t["default"] ? true : false
                    };
                    r.tracks.push(s)
                })
            }
            if (!q.file && q.sources.length > 0) {
                r.file = q.sources[0].file
            }
            return r
        }

        function h() {
            n.jwPlay = l.play;
            n.jwPause = l.pause;
            n.jwStop = l.stop;
            n.jwSeek = l.seek;
            n.jwSetVolume = l.setVolume;
            n.jwSetMute = l.setMute;
            n.jwLoad = function(q) {
                n.jwInstreamDestroy();
                l.load(q)
            };
            n.jwPlaylistNext = l.next;
            n.jwPlaylistPrev = l.prev;
            n.jwPlaylistItem = l.item;
            n.jwSetFullscreen = l.setFullscreen;
            n.jwResize = k.resize;
            n.jwSeekDrag = o.seekDrag;
            n.jwGetQualityLevels = l.getQualityLevels;
            n.jwGetCurrentQuality = l.getCurrentQuality;
            n.jwSetCurrentQuality = l.setCurrentQuality;
            n.jwGetCaptionsList = l.getCaptionsList;
            n.jwGetCurrentCaptions = l.getCurrentCaptions;
            n.jwSetCurrentCaptions = l.setCurrentCaptions;
            n.jwGetSafeRegion = k.getSafeRegion;
            n.jwForceState = k.forceState;
            n.jwReleaseState = k.releaseState;
            n.jwGetPlaylistIndex = j("item");
            n.jwGetPosition = j("position");
            n.jwGetDuration = j("duration");
            n.jwGetBuffer = j("buffer");
            n.jwGetWidth = j("width");
            n.jwGetHeight = j("height");
            n.jwGetFullscreen = j("fullscreen");
            n.jwGetVolume = j("volume");
            n.jwGetMute = j("mute");
            n.jwGetState = j("state");
            n.jwGetStretching = j("stretching");
            n.jwGetPlaylist = g;
            n.jwGetControls = j("controls");
            n.jwDetachMedia = l.detachMedia;
            n.jwAttachMedia = l.attachMedia;
            n.jwPlayAd = function(r) {
                var q = c(n.id).plugins;
                if (q.vast) {
                    q.vast.jwPlayAd(r)
                }
            };
            n.jwPauseAd = function() {
                var q = c(n.id).plugins;
                if (q.googima) {
                    q.googima.jwPauseAd()
                }
            };
            n.jwInitInstream = function() {
                n.jwInstreamDestroy();
                e = new b.instream(n, o, k, l);
                e.init()
            };
            n.jwLoadItemInstream = function(r, q) {
                if (!e) {
                    throw "Instream player undefined"
                }
                e.load(r, q)
            };
            n.jwLoadArrayInstream = function(r, q) {
                if (!e) {
                    throw "Instream player undefined"
                }
                e.load(r, q)
            };
            n.jwSetControls = function(q) {
                k.setControls(q);
                if (e) {
                    e.setControls(q)
                }
            };
            n.jwInstreamPlay = function() {
                if (e) {
                    e.jwInstreamPlay()
                }
            };
            n.jwInstreamPause = function() {
                if (e) {
                    e.jwInstreamPause()
                }
            };
            n.jwInstreamState = function() {
                if (e) {
                    return e.jwInstreamState()
                }
                return ""
            };
            n.jwInstreamDestroy = function(q, r) {
                r = r || e;
                if (r) {
                    r.jwInstreamDestroy(q || false);
                    if (r === e) {
                        e = undefined
                    }
                }
            };
            n.jwInstreamAddEventListener = function(q, r) {
                if (e) {
                    e.jwInstreamAddEventListener(q, r)
                }
            };
            n.jwInstreamRemoveEventListener = function(q, r) {
                if (e) {
                    e.jwInstreamRemoveEventListener(q, r)
                }
            };
            n.jwPlayerDestroy = function() {
                if (k) {
                    k.destroy()
                }
            };
            n.jwInstreamSetText = function(q) {
                if (e) {
                    e.jwInstreamSetText(q)
                }
            };
            n.jwIsBeforePlay = function() {
                return l.checkBeforePlay()
            };
            n.jwIsBeforeComplete = function() {
                return o.getVideo().checkComplete()
            };
            n.jwSetCues = k.addCues;
            n.jwAddEventListener = l.addEventListener;
            n.jwRemoveEventListener = l.removeEventListener;
            n.jwDockAddButton = k.addButton;
            n.jwDockRemoveButton = k.removeButton
        }

        function j(q) {
            return function() {
                return o[q]
            }
        }
        p()
    }
})(window.jwplayer);
(function(g) {
    var b = "#FFFFFF",
        d = "#CCCCCC",
        k = "#333333",
        h = "#999999",
        j = "normal",
        f = {
            size: 180,
            backgroundcolor: k,
            fontcolor: h,
            overcolor: d,
            activecolor: d,
            titlecolor: d,
            titleovercolor: b,
            titleactivecolor: b,
            fontweight: j,
            titleweight: j,
            fontsize: 11,
            titlesize: 13
        },
        q = jwplayer.events,
        o = jwplayer.utils,
        l = o.css,
        m = o.isMobile(),
        p = ".jwplaylist",
        n = document,
        a = "absolute",
        c = "relative",
        e = "hidden",
        i = "100%";
    g.playlistcomponent = function(K, V) {
        var O = K,
            D = O.skin,
            t = o.extend({}, f, O.skin.getComponentSettings("playlist"), V),
            P, E, r, v, C = -1,
            F, u, x = -1,
            w = 76,
            y = {
                background: undefined,
                divider: undefined,
                item: undefined,
                itemOver: undefined,
                itemImage: undefined,
                itemActive: undefined
            },
            B, Q = this;
        Q.element = function() {
            return P
        };
        Q.redraw = function() {
            if (u) {
                u.redraw()
            }
        };
        Q.show = function() {
            o.show(P)
        };
        Q.hide = function() {
            o.hide(P)
        };

        function A() {
            P = T("div", "jwplaylist");
            P.id = O.id + "_jwplayer_playlistcomponent";
            B = (O._model.playlistlayout == "basic");
            E = T("div", "jwlistcontainer");
            U(P, E);
            S();
            if (B) {
                w = 32
            }
            if (y.divider) {
                w += y.divider.height
            }
            I();
            O.jwAddEventListener(q.JWPLAYER_PLAYLIST_LOADED, L);
            O.jwAddEventListener(q.JWPLAYER_PLAYLIST_ITEM, N);
            O.jwAddEventListener(q.JWPLAYER_RESIZE, s)
        }

        function s(W) {
            Q.redraw()
        }

        function z(W) {
            return "#" + P.id + (W ? " ." + W : "")
        }

        function I() {
            var Z = 0,
                Y = 0,
                W = 0;
            o.clearCss(z());
            l(z(), {
                "background-color": t.backgroundcolor
            });
            l(z("jwlist"), {
                "background-image": y.background ? " url(" + y.background.src + ")" : ""
            });
            l(z("jwlist *"), {
                color: t.fontcolor,
                font: t.fontweight + " " + t.fontsize + "px Arial, Helvetica, sans-serif"
            });
            if (y.itemImage) {
                Z = (w - y.itemImage.height) / 2 + "px ";
                Y = y.itemImage.width;
                W = y.itemImage.height
            } else {
                Y = w * 4 / 3;
                W = w
            }
            if (y.divider) {
                l(z("jwplaylistdivider"), {
                    "background-image": "url(" + y.divider.src + ")",
                    "background-size": i + " " + y.divider.height + "px",
                    width: i,
                    height: y.divider.height
                })
            }
            l(z("jwplaylistimg"), {
                height: W,
                width: Y,
                margin: Z ? (Z + "0 " + Z + Z) : "0 5px 0 0"
            });
            l(z("jwlist li"), {
                "background-image": y.item ? "url(" + y.item.src + ")" : "",
                height: w,
                overflow: "hidden",
                "background-size": i + " " + w + "px",
                cursor: "pointer"
            });
            var X = {
                overflow: "hidden"
            };
            if (t.activecolor !== "") {
                X.color = t.activecolor
            }
            if (y.itemActive) {
                X["background-image"] = "url(" + y.itemActive.src + ")"
            }
            l(z("jwlist li.active"), X);
            l(z("jwlist li.active .jwtitle"), {
                color: t.titleactivecolor
            });
            l(z("jwlist li.active .jwdescription"), {
                color: t.activecolor
            });
            var aa = {
                overflow: "hidden"
            };
            if (t.overcolor !== "") {
                aa.color = t.overcolor
            }
            if (y.itemOver) {
                aa["background-image"] = "url(" + y.itemOver.src + ")"
            }
            if (!m) {
                l(z("jwlist li:hover"), aa);
                l(z("jwlist li:hover .jwtitle"), {
                    color: t.titleovercolor
                });
                l(z("jwlist li:hover .jwdescription"), {
                    color: t.overcolor
                })
            }
            l(z("jwtextwrapper"), {
                height: w,
                position: c
            });
            l(z("jwtitle"), {
                overflow: "hidden",
                display: "inline-block",
                height: B ? w : 20,
                color: t.titlecolor,
                "font-size": t.titlesize,
                "font-weight": t.titleweight,
                "margin-top": B ? "0 10px" : 10,
                "margin-left": 10,
                "margin-right": 10,
                "line-height": B ? w : 20
            });
            l(z("jwdescription"), {
                display: "block",
                "font-size": t.fontsize,
                "line-height": 18,
                "margin-left": 10,
                "margin-right": 10,
                overflow: "hidden",
                height: 36,
                position: c
            })
        }

        function H() {
            var W = T("ul", "jwlist");
            W.id = P.id + "_ul" + Math.round(Math.random() * 10000000);
            return W
        }

        function J(aa) {
            var af = r[aa],
                ae = T("li", "jwitem"),
                X;
            ae.id = v.id + "_item_" + aa;
            if (aa > 0) {
                X = T("div", "jwplaylistdivider");
                U(ae, X)
            } else {
                var Y = y.divider ? y.divider.height : 0;
                ae.style.height = (w - Y) + "px";
                ae.style["background-size"] = "100% " + (w - Y) + "px"
            }
            var ab = T("div", "jwplaylistimg jwfill");
            var ad;
            if (af["playlist.image"] && y.itemImage) {
                ad = af["playlist.image"]
            } else {
                if (af.image && y.itemImage) {
                    ad = af.image
                } else {
                    if (y.itemImage) {
                        ad = y.itemImage.src
                    }
                }
            }
            if (ad && !B) {
                l("#" + ae.id + " .jwplaylistimg", {
                    "background-image": ad
                });
                U(ae, ab)
            }
            var W = T("div", "jwtextwrapper");
            var ac = T("span", "jwtitle");
            ac.innerHTML = (af && af.title) ? af.title : "";
            U(W, ac);
            if (af.description && !B) {
                var Z = T("span", "jwdescription");
                Z.innerHTML = af.description;
                U(W, Z)
            }
            U(ae, W);
            return ae
        }

        function T(X, W) {
            var Y = n.createElement(X);
            if (W) {
                Y.className = W
            }
            return Y
        }

        function U(W, X) {
            W.appendChild(X)
        }

        function L(X) {
            E.innerHTML = "";
            r = M();
            if (!r) {
                return
            }
            v = H();
            for (var Y = 0; Y < r.length; Y++) {
                var W = J(Y);
                if (m) {
                    var Z = new o.touch(W);
                    Z.addEventListener(o.touchEvents.TAP, R(Y))
                } else {
                    W.onclick = R(Y)
                }
                U(v, W)
            }
            C = O.jwGetPlaylistIndex();
            U(E, v);
            u = new g.playlistslider(P.id + "_slider", O.skin, P, v)
        }

        function M() {
            var X = O.jwGetPlaylist();
            var Y = [];
            for (var W = 0; W < X.length; W++) {
                if (!X[W]["ova.hidden"]) {
                    Y.push(X[W])
                }
            }
            return Y
        }

        function R(W) {
            return function() {
                F = W;
                O.jwPlaylistItem(W);
                O.jwPlay(true)
            }
        }

        function G() {
            var W = O.jwGetPlaylistIndex();
            if (W == F) {
                return
            }
            F = -1;
            if (u && u.visible()) {
                u.thumbPosition(W / (O.jwGetPlaylist().length - 1))
            }
        }

        function N(W) {
            if (C >= 0) {
                n.getElementById(v.id + "_item_" + C).className = "jwitem";
                C = W.index
            }
            n.getElementById(v.id + "_item_" + W.index).className = "jwitem active";
            G()
        }

        function S() {
            o.foreach(y, function(X, W) {
                y[X] = D.getSkinElement("playlist", X)
            })
        }
        A();
        return this
    };
    l(p, {
        position: a,
        width: i,
        height: i
    });
    o.dragStyle(p, "none");
    l(p + " .jwplaylistimg", {
        position: c,
        width: i,
        "float": "left",
        margin: "0 5px 0 0",
        background: "#000",
        overflow: e
    });
    l(p + " .jwlist", {
        position: a,
        width: i,
        "list-style": "none",
        margin: 0,
        padding: 0,
        overflow: e
    });
    l(p + " .jwlistcontainer", {
        position: a,
        overflow: e,
        width: i,
        height: i
    });
    l(p + " .jwlist li", {
        width: i
    });
    l(p + " .jwtextwrapper", {
        overflow: e
    });
    l(p + " .jwplaylistdivider", {
        position: a
    });
    if (m) {
        o.transitionStyle(p + " .jwlist", "top .35s")
    }
})(jwplayer.html5);
(function(j) {
    var a = jwplayer.events,
        t = jwplayer.utils,
        o = t.touchEvents,
        n = t.css,
        b = "jwslider",
        q = "jwslidertop",
        h = "jwsliderbottom",
        f = "jwrail",
        r = "jwrailtop",
        p = "jwrailback",
        m = "jwrailbottom",
        c = "jwthumb",
        v = "jwthumbtop",
        i = "jwthumbback",
        u = "jwthumbbottom",
        e = document,
        s = window,
        w = undefined,
        g = "absolute",
        k = "hidden",
        l = "100%";
    j.playlistslider = function(V, N, J, aa) {
        var O = N,
            X = V,
            ab = aa,
            ai, E, af, S, aj = 0,
            W, ag, C = t.isMobile(),
            al, am = true,
            F, R, ae, z, ad, x, G, Q, U, ah, L;
        this.element = function() {
            return ai
        };
        this.visible = function() {
            return am
        };

        function I() {
            var ao, an;
            ai = ak(b, null, J);
            ai.id = V;
            al = new t.touch(ab);
            if (C) {
                al.addEventListener(o.DRAG, Z)
            } else {
                ai.addEventListener("mousedown", D, false);
                ai.addEventListener("click", ac, false)
            }
            P();
            U = F.height;
            ah = R.height;
            n(Y(), {
                width: ae.width
            });
            n(Y(f), {
                top: U,
                bottom: ah
            });
            n(Y(c), {
                top: U
            });
            ao = ak(q, F, ai);
            an = ak(h, R, ai);
            E = ak(f, null, ai);
            af = ak(c, null, ai);
            if (!C) {
                ao.addEventListener("mousedown", y(-1), false);
                an.addEventListener("mousedown", y(1), false)
            }
            ak(r, z, E);
            ak(p, ae, E, true);
            ak(m, ad, E);
            n(Y(p), {
                top: z.height,
                bottom: ad.height
            });
            ak(v, G, af);
            ak(i, x, af, true);
            ak(u, Q, af);
            n(Y(i), {
                top: G.height,
                bottom: Q.height
            });
            K();
            if (ab) {
                if (!C) {
                    ab.addEventListener("mousewheel", B, false);
                    ab.addEventListener("DOMMouseScroll", B, false)
                }
            }
        }

        function Y(an) {
            return "#" + ai.id + (an ? " ." + an : "")
        }

        function ak(aq, ap, ao, an) {
            var ar = e.createElement("div");
            if (aq) {
                ar.className = aq;
                if (ap) {
                    n(Y(aq), {
                        "background-image": ap.src ? ap.src : w,
                        "background-repeat": an ? "repeat-y" : "no-repeat",
                        height: an ? w : ap.height
                    })
                }
            }
            if (ao) {
                ao.appendChild(ar)
            }
            return ar
        }

        function P() {
            F = H("sliderCapTop");
            R = H("sliderCapBottom");
            ae = H("sliderRail");
            z = H("sliderRailCapTop");
            ad = H("sliderRailCapBottom");
            x = H("sliderThumb");
            G = H("sliderThumbCapTop");
            Q = H("sliderThumbCapBottom")
        }

        function H(an) {
            var ao = O.getSkinElement("playlist", an);
            return ao ? ao : {
                width: 0,
                height: 0,
                src: w
            }
        }
        var K = this.redraw = function() {
            clearTimeout(L);
            L = setTimeout(function() {
                if (ab && ab.clientHeight) {
                    T(ab.parentNode.clientHeight / ab.clientHeight)
                } else {
                    L = setTimeout(K, 10)
                }
            }, 0)
        };

        function B(an) {
            if (!am) {
                return
            }
            an = an ? an : s.event;
            var ao = an.detail ? an.detail * -1 : an.wheelDelta / 40;
            M(aj - ao / 10);
            if (an.stopPropagation) {
                an.stopPropagation()
            }
            if (an.preventDefault) {
                an.preventDefault()
            }
            an.cancelBubble = true;
            an.cancel = true;
            an.returnValue = false;
            return false
        }

        function T(an) {
            if (an < 0) {
                an = 0
            }
            if (an > 1) {
                am = false
            } else {
                am = true;
                n(Y(c), {
                    height: Math.max(E.clientHeight * an, G.height + Q.height)
                })
            }
            n(Y(), {
                visibility: am ? "visible" : k
            });
            if (ab) {
                ab.style.width = am ? ab.parentElement.clientWidth - ae.width + "px" : ""
            }
        }
        var M = this.thumbPosition = function(an) {
            if (isNaN(an)) {
                an = 0
            }
            aj = Math.max(0, Math.min(1, an));
            n(Y(c), {
                top: U + (E.clientHeight - af.clientHeight) * aj
            });
            if (aa) {
                aa.style.top = Math.min(0, ai.clientHeight - aa.scrollHeight) * aj + "px"
            }
        };

        function D(an) {
            if (an.button == 0) {
                S = true
            }
            e.onselectstart = function() {
                return false
            };
            s.addEventListener("mousemove", ac, false);
            s.addEventListener("mouseup", A, false)
        }

        function Z(an) {
            M(aj - (an.deltaY * 2 / ab.clientHeight))
        }

        function ac(an) {
            if (S || an.type == "click") {
                var at = t.bounds(E),
                    ap = af.clientHeight / 2,
                    ao = at.height - ap,
                    ar = an.pageY - at.top,
                    aq = (ar - ap) / (ao - ap);
                M(aq)
            }
        }

        function y(an) {
            return function(ao) {
                if (ao.button > 0) {
                    return
                }
                M(aj + (an * 0.05));
                W = setTimeout(function() {
                    ag = setInterval(function() {
                        M(aj + (an * 0.05))
                    }, 50)
                }, 500)
            }
        }

        function A() {
            S = false;
            s.removeEventListener("mousemove", ac);
            s.removeEventListener("mouseup", A);
            e.onselectstart = w;
            clearTimeout(W);
            clearInterval(ag)
        }
        I();
        return this
    };

    function d() {
        var x = [],
            y;
        for (y = 0; y < arguments.length; y++) {
            x.push(".jwplaylist ." + arguments[y])
        }
        return x.join(",")
    }
    n(d(b), {
        position: g,
        height: l,
        visibility: k,
        right: 0,
        top: 0,
        cursor: "pointer",
        "z-index": 1,
        overflow: k
    });
    n(d(b) + " *", {
        position: g,
        width: l,
        "background-position": "center",
        "background-size": l + " " + l,
        overflow: k
    });
    n(d(q, r, v), {
        top: 0
    });
    n(d(h, m, u), {
        bottom: 0
    })
})(jwplayer.html5);
(function(e) {
    var k = jwplayer.utils,
        i = k.css,
        a = "About JW Player ",
        l = "http://www.longtailvideo.com/jwpabout/?a=r&v=",
        j = document,
        h = ".jwclick",
        g = h + "_item",
        f = "100%",
        b = "none",
        d = "5px 5px 7px rgba(0,0,0,.10), 0px 1px 0px rgba(255,255,255,.3) inset",
        c = "#FFF";
    e.rightclick = function(q, o) {
        var w = q,
            p, v = k.extend({
                aboutlink: l + e.version + "&m=h&e=o",
                abouttext: a + e.version + "..."
            }, o),
            m = false,
            x, r;

        function u() {
            p = j.getElementById(w.id);
            x = s(h);
            x.id = w.id + "_menu";
            x.style.display = b;
            p.oncontextmenu = n;
            x.onmouseover = function() {
                m = true
            };
            x.onmouseout = function() {
                m = false
            };
            j.addEventListener("mousedown", y, false);
            r = s(g);
            r.innerHTML = v.abouttext;
            r.onclick = t;
            x.appendChild(r);
            p.appendChild(x)
        }

        function s(z) {
            var A = j.createElement("div");
            A.className = z.replace(".", "");
            return A
        }

        function t() {
            window.top.location = v.aboutlink
        }

        function n(A) {
            if (m) {
                return
            }
            if (A == null) {
                A = window.event
            }
            var C = A.target != null ? A.target : A.srcElement,
                z = k.bounds(p),
                B = k.bounds(C);
            x.style.display = b;
            x.style.left = (A.offsetX ? A.offsetX : A.layerX) + B.left - z.left + "px";
            x.style.top = (A.offsetY ? A.offsetY : A.layerY) + B.top - z.top + "px";
            x.style.display = "block";
            A.preventDefault()
        }

        function y() {
            if (m) {
                return
            } else {
                x.style.display = b
            }
        }
        this.element = function() {
            return x
        };
        this.destroy = function() {
            j.removeEventListener("mousedown", y, false)
        };
        u()
    };
    i(h, {
        "background-color": c,
        "-webkit-border-radius": 5,
        "-moz-border-radius": 5,
        "border-radius": 5,
        height: "auto",
        border: "1px solid #bcbcbc",
        "font-family": '"MS Sans Serif", "Geneva", sans-serif',
        "font-size": 10,
        width: 320,
        "-webkit-box-shadow": d,
        "-moz-box-shadow": d,
        "box-shadow": d,
        position: "absolute",
        "z-index": 999
    }, true);
    i(h + " div", {
        padding: "8px 21px",
        margin: "0px",
        "background-color": c,
        border: "none",
        "font-family": '"MS Sans Serif", "Geneva", sans-serif',
        "font-size": 10,
        color: "inherit"
    }, true);
    i(g, {
        padding: "8px 21px",
        "text-align": "left",
        cursor: "pointer"
    }, true);
    i(g + ":hover", {
        "background-color": "#595959",
        color: c
    }, true);
    i(g + " a", {
        "text-decoration": b,
        color: "#000"
    }, true);
    i(h + " hr", {
        width: f,
        padding: 0,
        margin: 0,
        border: "1px #e9e9e9 solid"
    }, true)
})(jwplayer.html5);
(function(f) {
    var h = jwplayer,
        k = h.utils,
        l = h.events,
        a = h.playlist,
        i = 1,
        e = 2,
        d = 3,
        j = 4,
        c = 5,
        b = 6,
        g = 7;
    f.setup = function(s, H, I) {
        var L = s,
            p = H,
            F = I,
            u = {},
            C = {},
            A, z = new l.eventdispatcher(),
            v = false,
            w = [];

        function t() {
            r(i, o);
            r(e, Q, i);
            r(d, y, i);
            r(j, K, d);
            r(c, P, j + "," + e);
            r(b, J, c + "," + d);
            r(g, D, b)
        }

        function r(R, T, S) {
            w.push({
                name: R,
                method: T,
                depends: S
            })
        }

        function G() {
            for (var T = 0; T < w.length; T++) {
                var R = w[T];
                if (O(R.depends)) {
                    w.splice(T, 1);
                    try {
                        R.method();
                        G()
                    } catch (S) {
                        x(S.message)
                    }
                    return
                }
            }
            if (w.length > 0 && !v) {
                setTimeout(G, 500)
            }
        }

        function O(T) {
            if (!T) {
                return true
            }
            var S = T.toString().split(",");
            for (var R = 0; R < S.length; R++) {
                if (!u[S[R]]) {
                    return false
                }
            }
            return true
        }

        function n(R) {
            u[R] = true
        }

        function o() {
            if (s.edition && s.edition() == "invalid") {
                x("Error setting up player: Invalid license key")
            } else {
                n(i)
            }
        }

        function Q() {
            A = new f.skin();
            A.load(L.config.skin, B, N)
        }

        function B(R) {
            n(e)
        }

        function N(R) {
            x("Error loading skin: " + R)
        }

        function y() {
            switch (k.typeOf(L.config.playlist)) {
                case "string":
                    x("Can't load a playlist as a string anymore");
                case "array":
                    q(new a(L.config.playlist))
            }
        }

        function m(R) {
            q(R.playlist)
        }

        function q(R) {
            L.setPlaylist(R);
            if (L.playlist[0].sources.length == 0) {
                x("Error loading playlist: No playable sources found")
            } else {
                n(d)
            }
        }

        function E(R) {
            x("Error loading playlist: " + R.message)
        }

        function K() {
            var S = L.playlist[L.item].image;
            if (S) {
                var R = new Image();
                R.addEventListener("load", M, false);
                R.addEventListener("error", M, false);
                R.src = S;
                setTimeout(M, 500)
            } else {
                n(j)
            }
        }

        function M() {
            n(j)
        }

        function P() {
            p.setup(A);
            n(c)
        }

        function J() {
            n(b)
        }

        function D() {
            z.sendEvent(l.JWPLAYER_READY);
            n(g)
        }

        function x(R) {
            v = true;
            z.sendEvent(l.JWPLAYER_ERROR, {
                message: R
            });
            p.setupError(R)
        }
        k.extend(this, z);
        this.start = G;
        t()
    }
})(jwplayer.html5);
(function(a) {
    a.skin = function() {
        var b = {};
        var d = false;
        this.load = function(g, f, e) {
            new a.skinloader(g, function(h) {
                d = true;
                b = h;
                if (typeof f == "function") {
                    f()
                }
            }, function(h) {
                if (typeof e == "function") {
                    e(h)
                }
            })
        };
        this.getSkinElement = function(e, f) {
            e = c(e);
            f = c(f);
            if (d) {
                try {
                    return b[e].elements[f]
                } catch (g) {
                    jwplayer.utils.log("No such skin component / element: ", [e, f])
                }
            }
            return null
        };
        this.getComponentSettings = function(e) {
            e = c(e);
            if (d && b && b[e]) {
                return b[e].settings
            }
            return null
        };
        this.getComponentLayout = function(e) {
            e = c(e);
            if (d) {
                var f = b[e].layout;
                if (f && (f.left || f.right || f.center)) {
                    return b[e].layout
                }
            }
            return null
        };

        function c(e) {
            return e.toLowerCase()
        }
    }
})(jwplayer.html5);
(function(b) {
    var a = jwplayer.utils,
        d = a.foreach,
        c = "Skin formatting error";
    b.skinloader = function(g, l, i) {
        var j = {},
            n = l,
            v = i,
            s = true,
            w, x = g,
            h = false,
            u, z = jwplayer.utils.isMobile() ? 1 : 1,
            y = 1;

        function B() {
            if (typeof x != "string" || x === "") {
                A(b.defaultskin().xml)
            } else {
                if (a.extension(x) != "xml") {
                    v("Skin not a valid file type");
                    return
                }
                var C = new b.skinloader("", o, v)
            }
        }

        function o(C) {
            j = C;
            a.ajax(a.getAbsolutePath(x), function(D) {
                try {
                    if (a.exists(D.responseXML)) {
                        A(D.responseXML);
                        return
                    }
                } catch (E) {
                    v(c)
                }
            }, function(D) {
                v(D)
            })
        }

        function m(C, D) {
            return C ? C.getElementsByTagName(D) : null
        }

        function A(H) {
            var G = m(H, "skin")[0],
                P = m(G, "component"),
                ab = G.getAttribute("target"),
                K = parseFloat(G.getAttribute("pixelratio"));
            if (K > 0) {
                y = K
            }
            if (!ab || parseFloat(ab) > parseFloat(jwplayer.version)) {
                v("Incompatible player version")
            }
            if (P.length === 0) {
                n(j);
                return
            }
            for (var S = 0; S < P.length; S++) {
                var N = k(P[S].getAttribute("name")),
                    M = {
                        settings: {},
                        elements: {},
                        layout: {}
                    },
                    R = m(m(P[S], "elements")[0], "element");
                j[N] = M;
                for (var Q = 0; Q < R.length; Q++) {
                    p(R[Q], N)
                }
                var I = m(P[S], "settings")[0];
                if (I && I.childNodes.length > 0) {
                    var V = m(I, "setting");
                    for (var aa = 0; aa < V.length; aa++) {
                        var ac = V[aa].getAttribute("name");
                        var T = V[aa].getAttribute("value");
                        if (/color$/.test(ac)) {
                            T = a.stringToColor(T)
                        }
                        M.settings[k(ac)] = T
                    }
                }
                var W = m(P[S], "layout")[0];
                if (W && W.childNodes.length > 0) {
                    var X = m(W, "group");
                    for (var F = 0; F < X.length; F++) {
                        var L = X[F],
                            J = {
                                elements: []
                            };
                        M.layout[k(L.getAttribute("position"))] = J;
                        for (var Z = 0; Z < L.attributes.length; Z++) {
                            var O = L.attributes[Z];
                            J[O.name] = O.value
                        }
                        var Y = m(L, "*");
                        for (var E = 0; E < Y.length; E++) {
                            var C = Y[E];
                            J.elements.push({
                                type: C.tagName
                            });
                            for (var D = 0; D < C.attributes.length; D++) {
                                var U = C.attributes[D];
                                J.elements[E][k(U.name)] = U.value
                            }
                            if (!a.exists(J.elements[E].name)) {
                                J.elements[E].name = C.tagName
                            }
                        }
                    }
                }
                s = false;
                q()
            }
        }

        function q() {
            clearInterval(w);
            if (!h) {
                w = setInterval(function() {
                    f()
                }, 100)
            }
        }

        function p(H, G) {
            G = k(G);
            var F = new Image(),
                C = k(H.getAttribute("name")),
                E = H.getAttribute("src"),
                J;
            if (E.indexOf("data:image/png;base64,") === 0) {
                J = E
            } else {
                var D = a.getAbsolutePath(x);
                var I = D.substr(0, D.lastIndexOf("/"));
                J = [I, G, E].join("/")
            }
            j[G].elements[C] = {
                height: 0,
                width: 0,
                src: "",
                ready: false,
                image: F
            };
            F.onload = function(K) {
                r(F, C, G)
            };
            F.onerror = function(K) {
                h = true;
                q();
                v("Skin image not found: " + this.src)
            };
            F.src = J
        }

        function e() {
            d(j, function(C, D) {
                d(D.elements, function(E, G) {
                    var F = G.image;
                    F.onload = null;
                    F.onerror = null;
                    delete G.image;
                    delete D.elements[E]
                });
                delete j[C]
            })
        }

        function f() {
            var C = true;
            d(j, function(D, E) {
                if (D != "properties") {
                    d(E.elements, function(G, F) {
                        if (!t(D, G).ready) {
                            C = false
                        }
                    })
                }
            });
            if (!C) {
                return
            }
            if (s == false) {
                clearInterval(w);
                n(j)
            }
        }

        function r(D, F, E) {
            var C = t(E, F);
            if (C) {
                C.height = Math.round((D.height / y) * z);
                C.width = Math.round((D.width / y) * z);
                C.src = D.src;
                C.ready = true;
                q()
            } else {
                a.log("Loaded an image for a missing element: " + E + "." + F)
            }
        }

        function t(C, D) {
            return j[k(C)] ? j[k(C)].elements[k(D)] : null
        }

        function k(C) {
            return C ? C.toLowerCase() : ""
        }
        B()
    }
})(jwplayer.html5);
(function(c) {
    var b = c.html5,
        a = c.utils,
        d = c.events,
        e = a.css;
    b.thumbs = function(g) {
        var n, j, p, t, o = g,
            k, i = {},
            m, h = new d.eventdispatcher();
        a.extend(this, h);
        n = document.createElement("div");
        n.id = o;

        function s(u) {
            e.style(n, {
                display: "none"
            });
            if (t) {
                t.onload = null;
                t.onreadystatechange = null;
                t.onerror = null;
                if (t.abort) {
                    t.abort()
                }
                t = null
            }
            if (m) {
                m.onload = null
            }
            if (u) {
                p = u.split("?")[0].split("/").slice(0, -1).join("/");
                t = a.ajax(u, q, r, true)
            } else {
                j = k = m = null;
                i = {}
            }
        }

        function q(u) {
            t = null;
            try {
                u = new c.parsers.srt().parse(u.responseText, true)
            } catch (v) {
                r(v.message);
                return
            }
            if (a.typeOf(u) !== "array") {
                return r("Invalid data")
            }
            j = u
        }

        function r(u) {
            t = null;
            a.log("Thumbnails could not be loaded: " + u)
        }

        function f(v, A) {
            if (v && v !== k) {
                k = v;
                if (v.indexOf("://") < 0) {
                    v = p ? p + "/" + v : v
                }
                var x = {
                    display: "block",
                    margin: "0 auto",
                    "background-position": "0 0",
                    width: 0,
                    height: 0
                };
                var w = v.indexOf("#xywh");
                if (w > 0) {
                    try {
                        var u = (/(.+)\#xywh=(\d+),(\d+),(\d+),(\d+)/).exec(v);
                        v = u[1];
                        x["background-position"] = (u[2] * -1) + "px " + (u[3] * -1) + "px";
                        x.width = u[4];
                        x.height = u[5]
                    } catch (z) {
                        r("Could not parse thumbnail");
                        return
                    }
                }
                var y = i[v];
                if (!y) {
                    y = new Image();
                    y.onload = function() {
                        l(y, x, A)
                    };
                    i[v] = y;
                    y.src = v
                } else {
                    l(y, x, A)
                }
                if (m) {
                    m.onload = null
                }
                m = y
            }
        }

        function l(v, u, w) {
            v.onload = null;
            if (!u.width) {
                u.width = v.width;
                u.height = v.height
            }
            u["background-image"] = v.src;
            e.style(n, u);
            if (w) {
                w(u.width)
            }
        }
        this.load = function(u) {
            s(u)
        };
        this.element = function() {
            return n
        };
        this.updateTimeline = function(w, x) {
            if (!j) {
                return
            }
            var v = 0;
            while (v < j.length && w > j[v].end) {
                v++
            }
            if (v === j.length) {
                v--
            }
            var u = j[v].text;
            f(u, x);
            return u
        }
    }
})(jwplayer);
(function(c) {
    var a = c.utils,
        e = c.events,
        b = e.state,
        d = true,
        f = false;
    c.html5.video = function(ad) {
        var v = a.isIE(),
            Y = {
                abort: E,
                canplay: w,
                canplaythrough: E,
                durationchange: H,
                emptied: E,
                ended: q,
                error: r,
                loadeddata: E,
                loadedmetadata: w,
                loadstart: E,
                pause: ac,
                play: ac,
                playing: ac,
                progress: I,
                ratechange: E,
                readystatechange: E,
                seeked: N,
                seeking: v ? A : E,
                stalled: E,
                suspend: E,
                timeupdate: ae,
                volumechange: o,
                waiting: A
            },
            K, S, B, aj, t, ai, R, Z, M = f,
            g = b.IDLE,
            T, s = -1,
            P = -1,
            V = new e.eventdispatcher(),
            y = f,
            O, J = -1,
            Q = a.isAndroid(f, d),
            j = a.isIOS(7),
            k = this,
            n = [],
            L = 0,
            i = false,
            ak = f,
            D = f;
        a.extend(k, V);

        function af(al) {
            if (!al) {
                al = document.createElement("video")
            }
            B = al;
            aa();
            if (!j) {
                B.controls = d;
                B.controls = f
            }
            B.setAttribute("x-webkit-airplay", "allow");
            y = d
        }

        function aa() {
            a.foreach(Y, function(al, am) {
                B.addEventListener(al, am, f)
            })
        }

        function x(al, am) {
            if (y) {
                V.sendEvent(al, am)
            }
        }

        function E(al) {}

        function H(am) {
            E(am);
            if (!y) {
                return
            }
            var al = ah(B.duration);
            if (aj != al) {
                aj = al
            }
            if (Q && Z > 0 && al > Z) {
                F(Z)
            }
            ae()
        }

        function ae(al) {
            E(al);
            I(al);
            if (!y) {
                return
            }
            if (g == b.PLAYING && !M) {
                t = ah(B.currentTime);
                x(e.JWPLAYER_MEDIA_TIME, {
                    position: t,
                    duration: aj
                })
            }
        }

        function ah(al) {
            return Number(al.toFixed(1))
        }

        function w(al) {
            E(al);
            if (!y) {
                return
            }
            if (!ai) {
                ai = d;
                u()
            }
            if (al.type == "loadedmetadata") {
                if (B.muted) {
                    B.muted = f;
                    B.muted = d
                }
                x(e.JWPLAYER_MEDIA_META, {
                    duration: B.duration,
                    height: B.videoHeight,
                    width: B.videoWidth
                })
            }
        }

        function I(al) {
            E(al);
            if (ai && Z > 0 && !Q) {
                if (v) {
                    setTimeout(function() {
                        if (Z > 0) {
                            F(Z)
                        }
                    }, 200)
                } else {
                    F(Z)
                }
            }
        }

        function u() {
            if (!R) {
                R = d;
                x(e.JWPLAYER_MEDIA_BUFFER_FULL)
            }
        }

        function ac(al) {
            E(al);
            if (!y || M) {
                return
            }
            if (B.paused) {
                if (B.currentTime == B.duration && B.duration > 3) {} else {
                    h()
                }
            } else {
                if (a.isFF() && al.type == "play" && g == b.BUFFERING) {
                    return
                } else {
                    C(b.PLAYING)
                }
            }
        }

        function A(al) {
            E(al);
            if (!y) {
                return
            }
            if (!M) {
                C(b.BUFFERING)
            }
        }

        function r(al) {
            if (!y) {
                return
            }
            a.log("Error playing media: %o", B.error);
            V.sendEvent(e.JWPLAYER_MEDIA_ERROR, {
                message: "Error loading media: File could not be played"
            });
            C(b.IDLE)
        }

        function p(ao) {
            var al;
            if (a.typeOf(ao) == "array" && ao.length > 0) {
                al = [];
                for (var an = 0; an < ao.length; an++) {
                    var ap = ao[an],
                        am = {};
                    am.label = X(ap) ? X(ap) : an;
                    al[an] = am
                }
            }
            return al
        }

        function m(am) {
            var al = p(am);
            if (al) {
                V.sendEvent(e.JWPLAYER_MEDIA_LEVELS, {
                    levels: al,
                    currentQuality: J
                })
            }
        }

        function X(al) {
            if (al.label) {
                return al.label
            } else {
                return 0
            }
        }
        k.load = function(al) {
            if (!y) {
                return
            }
            ak = f;
            K = al;
            Z = 0;
            aj = al.duration ? al.duration : -1;
            t = 0;
            O = K.sources;
            G();
            m(O);
            z()
        };

        function G() {
            if (J < 0) {
                J = 0
            }
            for (var am = 0; am < O.length; am++) {
                if (O[am]["default"]) {
                    J = am;
                    break
                }
            }
            var an = a.getCookies(),
                al = an.qualityLabel;
            if (al) {
                for (am = 0; am < O.length; am++) {
                    if (O[am]["label"] == al) {
                        J = am;
                        break
                    }
                }
            }
        }

        function z() {
            ai = f;
            R = f;
            S = O[J];
            C(b.BUFFERING);
            B.src = S.file;
            B.load();
            s = setInterval(l, 100);
            if (a.isMobile()) {
                u()
            }
        }
        k.stop = function() {
            if (!y) {
                return
            }
            B.removeAttribute("src");
            if (!v) {
                B.load()
            }
            J = -1;
            clearInterval(s);
            C(b.IDLE)
        };
        k.play = function() {
            if (y && !M) {
                B.play()
            }
        };
        var h = k.pause = function() {
            if (y) {
                B.pause();
                C(b.PAUSED)
            }
        };
        k.seekDrag = function(al) {
            if (!y) {
                return
            }
            M = al;
            if (al) {
                B.pause()
            } else {
                B.play()
            }
        };
        var F = k.seek = function(al) {
            if (!y) {
                return
            }
            if (!M && Z == 0) {
                x(e.JWPLAYER_MEDIA_SEEK, {
                    position: t,
                    offset: al
                })
            }
            if (ai) {
                Z = 0;
                B.currentTime = al
            } else {
                Z = al
            }
        };

        function N(al) {
            E(al);
            if (!M && g != b.PAUSED) {
                C(b.PLAYING)
            }
        }
        var ag = k.volume = function(al) {
            if (a.exists(al)) {
                B.volume = Math.min(Math.max(0, al / 100), 1);
                T = B.volume * 100
            }
        };

        function o(al) {
            x(e.JWPLAYER_MEDIA_VOLUME, {
                volume: Math.round(B.volume * 100)
            });
            x(e.JWPLAYER_MEDIA_MUTE, {
                mute: B.muted
            })
        }
        k.mute = function(al) {
            if (!a.exists(al)) {
                al = !B.muted
            }
            if (al) {
                T = B.volume * 100;
                B.muted = d
            } else {
                ag(T);
                B.muted = f
            }
        };

        function C(al) {
            if (al == b.PAUSED && g == b.IDLE) {
                return
            }
            if (M) {
                return
            }
            if (g != al) {
                var am = g;
                g = al;
                x(e.JWPLAYER_PLAYER_STATE, {
                    oldstate: am,
                    newstate: al
                })
            }
        }

        function l() {
            if (!y) {
                return
            }
            var al = W();
            if (al != P) {
                P = al;
                x(e.JWPLAYER_MEDIA_BUFFER, {
                    bufferPercent: Math.round(P * 100)
                })
            }
            if (al >= 1) {
                clearInterval(s)
            }
        }

        function W() {
            if (B.buffered.length == 0 || B.duration == 0) {
                return 0
            } else {
                return B.buffered.end(B.buffered.length - 1) / B.duration
            }
        }

        function q(al) {
            E(al);
            if (y) {
                ab()
            }
        }

        function ab() {
            ak = d;
            if (g != b.IDLE) {
                J = -1;
                D = d;
                x(e.JWPLAYER_MEDIA_BEFORECOMPLETE);
                if (y) {
                    C(b.IDLE);
                    D = f;
                    x(e.JWPLAYER_MEDIA_COMPLETE)
                }
            }
        }
        this.addCaptions = function(al, am, an) {
            if (a.isIOS() && B.addTextTrack && !i) {
                if (an > 0) {
                    an = al[an - 1].label
                }
                a.foreach(al, function(ap, aq) {
                    if (aq.data) {
                        L = ap;
                        var ao = B.addTextTrack(aq.kind, aq.label);
                        a.foreach(aq.data, function(ar, at) {
                            if (ar % 2 == 1) {
                                ao.addCue(new TextTrackCue(at.begin, aq.data[parseInt(ar) + 1].begin, at.text))
                            }
                        });
                        n.push(ao);
                        ao.mode = "hidden"
                    }
                })
            }
        };

        function U(ao, am) {
            for (var an = 0; an < B.textTracks.length; an++) {
                if (B.textTracks[an].label === am) {
                    L = an;
                    return B.textTracks[an]
                }
            }
            var al = B.addTextTrack(ao, am);
            L = B.textTracks.length - 1;
            return al
        }
        this.resetCaptions = function() {};
        this.fsCaptions = function(am, an) {
            if (a.isIOS() && B.addTextTrack && !i) {
                var al = null;
                a.foreach(n, function(ao, ap) {
                    if (!am && ap.mode == "showing") {
                        al = parseInt(ao)
                    }
                    if (!am) {
                        ap.mode = "hidden"
                    }
                });
                if (!am) {
                    return al
                }
            }
        };
        this.checkComplete = function() {
            return D
        };
        k.detachMedia = function() {
            y = f;
            return B
        };
        k.attachMedia = function(al) {
            y = d;
            if (!al) {
                ai = f
            }
            if (D) {
                C(b.IDLE);
                x(e.JWPLAYER_MEDIA_COMPLETE);
                D = f
            }
        };
        k.getTag = function() {
            return B
        };
        k.audioMode = function() {
            if (!O) {
                return f
            }
            var al = O[0].type;
            return (al == "aac" || al == "mp3" || al == "vorbis")
        };
        k.setCurrentQuality = function(am) {
            if (J == am) {
                return
            }
            am = parseInt(am, 10);
            if (am >= 0) {
                if (O && O.length > am) {
                    J = am;
                    a.saveCookie("qualityLabel", O[am].label);
                    x(e.JWPLAYER_MEDIA_LEVEL_CHANGED, {
                        currentQuality: am,
                        levels: p(O)
                    });
                    var al = B.currentTime;
                    z();
                    k.seek(al)
                }
            }
        };
        k.getCurrentQuality = function() {
            return J
        };
        k.getQualityLevels = function() {
            return p(O)
        };
        af(ad)
    }
})(jwplayer);
(function(r) {
    var n = r.html5,
        A = r.utils,
        c = r.events,
        i = c.state,
        u = A.css,
        w = A.bounds,
        z = A.isMobile(),
        g = A.isIPad(),
        D = A.isIPod(),
        k = A.isAndroid(),
        E = A.isIOS(),
        j = document,
        s = "jwplayer",
        e = "aspectMode",
        d = "." + s + ".jwfullscreen",
        t = "jwmain",
        C = "jwinstream",
        B = "jwvideo",
        f = "jwcontrols",
        b = "jwaspect",
        h = "jwplaylistcontainer",
        m = true,
        v = false,
        y = "opacity .25s ease",
        q = "100%",
        l = "absolute",
        x = " !important",
        o = "hidden",
        a = "none",
        p = "block";
    n.view = function(U, Z) {
        var aO = U,
            H = Z,
            aZ, a4, aR, ab, R, aU = -1,
            aH = z ? 4000 : 2000,
            aj, ax, av, aa, af, aG, K, X, aE = v,
            aW, ag, aF, M, aB = A.extend({}, H.componentConfig("logo")),
            aT, O, aK, ar = v,
            at = v,
            az, an, aq, a2 = -1,
            P = v,
            au, Y = new c.eventdispatcher();
        A.extend(this, Y);

        function aP() {
            aZ = aY("div", s + " playlist-" + H.playlistposition);
            aZ.id = aO.id;
            if (H.aspectratio) {
                u.style(aZ, {
                    display: "inline-block"
                });
                aZ.className = aZ.className.replace(s, s + " " + e)
            }
            S(H.width, H.height);
            var ba = j.getElementById(aO.id);
            ba.parentNode.replaceChild(aZ, ba)
        }
        this.getCurrentCaptions = function() {
            return aT.getCurrentCaptions()
        };
        this.setCurrentCaptions = function(ba) {
            aT.setCurrentCaptions(ba)
        };
        this.getCaptionsList = function() {
            return aT.getCaptionsList()
        };

        function aN() {
            var ba = w(aZ),
                bc = Math.round(ba.width),
                bb = Math.round(ba.height);
            if (!j.body.contains(aZ)) {
                window.removeEventListener("resize", aN);
                if (z) {
                    window.removeEventListener("orientationchange", aN)
                }
            } else {
                if (bc && bb) {
                    if (bc !== av || bb !== aa) {
                        av = bc;
                        aa = bb;
                        if (ag) {
                            ag.redraw()
                        }
                        clearTimeout(a2);
                        a2 = setTimeout(ao, 50);
                        Y.sendEvent(c.JWPLAYER_RESIZE, {
                            width: bc,
                            height: bb
                        })
                    }
                }
            }
            return ba
        }
        this.setup = function(bc) {
            if (ar) {
                return
            }
            aO.skin = bc;
            a4 = aY("span", t);
            a4.id = aO.id + "_view";
            ax = aY("span", B);
            aj = H.getVideo().getTag();
            ax.appendChild(aj);
            aR = aY("span", f);
            af = aY("span", C);
            R = aY("span", h);
            ab = aY("span", b);
            T();
            a4.appendChild(ax);
            a4.appendChild(aR);
            a4.appendChild(af);
            aZ.appendChild(a4);
            aZ.appendChild(ab);
            aZ.appendChild(R);
            j.addEventListener("webkitfullscreenchange", I, v);
            aj.addEventListener("webkitbeginfullscreen", I, v);
            aj.addEventListener("webkitendfullscreen", I, v);
            j.addEventListener("mozfullscreenchange", I, v);
            j.addEventListener("MSFullscreenChange", I, v);
            j.addEventListener("keydown", aI, v);
            window.removeEventListener("resize", aN);
            window.addEventListener("resize", aN, false);
            if (z) {
                window.removeEventListener("orientationchange", aN);
                window.addEventListener("orientationchange", aN, false)
            }
            aO.jwAddEventListener(c.JWPLAYER_PLAYER_READY, a3);
            aO.jwAddEventListener(c.JWPLAYER_PLAYER_STATE, Q);
            aO.jwAddEventListener(c.JWPLAYER_MEDIA_ERROR, aQ);
            aO.jwAddEventListener(c.JWPLAYER_PLAYLIST_COMPLETE, aX);
            aO.jwAddEventListener(c.JWPLAYER_PLAYLIST_ITEM, ah);
            Q({
                newstate: i.IDLE
            });
            if (!z) {
                aR.addEventListener("mouseout", function() {
                    clearTimeout(aU);
                    aU = setTimeout(a8, 10)
                }, v);
                aR.addEventListener("mousemove", a5, v);
                if (A.isIE()) {
                    ax.addEventListener("mousemove", a5, v);
                    ax.addEventListener("click", ag.clickHandler)
                }
            }
            ac(aW);
            ac(aF);
            ac(M);
            u("#" + aZ.id + "." + e + " ." + b, {
                "margin-top": H.aspectratio,
                display: p
            });
            var ba = A.exists(H.aspectratio) ? parseFloat(H.aspectratio) : 100,
                bb = H.playlistsize;
            u("#" + aZ.id + ".playlist-right ." + b, {
                "margin-bottom": -1 * bb * (ba / 100) + "px"
            });
            u("#" + aZ.id + ".playlist-right ." + h, {
                width: bb + "px",
                right: 0,
                top: 0,
                height: "100%"
            });
            u("#" + aZ.id + ".playlist-bottom ." + b, {
                "padding-bottom": bb + "px"
            });
            u("#" + aZ.id + ".playlist-bottom ." + h, {
                width: "100%",
                height: bb + "px",
                bottom: 0
            });
            u("#" + aZ.id + ".playlist-right ." + t, {
                right: bb + "px"
            });
            u("#" + aZ.id + ".playlist-bottom ." + t, {
                bottom: bb + "px"
            });
            setTimeout(function() {
                S(H.width, H.height)
            }, 0)
        };

        function ac(ba) {
            if (ba) {
                ba.element().addEventListener("mousemove", ai, v);
                ba.element().addEventListener("mouseout", a6, v)
            }
        }

        function aJ(ba) {}

        function aY(bb, ba) {
            var bc = j.createElement(bb);
            if (ba) {
                bc.className = ba
            }
            return bc
        }

        function ap() {
            if (z) {
                if (at) {
                    a8()
                } else {
                    al()
                }
            } else {
                Q(aO.jwGetState())
            }
            if (at) {
                aC()
            }
        }

        function aC() {
            clearTimeout(aU);
            aU = setTimeout(a8, aH)
        }

        function a5() {
            clearTimeout(aU);
            if (aO.jwGetState() == i.PAUSED || aO.jwGetState() == i.PLAYING) {
                al();
                if (!P) {
                    aU = setTimeout(a8, aH)
                }
            }
        }

        function ai() {
            clearTimeout(aU);
            P = m
        }

        function a6() {
            P = v
        }

        function aL(ba) {
            Y.sendEvent(ba.type, ba)
        }

        function T() {
            var ba = H.height,
                bc = H.componentConfig("controlbar"),
                bb = H.componentConfig("display");
            ad(ba);
            aT = new n.captions(aO, H.captions);
            aT.addEventListener(c.JWPLAYER_CAPTIONS_LIST, aL);
            aT.addEventListener(c.JWPLAYER_CAPTIONS_CHANGED, aL);
            aT.addEventListener(c.JWPLAYER_CAPTIONS_LOADED, aJ);
            aR.appendChild(aT.element());
            ag = new n.display(aO, bb);
            ag.addEventListener(c.JWPLAYER_DISPLAY_CLICK, function(bd) {
                aL(bd);
                ap()
            });
            if (aK) {
                ag.hidePreview(m)
            }
            aR.appendChild(ag.element());
           // M = new n.logo(aO, aB);
            //aR.appendChild(M.element());
            aF = new n.dock(aO, H.componentConfig("dock"));
            aR.appendChild(aF.element());
            if (aO.edition && !z) {
                aq = new n.rightclick(aO, {
                    abouttext: H.abouttext,
                    aboutlink: H.aboutlink
                })
            } else {
                if (!z) {
                    aq = new n.rightclick(aO, {})
                }
            }
            if (H.playlistsize && H.playlistposition && H.playlistposition != a) {
                O = new n.playlistcomponent(aO, {});
                R.appendChild(O.element())
            }
            aW = new n.controlbar(aO, bc);
            aW.addEventListener(c.JWPLAYER_USER_ACTION, aC);
            aR.appendChild(aW.element());
            if (D) {
                aM()
            }
        }
        var ay = this.fullscreen = function(ba) {
            if (!A.exists(ba)) {
                ba = !H.fullscreen
            }
            if (ba) {
                if (L()) {
                    return
                }
                if (z) {
                    try {
                        aj.webkitEnterFullScreen();
                        H.setFullscreen(m)
                    } catch (bb) {
                        return
                    }
                } else {
                    if (!H.fullscreen) {
                        N(m);
                        if (aZ.requestFullScreen) {
                            aZ.requestFullScreen()
                        } else {
                            if (aZ.mozRequestFullScreen) {
                                aZ.mozRequestFullScreen()
                            } else {
                                if (aZ.webkitRequestFullScreen) {
                                    aZ.webkitRequestFullScreen()
                                } else {
                                    if (aZ.msRequestFullscreen) {
                                        aZ.msRequestFullscreen()
                                    }
                                }
                            }
                        }
                        H.setFullscreen(m)
                    }
                }
            } else {
                if (z) {
                    aj.webkitExitFullScreen();
                    H.setFullscreen(v);
                    if (g) {
                        aj.controls = v
                    }
                } else {
                    if (H.fullscreen) {
                        N(v);
                        H.setFullscreen(v);
                        if (j.cancelFullScreen) {
                            j.cancelFullScreen()
                        } else {
                            if (j.mozCancelFullScreen) {
                                j.mozCancelFullScreen()
                            } else {
                                if (j.webkitCancelFullScreen) {
                                    j.webkitCancelFullScreen()
                                } else {
                                    if (j.msExitFullscreen) {
                                        j.msExitFullscreen()
                                    }
                                }
                            }
                        }
                    }
                }
                if (g && aO.jwGetState() == i.PAUSED) {
                    setTimeout(am, 500)
                }
            }
            a7(aW);
            a7(ag);
            a7(aF);
            ao();
            if (H.fullscreen) {
                clearTimeout(a2);
                a2 = setTimeout(ao, 200)
            }
        };

        function a7(ba) {
            if (ba) {
                ba.redraw()
            }
        }

        function S(bb, bi, bf) {
            var be = aZ.className,
                bj, bd, bh, bc, bg, ba = aO.id + "_view";
            u.block(ba);
            bf = !!bf;
            if (bf) {
                be = be.replace(/\s*aspectMode/, "");
                if (aZ.className !== be) {
                    aZ.className = be
                }
                u.style(aZ, {
                    display: p
                }, bf)
            }
            if (A.exists(bb) && A.exists(bi)) {
                H.width = bb;
                H.height = bi
            }
            bj = {
                width: bb
            };
            if (be.indexOf(e) == -1) {
                bj.height = bi
            }
            u.style(aZ, bj, true);
            if (ag) {
                ag.redraw()
            }
            if (aW) {
                aW.redraw(m)
            }
            if (M) {
                M.offset(aW && M.position().indexOf("bottom") >= 0 ? aW.height() + aW.margin() : 0);
                setTimeout(function() {
                    if (aF) {
                        aF.offset(M.position() == "top-left" ? M.element().clientWidth + M.margin() : 0)
                    }
                }, 500)
            }
            ad(bi);
            bc = H.playlistsize;
            bg = H.playlistposition;
            if (O && bc && (bg == "right" || bg == "bottom")) {
                O.redraw();
                bd = {
                    display: p
                };
                bh = {};
                bd[bg] = 0;
                bh[bg] = bc;
                if (bg == "right") {
                    bd.width = bc
                } else {
                    bd.height = bc
                }
                u.style(R, bd);
                u.style(a4, bh)
            }
            ao(bb, bi);
            u.unblock(ba)
        }

        function ad(ba) {
            aK = ak(ba);
            if (aW) {
                if (aK) {
                    aW.audioMode(m);
                    al();
                    ag.hidePreview(m);
                    F();
                    a0(v)
                } else {
                    aW.audioMode(v);
                    ae(aO.jwGetState())
                }
            }
            if (M && aK) {
                G()
            }
            aZ.style.backgroundColor = aK ? "transparent" : "#000"
        }

        function ak(ba) {
            var bb = w(aZ);
            if (ba.toString().indexOf("%") > 0) {
                return v
            } else {
                if (bb.height === 0) {
                    return v
                } else {
                    if (H.playlistposition == "bottom") {
                        return bb.height <= 40 + H.playlistsize
                    }
                }
            }
            return bb.height <= 40
        }

        function ao(bb, ba) {
            if (aj) {
                if (!bb || isNaN(Number(bb))) {
                    bb = ax.clientWidth
                }
                if (!ba || isNaN(Number(ba))) {
                    ba = ax.clientHeight
                }
                var bc = A.stretch(H.stretching, aj, bb, ba, aj.videoWidth, aj.videoHeight);
                if (bc) {
                    clearTimeout(a2);
                    a2 = setTimeout(ao, 250)
                }
            }
        }
        this.resize = function(bc, ba) {
            var bb = true;
            S(bc, ba, bb);
            aN()
        };
        this.resizeMedia = ao;
        var aA = this.completeSetup = function() {
            u.style(aZ, {
                opacity: 1
            })
        };

        function aI(ba) {
            if (H.fullscreen) {
                switch (ba.keyCode) {
                    case 27:
                        ay(v);
                        break
                }
            }
        }

        function N(ba) {
            if (E) {
                return
            }
            if (ba) {
                aZ.className += " jwfullscreen";
                (j.getElementsByTagName("body")[0]).style["overflow-y"] = o
            } else {
                aZ.className = aZ.className.replace(/\s+jwfullscreen/, "");
                (j.getElementsByTagName("body")[0]).style["overflow-y"] = ""
            }
        }

        function W() {
            var ba = j.mozFullScreenElement || j.webkitCurrentFullScreenElement || j.msFullscreenElement || aj.webkitDisplayingFullscreen;
            return !!(ba && (!ba.id || ba.id == aO.id))
        }

        function I() {
            var ba = W();
            if (H.fullscreen != ba) {
                ay(ba)
            }
        }

        function J() {
            if (D && !aK) {
                return
            }
            if (aW) {
                aW.show()
            }
        }

        function aM() {
            if (aW && !aK && !H.getVideo().audioMode()) {
                aW.hide()
            }
        }

        function V() {
            if (aF && !aK && H.controls) {
                aF.show()
            }
        }

        function aw() {
            if (aF && !az && !H.getVideo().audioMode()) {
                aF.hide()
            }
        }

        function aS() {
            if (M && !aK) {
                M.show()
            }
        }

        function G() {
            if (M && !H.getVideo().audioMode()) {
                M.hide(aK)
            }
        }

        function am() {
            if (ag && H.controls && !aK) {
                if (!D || aO.jwGetState() == i.IDLE) {
                    ag.show()
                }
            }
            if (!(z && H.fullscreen)) {
                aj.controls = v
            }
        }

        function F() {
            if (ag) {
                ag.hide()
            }
        }

        function a8() {
            clearTimeout(aU);
            at = v;
            var ba = aO.jwGetState();
            if (!Z.controls || ba != i.PAUSED) {
                aM()
            }
            if (!Z.controls) {
                aw()
            }
            if (ba != i.IDLE && ba != i.PAUSED) {
                aw();
                G()
            }
        }

        function al() {
            at = m;
            if (H.controls || aK) {
                if (!(D && au == i.PAUSED)) {
                    J();
                    V()
                }
            }
            if (aB.hide) {
                aS()
            }
        }

        function a0(ba) {
            ba = ba && !aK;
            if (ba || k) {
                u.style(ax, {
                    visibility: "visible",
                    opacity: 1
                })
            } else {
                u.style(ax, {
                    visibility: o,
                    opacity: 0
                })
            }
        }

        function aX() {
            az = m;
            ay(v);
            if (H.controls) {
                V()
            }
        }

        function ah() {}

        function a3() {
            an = m
        }
        var aV;

        function Q(ba) {
            az = v;
            clearTimeout(aV);
            aV = setTimeout(function() {
                ae(ba.newstate)
            }, 100)
        }

        function aQ() {
            aM()
        }

        function L() {
            var ba = aE ? X : H;
            return ba.getVideo().audioMode()
        }

        function ae(ba) {
            au = ba;
            switch (ba) {
                case i.PLAYING:
                    if (!L()) {
                        a0(m);
                        ao();
                        ag.hidePreview(m);
                        if (aW) {
                            aW.hideFullscreen(v)
                        }
                        a8()
                    } else {
                        a0(v);
                        ag.hidePreview(aK);
                        ag.setHiding(m);
                        if (aW) {
                            al();
                            aW.hideFullscreen(m)
                        }
                        V();
                        aS()
                    }
                    break;
                case i.IDLE:
                    a0(v);
                    if (!aK) {
                        ag.hidePreview(v);
                        am();
                        V();
                        aS();
                        if (aW) {
                            aW.hideFullscreen(v)
                        }
                    }
                    break;
                case i.BUFFERING:
                    am();
                    a8();
                    if (z) {
                        a0(m)
                    }
                    break;
                case i.PAUSED:
                    am();
                    al();
                    break
            }
        }

        function aD(ba) {
            return "#" + aO.id + (ba ? " ." + ba : "")
        }
        this.setupInstream = function(bb, ba, bd, bc) {
            u.unblock();
            a9(aD(C), m);
            a9(aD(f), v);
            af.appendChild(bb);
            aG = ba;
            K = bd;
            X = bc;
            Q({
                newstate: i.PLAYING
            });
            aE = m
        };
        this.destroyInstream = function() {
            u.unblock();
            a9(aD(C), v);
            a9(aD(f), m);
            af.innerHTML = "";
            aE = v
        };
        this.setupError = function(ba) {
            ar = m;
            r.embed.errorScreen(aZ, ba, H);
            aA()
        };

        function a9(ba, bb) {
            u(ba, {
                display: bb ? p : a
            })
        }
        this.addButton = function(bc, ba, bb, bd) {
            if (aF) {
                aF.addButton(bc, ba, bb, bd);
                if (aO.jwGetState() == i.IDLE) {
                    V()
                }
            }
        };
        this.removeButton = function(ba) {
            if (aF) {
                aF.removeButton(ba)
            }
        };
        this.setControls = function(bb) {
            var bc = H.controls,
                ba = bb ? m : v;
            H.controls = ba;
            if (ba != bc) {
                if (aE) {
                    a1(!bb)
                } else {
                    if (ba) {
                        Q({
                            newstate: aO.jwGetState()
                        })
                    } else {
                        a8();
                        F()
                    }
                }
                Y.sendEvent(c.JWPLAYER_CONTROLS, {
                    controls: ba
                })
            }
        };

        function a1(ba) {
            if (ba) {
                aG.hide();
                K.hide()
            } else {
                aG.show();
                K.show()
            }
        }
        this.addCues = function(ba) {
            if (aW) {
                aW.addCues(ba)
            }
        };
        this.forceState = function(ba) {
            ag.forceState(ba)
        };
        this.releaseState = function() {
            ag.releaseState(aO.jwGetState())
        };
        this.getSafeRegion = function() {
            var bf = {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            };
            if (!H.controls) {
                return bf
            }
            aW.showTemp();
            aF.showTemp();
            var bc = w(a4),
                bd = bc.top,
                ba = aE ? w(j.getElementById(aO.id + "_instream_controlbar")) : w(aW.element()),
                bh = aE ? false : (aF.numButtons() > 0),
                bb = (M.position().indexOf("top") === 0),
                bg, be = w(M.element());
            if (bh) {
                bg = w(aF.element());
                bf.y = Math.max(0, bg.bottom - bd)
            }
            if (bb) {
                bf.y = Math.max(bf.y, be.bottom - bd)
            }
            bf.width = bc.width;
            if (ba.height) {
                bf.height = (bb ? ba.top : be.top) - bd - bf.y
            } else {
                bf.height = bc.height - bf.y
            }
            aW.hideTemp();
            aF.hideTemp();
            return bf
        };
        this.destroy = function() {
            j.removeEventListener("webkitfullscreenchange", I, v);
            j.removeEventListener("mozfullscreenchange", I, v);
            j.removeEventListener("MSFullscreenChange", I, v);
            aj.removeEventListener("webkitbeginfullscreen", I, v);
            aj.removeEventListener("webkitendfullscreen", I, v);
            j.removeEventListener("keydown", aI, v);
            if (aq) {
                aq.destroy()
            }
        };
        aP()
    };
    u("." + s, {
        position: "relative",
        display: "block",
        opacity: 0,
        "min-height": 0,
        "-webkit-transition": y,
        "-moz-transition": y,
        "-o-transition": y
    });
    u("." + t, {
        position: l,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        "-webkit-transition": y,
        "-moz-transition": y,
        "-o-transition": y
    });
    u("." + B + ", ." + f, {
        position: l,
        height: q,
        width: q,
        "-webkit-transition": y,
        "-moz-transition": y,
        "-o-transition": y
    });
    u("." + B, {
        overflow: o,
        visibility: o,
        opacity: 0,
        cursor: "pointer"
    });
    u("." + B + " video", {
        background: "transparent",
        height: q,
        width: q,
        position: "absolute",
        margin: "auto",
        right: 0,
        left: 0,
        top: 0,
        bottom: 0
    });
    u("." + h, {
        position: l,
        height: q,
        width: q,
        display: a
    });
    u("." + C, {
        position: l,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        display: "none"
    });
    u("." + b, {
        display: "none"
    });
    u("." + s + "." + e, {
        height: "auto"
    });
    u(d, {
        width: q,
        height: q,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        "z-index": 1000,
        position: "fixed"
    }, m);
    u(d + " ." + t, {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }, m);
    u(d + " ." + h, {
        display: a
    }, m);
    u("." + s + " .jwuniform", {
        "background-size": "contain" + x
    });
    u("." + s + " .jwfill", {
        "background-size": "cover" + x,
        "background-position": "center"
    });
    u("." + s + " .jwexactfit", {
        "background-size": q + " " + q + x
    })
})(jwplayer);