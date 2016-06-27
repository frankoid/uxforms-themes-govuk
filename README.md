# Example implementation of a GOV.UK theme for UX Forms

This theme demonstrates how UX Forms can be made to look and behave for gov.uk service forms.

## Setting up

Run `npm install` to install its dependencies.

## Developing

Run `gulp package` to create the `.zip` file that can be deployed to UX Forms.

`source/scss` contains sass files to be processed.

`source/static` contains static files to be included in the artefact.

`source/static/templates` contains mustache templates used to render form widgets.

### Developing locally against a deployed theme.

All assets are currently deployed to static.{{env}}.uxforms.com. However it is possible to view your local changes against a remotely deployed uxform theme. Using web debugging applications such as [Charles](https://www.charlesproxy.com/) with remote mapping is one option. Where your local assets on e.g.  http://localhost/target/ can be mapped to static.{{env}}.uxforms.com/govuk/*
e.g static.dev.uxforms.com/govuk/javascripts/uxforms.js

The example below uses the Charles web debugging tool.

Go to Tools > Map Remote

Select Enable Map Remote option and select Add to create a new mapping entry.

A remote mapping consists of a Map From location and a Map To location.
#### Map From
The Map From location is a regular location pattern. e.g. https://static.dev.uxforms/govuk/javascripts/uxforms.js
####Map To
The Map To location specifies what to change about the original request. Any field left blank will be left unchanged.
If a path is specified it should end with a /. The original request path will be made relative to the Map From location pattern and then mapped to be relative to the **Map To** path e.g. http://localhost/target/javascripts/uxforms.js

See the [Charles documentation](https://www.charlesproxy.com/documentation/tools/map-remote/) on remote mapping for more information.

## Using

Deploy with the name `govuk`, which can be referenced in a form definition.
