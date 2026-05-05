<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9">

  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="es">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Sitemap | AionSite</title>
        <style>
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #020617;
            color: #e2e8f0;
            min-height: 100vh;
            padding: 2.5rem 1.25rem 4rem;
          }

          .wrap { max-width: 860px; margin: 0 auto; }

          /* ── Header ── */
          .header { margin-bottom: 2.5rem; }

          .brand {
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;
            font-size: 1.25rem;
            font-weight: 800;
            color: #fff;
            text-decoration: none;
            margin-bottom: 1.75rem;
          }

          .brand-dot { color: #3b82f6; }

          .header-title {
            font-size: 1.6rem;
            font-weight: 700;
            color: #fff;
            margin-bottom: 0.4rem;
          }

          .header-sub {
            font-size: 0.875rem;
            color: #64748b;
          }

          .header-sub b { color: #60a5fa; }

          /* ── Card ── */
          .card {
            background: #0f172a;
            border: 1px solid rgba(255,255,255,0.07);
            border-radius: 1rem;
            overflow: hidden;
            box-shadow: 0 24px 48px -16px rgba(2,6,23,0.8);
          }

          /* ── Table ── */
          table { width: 100%; border-collapse: collapse; }

          thead tr { border-bottom: 1px solid rgba(255,255,255,0.07); }

          th {
            padding: 0.875rem 1.25rem;
            text-align: left;
            font-size: 0.7rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            color: #475569;
          }

          tbody tr { border-bottom: 1px solid rgba(255,255,255,0.04); }
          tbody tr:last-child { border-bottom: none; }
          tbody tr:hover { background: rgba(255,255,255,0.025); }

          td {
            padding: 0.875rem 1.25rem;
            font-size: 0.85rem;
            vertical-align: middle;
          }

          /* ── URL cell ── */
          .url a {
            color: #60a5fa;
            text-decoration: none;
            word-break: break-all;
            line-height: 1.4;
          }
          .url a:hover { color: #93c5fd; text-decoration: underline; }

          /* ── Date ── */
          .date { color: #475569; font-size: 0.8rem; white-space: nowrap; }

          /* ── Freq badge ── */
          .freq {
            display: inline-block;
            padding: 0.2rem 0.65rem;
            border-radius: 999px;
            font-size: 0.72rem;
            font-weight: 500;
            background: rgba(59,130,246,0.1);
            color: #93c5fd;
            border: 1px solid rgba(59,130,246,0.18);
            white-space: nowrap;
          }

          /* ── Priority bar ── */
          .pbar-wrap {
            display: flex;
            align-items: center;
            gap: 0.55rem;
          }

          .pbar-track {
            width: 52px;
            height: 5px;
            background: rgba(255,255,255,0.07);
            border-radius: 999px;
            overflow: hidden;
            flex-shrink: 0;
          }

          .pbar-fill {
            height: 100%;
            border-radius: 999px;
          }

          .pbar-label {
            font-size: 0.78rem;
            color: #64748b;
            font-variant-numeric: tabular-nums;
          }

          /* ── Footer ── */
          .footer {
            margin-top: 1.75rem;
            text-align: center;
            font-size: 0.78rem;
            color: #334155;
          }

          .footer a { color: #3b82f6; text-decoration: none; }
          .footer a:hover { text-decoration: underline; }

          /* ── Responsive ── */
          @media (max-width: 600px) {
            .hide-sm { display: none; }
            td { padding: 0.75rem 1rem; }
            th { padding: 0.75rem 1rem; }
          }
        </style>
      </head>
      <body>
        <div class="wrap">

          <div class="header">
            <a class="brand" href="/">Aion<span class="brand-dot">.</span></a>
            <h1 class="header-title">Sitemap XML</h1>
            <p class="header-sub">
              <b><xsl:value-of select="count(sm:urlset/sm:url)"/></b> URLs indexadas &#183; aionsite.com.mx
            </p>
          </div>

          <div class="card">
            <table>
              <thead>
                <tr>
                  <th>URL</th>
                  <th class="hide-sm">Última modificación</th>
                  <th class="hide-sm">Frecuencia</th>
                  <th>Prioridad</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sm:urlset/sm:url">
                  <xsl:sort select="sm:priority" data-type="number" order="descending"/>
                  <tr>
                    <td class="url">
                      <a href="{sm:loc}" target="_blank" rel="noopener noreferrer">
                        <xsl:value-of select="sm:loc"/>
                      </a>
                    </td>
                    <td class="date hide-sm">
                      <xsl:value-of select="substring(sm:lastmod, 1, 10)"/>
                    </td>
                    <td class="hide-sm">
                      <span class="freq">
                        <xsl:value-of select="sm:changefreq"/>
                      </span>
                    </td>
                    <td>
                      <div class="pbar-wrap">
                        <div class="pbar-track">
                          <xsl:variable name="pct">
                            <xsl:value-of select="number(sm:priority) * 100"/>
                          </xsl:variable>
                          <xsl:variable name="color">
                            <xsl:choose>
                              <xsl:when test="sm:priority = '1.0'">#7c3aed</xsl:when>
                              <xsl:when test="sm:priority = '0.9'">#3b82f6</xsl:when>
                              <xsl:when test="sm:priority = '0.8'">#60a5fa</xsl:when>
                              <xsl:otherwise>#1e40af</xsl:otherwise>
                            </xsl:choose>
                          </xsl:variable>
                          <div class="pbar-fill">
                            <xsl:attribute name="style">
                              width:<xsl:value-of select="$pct"/>%;background:<xsl:value-of select="$color"/>
                            </xsl:attribute>
                            <xsl:text> </xsl:text>
                          </div>
                        </div>
                        <span class="pbar-label">
                          <xsl:value-of select="sm:priority"/>
                        </span>
                      </div>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>

          <p class="footer">
            <a href="/">aionsite.com.mx</a>
            &#160;&#183;&#160;
            <a href="/sitemap_index.xml">&#8592; Índice de sitemaps</a>
          </p>

        </div>
      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>
