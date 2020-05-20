import React from 'react';
import { Helmet } from 'react-helmet';

export type UseMetadataConfig = {
  description?: string;
  image?: string;
  robots?: string;
  slug?: string;
  title?: string;
};

type UseMetadataResponse = {
  metadata: JSX.Element;
};

const useMetadata = (config: UseMetadataConfig = {}): UseMetadataResponse => {
  console.log('config: ', config);
  // default values
  /* NOTE: If the spread operator finds an existing prop, it overwrites this. */
  const defaultConfig = {
    title: 'UI Guideline - Component Standardization',
    description:
      'The definitive guide to standardize the UI Components naming. Our short-term goal is to include more details about each component (size, colors, code, best practices, etc).',
    image:
      'https://firebasestorage.googleapis.com/v0/b/ui-guideline.appspot.com/o/images%2Fsocial%2Fcard.png?alt=media&token=1d90cf9e-ffe5-461f-8324-52a2e46db7fd',
    robots: 'follow,index',
    slug: '',
    ...config,
  };

  const metadata = (
    <Helmet>
      <title>{defaultConfig.title}</title>

      {/* Essential META Tags */}
      <meta name="description" content={defaultConfig.description} />
      <meta property="robots" content={defaultConfig.robots} />

      {/* Facebook META Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="UI Guideline" />
      <meta property="og:title" content={defaultConfig.title} />
      <meta property="og:description" content={defaultConfig.description} />
      <meta property="og:image" content={defaultConfig.image} />
      <meta property="og:url" content={`https://www.uiguideline.com/${defaultConfig.slug}`} />
      <meta property="og:locale" content="es_la" />

      {/* Twitter META Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={defaultConfig.title} />
      <meta name="twitter:description" content={defaultConfig.description} />
      <meta name="twitter:image" content={defaultConfig.image} />
      <meta name="twitter:image:src" content={defaultConfig.image} />
      <meta name="twitter:url" content={`https://www.uiguideline.com/${defaultConfig.slug}`} />
      <meta name="twitter:widgets:csp" content="on" />
      <meta name="twitter:image:alt" content={defaultConfig.description} />
      <meta name="twitter:site" content="@uiguideline" />
      <meta name="twitter:creator" content="@uiguideline" />

      {/* Non-Essential, But Recommended */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="application-name" content="UI Guideline" />
      <meta name="apple-mobile-web-app-title" content="UI Guideline" />
      <meta name="author" content="UI Guideline" />
    </Helmet>
  );
  return {
    metadata,
  };
};

export default useMetadata;

/* TODO: Check if we need fragment meta tag
When testing with Google Webmaster tools, please be aware that there can be an issue using the “Fetch as Google”
 functionality. This tool does not check for the fragment meta tag and re-request the page with the 
 ?escaped_fragment= query parameter as it does in production: Googlebot itself does not have that issue.
 So, when using “Fetch as Google” you’ll need to append the ?_escaped_fragment_ query parameter on the 
 end of the URL that you are testing, and that should show your prerendered page. 
 If that works and if you have the following code snippet in the <head> of your HTML, 
 then the real Googlebot will work just fine. 

 reference: https://community.netlify.com/t/support-guide-understanding-and-debugging-prerendering/150
 */
