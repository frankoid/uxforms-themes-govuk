# Example implementation of a GOV.UK theme for UX Forms

This theme demonstrates how UX Forms can be made to look and behave for gov.uk service forms.

## Setting up

Run `npm install` to install its dependencies.

## Developing

Run `gulp package` to create the `.zip` file that can be deployed to UX Forms.

`source/scss` contains sass files to be processed.

`source/static` contains static files to be included in the artefact.

`source/static/templates` contains mustache templates used to render form widgets.

## Using

Deploy with the name `govuk`, which can be referenced in a form definition.
