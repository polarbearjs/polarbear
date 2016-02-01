export default ({ rootMarkup, initialState }) => {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Polarbear</title>
      </head>
      <body>
        <div id='root'>${ rootMarkup }</div>
        <script>
          window.BOOTSTRAP_CLIENT_STATE = ${JSON.stringify(initialState)}
        </script>
        <script src="/app.js"></script>
      </body>
    </html>
  `;
};
