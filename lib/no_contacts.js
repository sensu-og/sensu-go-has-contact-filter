function no_contacts(event) {
    var check_contacts = [];
    var entity_contacts = [];

    if (event.hasOwnProperty("check") && event.check.hasOwnProperty("labels") && event.check.labels.hasOwnProperty("contacts")) {
        check_contacts = event.check.labels.contacts.split(",");
        // filter out any elements which do not contain at least one non-whitespace character
        check_contacts = check_contacts.filter(function(entry) { return /\S/.test(entry); });
    }

    if (event.hasOwnProperty("entity") && event.entity.hasOwnProperty("labels") && event.entity.labels.hasOwnProperty("contacts")) {
        entity_contacts = event.entity.labels.contacts.split(",");
        // filter out any elements which do not contain at least one non-whitespace character
        entity_contacts = entity_contacts.filter(function(entry) { return /\S/.test(entry); });
    }

    if (check_contacts.length == 0 && entity_contacts.length == 0) {
        return true;
    } else {
        return false;
    }
}
