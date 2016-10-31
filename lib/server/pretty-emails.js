var Accounts, PrettyEmail, ref, ref1, ref2, ref3, ref4, ref5, ref6;
OriginalHandlebars.registerHelper('footer', function () {
    var options;
    options = _.extend(this, PrettyEmail.options);
    if (options.companyName) {
        return Handlebars.templates.footer(options);
    }
    return
});
OriginalHandlebars.registerHelper('eachLine', function (content, options) {
    return _.reduce(content !== null ? content.split('\n') : void 0, function (result, content) {
        return result + options.fn(content);
    }, '');
});
PrettyEmail = {
    options: {},
    defaults: {
        verifyEmail: {
            heading: 'Just one more step...',
            message: 'Click on the big button below to activate your account',
            buttonText: 'Activate account'
        },
        resetPassword: {
            heading: 'Reset your password',
            message: 'Click the big button below to reset your password',
            buttonText: 'Reset password'
        },
        enrollAccount: {
            heading: 'To start using service, simply click the button below',
            buttonText: 'Change password'
        }
    },
    style: {
        fontFamily: 'Helvetica',
        fontColor: '#606060',
        buttonColor: '#FFFFFF',
        buttonBgColor: '#3071a9'
    },
    send: function (template, options) {
        options = _.extend({}, this.options, options);
        return Email.send({
            from: options.from,
            to: options.to,
            subject: options.subject,
            html: this.render(template, options)
        });
    },
    render: function (template, options) {
        options.style = this.style;
        options = _.extend({}, this.options, options);
        if (typeof template === 'string') {
            template = Handlebars.templates[template];
        }
        if (typeof template === 'function') {
            return template(options);
        } else {
            throw new Error("PrettyEmail can't render template. Pass template name or handlebars function.");
        }
    }
};
Accounts = Package['accounts-base'].Accounts;
Accounts.emailTemplates.verifyEmail.subject = function () {
    return 'Activate your account';
};
Accounts.emailTemplates.verifyEmail.html = function (user, verifyEmailUrl) {
    var options;
    options = _.extend({}, PrettyEmail.defaults.verifyEmail, {
        subject: Accounts.emailTemplates.verifyEmail.subject(user),
        buttonUrl: verifyEmailUrl
    });
    return PrettyEmail.render('call-to-action', options);
};
Accounts.emailTemplates.resetPassword.subject = function () {
    return 'Reset your password';
};
Accounts.emailTemplates.resetPassword.html = function (user, resetPasswordUrl) {
    var options;
    options = _.extend({}, PrettyEmail.defaults.resetPassword, {
        subject: Accounts.emailTemplates.resetPassword.subject(user),
        buttonUrl: resetPasswordUrl
    });
    return PrettyEmail.render('call-to-action', options);
};
Accounts.emailTemplates.enrollAccount.subject = function () {
    return 'An account has been created for you';
};
Accounts.emailTemplates.enrollAccount.html = function (user, enrollAccountUrl) {
    var options;
    options = _.extend({}, PrettyEmail.defaults.enrollAccount, {
        subject: Accounts.emailTemplates.enrollAccount.subject(user),
        buttonUrl: enrollAccountUrl
    });
    return PrettyEmail.render('call-to-action', options);
};
Meteor.startup(function () {
    if (PrettyEmail.options.from) {
        return Accounts.emailTemplates.from = PrettyEmail.options.from;
    }
});
