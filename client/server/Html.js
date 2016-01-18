import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

const propTypes = {
  assets: PropTypes.object,
  component: PropTypes.node,
  store: PropTypes.object,
};

function Html({ assets, component, store }) {
  const content = component ? ReactDOM.renderToString(component) : '';
  const head = Helmet.rewind();

  return (
    <html lang="en-us">
      <head>
        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}

        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {Object.keys(assets.styles).map((style, key) => (
          <link href={assets.styles[style]} key={key} media="screen, projection" rel="stylesheet" type="text/css" charSet="UTF-8"/>) // eslint-disable-line max-len
        )}
      </head>
      <body>
        <div id="content" dangerouslySetInnerHTML={{ __html: content }}/>
        <script
          dangerouslySetInnerHTML={{ __html: `window.__data=${serialize(store.getState())};` }}
          charSet="UTF-8"
        />
        <script src={assets.javascript.main} charSet="UTF-8"/>
      </body>
    </html>
  );
}

Html.propTypes = propTypes;

export default Html;
