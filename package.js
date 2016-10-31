Package.describe({
  name: "supaseca:pretty-email",
  summary: "Send pretty emails",
  version: "0.0.7",
  git: "https://github.com/projik/meteor-pretty-email"
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.0');

  api.use('email');
  api.use('underscore');
  api.use([
    'accounts-base',
    'accounts-password'
  ], { weak: true });
  api.use('cmather:handlebars-server@2.0.0');

  api.addFiles(
    [
      'lib/server/pretty-emails.js',
      'lib/templates/shared/footer.handlebars',
      'lib/templates/call-to-action.handlebars',
      'lib/templates/basic.handlebars'
    ],
    'server');

  api.export('PrettyEmail', 'server');
});
