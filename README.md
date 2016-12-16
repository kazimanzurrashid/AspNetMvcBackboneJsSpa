# Backbone.js SPA (Single Page Application) Starter Kit/Template

Backbone.js SPA is template for ASP.NET MVC 4. It is enhanced with the
Twitter Bootstrap and Font Awesome.

The goal of the project is to provide the initial skeleton when developing
Backbone.js application in ASP.NET MVC. Out of the box it provides User
Sign-up, Sign-in, Password reset, User confirmation etc. with basic email
templates.

## Sample
- [My Walletz](https://github.com/kazimanzurrashid/my-walletz-backbone) - Purely CRUD Application created with this template.

## Download
- [NuGet Package - JavaScript](https://nuget.org/packages/backbone.js.javascript.starterkit/)
- [NuGet Package - TypeScript](https://nuget.org/packages/backbone.js.typescript.starterkit/)
- [NuGet Package - CoffeeScript](https://nuget.org/packages/backbone.js.coffeescript.starterkit/)
- [VSIX Extension - TypeScript](http://www.asp.net/single-page-application/overview/templates/backbonejs-template)

## Features
- ASP.NET MVC
- ASP.NET Web API
- ASP.NET Web Optimization
- [Backbone.js](http://backbonejs.org)
- [TypeScript](http://www.typescriptlang.org)
- [Twitter Bootstrap](http://twitter.github.com/bootstrap/)
- [Font Awesome](http://fortawesome.github.com/Font-Awesome/)
- [Postal](http://aboutcode.net/postal)
- Client Side Test
  - [Mocha](http://mochajs.org/)
  - [Chai](http://chaijs.com/)
  - [Sinon](http://sinonjs.org/)

## Screenshots

![Solution Explorer] (https://s3.amazonaws.com/media.kazimanzurrashid/bbjsspa-se-small.png)

![Home Page] (https://s3.amazonaws.com/media.kazimanzurrashid/bbjsspa-home-small.png)

![Membership Modal] (https://s3.amazonaws.com/media.kazimanzurrashid/bbjsspa-dialog-small.png)

## Walkthrough

Lets starts with the client side.

### Application
Located in `scripts/application/application.ts`. The `Applicatiion` acts as root namespace as well as initializing the application, it also maintains the configuration and state of the application that are shared across the application such as whether the use is signed in etc.

When the application `start` method is called, it creates the modal views (more on this in the views section) and then attaches event handlers for application level events such as user signed-in, signed-up, password changed etc. (more on application events in next section). Next, it creates the default `router` and then it checks whether any client-side url is specified, if not then it redirects to the default url (`#!/`).

### Events
Located in `scripts/application/events.ts` is a singleton object. Events always plays an important role when developing loosely coupled components. It is very common in an application to perform multiple operations when user performs certain action. Although Backbone components(e.g. `Model`, `Collection`, `View` etc.) has the built-in events, but rather making inter dependencies between these components, the `events` acts as an event hub for publishing and subscribing application events. Using the `events` is trivial, just refer the typescript file, then use the Backbone standard events methods like the following:

``` typescript
events.on('myEvent', (e: MyEventArg) => {
    // Do your work
});

// Later in the code
events.trigger('myEvent', { arg: 'myValue' });
```

### Router
Located in `scripts/application/router.ts` is the only Backbone Router. The `Router`
creates the `Activable` (more on this on view sections) views and maintains the state when switching the views. Currently it has only two dummy views `Home` and `About`, it also has `NotFound` view which is shown when an unknown route comes into action like `#/url-that-is-unknown`.

### Views
There are two kind of views the `Activable` views and modal dialog views. The `Activable` views are invoked by the router. When an `Activable` view activates all other `Activable` view becomes inactive. Creating an `Activable` view only requires extending the view with the `Activable` object like the following:

``` typescript
export class MyView extends Backbone.View {
    // Other implementation details
}

// Extending with Activable
_.extend(MyView.prototype, Activable);
```

Extending with `Activable` adds two new methods `activate` and `deactivate` to the extended view which are internally called by the above `Router`.

The other kind of view is the modal view, the modal views appears as Twitter Bootstrap Modal Dialog, currently it has `Membership` and `Profile` as Modal view.
The model views are suppose to be invoked by any application events. A good example of Modal view is the My Account link in the `Navigation` view. The `Navigation` View attaches `click` event handler for its child elements if the child has the `[data-command]`. Here is the snippet:

Html:

``` html
<li>
  <a href="#" data-command="myAccount">
    <i class="icon-user"></i> My Account
  </a>
</li>
```

Code:

``` typescript
export class Navigation extends Backbone.View {
    // Other implementation details
    handleCommand(e: JQueryEventObject) {
        var command = $(e.currentTarget).attr('data-command');
        if (command) {
            events.trigger(command);
        }
    }
}
Navigation.prototype.events = () => {
    return {
        'click [data-command]': 'handleCommand'
    };
};  
```

### Models
There is nothing special in models, they all have three basic things the default attributes, validation and server side end point. A typical example looks like the following:

``` typescript
export class Session extends Backbone.Model {
    urlRoot() {
        return serverUrlPrefix + '/sessions'
    }

    defaults(): ISessionAttributes {
        return {
          email: null,
          password: null,
          rememberMe: false
        }
    }

    validate(attributes: ISessionAttributes): IValidationResult {
        var errors = {};

        if (!attributes.email) {
            Validation.addError(errors, 'email', 'Email is required.');
        }

        if (!attributes.password) {
            Validation.addError(errors, 'password', 'Password is required.');
        }

        if (!_.isEmpty(errors)) {
            return { errors: errors };
        }
    }
}
```

### Library/Plug-ins
There are few handy jQuery plug-ins under the `scripts/application/lib` folder.
One of the often used plug-ins when working with form are in the `form.ts` file. When working with the form we often have to serialize/deserialize form/Model as well as showing the model validation errors in the form. It has methods like `serializeFields`, `deserializeFields`, `showFieldErrors` etc. exactly for that. A typical example when saving a model from a form goes like this:

``` typescript
// Here $el is the form element
// Hide existing errors if there is any
this.$el.hideSummaryError().hideFieldErrors();

// Subscribe invalid event which
// is fired when validation fails
model.on('invalid', () =>
    this.$el.showFieldErrors{(
        errors: model.validationError.errors;
    )}
);

model.save(this.$el.serializeFields(), {
    success: () => { }, // lets do something good
    error: (m, jqxhr: JQueryXHR) => {
        if (jqxhr.status === 400) { // bad request
            // Handle server side field errors
            var response = <any>$.parseJSON(jqxhr.responseText);
            if (response && _.has(response, 'ModelState')) {
                return this.$el.showFieldErrors({
                    errors: response.ModelState
                });
            }
        }

        // All other server errors
        this.$el.showSummaryError({
            message: 'An unexpected error has occurred while performing ' +
                'operation.'
        });
    }
});
```

The other two plug-ins files are `flashbar.ts` and `confirm.ts`. The `flashbar.ts` is used give various kinds of feedback messages upon user action, the methods are `$.showSuccessbar`, `$.showErrorbar` and `$.showInfobar`. Behind the scene it uses Twitter Bootstrap `alert` to show nicely animated messages. The `$.confirm` is used to replace the browser's ugly `confirm`, though the api is bit different:

``` typescript
$.confirm({
    prompt: 'Are you sure you want to do it?',
    ok: => { //Do something useful },
    cancel: => { // Do something else }
)};
```

Now the server side.

### Controllers
In a Single Page Application the server plays little role with the User Interface. Typically it is used to render the initial page and then send and receive json data. The `HomeController` is ASP.NET MVC controller which is used to render the initial page, the other ASP.NET MVC Controller is the `SupportsController` which is used to confirm the user account creation as well as reseting user password. All other controllers in this template are ASP.NET WebAPI controllers which are only used to send and receive json data. By default the controller uses the new `WebSecurity` to perform the user related tasks but it also has optional constructors which takes `Func`s as arguments so that the controller can be tested easily or can be replaced with something else with your preferred IoC Container. Here is a typical example how it is implemented:

``` csharp
public class SessionsController : ApiController
{
    private readonly Func<string, string, bool, bool> signIn;
    private readonly Action signOut;

    public SessionsController() : this(WebSecurity.Login, WebSecurity.Logout)
    {
    }

    public SessionsController(
        Func<string, string, bool, bool> signIn,
        Action signOut)
    {
      this.signIn = signIn;
      this.signOut = signOut;
    }

    // Rest of the code
}
```

### Views
The views are very modular, each section of a page has its own dedicated file. In a Single Page Application, it is very common to include number of views which does not have any corresponding controller, including views with `@Html.Partial('myView')` for each view is a tedious job. There is a helper method for it `@Html.IncludeClientViews('yourViewFolder')` which takes a optional folder name, if the folder name is not specified it would use the `ClientViews` as default folder. If your client view also uses partial view then name the partial view with an `_` (underscore) character, like `_SignUp`, when including clients views of a folder it would exclude the files when scanning the folder. To include a partial view in the client view `Html.ClientView('SignUp')` instead of `Html.Partial('_SignUp')`.

### Sending Email
The SPA Template uses the awesome [Postal](http://aboutcode.net/postal) to send emails but it is abstracted from the rest of the code with the `IMailer`interface, if you want use something else other than Postal, just implement the interface with your implementation. The email templates are located under the `Views/Emails` folder. The sender email address is specified in `sender.email` key of `appSettings` section in the `web.config` file. Also note that when `debug="true"` in `web.config` it does not require user email confirmation to speed up the development process.

## Road map
- Integrate any of the popular Backbone validation extension that automatically sets the validation rules for Backbone Model from the server side DataAnnotations attributes.

- CoffeeScript version.

- Create few t4+ps scripts that auto generates the Backbone Model and View from the server side model.

## License
Backbone.js SPA Template is released under the [MIT License](http://www.opensource.org/licenses/MIT).
