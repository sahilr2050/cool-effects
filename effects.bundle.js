! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("ssLibrary", [], t) : "object" == typeof exports ? exports.ssLibrary = t() : e.ssLibrary = t()
}(self, (() => (() => {
    jQuery(".marquee_text").marquee({
        direction: "left",
        duration: 45e3,
        gap: 50,
        delayBeforeStart: 0,
        duplicated: !0,
        startVisible: !0
    }), jQuery(".marquee_text2").marquee({
        direction: "left",
        duration: 25e3,
        gap: 50,
        delayBeforeStart: 0,
        duplicated: !0,
        startVisible: !0
    }), window.addEventListener("load", (() => {
        e()
    }));
    const e = () => {
        const e = document.getElementById("demo");
        q();
        let t = {
                SIM_RESOLUTION: 128,
                DYE_RESOLUTION: 1440,
                CAPTURE_RESOLUTION: 512,
                DENSITY_DISSIPATION: 2,
                VELOCITY_DISSIPATION: 1.2,
                PRESSURE: .2,
                PRESSURE_ITERATIONS: 25,
                CURL: 5,
                SPLAT_RADIUS: .35,
                SPLAT_FORCE: 7500,
                SHADING: !0,
                COLOR_UPDATE_SPEED: 10,
                PAUSED: !1,
                BACK_COLOR: {
                    r: 0,
                    g: 0,
                    b: 0
                },
                TRANSPARENT: !0
            },
            n = [];
        n.push(new function() {
            this.id = -1, this.texcoordX = 0, this.texcoordY = 0, this.prevTexcoordX = 0, this.prevTexcoordY = 0, this.deltaX = 0, this.deltaY = 0, this.down = !1, this.moved = !1, this.color = [30, 0, 300]
        });
        const {
            gl: r,
            ext: i
        } = function(e) {
            const t = {
                alpha: !0,
                depth: !1,
                stencil: !1,
                antialias: !1,
                preserveDrawingBuffer: !1
            };
            let n = e.getContext("webgl2", t);
            const r = !!n;
            let i, a;
            r || (n = e.getContext("webgl", t) || e.getContext("experimental-webgl", t)), r ? (n.getExtension("EXT_color_buffer_float"), a = n.getExtension("OES_texture_float_linear")) : (i = n.getExtension("OES_texture_half_float"), a = n.getExtension("OES_texture_half_float_linear")), n.clearColor(0, 0, 0, 1);
            const u = r ? n.HALF_FLOAT : i.HALF_FLOAT_OES;
            let l, c, v;
            return r ? (l = o(n, n.RGBA16F, n.RGBA, u), c = o(n, n.RG16F, n.RG, u), v = o(n, n.R16F, n.RED, u)) : (l = o(n, n.RGBA, n.RGBA, u), c = o(n, n.RGBA, n.RGBA, u), v = o(n, n.RGBA, n.RGBA, u)), {
                gl: n,
                ext: {
                    formatRGBA: l,
                    formatRG: c,
                    formatR: v,
                    halfFloatTexType: u,
                    supportLinearFiltering: a
                }
            }
        }(e);

        function o(e, t, n, r) {
            if (! function(e, t, n, r) {
                    let i = e.createTexture();
                    e.bindTexture(e.TEXTURE_2D, i), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), e.texImage2D(e.TEXTURE_2D, 0, t, 4, 4, 0, n, r, null);
                    let o = e.createFramebuffer();
                    return e.bindFramebuffer(e.FRAMEBUFFER, o), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, i, 0), e.checkFramebufferStatus(e.FRAMEBUFFER) == e.FRAMEBUFFER_COMPLETE
                }(e, t, n, r)) switch (t) {
                case e.R16F:
                    return o(e, e.RG16F, e.RG, r);
                case e.RG16F:
                    return o(e, e.RGBA16F, e.RGBA, r);
                default:
                    return null
            }
            return {
                internalFormat: t,
                format: n
            }
        }
        i.supportLinearFiltering || (t.DYE_RESOLUTION = 512, t.SHADING = !1);
        class a {
            constructor(e, t) {
                this.uniforms = {}, this.program = u(e, t), this.uniforms = l(this.program)
            }
            bind() {
                r.useProgram(this.program)
            }
        }

        function u(e, t) {
            let n = r.createProgram();
            return r.attachShader(n, e), r.attachShader(n, t), r.linkProgram(n), r.getProgramParameter(n, r.LINK_STATUS) || console.trace(r.getProgramInfoLog(n)), n
        }

        function l(e) {
            let t = [],
                n = r.getProgramParameter(e, r.ACTIVE_UNIFORMS);
            for (let i = 0; i < n; i++) {
                let n = r.getActiveUniform(e, i).name;
                t[n] = r.getUniformLocation(e, n)
            }
            return t
        }

        function c(e, t, n) {
            t = function(e, t) {
                if (null == t) return e;
                let n = "";
                return t.forEach((e => {
                    n += "#define " + e + "\n"
                })), n + e
            }(t, n);
            const i = r.createShader(e);
            return r.shaderSource(i, t), r.compileShader(i), r.getShaderParameter(i, r.COMPILE_STATUS) || console.trace(r.getShaderInfoLog(i)), i
        }
        const v = c(r.VERTEX_SHADER, "\nprecision highp float;\n\nattribute vec2 aPosition;\nvarying vec2 vUv;\nvarying vec2 vL;\nvarying vec2 vR;\nvarying vec2 vT;\nvarying vec2 vB;\nuniform vec2 texelSize;\n\nvoid main () {\nvUv = aPosition * 0.5 + 0.5;\nvL = vUv - vec2(texelSize.x, 0.0);\nvR = vUv + vec2(texelSize.x, 0.0);\nvT = vUv + vec2(0.0, texelSize.y);\nvB = vUv - vec2(0.0, texelSize.y);\ngl_Position = vec4(aPosition, 0.0, 1.0);\n}\n"),
            f = c(r.VERTEX_SHADER, "\nprecision highp float;\n\nattribute vec2 aPosition;\nvarying vec2 vUv;\nvarying vec2 vL;\nvarying vec2 vR;\nuniform vec2 texelSize;\n\nvoid main () {\nvUv = aPosition * 0.5 + 0.5;\nfloat offset = 1.33333333;\nvL = vUv - texelSize * offset;\nvR = vUv + texelSize * offset;\ngl_Position = vec4(aPosition, 0.0, 1.0);\n}\n"),
            s = c(r.FRAGMENT_SHADER, "\nprecision mediump float;\nprecision mediump sampler2D;\n\nvarying vec2 vUv;\nvarying vec2 vL;\nvarying vec2 vR;\nuniform sampler2D uTexture;\n\nvoid main () {\nvec4 sum = texture2D(uTexture, vUv) * 0.29411764;\nsum += texture2D(uTexture, vL) * 0.35294117;\nsum += texture2D(uTexture, vR) * 0.35294117;\ngl_FragColor = sum;\n}\n"),
            m = c(r.FRAGMENT_SHADER, "\nprecision mediump float;\nprecision mediump sampler2D;\n\nvarying highp vec2 vUv;\nuniform sampler2D uTexture;\n\nvoid main () {\ngl_FragColor = texture2D(uTexture, vUv);\n}\n"),
            d = c(r.FRAGMENT_SHADER, "\nprecision mediump float;\nprecision mediump sampler2D;\n\nvarying highp vec2 vUv;\nuniform sampler2D uTexture;\nuniform float value;\n\nvoid main () {\ngl_FragColor = value * texture2D(uTexture, vUv);\n}\n"),
            h = c(r.FRAGMENT_SHADER, "\nprecision mediump float;\n\nuniform vec4 color;\n\nvoid main () {\ngl_FragColor = color;\n}\n"),
            T = c(r.FRAGMENT_SHADER, "\nprecision highp float;\nprecision highp sampler2D;\n\nvarying vec2 vUv;\nuniform sampler2D uTarget;\nuniform float aspectRatio;\nuniform vec3 color;\nuniform vec2 point;\nuniform float radius;\n\nvoid main () {\nvec2 p = vUv - point.xy;\np.x *= aspectRatio;\nvec3 splat = exp(-dot(p, p) / radius) * color;\nvec3 base = texture2D(uTarget, vUv).xyz;\ngl_FragColor = vec4(base + splat, 1.0);\n}\n"),
            E = c(r.FRAGMENT_SHADER, "\nprecision highp float;\nprecision highp sampler2D;\n\nvarying vec2 vUv;\nuniform sampler2D uVelocity;\nuniform sampler2D uSource;\nuniform vec2 texelSize;\nuniform vec2 dyeTexelSize;\nuniform float dt;\nuniform float dissipation;\n\nvec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {\nvec2 st = uv / tsize - 0.5;\n\nvec2 iuv = floor(st);\nvec2 fuv = fract(st);\n\nvec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);\nvec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);\nvec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);\nvec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);\n\nreturn mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);\n}\n\nvoid main () {\n#ifdef MANUAL_FILTERING\nvec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;\nvec4 result = bilerp(uSource, coord, dyeTexelSize);\n#else\nvec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;\nvec4 result = texture2D(uSource, coord);\n#endif\nfloat decay = 1.0 + dissipation * dt;\ngl_FragColor = result / decay;\n}", i.supportLinearFiltering ? null : ["MANUAL_FILTERING"]),
            x = c(r.FRAGMENT_SHADER, "\nprecision mediump float;\nprecision mediump sampler2D;\n\nvarying highp vec2 vUv;\nvarying highp vec2 vL;\nvarying highp vec2 vR;\nvarying highp vec2 vT;\nvarying highp vec2 vB;\nuniform sampler2D uVelocity;\n\nvoid main () {\nfloat L = texture2D(uVelocity, vL).x;\nfloat R = texture2D(uVelocity, vR).x;\nfloat T = texture2D(uVelocity, vT).y;\nfloat B = texture2D(uVelocity, vB).y;\n\nvec2 C = texture2D(uVelocity, vUv).xy;\nif (vL.x < 0.0) { L = -C.x; }\nif (vR.x > 1.0) { R = -C.x; }\nif (vT.y > 1.0) { T = -C.y; }\nif (vB.y < 0.0) { B = -C.y; }\n\nfloat div = 0.5 * (R - L + T - B);\ngl_FragColor = vec4(div, 0.0, 0.0, 1.0);\n}\n"),
            g = c(r.FRAGMENT_SHADER, "\nprecision mediump float;\nprecision mediump sampler2D;\n\nvarying highp vec2 vUv;\nvarying highp vec2 vL;\nvarying highp vec2 vR;\nvarying highp vec2 vT;\nvarying highp vec2 vB;\nuniform sampler2D uVelocity;\n\nvoid main () {\nfloat L = texture2D(uVelocity, vL).y;\nfloat R = texture2D(uVelocity, vR).y;\nfloat T = texture2D(uVelocity, vT).x;\nfloat B = texture2D(uVelocity, vB).x;\nfloat vorticity = R - L - T + B;\ngl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);\n}\n"),
            R = c(r.FRAGMENT_SHADER, "\nprecision highp float;\nprecision highp sampler2D;\n\nvarying vec2 vUv;\nvarying vec2 vL;\nvarying vec2 vR;\nvarying vec2 vT;\nvarying vec2 vB;\nuniform sampler2D uVelocity;\nuniform sampler2D uCurl;\nuniform float curl;\nuniform float dt;\n\nvoid main () {\nfloat L = texture2D(uCurl, vL).x;\nfloat R = texture2D(uCurl, vR).x;\nfloat T = texture2D(uCurl, vT).x;\nfloat B = texture2D(uCurl, vB).x;\nfloat C = texture2D(uCurl, vUv).x;\n\nvec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));\nforce /= length(force) + 0.0001;\nforce *= curl * C;\nforce.y *= -1.0;\n\nvec2 velocity = texture2D(uVelocity, vUv).xy;\nvelocity += force * dt;\nvelocity = min(max(velocity, -1000.0), 1000.0);\ngl_FragColor = vec4(velocity, 0.0, 1.0);\n}\n"),
            p = c(r.FRAGMENT_SHADER, "\nprecision mediump float;\nprecision mediump sampler2D;\n\nvarying highp vec2 vUv;\nvarying highp vec2 vL;\nvarying highp vec2 vR;\nvarying highp vec2 vT;\nvarying highp vec2 vB;\nuniform sampler2D uPressure;\nuniform sampler2D uDivergence;\n\nvoid main () {\nfloat L = texture2D(uPressure, vL).x;\nfloat R = texture2D(uPressure, vR).x;\nfloat T = texture2D(uPressure, vT).x;\nfloat B = texture2D(uPressure, vB).x;\nfloat C = texture2D(uPressure, vUv).x;\nfloat divergence = texture2D(uDivergence, vUv).x;\nfloat pressure = (L + R + B + T - divergence) * 0.25;\ngl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);\n}\n"),
            D = c(r.FRAGMENT_SHADER, "\nprecision mediump float;\nprecision mediump sampler2D;\n\nvarying highp vec2 vUv;\nvarying highp vec2 vL;\nvarying highp vec2 vR;\nvarying highp vec2 vT;\nvarying highp vec2 vB;\nuniform sampler2D uPressure;\nuniform sampler2D uVelocity;\n\nvoid main () {\nfloat L = texture2D(uPressure, vL).x;\nfloat R = texture2D(uPressure, vR).x;\nfloat T = texture2D(uPressure, vT).x;\nfloat B = texture2D(uPressure, vB).x;\nvec2 velocity = texture2D(uVelocity, vUv).xy;\nvelocity.xy -= vec2(R - L, T - B);\ngl_FragColor = vec4(velocity, 0.0, 1.0);\n}\n"),
            S = (r.bindBuffer(r.ARRAY_BUFFER, r.createBuffer()), r.bufferData(r.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), r.STATIC_DRAW), r.bindBuffer(r.ELEMENT_ARRAY_BUFFER, r.createBuffer()), r.bufferData(r.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), r.STATIC_DRAW), r.vertexAttribPointer(0, 2, r.FLOAT, !1, 0, 0), r.enableVertexAttribArray(0), (e, t = !1) => {
                null == e ? (r.viewport(0, 0, r.drawingBufferWidth, r.drawingBufferHeight), r.bindFramebuffer(r.FRAMEBUFFER, null)) : (r.viewport(0, 0, e.width, e.height), r.bindFramebuffer(r.FRAMEBUFFER, e.fbo)), t && (r.clearColor(0, 0, 0, 1), r.clear(r.COLOR_BUFFER_BIT)), r.drawElements(r.TRIANGLES, 6, r.UNSIGNED_SHORT, 0)
            });
        let _, A, y, U, F;
        ! function() {
            let e = r.createTexture();
            r.bindTexture(r.TEXTURE_2D, e), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, r.LINEAR), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MAG_FILTER, r.LINEAR), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_S, r.REPEAT), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_T, r.REPEAT), r.texImage2D(r.TEXTURE_2D, 0, r.RGB, 1, 1, 0, r.RGB, r.UNSIGNED_BYTE, new Uint8Array([255, 255, 255]));
            let t = {
                    texture: e,
                    width: 1,
                    height: 1,
                    attach: t => (r.activeTexture(r.TEXTURE0 + t), r.bindTexture(r.TEXTURE_2D, e), t)
                },
                n = new Image;
            n.onload = () => {
                t.width = n.width, t.height = n.height, r.bindTexture(r.TEXTURE_2D, e), r.texImage2D(r.TEXTURE_2D, 0, r.RGB, r.RGB, r.UNSIGNED_BYTE, n)
            }, n.src = "../app/themes/flipp/dist/images/LDR_LLL1_0.png"
        }(), new a(f, s);
        const L = new a(v, m),
            w = new a(v, d),
            b = (new a(v, h), new a(v, T)),
            P = new a(v, E),
            B = new a(v, x),
            X = new a(v, g),
            I = new a(v, R),
            N = new a(v, p),
            C = new a(v, D),
            z = new class {
                constructor(e, t) {
                    this.vertexShader = e, this.fragmentShaderSource = t, this.programs = [], this.activeProgram = null, this.uniforms = []
                }
                setKeywords(e) {
                    let t = 0;
                    for (let n = 0; n < e.length; n++) t += te(e[n]);
                    let n = this.programs[t];
                    if (null == n) {
                        let i = c(r.FRAGMENT_SHADER, this.fragmentShaderSource, e);
                        n = u(this.vertexShader, i), this.programs[t] = n
                    }
                    n != this.activeProgram && (this.uniforms = l(n), this.activeProgram = n)
                }
                bind() {
                    r.useProgram(this.activeProgram)
                }
            }(v, "\nprecision highp float;\nprecision highp sampler2D;\n\nvarying vec2 vUv;\nvarying vec2 vL;\nvarying vec2 vR;\nvarying vec2 vT;\nvarying vec2 vB;\nuniform sampler2D uTexture;\nuniform sampler2D uDithering;\nuniform vec2 ditherScale;\nuniform vec2 texelSize;\n\nvec3 linearToGamma (vec3 color) {\ncolor = max(color, vec3(0));\nreturn max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));\n}\n\nvoid main () {\nvec3 c = texture2D(uTexture, vUv).rgb;\n\n#ifdef SHADING\nvec3 lc = texture2D(uTexture, vL).rgb;\nvec3 rc = texture2D(uTexture, vR).rgb;\nvec3 tc = texture2D(uTexture, vT).rgb;\nvec3 bc = texture2D(uTexture, vB).rgb;\n\nfloat dx = length(rc) - length(lc);\nfloat dy = length(tc) - length(bc);\n\nvec3 n = normalize(vec3(dx, dy, length(texelSize)));\nvec3 l = vec3(0.0, 0.0, 1.0);\n\nfloat diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);\nc *= diffuse;\n#endif\n\nfloat a = max(c.r, max(c.g, c.b));\ngl_FragColor = vec4(c, a);\n}\n");

        function G() {
            let e = Z(t.SIM_RESOLUTION),
                n = Z(t.DYE_RESOLUTION);
            const o = i.halfFloatTexType,
                a = i.formatRGBA,
                u = i.formatRG,
                l = i.formatR,
                c = i.supportLinearFiltering ? r.LINEAR : r.NEAREST;
            r.disable(r.BLEND), _ = null == _ ? M(n.width, n.height, a.internalFormat, a.format, o, c) : Y(_, n.width, n.height, a.internalFormat, a.format, o, c), A = null == A ? M(e.width, e.height, u.internalFormat, u.format, o, c) : Y(A, e.width, e.height, u.internalFormat, u.format, o, c), y = O(e.width, e.height, l.internalFormat, l.format, o, r.NEAREST), U = O(e.width, e.height, l.internalFormat, l.format, o, r.NEAREST), F = M(e.width, e.height, l.internalFormat, l.format, o, r.NEAREST)
        }

        function O(e, t, n, i, o, a) {
            r.activeTexture(r.TEXTURE0);
            let u = r.createTexture();
            r.bindTexture(r.TEXTURE_2D, u), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, a), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MAG_FILTER, a), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_S, r.CLAMP_TO_EDGE), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_T, r.CLAMP_TO_EDGE), r.texImage2D(r.TEXTURE_2D, 0, n, e, t, 0, i, o, null);
            let l = r.createFramebuffer();
            return r.bindFramebuffer(r.FRAMEBUFFER, l), r.framebufferTexture2D(r.FRAMEBUFFER, r.COLOR_ATTACHMENT0, r.TEXTURE_2D, u, 0), r.viewport(0, 0, e, t), r.clear(r.COLOR_BUFFER_BIT), {
                texture: u,
                fbo: l,
                width: e,
                height: t,
                texelSizeX: 1 / e,
                texelSizeY: 1 / t,
                attach: e => (r.activeTexture(r.TEXTURE0 + e), r.bindTexture(r.TEXTURE_2D, u), e)
            }
        }

        function M(e, t, n, r, i, o) {
            let a = O(e, t, n, r, i, o),
                u = O(e, t, n, r, i, o);
            return {
                width: e,
                height: t,
                texelSizeX: a.texelSizeX,
                texelSizeY: a.texelSizeY,
                get read() {
                    return a
                },
                set read(e) {
                    a = e
                },
                get write() {
                    return u
                },
                set write(e) {
                    u = e
                },
                swap() {
                    let e = a;
                    a = u, u = e
                }
            }
        }

        function Y(e, t, n, i, o, a, u) {
            return e.width == t && e.height == n || (e.read = function(e, t, n, i, o, a, u) {
                let l = O(t, n, i, o, a, u);
                return L.bind(), r.uniform1i(L.uniforms.uTexture, e.attach(0)), S(l), l
            }(e.read, t, n, i, o, a, u), e.write = O(t, n, i, o, a, u), e.width = t, e.height = n, e.texelSizeX = 1 / t, e.texelSizeY = 1 / n), e
        }! function() {
            let e = [];
            t.SHADING && e.push("SHADING"), z.setKeywords(e)
        }(), G();
        let V = Date.now(),
            H = 0;

        function W() {
            const e = function() {
                let e = Date.now(),
                    t = (e - V) / 1e3;
                return t = Math.min(t, .016666), V = e, t
            }();
            q() && G(),
                function(e) {
                    H += e * t.COLOR_UPDATE_SPEED, H >= 1 && (H = (H - 0) % 1 + 0, n.forEach((e => {
                        e.color = Q()
                    })))
                }(e), n.forEach((e => {
                    e.moved && (e.moved = !1, function(e) {
                        let n = e.deltaX * t.SPLAT_FORCE,
                            r = e.deltaY * t.SPLAT_FORCE;
                        K(e.texcoordX, e.texcoordY, n, r, e.color)
                    }(e))
                })),
                function(e) {
                    r.disable(r.BLEND), X.bind(), r.uniform2f(X.uniforms.texelSize, A.texelSizeX, A.texelSizeY), r.uniform1i(X.uniforms.uVelocity, A.read.attach(0)), S(U), I.bind(), r.uniform2f(I.uniforms.texelSize, A.texelSizeX, A.texelSizeY), r.uniform1i(I.uniforms.uVelocity, A.read.attach(0)), r.uniform1i(I.uniforms.uCurl, U.attach(1)), r.uniform1f(I.uniforms.curl, t.CURL), r.uniform1f(I.uniforms.dt, e), S(A.write), A.swap(), B.bind(), r.uniform2f(B.uniforms.texelSize, A.texelSizeX, A.texelSizeY), r.uniform1i(B.uniforms.uVelocity, A.read.attach(0)), S(y), w.bind(), r.uniform1i(w.uniforms.uTexture, F.read.attach(0)), r.uniform1f(w.uniforms.value, t.PRESSURE), S(F.write), F.swap(), N.bind(), r.uniform2f(N.uniforms.texelSize, A.texelSizeX, A.texelSizeY), r.uniform1i(N.uniforms.uDivergence, y.attach(0));
                    for (let e = 0; e < t.PRESSURE_ITERATIONS; e++) r.uniform1i(N.uniforms.uPressure, F.read.attach(1)), S(F.write), F.swap();
                    C.bind(), r.uniform2f(C.uniforms.texelSize, A.texelSizeX, A.texelSizeY), r.uniform1i(C.uniforms.uPressure, F.read.attach(0)), r.uniform1i(C.uniforms.uVelocity, A.read.attach(1)), S(A.write), A.swap(), P.bind(), r.uniform2f(P.uniforms.texelSize, A.texelSizeX, A.texelSizeY), i.supportLinearFiltering || r.uniform2f(P.uniforms.dyeTexelSize, A.texelSizeX, A.texelSizeY);
                    let n = A.read.attach(0);
                    r.uniform1i(P.uniforms.uVelocity, n), r.uniform1i(P.uniforms.uSource, n), r.uniform1f(P.uniforms.dt, e), r.uniform1f(P.uniforms.dissipation, t.VELOCITY_DISSIPATION), S(A.write), A.swap(), i.supportLinearFiltering || r.uniform2f(P.uniforms.dyeTexelSize, _.texelSizeX, _.texelSizeY), r.uniform1i(P.uniforms.uVelocity, A.read.attach(0)), r.uniform1i(P.uniforms.uSource, _.read.attach(1)), r.uniform1f(P.uniforms.dissipation, t.DENSITY_DISSIPATION), S(_.write), _.swap()
                }(e), r.blendFunc(r.ONE, r.ONE_MINUS_SRC_ALPHA), r.enable(r.BLEND),
                function(e) {
                    let n = r.drawingBufferWidth,
                        i = r.drawingBufferHeight;
                    z.bind(), t.SHADING && r.uniform2f(z.uniforms.texelSize, 1 / n, 1 / i), r.uniform1i(z.uniforms.uTexture, _.read.attach(0)), S(e)
                }(null), requestAnimationFrame(W)
        }

        function q() {
            let t = ee(e.clientWidth),
                n = ee(e.clientHeight);
            return (e.width != t || e.height != n) && (e.width = t, e.height = n, !0)
        }

        function K(n, i, o, a, u) {
            b.bind(), r.uniform1i(b.uniforms.uTarget, A.read.attach(0)), r.uniform1f(b.uniforms.aspectRatio, e.width / e.height), r.uniform2f(b.uniforms.point, n, i), r.uniform3f(b.uniforms.color, o, a, 0), r.uniform1f(b.uniforms.radius, function(t) {
                let n = e.width / e.height;
                return n > 1 && (t *= n), t
            }(t.SPLAT_RADIUS / 100)), S(A.write), A.swap(), r.uniform1i(b.uniforms.uTarget, _.read.attach(0)), r.uniform3f(b.uniforms.color, u.r, u.g, u.b), S(_.write), _.swap()
        }

        function j(t, n, r, i) {
            t.id = n, t.down = !0, t.moved = !1, t.texcoordX = r / e.width, t.texcoordY = 1 - i / e.height, t.prevTexcoordX = t.texcoordX, t.prevTexcoordY = t.texcoordY, t.deltaX = 0, t.deltaY = 0, t.color = Q()
        }

        function k(t, n, r, i) {
            t.prevTexcoordX = t.texcoordX, t.prevTexcoordY = t.texcoordY, t.texcoordX = n / e.width, t.texcoordY = 1 - r / e.height, t.deltaX = function(t) {
                let n = e.width / e.height;
                return n < 1 && (t *= n), t
            }(t.texcoordX - t.prevTexcoordX), t.deltaY = function(t) {
                let n = e.width / e.height;
                return n > 1 && (t /= n), t
            }(t.texcoordY - t.prevTexcoordY), t.moved = Math.abs(t.deltaX) > 0 || Math.abs(t.deltaY) > 0, t.color = i
        }

        function J(e) {
            e.down = !1
        }

        function Q() {
            return {
                r: .2 * Math.random(),
                g: .3 + .1 * Math.random(),
                b: .2 * Math.random()
            }
        }

        function Z(e) {
            let t = r.drawingBufferWidth / r.drawingBufferHeight;
            t < 1 && (t = 1 / t);
            let n = Math.round(e),
                i = Math.round(e * t);
            return r.drawingBufferWidth > r.drawingBufferHeight ? {
                width: i,
                height: n
            } : {
                width: n,
                height: i
            }
        }

        function ee(e) {
            let t = window.devicePixelRatio || 1;
            return Math.floor(e * t)
        }

        function te(e) {
            if (0 == e.length) return 0;
            let t = 0;
            for (let n = 0; n < e.length; n++) t = (t << 5) - t + e.charCodeAt(n), t |= 0;
            return t
        }
        window.addEventListener("mousedown", (e => {
            let t = n[0];
            j(t, -1, ee(e.clientX), ee(e.clientY)),
                function(e) {
                    const t = Q();
                    t.r *= 10, t.g *= 10, t.b *= 10;
                    let n = 10 * (Math.random() - .5),
                        r = 30 * (Math.random() - .5);
                    K(e.texcoordX, e.texcoordY, n, r, t)
                }(t)
        })), jQuery("body").one("mousemove", (e => {
            let t = n[0],
                r = ee(e.clientX),
                i = ee(e.clientY),
                o = Q();
            W(), k(t, r, i, o)
        })), window.addEventListener("mousemove", (e => {
            let t = n[0];
            k(t, ee(e.clientX), ee(e.clientY), t.color)
        })), jQuery("body").one("touchstart", (e => {
            const t = e.targetTouches;
            t[0];
            let r = n[0];
            for (let e = 0; e < t.length; e++) {
                let n = ee(t[e].clientX),
                    i = ee(t[e].clientY);
                W(), j(r, t[e].identifier, n, i)
            }
        })), window.addEventListener("touchstart", (e => {
            const t = e.targetTouches;
            let r = n[0];
            for (let e = 0; e < t.length; e++) {
                let n = ee(t[e].clientX),
                    i = ee(t[e].clientY);
                j(r, t[e].identifier, n, i)
            }
        })), window.addEventListener("touchmove", (e => {
            const t = e.targetTouches;
            let r = n[0];
            for (let e = 0; e < t.length; e++) k(r, ee(t[e].clientX), ee(t[e].clientY), r.color)
        }), !1), window.addEventListener("touchend", (e => {
            const t = e.changedTouches;
            let r = n[0];
            for (let e = 0; e < t.length; e++) J(r)
        }))
    };
    return {}
})()));
