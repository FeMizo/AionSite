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
        <title>Sitemap Index | AionSite</title>
        <style>
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #020617;
            color: #e2e8f0;
            min-height: 100vh;
            padding: 2.5rem 1.25rem 4rem;
          }

          .wrap { max-width: 680px; margin: 0 auto; }

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
            margin-bottom: 2.5rem;
          }

          .header-sub b { color: #60a5fa; }

          /* ── Sitemap cards ── */
          .sitemap-list {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }

          .sitemap-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            background: #0f172a;
            border: 1px solid rgba(255,255,255,0.07);
            border-radius: 0.875rem;
            padding: 1.1rem 1.4rem;
            box-shadow: 0 4px 24px -8px rgba(2,6,23,0.6);
            transition: border-color 0.15s, background 0.15s;
          }

          .sitemap-item:hover {
            border-color: rgba(59,130,246,0.3);
            background: #111827;
          }

          .sitemap-left {
            display: flex;
            align-items: center;
            gap: 0.875rem;
            min-width: 0;
          }

          .sitemap-icon {
            width: 36px;
            height: 36px;
            border-radius: 0.625rem;
            background: rgba(59,130,246,0.12);
            border: 1px solid rgba(59,130,246,0.18);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            font-size: 1rem;
          }

          .sitemap-url {
            font-size: 0.85rem;
            color: #60a5fa;
            text-decoration: none;
            word-break: break-all;
            line-height: 1.4;
          }

          .sitemap-url:hover { color: #93c5fd; text-decoration: underline; }

          .sitemap-date {
            font-size: 0.75rem;
            color: #334155;
            white-space: nowrap;
            flex-shrink: 0;
          }

          .arrow {
            font-size: 0.9rem;
            color: #1e3a5f;
            flex-shrink: 0;
          }

          .footer {
            margin-top: 2rem;
            text-align: center;
            font-size: 0.78rem;
            color: #334155;
          }

          .footer a { color: #3b82f6; text-decoration: none; }
          .footer a:hover { text-decoration: underline; }

          @media (max-width: 480px) {
            .sitemap-date { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="wrap">

          <a class="brand" href="/">Aion<span class="brand-dot">.</span></a>

          <h1 class="header-title">Sitemap Index</h1>
          <p class="header-sub">
            <b><xsl:value-of select="count(sm:sitemapindex/sm:sitemap)"/></b> sitemaps disponibles
          </p>

          <div class="sitemap-list">
            <xsl:for-each select="sm:sitemapindex/sm:sitemap">
              <div class="sitemap-item">
                <div class="sitemap-left">
                  <div class="sitemap-icon">&#128196;</div>
                  <a class="sitemap-url" href="{sm:loc}" target="_blank" rel="noopener noreferrer">
                    <xsl:value-of select="sm:loc"/>
                  </a>
                </div>
                <span class="sitemap-date">
                  <xsl:value-of select="substring(sm:lastmod, 1, 10)"/>
                </span>
                <span class="arrow">&#8250;</span>
              </div>
            </xsl:for-each>
          </div>

          <p class="footer">
            <a href="/">aionsite.com.mx</a>
          </p>

        </div>
      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>
