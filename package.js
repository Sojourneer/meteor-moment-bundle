Package.describe({
  name: 'moment-bundle',
  version: '0.1.1',
  // Minimalist packaging for momentjs modules
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');

  api.add_files('moment/min/moment.min.js', ['client','server'], {bare:true});

  //api.add_files('moment/min/locales.min.js', ['client','server'], {bare:true});
  //api.add_files('moment/min/moment-with-locales.min.js', ['client','server'], {bare:true});

  api.add_files('moment-recur/moment-recur.js', ['client','server'], {bare:true});
  api.add_files('moment-timezone/moment-timezone.js', ['client','server'], {bare:true});
  api.add_files('moment-timezone/moment-timezone-utils.js', ['client','server'], {bare:true});

  api.addFiles('moment-bundle.js');

  api.export('moment', ['client', 'server']);
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('moment-bundle');
  api.addFiles('moment-bundle-tests.js');
});

/* from moment.js
var profile = {
    resourceTags: {
        ignore: function(filename, mid){
            // only include moment/moment
            return mid != "moment/moment";
        },
        amd: function(filename, mid){
            return /\.js$/.test(filename);
        }
    }
};
*/
