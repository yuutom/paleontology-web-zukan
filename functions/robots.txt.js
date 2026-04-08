export async function onRequestGet() {
  return new Response(
    `User-agent: *
Allow: /
Sitemap: https://koseibutsu-web-zukan.com/sitemap.xml
`,
    {
      headers: {
        "content-type": "text/plain; charset=UTF-8",
        "cache-control": "public, max-age=300",
      },
    },
  );
}
