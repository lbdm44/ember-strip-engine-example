import EmberRouter from '@ember/routing/router';
import { DEBUG } from '@glimmer/env';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  if (DEBUG) {
    this.mount('foo-bar');
  }
});
