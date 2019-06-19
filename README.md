# sensu-go-has-contact-filter

This project implements a [Sensu Go][sgo] event filter library, providing a pair of functions which are used in conjunction with [handlers] and [filters] to provide contact routing capabilities in your Sensu monitoring pipeline.

## Functions

### has_contact

The `has_contact` function requires two arguments: the event object and a contact name string. Given these inputs, the function evaluates whether or not the specified contact name appears in comma separated values for the `contacts` label, under either the entity or check scope.

###  no_contacts

The `no_contacts` function accepts the event object as its sole argument. This function returns true if the event does not contain a `contacts` label under either the event's entity or check scopes.


## Installation

1. Download the asset definition for the latest release from [Bonsai].
2. Install the asset definition using sensuctl (e.g. `sensuctl create -f cwjohnston-sensu-go-has-contact-filter-0.1.2-any-noarch.yml`)

## Configuration

With the `sensu-go-has-contact-filter` asset installed, you're ready to configure the rest of your Sensu pipeline.

### Configure filter definitions

Define one or more filters with `sensu-go-has-contact-filter` as a [runtime asset] and using the `has_contact` function in a filter expression. The following example shows a filter which will allow events when the entity or check labels contain `dev`:

``` yaml
---
type: EventFilter
api_version: core/v2
metadata:
  name: contact_dev
  namespace: default
spec:
  action: allow
  runtime_assets:
    - sensu-go-has-contact-filter
  expressions:
    - has_contact(event, "dev")
```

Likewise, this filter stipulates that contacts should include `ops`

``` yaml
---
type: EventFilter
api_version: core/v2
metadata:
  name: contact_ops
  namespace: default
spec:
  action: allow
  runtime_assets:
    - sensu-go-has-contact-filter
  expressions:
    - has_contact(event, "ops")
```

To complement filters which test for specific contact names, you may also wish to have a filter which handles events without explicitly defined contacts: 

``` yaml
---
type: EventFilter
api_version: core/v2
metadata:
  name: no_contacts
  namespace: default
spec:
  action: allow
  runtime_assets:
    - sensu-go-has-contact-filter
  expressions:
    - no_contacts(event)
```

### Configure handler definitions

Define one or more handlers which make use of the filter. In this example, a handler named `email_dev` is defined, using two built in filters in conjunction with the `contact_dev` filter shown above:

``` yaml
---
type: Handler
api_version: core/v2
metadata:
  name: email_dev
  namespace: default
spec:
  command: sensu-email-handler -f sensu@example.com -t dev@example.com -s smtp.example.com
    -u sensu@example.com -p smtp_password
  env_vars: null
  filters:
  - is_incident
  - not_silenced
  - contact_dev
  handlers: null
  runtime_assets:
  - sensu-email-handler
  timeout: 10
  type: pipe
```

``` yaml
---
type: Handler
api_version: core/v2
metadata:
  name: email_ops
  namespace: default
spec:
  command: sensu-email-handler -f sensu@example.com -t ops@example.com -s smtp.example.com
    -u sensu@example.com -p smtp_password
  env_vars: null
  filters:
  - is_incident
  - not_silenced
  - contact_ops
  handlers: null
  runtime_assets:
  - sensu-email-handler
  timeout: 10
  type: pipe
```

``` yaml
---
type: Handler
api_version: core/v2
metadata:
  name: email_default
  namespace: default
spec:
  command: sensu-email-handler -f sensu@example.com -t staff@example.com -s smtp.example.com
    -u sensu@example.com -p smtp_password
  env_vars: null
  filters:
  - is_incident
  - not_silenced
  - no_contacts
  handlers: null
  runtime_assets:
  - sensu-email-handler
  timeout: 10
  type: pipe
```

For greatest effect, you can combine multiple handler definitions in a handler set:

``` yaml
---
type: Handler
api_version: core/v2
metadata:
  name: email
  namespace: default
spec:
  type: set
  handlers:
  - email_dev
  - email_ops
  - email_default
```

With a handler set like this one in place, check results configured with the `email` handler will spawn a handler pipeline for each handler in the set, each pipeline using the `has_contact` function to evaluate whether or not the event matches a named contact. Based on the above examples, a check result with "dev" and/or "ops" will be routed to those contacts respective email addresses, whereas any check result without contacts defined will be handled by the `email_default` handler.

See the included [contact routing pattern diagram][diagram] for a visual description of intended use cases.

[sgo]: https://sensu.io/
[handlers]: https://docs.sensu.io/sensu-go/latest/reference/handlers/
[filters]: https://docs.sensu.io/sensu-go/latest/reference/filters/
[bonsai]: https://bonsai.sensu.io/assets/cwjohnston/sensu-go-has-contact-filter
[diagram]: https://raw.githubusercontent.com/cwjohnston/sensu-go-has-contact-filter/master/contact_routing_pattern.png