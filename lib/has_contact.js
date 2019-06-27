function has_contact(event, contact) {
    var check_contacts = [];
    var entity_contacts = [];

    if (event.hasOwnProperty("check") && event.check.hasOwnProperty("labels") && event.check.labels.hasOwnProperty("contacts")) {
        check_contacts = event.check.labels.contacts.split(",");
    }

    if (event.hasOwnProperty("entity") && event.entity.hasOwnProperty("labels") && event.entity.labels.hasOwnProperty("contacts")) {
        entity_contacts = event.entity.labels.contacts.split(",");
    }

    // if there are no contacts, the event is not allowed
    if (check_contacts.length == 0 && entity_contacts.length == 0) {
        return false;
    }

    // allow the event if contact is present in check contacts
    if (check_contacts.indexOf(contact) >= 0) {
        return true;
    }

    //  allow the event if there are no check contacts and contact is present in entity contacts
    if (check_contacts.length == 0 && entity_contacts.indexOf(contact) >= 0) {
        return true;
    }

    // otherwise event is not allowed
    return false;
}
