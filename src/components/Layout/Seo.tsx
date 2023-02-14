import Head from 'next/head';

export interface SEOProps {
  page?: string;
  title?: string;
  description?: string;
}

export default function SEO(props: SEOProps) {
  const { page, title, description } = props;

  const defaultTitle = 'Chat2query Hackernews';
  const displayTitle = title || defaultTitle;

  return (
    <Head>
      <title>{page ? `${displayTitle} | ${page}` : displayTitle}</title>
      <meta
        name="description"
        content={description || 'Chat2query Hackernews'}
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
